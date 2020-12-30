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
  currentCategory: CATEGORY_TYPES
  sliders: Slider[]
  lessons: Lessons
}
