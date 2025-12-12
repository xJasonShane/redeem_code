import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '兑换码系统',
  description: '输入明文获取对应的兑换码',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}