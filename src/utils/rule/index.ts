export const NOT_NULL = [
  { required: true, message: '输入不能为空', trigger: 'blur' }
]

export const SELECT_NOT_NULL = [
  { required: true, message: '选择不能为空', trigger: 'change' }
]

export function getIntegerRule(max?: number, min?: number) {
  const extraRules: any[] = []

  if (max) {
    extraRules.push({ max, message: `整数不大于${max}` })
  }
  if (min) {
    extraRules.push({ min, message: `整数不小于${min}` })
  }

  return [{ type: 'integer', message: '请输入整数' }, ...extraRules]
}
