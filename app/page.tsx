'use client'

import { useState } from 'react'

// API响应类型
interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// 兑换响应数据类型
interface RedeemResponse {
  code: string
}

export default function RedeemPage() {
  const [plaintext, setPlaintext] = useState('')
  const [code, setCode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // 重置表单
  const resetForm = () => {
    setPlaintext('')
    setCode(null)
    setError(null)
    setSuccessMessage(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    // 前端输入验证
    const trimmedPlaintext = plaintext.trim()
    if (!trimmedPlaintext) {
      setError('请输入明文')
      return
    }

    setLoading(true)
    setError(null)
    setCode(null)
    setSuccessMessage(null)

    try {
      const response = await fetch('/api/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plaintext: trimmedPlaintext }),
      })

      const data: ApiResponse<RedeemResponse> = await response.json()

      if (!data.success) {
        throw new Error(data.error || '兑换失败，请稍后重试')
      }

      setCode(data.data?.code || null)
      setSuccessMessage(data.message || '兑换成功！')
    } catch (err) {
      setError(err instanceof Error ? err.message : '网络错误，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              兑换码领取
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              输入您的明文，获取对应的兑换码
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="plaintext" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                明文
              </label>
              <input
                id="plaintext"
                name="plaintext"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-700 transition-colors duration-200"
                placeholder="请输入明文"
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                disabled={loading}
                autoComplete="off"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="group relative flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : null}
                {loading ? '处理中...' : '获取兑换码'}
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
                className="group relative flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                重置
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md animate-fade-in">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 dark:text-red-300">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {code && (
            <div className="mt-6 space-y-4">
              {successMessage && (
                <div className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md animate-fade-in">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700 dark:text-green-300">
                        {successMessage}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 animate-fade-in">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  您的兑换码
                </h3>
                <div className="flex items-center justify-between">
                  <code className="text-lg font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-md break-all">
                    {code}
                  </code>
                  <button
                    onClick={() => navigator.clipboard.writeText(code)}
                    className="ml-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200"
                    title="复制到剪贴板"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  请妥善保管您的兑换码，每个明文只能兑换一次
                </p>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={resetForm}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200 font-medium"
                >
                  ↻ 再次兑换
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}