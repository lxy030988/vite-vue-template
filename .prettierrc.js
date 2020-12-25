module.exports = {
  eslintIntegration: true, //启用eslint相同规则
  printWidth: 100, //指定每行代码的行数，超出则换行
  singleQuote: true, //单引号
  jsxBracketSameLine: true, //将多行JSX元素的 > 放在最后一行的末尾，而不是单独放在下一行
  endOfLine: 'auto',
  semi: false, //设置语句末尾不加分号
  trailingComma: 'none', //是否使用尾逗号，有三个可选值"<none|es5|all>"
  htmlWhitespaceSensitivity: 'ignore' //指定HTML文件的全局空白区域敏感度。 'css' - 尊重CSS显示属性的默认值。 'strict' - 空格被认为是敏感的。 'ignore' - 空格被认为是不敏感的
}
