# vite-vue-template
 vite2 + vue3 + element-plus 后台管理系统模板

## 基础

### vue3基础

- https://v3.cn.vuejs.org/

```js
import { defineComponent, inject, provide, onMounted, PropType, reactive, Ref, ref, toRefs, watch, watchEffect } from 'vue'

setup(props,ctx) {}
```

### element-plus

- https://element-plus.gitee.io/zh-CN/


### vue3.2

- script setup + TS + Volar 
- vscode禁用 Vetur，下载Volar
- define 编译器宏  不需要引入，直接使用 。defineProps  defineEmits  defineExpose
- 示例 src/components/testSetup.vue

- 需要更新这几个包 

```json
"vue": "^3.2.3",
"vue-router": "^4.0.11",

"@vitejs/plugin-vue": "^1.4.0",
"@vitejs/plugin-vue-jsx": "^1.1.7",
"@vue/compiler-sfc": "^3.2.3",
```



### 文件引入

- @ = src目录

- 相对路径   ./assets/logo.png

- 绝对路径   @/assets/logo.png

- 在script中引入静态文件

  ```html
  <img :src="logo" alt="" />
  
  <script setup lang="ts">
  import logo from '@/assets/logo.png'
  </script>
  ```

  

### http数据请求

- 例子 src/api/user/index.ts



### mock数据

- 在mock文件夹 添加json文件
- 例子：src/api/mock/test.ts



### css深度选择器

```scss
::v-deep(.deep-test) {
  color: red;
  .c1 {
    color: wheat;
  }
}
```



### css变量

```css
:root {
  --color: rgb(0, 38, 255);
}

.plan {
  color: var(--color);
}
```



### scss变量全局使用

- src/styles/variables.scss 在此文件里定义变量
- 如果新建文件定义变量  需要在vite.config.ts配置additionalData引入该文件

```js
css: {
    preprocessorOptions: {
        scss: {
            additionalData: `@import "@/styles/variables.scss";@import "@/styles/variables2.scss";`
        }
    }
}
```



### module.css

```html
<div :class="$style.a">
    <span :class="$style.b">aaaaa</span>
</div>
<style lang="scss" scoped module>
//$style.a
.a {
  display: flex;
  box-shadow: 0px 0px 3px #121212 inset;
  background: rebeccapurple;
  .b {
    font-size: 28px;
  }
}
</style>
```



### SVG图标使用

```html
svg文件存放路径为 src/assets/icons
svg-icon组件 name字段： 文件夹名称+文件名称（没有文件夹则省略）

用例1
src/assets/icons/test2/dynamic-avatar-2.svg
<svg-icon name="test2-dynamic-avatar-2"></svg-icon>

用例2
src/assets/icons/dynamic-avatar-2.svg
<svg-icon name="dynamic-avatar-2"></svg-icon>

```



### VueEcharts使用

```vue
<template>
    <div class="echarts">
      <vue-echarts :options="options"></vue-echarts>
    </div>
    <div>
      <el-button type="primary" @click="changeSeriesData">改变echarts数据</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import VueEcharts, { OptionType } from '@/components/echarts'

export default defineComponent({
  name: 'useEcharts',
  components: {
    VueEcharts
  },
  setup() {
    const seriesData = ref([120, 200, 150, 80, 70, 110, 130])
    const options = computed((): OptionType => ({
        // tooltip: {},
        color: ['red', '#006cff'],
        // legend: {},
        title: {
          text: '柱状图',
          borderWidth: 1,
          borderType: 'solid'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: seriesData.value,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      })
    )

    function changeSeriesData() {
      seriesData.value = [80, 70, 110, 130, 120, 200, 150]
    }
    
    return { options, changeSeriesData }
  }
})
</script>
<style lang="scss" scoped>
.echarts {
  width: 300px;
  height: 200px;
}
</style>

```



### vue3的vetur

- Volar（vscode插件）



### quicktype根据json生成ts interface

- https://app.quicktype.io/



### vscode设置

```json
//vscode Vue格式化HTML标签换行问题
"vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
        "wrap_attributes": "force-expand-multiline" //auto
    }
}

```




