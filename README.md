# redeem_code

The Redeem Code project aims to provide a platform for bulk distribution of redemption codes. Redeem Code项目旨在提供一个用于批量发放兑换码的平台。
</div>

# 🎟️ 兑换码系统

<div align="center">
  <p style="font-size: 1.2rem; margin: 10px 0 20px;">
    一个基于 Next.js 14 开发的高性能兑换码系统，支持批量上传和用户领取功能
  </p>
  
  <div align="center" style="margin: 20px 0; display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
    <a href="https://vercel.com" target="_blank" style="text-decoration: none;">
      <img src="https://img.shields.io/badge/Deploy%20on-Vercel-blue?style=for-the-badge&logo=vercel" alt="Deploy on Vercel" />
    </a>
    <img src="https://img.shields.io/badge/Next.js-14.2.15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-5.6.3-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind%20CSS-3.4.14-cyan?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
  </div>
  
  <div style="margin-top: 30px;">
    <a href="#✨-核心功能" style="margin: 0 10px; color: #6366f1; text-decoration: none; font-weight: 500;">核心功能</a>
    <a href="#🛠️-技术栈" style="margin: 0 10px; color: #6366f1; text-decoration: none; font-weight: 500;">技术栈</a>
    <a href="#🚀-快速开始" style="margin: 0 10px; color: #6366f1; text-decoration: none; font-weight: 500;">快速开始</a>
    <a href="#📦-部署" style="margin: 0 10px; color: #6366f1; text-decoration: none; font-weight: 500;">部署</a>
    <a href="#📖-使用说明" style="margin: 0 10px; color: #6366f1; text-decoration: none; font-weight: 500;">使用说明</a>
  </div>
</div>

---

## 📋 目录

