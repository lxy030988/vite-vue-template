# vite-vue-template
vite+vue3+antd后台管理系统模板



### git commit eslint
- eslint lint -- --fix 修正分号

```json
"gitHooks": {
  "pre-commit": "lint-staged",
  "pre-push": "npm run test"
},
"lint-staged": {
  "*.{js,vue}": "eslint"
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