import vue from '@vitejs/plugin-vue'
const path = require('path')
import { loadEnv } from 'vite'
import { createRollupPlugin } from './build/plugin'
import { wrapperEnv } from './build/utils'
const CWD: string = process.cwd()
const pkg = require('./package.json')

const alias: Record<string, string> = {
  // 路径映射必须以/开头和结尾
  '@': path.resolve(__dirname, 'src')
  // img: path.resolve(__dirname, 'src/assets')
}

module.exports = ({ mode }) => {
  // console.log('mode', mode)
  const env = loadEnv(mode, CWD)
  const viteEnv = wrapperEnv(env)
  console.log('viteEnv=>', viteEnv)
  const { VITE_DROP_CONSOLE } = viteEnv

  return {
    root: path.resolve(__dirname),
    base: './', //生产过程中的基本公共路径 默认 '/'
    resolve: {
      alias
    },
    server: {
      // proxy: {
      //   '/api': {
      //     target: 'http://jsonplaceholder.typicode.com',
      //     changeOrigin: true,
      //     rewrite: path => path.replace(/^\/api/, '')
      //   }
      // },
    },
    // assetsDir: 'vite-vue-template/assets', // 资源文件夹
    cssPreprocessOptions: {
      scss: {
        // additionalData: `@import "src/index.scss";`
      }
    },
    optimizeDeps: {
      link: [],
      include: ['ant-design-vue/es/locale/zh_CN', '@ant-design/icons-vue'],
      allowNodeBuiltins: [],
      exclude: []
    },
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: VITE_DROP_CONSOLE
      }
    },
    define: {
      __VERSION__: JSON.stringify(pkg.version)
    },
    transforms: [],
    plugins: [vue()],
    rollupInputOptions: {
      plugins: createRollupPlugin()
    },
    rollupOutputOptions: {},
    shouldPreload() {
      return true
    }
  }
}
