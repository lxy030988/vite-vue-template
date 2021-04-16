export enum CATEGORY_TYPES {
  ALL,
  REACT,
  VUE,
  NODE
}

export interface Slider {
  url: string
}

export interface Lesson {
  title: string
  video: string
  poster: string
  price: string
  category?: string
}
export interface Lessons {
  hasMore: boolean
  loading: boolean
  offset: number
  limit: number
  list: Lesson[]
}

export interface HomeState {
  name: string
  currentCategory: CATEGORY_TYPES
  sliders: Slider[]
  lessons: Lessons
}

interface Person {
  name: string
  age: number
}

type K1 = keyof Person // "name" | "age"
type K2 = keyof Person[] // "length" | "toString" | "pop" | "push" | "concat" | "join"
type K3 = keyof { [x: string]: Person } // string | number
