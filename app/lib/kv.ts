import { createClient, type Kv } from '@vercel/kv'

// 创建一个空的KV客户端实现，用于开发环境或KV未配置时
const createMockKv = (): Partial<Kv> => {
  return {
    get: async () => null,
    hget: async () => null,
    hset: async () => 0,
    hgetall: async () => {},
    sadd: async () => 0,
    sismember: async () => 0,
    scard: async () => 0,
    hincrby: async () => 0,
    set: async () => 'OK'
  }
}

// 初始化KV客户端
let kvClient: Partial<Kv> = createMockKv()

if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
  kvClient = createClient({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  })
}

// 导出KV客户端
export const kv = kvClient

// 存储键名常量
export const KEYS = {
  // 兑换码映射: plaintext -> code
  REDEEM_MAP: 'redeem:map',
  // 已使用兑换码集合
  USED_CODES: 'redeem:used',
  // 统计信息
  STATS: 'redeem:stats',
}