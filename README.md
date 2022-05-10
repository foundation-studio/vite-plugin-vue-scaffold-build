# Scaffold - Vite - vue相关构建插件

# 环境
Node >= 17 & < 18

# 依赖
1. pnpm
2. Vite2.x
3. Vue3.x
6. TypeScript

# 运行
- 克隆代码
```shell
git clone https://github.com/foundation-studio/vite-plugin-vue-scaffold-build
```
- 安装依赖
```shell
pnpm i
```
- 运行  
```shell
pnpm build
```
# 使用
```ts
//* vite.config.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import build from "./src";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), build({
    input: "src/target", //* 如果是buildComponents就需要该参数
    buildComponents: true, //* 构建组件
    buildProject: false //* 构建项目
  },true)] //* 是否开启插件
});
```
# 类型
```ts
import type { PluginOption } from "vite";

interface IOptions {
  input?: string | string[],
  buildComponents?: boolean,
  buildProject?: boolean
}

type TBuild = (rawOptions:IOptions,open:boolean)=> PluginOption;
```