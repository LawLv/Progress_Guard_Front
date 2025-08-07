# Progress Guard Front

![项目海报](./poster.png)

**Progress Guard Front** 是一个简洁现代的前端项目，旨在为管理后台提供高效、用户友好的界面体验。

---

## 项目概览

- 简洁明了的前端界面  
- 基于 Vue.js 构建  
- 支持多环境（开发、预发布、生产）配置  
- 与 Mock 数据系统集成，用于接口模拟和界面调试

---

## 快速开始

```bash
npm install
npm run dev            # 启动开发环境
npm run build:stage    # 构建预发布版本
npm run build:prod     # 构建生产版本
```

---

## 项目结构

```
Progress_Guard_Front/
├── public/
├── src/
│   ├── components/
│   ├── views/
│   ├── router/
│   ├── store/
│   └── mock/
├── configs/
├── plop-templates/
├── tests/
├── .env.development
├── .env.staging
├── .env.production
└── package.json
```

---

## 未来改进想法

- 添加更多 UI 组件与可视化功能  
- 完善权限控制系统  
- 支持响应式布局与移动端优化  
- 集成端到端测试工具（如 Cypress）

---

