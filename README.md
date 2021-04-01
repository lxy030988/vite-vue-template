# vite-vue-template
vite2+vue3+antd后台管理系统模板

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