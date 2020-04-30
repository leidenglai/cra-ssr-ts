# cra-ssr-ts 文档

项目使用的 https://github.com/mnsht/cra-ssr 作为基础，做以下修改：

1. 加入 typescript
2. 使用 customize-cra 自定义 create-react-app 的 webpack 配置
3. 使用 Koa 框架代替 express
4. 加入 server 端构建，原来的应用服务端直接调用源码
5. 加入简单的线上部署方案
6. 加入国际化方案

### nodejs 中间层同构渲染 react 网站应用

### 什么是同构？

「后端渲染」指传统的 Java 或 PHP 的渲染机制，前端一般只负责出 UI 样式界面和少量的 js 交互代码。

「前端渲染」指使用 JS 来渲染页面大部分内容，代表是现在流行的 SPA 单页面应用，后端只用负责出数据接口，前后端几乎全部使用异步数据请求（如 ajax、fetch 等）交互。

「同构渲染」加入一个中间层的概念，node 中间层从后端接过渲染的逻辑，首次渲染时使用 Node.js 来直出 HTML，后续客户端交互包括路由切换直接在客户端完成。一般来说同构渲染是介于前后端中的共有部分。

React+Node 技术栈开发 Web 网站。React 本身提供了一套优雅的实现服务器渲染的方式。使用 React 实现服务器渲染有以下好处
**优点**

- 开发效率高、设计分离。服务器端提供接口，JS 客户端只关注数据获取和展现。只要约定好数据接口，前后端开发人员制约性减弱，职责分明，提高开发效率；
- Node 端和客户端可以共享某些代码，如 路由、类型
- 单页应用的首屏性能问题解决。客户端渲染的一个缺点是，当用户第一次进入站点，此时浏览器中没有缓存，需要下载 js 代码后在本地渲染，时间较长。而同构渲染则是，用户在下载已经渲染好的页面，打开速度比客户端渲染快，同时保留单页面应用的优点。
- 解决单页面应用的 SEO 问题；

**缺点**

- 对前端能力要求更高
- 需要 node 去实现一些后端渲染的优化方案

方案
架构：koa2+react ssr 配合 typescript

渲染框架：Node 的 koa2

页面缓存：lru-cache 或 redis
服务端采用 lru-cache 作为优化缓存要好于 redis，不过 redis 是一种近似于持久化的缓存，而 lru-cache 只能依赖于 node 执行，一旦程序退出即清空。

数据管理：reudx ，React 常用的数据管理方案。单一数据源、单向数据流、函数式编程、对复杂数据管理尤为擅长。

# 项目启动

## 开始

环境：nodejs v10+、 yarn v1.9+

初始化 安装依赖

```sh
yarn install
```

开发模式

```sh
yarn start
```

构建

```sh
yarn build
```

构建 node

```sh
cd server && yarn build
```

## linux node 环境搭建

安装 node LTS version

`yum install nodejs`

安装包管理工具
`npm install yarn -g`

安装进程管理工具
`npm install pm2 -g`

切换到 node 工程目录

```
# 切换到node工程目录 只安装生产环境依赖
yarn install --production
```

使用 pm2 管理 node 服务

```
# 创建服务并启动
pm2 start config/pm2.json

# 重启
pm2 restart config/pm2.json

# 停止
pm2 stop config/pm2.json

# 日志
pm2 log cra-ssr

```

release.sh 是自动化脚本,大致发布流程
