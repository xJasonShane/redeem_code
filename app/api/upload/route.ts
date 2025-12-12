import { NextRequest } from 'next/server'
import { kv, KEYS } from '@/app/lib/kv'
import csvParser from 'csv-parser'
import { Readable } from 'stream'
import { successResponse, errorResponse, serverErrorResponse } from '@/app/lib/response'
import { validateAdminKey, validateKvClient } from '@/app/lib/auth'

// CSV处理结果类型
interface CsvRow {
  plaintext: string
  code: string
}

// 处理CSV文件上传
async function processCsvFile(file: File): Promise<CsvRow[]> {
  const buffer = await file.arrayBuffer()
  const stream = Readable.from(Buffer.from(buffer))
  
  return new Promise((resolve, reject) => {
    const results: CsvRow[] = []
    
    stream
      .pipe(csvParser({ headers: ['plaintext', 'code'] }))
      .on('data', (data) => {
        if (data.plaintext && data.code) {
          results.push({
            plaintext: data.plaintext.trim(),
            code: data.code.trim()
          })
        }
      })
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error))
  })
}

export async function POST(request: NextRequest) {
  // 验证管理员权限
  const authResponse = validateAdminKey(request)
  if (authResponse) return authResponse

  try {
    // 检查KV客户端是否初始化
    const kvValidation = validateKvClient(kv)
    if (!kvValidation.valid) {
      return errorResponse(kvValidation.error, 500)
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    // 验证文件
    if (!file) {
      return errorResponse('No file provided')
    }

    if (file.type !== 'text/csv') {
      return errorResponse('Only CSV files are allowed')
    }

    // 解析CSV文件
    const redeemData = await processCsvFile(file)
    
    if (redeemData.length === 0) {
      return errorResponse('No valid data found in CSV')
    }

    // 批量存储到KV
    const hsetData: Record<string, string> = {}
    for (const { plaintext, code } of redeemData) {
      hsetData[plaintext] = code
    }
    
    await kv.hset(KEYS.REDEEM_MAP, hsetData)

    // 更新统计信息
    await kv.hincrby(KEYS.STATS, 'total', redeemData.length)

    return successResponse(
      { count: redeemData.length },
      `Uploaded ${redeemData.length} redeem codes`
    )
  } catch (error) {
    return serverErrorResponse(error)
  }
}