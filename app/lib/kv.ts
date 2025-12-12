import { createClient } from '@vercel/kv'

// 只有在环境变量存在时才初始化KV客户端
let kvClient: ReturnType<typeof createClient> | null = null

if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
  kvClient = createClient({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  })
}

// 导出KV客户端，在使用时检查是否初始化
export const kv = kvClient!

// 存储键名常量
export const KEYS = {
  // 兑换码映射: plaintext -> code
  REDEEM_MAP: 'redeem:map',
  // 已使用兑换码集合
  USED_CODES: 'redeem:used',
  // 统计信息
  STATS: 'redeem:stats',
}