---------------------------------------------------------

## 提升



### 插槽Slot样式传递

```scss
::v-slotted(.slot-class) {
    background-color: #000;
}
```



### 组件内注册全局样式

```scss
::v-global(.my-class) {
    background-color: #000;
}
```



### 环境变量

- 客服端使用

```js
import.meta.env.VITE_BASE_URL
```



### typescript版本

```json
"typescript": "^4.1.5",
```



### eslint

```json
"build": "vue-tsc --noEmit && vite build"
"vue-tsc":"https://www.npmjs.com/package/vue-tsc "
Vue 3 command line Type-Checking tool base on IDE plugin Volar
```



```json
"lint": "eslint --fix /"src/**/*([^d]|[^.]d).{ts,vue}/""
"lint": "eslint --ext .ts,.vue src/** --error-on-unmatched-pattern"   --quiet(不报警告)
"lint:fix": "eslint --ext .ts,.vue src/** --error-on-unmatched-pattern --fix"
```



*这段配置目前有点问题*

Insert `··`eslint[prettier/prettier](https://github.com/prettier/eslint-plugin-prettier#options)

```json
"@typescript-eslint/eslint-plugin": "^4.15.2",
"@typescript-eslint/parser": "^4.15.2",
"@vue/eslint-config-prettier": "^6.0.0",
"@vue/eslint-config-typescript": "^7.0.0",
"@vuedx/typescript-plugin-vue": "^0.6.3",
"eslint": "^7.20.0",
"eslint-plugin-prettier": "^3.3.1",
"eslint-plugin-vue": "^7.6.0",
"prettier": "^2.2.1",
```

```js
extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
],
```



### jest

```json
"test:unit":"jest"

"jest":"^26.6.3"
"@types/jest":"^26.0.20"
"vue-jest":"^5.0.0-alpha.7"
"babel-jest":"^26.6.3"
"@babel/preset-env": "^7.12.17"
"@vue/test-utils": "^2.0.0-beta.9"
"@babel/preset-typescript": "^7.12.17"
"ts-jest":"^26.5.1"
```

```js
jest.config.js

module.exports = {
  transform: {
    "^.+//.vue$": "vue-jest",
    "^.+//js$": "babel-jest",
    "^.+//ts$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/components(.*)$": "<rootDir>/src/components$1",
  },
  testMatch:["**/tests/unit/**/*.[jt]s?(x)"]
};

```



### git commit eslint
- eslint lint -- --fix 修正分号

```json
"gitHooks": {
  "pre-commit": "lint-staged",
  "pre-push": "npm run test:unit"
},
"lint-staged": {
  "*.{js,vue}": "eslint --fix"
},
```

- 正常情况下安装 yorkie 后会自动安装提交钩子
- 如果提交钩子未生效可以手动运行 node node_modules/yorkie/bin/install.js 来安装。
- 当然，你也可以运行 node node_modules/yorkie/bin/uninstall.js 来卸载提交钩子。



### commitizen git提交规范

- npm install -g commitizen
- commitizen init cz-conventional-changelog --save-dev --save-exact
- git commit => git cz


```json
"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog"
  }
}
```

- 参考
  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中



## 实验

### css使用js变量

```vue
<div class="plan3">plan</div>
<el-button type="primary" @click="test">测试</el-button>

<script lang="ts">
export default defineComponent({
  name: 'Plan',
  setup() {
    const color = ref('red')
    const font = reactive({ size: '30px' })

    function test() {
      console.log('test')
      color.value = 'green'
      font.size = '18px'
    }
    return { color, font, test }
  }
})
</script>

<style lang="scss" scoped>
.plan3 {
  color: v-bind(color);
  font-size: v-bind('font.size');
}
</style>
```



### Suspense



### script setup (eslint支持不友好)

```js
import { defineProps, getCurrentInstance, useContext } from 'vue'
const { expose } = useContext()


//ref sugar 语法糖
ref :num = 100  //==>  const num = ref(100)
onMounted:{
  console.log('onMounted',num) 
}
```

