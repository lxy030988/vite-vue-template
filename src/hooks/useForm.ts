import { Form } from 'ant-design-vue'
import { Props } from 'ant-design-vue/lib/form/useForm'
import { Ref } from 'vue'

export type FormRefType = ReturnType<typeof Form.useForm>

export function useForm(
  modelRef: Props | Ref<Props>,
  rulesRef?: Props | Ref<Props> | undefined
) {
  const { resetFields, validate } = Form.useForm(modelRef, rulesRef)

  return { resetFields, validate }
}
