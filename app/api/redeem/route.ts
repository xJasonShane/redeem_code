import { NextRequest } from 'next/server'
import { kv, KEYS } from '@/app/lib/kv'
import { successResponse, errorResponse, rateLimitResponse, notFoundResponse, serverErrorResponse } from '@/app/lib/response'
import { getClientIp, checkRateLimit } from '@/app/lib/rateLimit'
import { validateKvClient } from '@/app/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // 检查KV客户端是否初始化
    const kvValidation = validateKvClient(kv)
    if (!kvValidation.valid) {
      return errorResponse(kvValidation.error, 500)
    }

    // 获取客户端IP并检查频率限制
    const ip = getClientIp(request)
    const isAllowed = await checkRateLimit(ip)
    
    if (!isAllowed) {
      return rateLimitResponse()
    }

    const body = await request.json()
    const { plaintext } = body

    // 验证请求参数
    if (!plaintext || typeof plaintext !== 'string') {
      return errorResponse('Invalid plaintext')
    }

    const trimmedPlaintext = plaintext.trim()
    
    // 从KV获取兑换码
    const code = await kv.hget<string>(KEYS.REDEEM_MAP, trimmedPlaintext)
    
    if (!code) {
      return notFoundResponse('Plaintext not found')
    }

    // 检查兑换码是否已被使用
    const isUsed = await kv.sismember(KEYS.USED_CODES, code)
    
    if (isUsed) {
      return errorResponse('Code already used')
    }

    // 原子操作：标记兑换码为已使用
    await kv.sadd(KEYS.USED_CODES, code)
    
    // 更新统计信息
    await kv.hincrby(KEYS.STATS, 'used', 1)

    return successResponse({ code }, 'Code redeemed successfully')
  } catch (error) {
    return serverErrorResponse(error)
  }
}