const path = require('path')
// import { loadEnv } from 'vite'

module.exports = {
  root: path.resolve(__dirname),
  base: './', //生产过程中的基本公共路径 默认 '/'
  alias: {
    // 路径映射必须以/开头和结尾
    '/@/': path.resolve(__dirname, 'src')
  },
  // proxy: {
  //   '/api': {
  //     target: 'http://jsonplaceholder.typicode.com',
  //     changeOrigin: true,
  //     rewrite: path => path.replace(/^\/api/, '')
  //   }
  // },
  plugins: [],
  cssPreprocessOptions: {
    scss: {}
  },
  optimizeDeps: {
    link: [],
    include: [
      'qs',
      'echarts/map/js/china',
      'ant-design-vue/es/locale/zh_CN',
      'ant-design-vue/es/locale/en_US',
      '@ant-design/icons-vue'
    ],
    allowNodeBuiltins: [],
    exclude: []
  },
  terserOptions: {
    compress: {
      keep_infinity: true
    }
  },
  rollupOutputOptions: {
    preserveEntrySignatures: 'strict',
    // entryFileNames: '[name].js',
    // chunkFileNames: '[name].js',
    // assetFileNames: '[name].[ext]',
    manualChunks(id) {
      if (id.includes('/node_modules/')) {
        const expansions = []
        if (expansions.some(exp => id.includes(`/node_modules/${exp}`))) {
          return 'expansion'
        } else {
          return 'vendor'
        }
      }
    }
  },
  shouldPreload() {
    return true
  }
}
