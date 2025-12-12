import { NextRequest, NextResponse } from 'next/server'
import { kv, KEYS } from '@/app/lib/kv'

// 验证管理员API密钥
function validateAdminKey(request: NextRequest) {
  const apiKey = request.headers.get('x-admin-api-key')
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function GET(request: NextRequest) {
  // 验证管理员权限
  const authResponse = validateAdminKey(request)
  if (authResponse) return authResponse

  try {
    // 检查KV客户端是否初始化
    if (!kv) {
      return NextResponse.json({ error: 'KV client not initialized' }, { status: 500 })
    }

    // 获取统计信息
    const stats = await kv.hgetall(KEYS.STATS) as Record<string, string> || {}
    const total = parseInt((stats && stats.total) || '0')
    const used = parseInt((stats && stats.used) || '0')
    const remaining = total - used

    // 获取已使用兑换码数量
    const usedCount = await kv.scard(KEYS.USED_CODES)

    return NextResponse.json({
      success: true,
      data: {
        total,
        used: usedCount,
        remaining: Math.max(0, total - usedCount),
        usageRate: total > 0 ? Math.round((usedCount / total) * 100) : 0
      }
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}