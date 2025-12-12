import { NextRequest } from 'next/server'
import { unauthorizedResponse } from './response'

// 验证管理员API密钥
export function validateAdminKey(request: NextRequest) {
  const apiKey = request.headers.get('x-admin-api-key')
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return unauthorizedResponse()
  }
}