// 忽略node端 打包文件的styles
import 'ignore-styles'
import 'intl'

// Koa2 requirements
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import json from 'koa-json'
import logger from 'koa-logger'
import Router from 'koa-router'
import Loadable from 'react-loadable'
import fetch from 'node-fetch'
import handleLocale from './middlewares/handleLocale'
import memoryCache from './middlewares/memoryCache'

import { PAGE_MEMORY_CACHE, NODE_PORT, APP_SECRET } from './config'
// Our loader - this basically acts as the entry point for each page load
import loader from './loader'

const mode = process.env.NODE_ENV.trim() // 当前环境

// fixbug: fetch is not defined
if (!global.fetch) {
  global.fetch = fetch
}

// Create our Koa app using the port optionally specified
const app = new Koa()
const PORT = process.env.PORT || NODE_PORT

app.keys = APP_SECRET

// Compress, parse, log...
app.use(compress())
app.use(bodyParser())
app.use(logger())
app.use(json())
// 处理语言
app.use(handleLocale())

// 生产环境开启缓存
if (mode === 'production') {
  app.use(memoryCache(PAGE_MEMORY_CACHE))
}

// Set up homepage, static assets, and capture everything else
const router = new Router()

router.get('/', loader)
app.use(router.routes()).use(router.allowedMethods())
app.use(loader)

// We tell React Loadable to load all required assets and start listening - ROCK AND ROLL!
Loadable.preloadAll()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`)
    })
  })
  .catch(err => {
    console.log(err)
  })

// Handle the bugs somehow
app.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
})
