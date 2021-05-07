# vite-vue-template
vite2+vue3+antd后台管理系统模板

## 基础

### 文件引入

- @ = src目录

- 相对路径   ./assets/logo.png
- 绝对路径   @/assets/logo.png



### scss变量全局使用

- src\styles\variables.scss 在此文件里定义变量
- 如果新建文件定义变量  需要在vite.config.ts配置additionalData引入该文件



### SVG图标使用

```html
svg文件存放路径为 src\assets\icons
svg-icon组件 name字段： 文件夹名称+文件名称（没有文件夹则省略）

用例1
src\assets\icons\test2\dynamic-avatar-2.svg
<svg-icon name="test2-dynamic-avatar-2"></svg-icon>

用例2
src\assets\icons\dynamic-avatar-2.svg
<svg-icon name="dynamic-avatar-2"></svg-icon>

```



### vue3的vetur

- Volar（vscode插件）




---------------------------------------------------------

## 提升

### typescript版本

```json
"typescript": "^4.1.5",
```



### lint

```json
"lint": "eslint --fix \"src/**/*([^d]|[^.]d).{ts,vue}\""
"lint": "eslint --ext .ts,.vue src/** --error-on-unmatched-pattern"   --quiet(不报警告)
"lint:fix": "eslint --ext .ts,.vue src/** --error-on-unmatched-pattern --fix"
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
    "^.+\\.vue$": "vue-jest",
    "^.+\\js$": "babel-jest",
    "^.+\\ts$": "ts-jest",
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



### 环境变量
- 客服端使用
```js
import.meta.env.VITE_BASE_URL
```



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