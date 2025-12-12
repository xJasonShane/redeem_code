import { createClient } from '@vercel/kv'

// 定义所需的KV客户端接口
interface KvClient {
  get: (key: string) => Promise<unknown>
  hget: (key: string, field: string) => Promise<unknown>
  hset: (key: string, data: Record<string, string>) => Promise<number>
  hgetall: (key: string) => Promise<Record<string, string>>
  sadd: (key: string, member: string) => Promise<number>
  sismember: (key: string, member: string) => Promise<number>
  scard: (key: string) => Promise<number>
  hincrby: (key: string, field: string, increment: number) => Promise<number>
  set: (key: string, value: unknown, options?: { ex?: number }) => Promise<string>
}

// 创建一个空的KV客户端实现，用于开发环境或KV未配置时
const createMockKv = (): Partial<KvClient> => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  return {
    get: async (_) => null,
    hget: async (_, __) => null,
    hset: async (_, __) => 0,
    hgetall: async (_) => ({}),
    sadd: async (_, __) => 0,
    sismember: async (_, __) => 0,
    scard: async (_) => 0,
    hincrby: async (_, __, ___) => 0,
    set: async (_, __, ___) => 'OK'
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */
}

// 创建一个完整的KV客户端实现，确保所有方法都存在
const createCompleteKv = (): KvClient => {
  const mockKv = createMockKv()
  
  // 初始化真实KV客户端（如果环境变量存在）
  let realKv: Partial<KvClient> | null = null
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    realKv = createClient({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    }) as unknown as Partial<KvClient>
  }

  // 返回一个完整的KV客户端，优先使用真实KV，否则使用mock实现
  /* eslint-disable @typescript-eslint/no-unused-vars */
  return {
    get: realKv?.get || mockKv.get || (async (_) => null),
    hget: realKv?.hget || mockKv.hget || (async (_, __) => null),
    hset: realKv?.hset || mockKv.hset || (async (_, __) => 0),
    hgetall: realKv?.hgetall || mockKv.hgetall || (async (_) => ({})),
    sadd: realKv?.sadd || mockKv.sadd || (async (_, __) => 0),
    sismember: realKv?.sismember || mockKv.sismember || (async (_, __) => 0),
    scard: realKv?.scard || mockKv.scard || (async (_) => 0),
    hincrby: realKv?.hincrby || mockKv.hincrby || (async (_, __, ___) => 0),
    set: realKv?.set || mockKv.set || (async (_, __, ___) => 'OK'),
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */
}

// 导出完整的KV客户端
export const kv = createCompleteKv()

// 存储键名常量
export const KEYS = {
  // 兑换码映射: plaintext -> code
  REDEEM_MAP: 'redeem:map',
  // 已使用兑换码集合
  USED_CODES: 'redeem:used',
  // 统计信息
  STATS: 'redeem:stats',
}