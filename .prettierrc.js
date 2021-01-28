module.exports = {
  eslintIntegration: true, //启用eslint相同规则
  printWidth: 800, // 每行代码长度（默认80）
  tabWidth: 2, // 每个tab相当于多少个空格（默认2）
  useTabs: false, // 是否使用tab进行缩进（默认false）
  singleQuote: true, // 使用单引号（默认false）
  endOfLine: 'auto',
  semi: false, // 声明结尾使用分号(默认true)
  jsxBracketSameLine: false, // 多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
  trailingComma: 'none', //是否使用尾逗号，有三个可选值"<none|es5|all>"（默认none）
  htmlWhitespaceSensitivity: 'ignore', //指定HTML文件的全局空白区域敏感度。 'css' - 尊重CSS显示属性的默认值。 'strict' - 空格被认为是敏感的。 'ignore' - 空格被认为是不敏感的
  bracketSpacing: true, // 对象字面量的大括号间使用空格（默认true）
  arrowParens: "avoid", // 只有一个参数的箭头函数的参数是否带圆括号（默认avoid）
}
