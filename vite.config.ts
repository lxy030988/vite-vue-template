const path = require('path')
import { loadEnv, Resolver } from 'vite'
import { configManualChunk } from './build/optimizer'
import { createRollupPlugin, createVitePlugins } from './build/plugin'
import globTransform from './build/plugin/transform/globby'
import { wrapperEnv } from './build/utils'
const CWD: string = process.cwd()
const pkg = require('./package.json')

const alias: Record<string, string> = {
  // 路径映射必须以/开头和结尾
  '/@/': path.resolve(__dirname, 'src')
}
const resolvers: Resolver[] = []

module.exports = (mode: string) => {
  const env = loadEnv(mode, CWD)
  const viteEnv = wrapperEnv(env)
  console.log('viteEnv=>', viteEnv)
  const { VITE_DROP_CONSOLE } = viteEnv

  return {
    root: path.resolve(__dirname),
    base: './', //生产过程中的基本公共路径 默认 '/'
    alias,
    // assetsDir: 'vite-vue-template/assets', // 资源文件夹
    // proxy: {
    //   '/api': {
    //     target: 'http://jsonplaceholder.typicode.com',
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, '')
    //   }
    // },
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
      __VERSION__: pkg.version
    },
    transforms: [
      globTransform({
        resolvers: resolvers,
        root: CWD,
        alias: alias,
        includes: [path.resolve('src/router')]
      })
    ],
    plugins: createVitePlugins(viteEnv, mode as any),
    rollupInputOptions: {
      plugins: createRollupPlugin()
    },
    rollupOutputOptions: {
      compact: true,
      manualChunks: configManualChunk
    },
    shouldPreload() {
      return true
    }
  }
}
