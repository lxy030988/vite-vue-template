declare module '*.vue' {
  import type { DefineComponent, FunctionalComponent } from 'vue'
  const component: DefineComponent | FunctionalComponent
  // const component: DefineComponent<{}, {}, any> | FunctionalComponent
  export default component
}

// declare module '*.scss' {
//   const classes: {
//     [key: string]: string
//   }
//   export default classes
// }
