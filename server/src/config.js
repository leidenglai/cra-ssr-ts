export const NODE_PORT = 8000

// secret key
export const APP_SECRET = 'this is a secret'

/**
 * 缓存的页面配置
 * @property path 路径正则
 * @property duration 缓存时间 单位 s
 */
export const PAGE_MEMORY_CACHE = [
  {
    // 首页
    path: /^\/$/,
    duration: 60
  },
  {
    // 列表和搜索结果
    path: /^\/market$/,
    duration: 4
  },
  {
    // 服务详情
    path: /^\/detail\//,
    duration: 10
  }
]
