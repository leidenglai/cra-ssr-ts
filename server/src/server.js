// 忽略node端 打包文件的styles
import 'ignore-styles'

// Koa2 requirements
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import json from 'koa-json'
import logger from 'koa-logger'
import Router from 'koa-router'
import koaStatic from 'koa-static'
import path from 'path'
import Loadable from 'react-loadable'
import detectLocale from './middlewares/detectLocale'

// Our loader - this basically acts as the entry point for each page load
import loader from './loader'

// Create our Koa app using the port optionally specified
const app = new Koa()
const PORT = process.env.PORT || 3000

console.log(PORT)

app.keys = ['this is a secret']

// Compress, parse, log...
app.use(compress())
app.use(bodyParser())
app.use(logger())
app.use(json())

// 处理返回语言 默认en-US // 缓存条件 之一
app.use(detectLocale('en-US'))

// Set up homepage, static assets, and capture everything else
const router = new Router()

router.get('/', loader)
app.use(router.routes()).use(router.allowedMethods())
// 前端文件存放目录
app.use(koaStatic(path.resolve(process.cwd(), '../build')))
app.use(loader)

// We tell React Loadable to load all required assets and start listening - ROCK AND ROLL!
Loadable.preloadAll()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`)
    })
  })
  .catch((err) => {
    console.log(err)
  })

// Handle the bugs somehow
app.on('error', (error) => {
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