- [✨ 核心功能](#✨-核心功能)
  - [🧑‍💻 用户功能](#🧑‍💻-用户功能)
  - [👨‍💼 管理员功能](#👨‍💼-管理员功能)
  - [🔒 安全性保障](#🔒-安全性保障)
- [🛠️ 技术栈](#🛠️-技术栈)
- [🚀 快速开始](#🚀-快速开始)
  - [1. 克隆仓库](#1-克隆仓库)
  - [2. 安装依赖](#2-安装依赖)
  - [3. 配置环境变量](#3-配置环境变量)
  - [4. 运行开发服务器](#4-运行开发服务器)
  - [5. 构建生产版本](#5-构建生产版本)
- [📦 部署](#📦-部署)
  - [Vercel 一键部署](#vercel-一键部署)
- [📋 API 端点](#📋-api-端点)
  - [用户相关](#用户相关)
  - [管理员相关](#管理员相关)
  - [API 路由](#api-路由)
- [📁 项目结构](#📁-项目结构)
- [📖 使用说明](#📖-使用说明)
  - [📤 上传兑换码](#📤-上传兑换码)
  - [🎯 领取兑换码](#🎯-领取兑换码)
- [🛠️ 开发指南](#🛠️-开发指南)
  - [开发命令](#开发命令)
  - [开发流程](#开发流程)
- [🤝 贡献指南](#🤝-贡献指南)
  - [提交规范](#提交规范)
- [📄 许可证](#📄-许可证)
- [🙏 致谢](#🙏-致谢)

---

## ✨ 核心功能

### 🧑‍💻 用户功能

| 功能 | 描述 |
|------|------|
| ✅ **简单易用** | 输入明文即可获取对应兑换码 |
| ✅ **自动标记** | 兑换码领取后自动标记为已使用 |
| ✅ **友好提示** | 清晰的错误信息（明文不存在、兑换码已被领取等） |
| ✅ **响应式设计** | 完美适配各种设备尺寸 |
| ✅ **快速响应** | 边缘部署，全球低延迟访问 |

### 👨‍💼 管理员功能

| 功能 | 描述 |
|------|------|
| ✅ **CSV 批量上传** | 支持大量兑换码快速导入 |
| ✅ **实时统计** | 总数量、已使用数量、剩余数量、使用率一目了然 |
| ✅ **安全访问** | API 密钥保护，确保管理员功能安全 |
| ✅ **直观仪表盘** | 可视化数据展示，便于管理决策 |

### 🔒 安全性保障

| 功能 | 描述 |
|------|------|
| ✅ **API 密钥认证** | 保护敏感操作 |
| ✅ **请求频率限制** | 防止恶意请求 |
| ✅ **输入验证清理** | 防止注入攻击 |
| ✅ **原子操作** | 确保兑换码领取的唯一性 |
| ✅ **环境变量管理** | 敏感信息安全存储 |

---

## 🛠️ 技术栈

<div align="center">
  <table style="border-collapse: collapse; width: 80%; margin: 20px 0;">
    <thead>
      <tr style="background-color: #f3f4f6;">
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;"><strong>类别</strong></th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;"><strong>技术栈</strong></th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;"><strong>版本</strong></th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px;"><strong>框架</strong></td>
        <td style="padding: 12px;">Next.js</td>
        <td style="padding: 12px;">14.2.15</td>
      </tr>
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px;"><strong>语言</strong></td>
        <td style="padding: 12px;">TypeScript</td>
        <td style="padding: 12px;">5.6.3</td>
      </tr>
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px;"><strong>样式</strong></td>
        <td style="padding: 12px;">Tailwind CSS</td>
        <td style="padding: 12px;">3.4.14</td>
      </tr>
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px;"><strong>存储</strong></td>
        <td style="padding: 12px;">Vercel KV</td>
        <td style="padding: 12px;">-</td>
      </tr>
      <tr>
        <td style="padding: 12px;"><strong>部署</strong></td>
        <td style="padding: 12px;">Vercel</td>
        <td style="padding: 12px;">-</td>
      </tr>
    </tbody>
  </table>
</div>

---

## 🚀 快速开始

### 1. 克隆仓库

```bash
git clone <repository-url>
cd redeem_code
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

创建 `.env.local` 文件，添加以下环境变量：

```env
# Vercel KV Configuration
KV_REST_API_URL=your_kv_rest_api_url
KV_REST_API_TOKEN=your_kv_rest_api_token

# Admin API Key (用于保护管理员API)
ADMIN_API_KEY=your_secure_admin_api_key
```

> 💡 **提示**：您可以从 Vercel KV 控制台获取 `KV_REST_API_URL` 和 `KV_REST_API_TOKEN`

### 4. 运行开发服务器

```bash
npm run dev
```

访问 `http://localhost:3000` 查看应用

### 5. 构建生产版本

```bash
npm run build
```

---

## 📦 部署

### Vercel 一键部署

<div align="center">
  <a href="https://vercel.com/new/clone?repository-url=https://github.com/your-username/redeem_code&env=KV_REST_API_URL,KV_REST_API_TOKEN,ADMIN_API_KEY&envDescription=从Vercel KV控制台获取KV相关环境变量&envLink=https://vercel.com/docs/storage/vercel-kv/quickstart" target="_blank">
    <img src="https://vercel.com/button" alt="Deploy with Vercel" />
  </a>
</div>

### 手动部署步骤

1. **准备工作**：将代码推送到 GitHub 仓库
2. **创建项目**：在 Vercel 上创建新项目，连接 GitHub 仓库
3. **配置环境变量**：添加 `KV_REST_API_URL`、`KV_REST_API_TOKEN`、`ADMIN_API_KEY`
4. **一键部署**：点击部署按钮，等待部署完成
5. **访问应用**：部署成功后，Vercel 会提供访问 URL

---

## 📋 API 端点

### 用户相关

| 方法 | 路径       | 功能               |
|------|------------|--------------------|
| GET  | `/`        | 用户兑换页面       |

### 管理员相关

| 方法 | 路径                 | 功能               |
|------|----------------------|--------------------|
| GET  | `/admin/dashboard`   | 统计仪表盘         |
| GET  | `/admin/upload`      | 文件上传页面       |

### API 路由

| 方法 | 路径                 | 功能               |
|------|----------------------|--------------------|
| POST | `/api/redeem`        | 领取兑换码         |
| POST | `/api/upload`        | 上传兑换码文件     |
| GET  | `/api/stats`         | 获取统计信息       |

---

## 📁 项目结构

```
├── app/                     # 应用目录
│   ├── api/                 # API 路由
│   │   ├── redeem/          # 兑换码领取逻辑
│   │   ├── stats/           # 统计信息获取
│   │   └── upload/          # 文件上传处理
│   ├── admin/               # 管理员页面
│   │   ├── dashboard/       # 统计仪表盘
│   │   └── upload/          # 文件上传界面
│   ├── components/          # 共享组件
│   ├── lib/                 # 工具函数
│   │   └── kv.ts            # KV 存储配置
│   ├── globals.css          # 全局样式
│   ├── layout.tsx           # 根布局
│   └── page.tsx             # 用户兑换页面
├── public/                  # 静态资源
├── .env.example             # 环境变量示例
├── next.config.js           # Next.js 配置
├── package.json             # 项目依赖
├── tailwind.config.js       # Tailwind CSS 配置
└── tsconfig.json            # TypeScript 配置
```

---

## 📖 使用说明

### 📤 上传兑换码

1. **准备 CSV 文件**，格式如下（第一列为明文，第二列为兑换码）：
   ```csv
   plaintext,code
   user1,CODE123456
   user2,CODE789012
   user3,CODE345678
   ```

2. **访问上传页面**：`/admin/upload`
3. **输入 API 密钥**：确保只有授权管理员可以访问
4. **选择并上传文件**：支持拖放或点击选择文件
5. **查看上传结果**：上传成功后会显示上传数量

> 📝 **注意**：CSV 文件大小不应超过 10MB，且每行格式必须正确

### 🎯 领取兑换码

1. **访问兑换页面**：应用首页
2. **输入明文**：在输入框中填写您的明文
3. **点击兑换按钮**：点击 "获取兑换码" 按钮
4. **查看结果**：
   - 成功：显示对应的兑换码
   - 失败：显示具体的错误信息

> ⚠️ **警告**：每个明文只能领取一次兑换码，领取后将无法再次领取

---

## 🛠️ 开发指南

### 开发命令

| 命令               | 功能                   |
|--------------------|------------------------|
| `npm run dev`      | 启动开发服务器         |
| `npm run build`    | 构建生产版本           |
| `npm run start`    | 启动生产服务器         |
| `npm run lint`     | 运行代码检查           |

### 开发流程

1. **功能开发**：在对应目录下编写代码
2. **本地测试**：运行 `npm run dev` 测试功能
3. **代码检查**：运行 `npm run lint` 确保代码质量
4. **构建测试**：运行 `npm run build` 确保生产版本正常
5. **提交代码**：将代码推送到 GitHub 仓库
6. **自动部署**：Vercel 会自动部署最新代码

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 提交规范

- **Issue**：清晰描述问题或建议，包括重现步骤和预期行为
- **Pull Request**：
  - 遵循现有代码风格
  - 提供详细的变更说明
  - 确保所有测试通过
  - 提交前运行 `npm run lint` 和 `npm run build`
  - 关联相关 Issue（如果有）

---

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

---

## 🙏 致谢

感谢以下开源技术的支持：

- [Next.js](https://nextjs.org/) - 现代化的 React 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv) - 高性能的键值存储
- [Vercel](https://vercel.com/) - 强大的部署平台

---

<div align="center">
  <p>✨ 感谢使用兑换码系统！如果觉得不错，欢迎给个 Star ⭐</p>
  <p style="color: #6b7280; font-size: 0.9rem; margin-top: 20px;">
    Made with ❤️ using Next.js, TypeScript, and Tailwind CSS
