import { NextRequest, NextResponse } from 'next/server'
import { kv, KEYS } from '@/app/lib/kv'
import csvParser from 'csv-parser'
import { Readable } from 'stream'

// 验证管理员API密钥
function validateAdminKey(request: NextRequest) {
  const apiKey = request.headers.get('x-admin-api-key')
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

// 处理CSV文件上传
async function processCsvFile(file: File): Promise<{ plaintext: string; code: string }[]> {
  const buffer = await file.arrayBuffer()
  const stream = Readable.from(Buffer.from(buffer))
  
  return new Promise((resolve, reject) => {
    const results: { plaintext: string; code: string }[] = []
    
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
    if (!kv) {
      return NextResponse.json({ error: 'KV client not initialized' }, { status: 500 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (file.type !== 'text/csv') {
      return NextResponse.json({ error: 'Only CSV files are allowed' }, { status: 400 })
    }

    // 解析CSV文件
    const redeemData = await processCsvFile(file)
    
    if (redeemData.length === 0) {
      return NextResponse.json({ error: 'No valid data found in CSV' }, { status: 400 })
    }

    // 批量存储到KV
    // 使用单个hset调用，传入所有键值对
    const hsetData: Record<string, string> = {}
    for (const { plaintext, code } of redeemData) {
      hsetData[plaintext] = code
    }
    
    await kv.hset(KEYS.REDEEM_MAP, hsetData)

    // 更新统计信息
    await kv.hincrby(KEYS.STATS, 'total', redeemData.length)

    return NextResponse.json({
      success: true,
      message: `Uploaded ${redeemData.length} redeem codes`,
      data: { count: redeemData.length }
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}