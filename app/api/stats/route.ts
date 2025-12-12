import { NextRequest } from 'next/server'
import { kv, KEYS } from '@/app/lib/kv'
import { successResponse, errorResponse, serverErrorResponse } from '@/app/lib/response'
import { validateAdminKey, validateKvClient } from '@/app/lib/auth'

// 统计信息类型
interface StatsData {
  total: number
  used: number
  remaining: number
  usageRate: number
}

export async function GET(request: NextRequest) {
  // 验证管理员权限
  const authResponse = validateAdminKey(request)
  if (authResponse) return authResponse

  try {
    // 检查KV客户端是否初始化
    const kvValidation = validateKvClient(kv)
    if (!kvValidation.valid) {
      return errorResponse(kvValidation.error, 500)
    }

    // 获取统计信息
    const stats = await kv.hgetall(KEYS.STATS) as Record<string, string> || {}
    const total = parseInt(stats.total || '0')
    
    // 获取已使用兑换码数量
    const usedCount = await kv.scard(KEYS.USED_CODES)
    const remaining = Math.max(0, total - usedCount)
    const usageRate = total > 0 ? Math.round((usedCount / total) * 100) : 0

    const statsData: StatsData = {
      total,
      used: usedCount,
      remaining,
      usageRate
    }

    return successResponse(statsData, 'Stats retrieved successfully')
  } catch (error) {
    return serverErrorResponse(error)
  }
}