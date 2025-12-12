import { kv } from './kv'

// 速率限制配置
export interface RateLimitConfig {
  window: number // 时间窗口（毫秒）
  maxRequests: number // 最大请求数
}

// 默认速率限制配置
export const DEFAULT_RATE_LIMIT: RateLimitConfig = {
  window: 60 * 1000, // 1分钟
  maxRequests: 5 // 最多5次请求
}

// 获取客户端IP（兼容NextRequest和Request类型）
export function getClientIp(request: any): string {
  const headers = request.headers
  const headersObj = headers instanceof Headers ? headers : {
    get: (key: string) => headers[key] || headers[key.toLowerCase()]
  }
  
  const xForwardedFor = headersObj.get('x-forwarded-for') || ''
  const xRealIp = headersObj.get('x-real-ip') || ''
  
  return xForwardedFor.split(',')[0]?.trim() || 
         xRealIp.trim() || 
         'unknown'
}

// 检查速率限制
export async function checkRateLimit(ip: string, config: RateLimitConfig = DEFAULT_RATE_LIMIT): Promise<boolean> {
  if (!kv) {
    return true // KV未初始化时，跳过速率限制
  }

  const key = `rate:limit:${ip}`
  const current = await kv.get<number>(key) || 0
  
  if (current >= config.maxRequests) {
    return false
  }
  
  await kv.set(key, current + 1, { ex: config.window / 1000 })
  return true
}