import { NextResponse } from 'next/server'

// API响应类型
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// 成功响应
export function successResponse<T = unknown>(data?: T, message?: string, status: number = 200): NextResponse {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message
  }
  return NextResponse.json(response, { status })
}

// 错误响应
export function errorResponse(error: string, status: number = 400): NextResponse {
  const response: ApiResponse = {
    success: false,
    error
  }
  return NextResponse.json(response, { status })
}

// 未授权响应
export function unauthorizedResponse(): NextResponse {
  return errorResponse('Unauthorized', 401)
}

// 速率限制响应
export function rateLimitResponse(): NextResponse {
  return errorResponse('Rate limit exceeded', 429)
}

// 未找到响应
export function notFoundResponse(error: string = 'Resource not found'): NextResponse {
  return errorResponse(error, 404)
}

// 服务器错误响应
export function serverErrorResponse(error: unknown): NextResponse {
  console.error('Server error:', error)
  return errorResponse('Internal server error', 500)
}