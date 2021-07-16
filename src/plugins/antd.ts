import type { App } from 'vue'

import Antd, {
  Button,
  Modal,
  Table,
  Menu,
  Input,
  Form,
  Card,
  Checkbox,
  Radio,
  Progress,
  Dropdown,
  Select,
  DatePicker
} from 'ant-design-vue'

import 'ant-design-vue/dist/antd.css'

export function setupAntd(app: App<Element>) {
  app.use(Antd)
  // .use(Button)
  // .use(Form)
  // .use(Input)
  // .use(Modal)
  // .use(Table)
  // .use(Menu)
  // .use(Card)
  // .use(Checkbox)
  // .use(Radio)
  // .use(Progress)
  // .use(Dropdown)
  // .use(Select)
  // .use(DatePicker)
}
