const path = require('path')
import { loadEnv } from 'vite'
const CWD: string = process.cwd()

module.exports = (mode: string) => {
  // console.log('mode=>', mode)
  const envConfig = loadEnv(mode, CWD)
  console.log('envConfig=>', envConfig)

  return {
    root: path.resolve(__dirname),
    base: './', //生产过程中的基本公共路径 默认 '/'
    alias: {
      // 路径映射必须以/开头和结尾
      '/@/': path.resolve(__dirname, 'src')
    },
    // assetsDir: 'vite-vue-template/assets', // 资源文件夹
    // proxy: {
    //   '/api': {
    //     target: 'http://jsonplaceholder.typicode.com',
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, '')
    //   }
    // },
    plugins: [],
    cssPreprocessOptions: {
      scss: {
        // additionalData: `@import "src/index.scss";`
      }
    },
    optimizeDeps: {
      link: [],
      include: [],
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
      entryFileNames: '[name]-[hash].js',
      chunkFileNames: '[name]-[hash].js',
      assetFileNames: '[name]-[hash].[ext]',
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
}
