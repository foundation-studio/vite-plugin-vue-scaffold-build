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
    input: "src/target",
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
# 插件参数
## options 选项
### input：string|string[]，组件所在目录
如果是buildComponents就需要该参数。
组件所在目录，构建时会深度递归扫描该目录，找到.vue文件
如果是字符串数组，就会遍历数组再去深度递归扫描数组内的目录
### buildComponents：boolean，是否构建组件
> 如果`true`就需要把`buildProject`关闭

扫描`input`选项的目录后找出`.vue`文件，然后编译成`.js`文件
### buildProject：boolean，是否是构建项目状态
会按正常流程构建整个项目，但插件会对构建项目一些参数等进行优化。
## open 开启插件
如果是`false`，仅对构建项目过程些许优化  
如不想使用插件，就需要把插件从vite的`plugins`选项中注释掉