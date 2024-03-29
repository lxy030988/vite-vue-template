import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const path = require('path')
import { loadEnv, defineConfig } from 'vite'
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

module.exports = ({ mode }: any) => {
  // console.log('mode', mode)
  const env = loadEnv(mode, CWD)
  const viteEnv = wrapperEnv(env)
  console.log('viteEnv=>', viteEnv)
  const { VITE_DROP_CONSOLE } = viteEnv

  return defineConfig({
    root: path.resolve(__dirname),
    base: '/', //生产过程中的基本公共路径 默认 '/'
    resolve: {
      alias
    },
    server: {
      host: '0.0.0.0',
      port: 3333,
      proxy: {
        '/api/': {
          target: 'http://192.168.2.121:8099/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api\//, '')
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";@import "@/styles/variables2.scss";`
        }
      }
    },
    optimizeDeps: {
      include: ['element-plus/lib/locale/lang/zh-cn'],
      exclude: []
    },
    define: {
      __VERSION__: JSON.stringify(pkg.version)
    },
    plugins: [
      vue(),
      vueJsx(),
      viteSvgIcons({
        iconDirs: [path.resolve(CWD, 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      })
    ], //, vm(), i18n
    build: {
      target: 'es2015',
      // polyfillDynamicImport: true,
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
  })
}
