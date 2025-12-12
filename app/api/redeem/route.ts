import { NextRequest, NextResponse } from 'next/server'
import { kv, KEYS } from '@/app/lib/kv'

// 限制同一IP的请求频率
const RATE_LIMIT = {
  WINDOW: 60 * 1000, // 1分钟
  MAX_REQUESTS: 5    // 最多5次请求
}

// 获取客户端IP
function getClientIp(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
}

// 检查并更新请求频率
async function checkRateLimit(ip: string): Promise<boolean> {
  const key = `rate:limit:${ip}`
  const current = await kv.get<number>(key) || 0
  
  if (current >= RATE_LIMIT.MAX_REQUESTS) {
    return false
  }
  
  await kv.set(key, current + 1, { ex: RATE_LIMIT.WINDOW / 1000 })
  return true
}

export async function POST(request: NextRequest) {
  try {
    // 检查KV客户端是否初始化
    if (!kv) {
      return NextResponse.json({ error: 'KV client not initialized' }, { status: 500 })
    }

    // 获取客户端IP并检查频率限制
    const ip = getClientIp(request)
    const isAllowed = await checkRateLimit(ip)
    
    if (!isAllowed) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
    }

    const { plaintext } = await request.json()

    if (!plaintext || typeof plaintext !== 'string') {
      return NextResponse.json({ error: 'Invalid plaintext' }, { status: 400 })
    }

    const trimmedPlaintext = plaintext.trim()
    
    // 从KV获取兑换码
    const code = await kv.hget<string>(KEYS.REDEEM_MAP, trimmedPlaintext)
    
    if (!code) {
      return NextResponse.json({ error: 'Plaintext not found' }, { status: 404 })
    }

    // 检查兑换码是否已被使用
    const isUsed = await kv.sismember(KEYS.USED_CODES, code)
    
    if (isUsed) {
      return NextResponse.json({ error: 'Code already used' }, { status: 400 })
    }

    // 原子操作：标记兑换码为已使用
    await kv.sadd(KEYS.USED_CODES, code)
    
    // 更新统计信息
    await kv.hincrby(KEYS.STATS, 'used', 1)

    return NextResponse.json({ success: true, code })
  } catch (error) {
    console.error('Redeem error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}