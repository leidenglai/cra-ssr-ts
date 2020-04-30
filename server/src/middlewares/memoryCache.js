import LRU from 'lru-cache'

const options = {
  max: 200 * 1024, // 200M 缓存大小
  maxAge: 60 * 60 * 1000, // 默认缓存1h
  length(n) {
    // length 返回 kb单位
    return (n.length * 2) / 1024
  }
}

const cache = new LRU(options)

/**
 * 对页面进行内存缓存
 */
export default function memoryCache(option) {
  return async function (ctx, next) {
    // 缓存条件 平台+语言+url
    const { i18n, originalUrl, url } = ctx

    const key = '__lru__' + i18n.locale + '__url__' + (originalUrl || url)
    const cachedBody = cache.get(key)

    if (cachedBody) {
      // 返回缓存body数据
      console.log('命中页面缓存：', key)

      return (ctx.body = cachedBody)
    } else {
      await next()

      if (ctx.type === 'text/html') {
        // 缓存html
        option.some(p => {
          // 渲染失败的不缓存
          if (p.path.test(ctx.path) && ctx.renderStatus !== 0) {
            cache.set(key, ctx.body, p.duration * 1000)

            return true
          }

          return false
        })
      }
    }
  }
}
