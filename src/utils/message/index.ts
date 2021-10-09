import { ElMessage } from 'element-plus'

/**
 * 操作成功 提示
 */
export function success() {
  ElMessage.success('操作成功')
}

/**
 * 成功和失败数量提示
 */
export function NumMessage(successNum = 0, failuerNum = 0) {
  ElMessage.success(`成功：${successNum}条，失败：${failuerNum}条`)
}
export default ElMessage
