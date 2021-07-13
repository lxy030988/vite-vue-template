import { defineComponent, reactive } from 'vue'
export default defineComponent({
  name: "MenuItem",
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  setup(prop) {
    return () => (
      <>
        {prop.icon ? <svg-icon name={prop.icon} /> : ''}
        <span>{prop.title}</span>
      </>
    )
  }
})
