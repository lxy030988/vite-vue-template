import vue from '@vitejs/plugin-vue'
const path = require('path')
import { loadEnv } from 'vite'
import { createRollupPlugin } from './build/plugin'
import { wrapperEnv } from './build/utils'
const CWD: string = process.cwd()
const pkg = require('./package.json')
import viteSvgIcons from 'vite-plugin-svg-icons'

// import vm from './plugins/test-vite-plugin'
// import i18n from './plugins/vite-plugin-i18n'

const alias: Record<string, string> = {
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
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";@import "@/styles/variables2.scss";`
        }
      }
    },
    optimizeDeps: {
      include: ['ant-design-vue/es/locale/zh_CN', '@ant-design/icons-vue'],
      exclude: []
    },
    define: {
      __VERSION__: JSON.stringify(pkg.version)
    },
    plugins: [
      vue(),
      viteSvgIcons({
        iconDirs: [path.resolve(CWD, 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      })
    ], //, vm(), i18n
    build: {
      target: 'es2015',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE
        }
      },
      brotliSize: false,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        plugins: createRollupPlugin()
      }
    }
  }
}
