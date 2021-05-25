// {
//     "user/isLogin":number
// }
/**
 * 1.取到每一个 namespace 中的核心的getters
 * 2.user/isLogin
 * 3.user.isLogin的returnType取出来
 */
import { modules } from './modules'

//获取modules中全部getters    ALLGetters
type GetGetter<M> = M extends { getters: infer T } ? T : unknown
type GetGetters<MS> = {
  [K in keyof MS]: GetGetter<MS[K]>
}
type ALLGetters = GetGetters<typeof modules>

//user/isLoading    user下面全部的key
type Addprefix<N, K> = `${N & string}/${K & string}` //N 模块名user  K getters里的key isLoading
type GetSpliceKey<N, NM> = Addprefix<N, keyof NM> //NMS 模块里的getters
type GetSpliceKeys<NMS> = {
  [N in keyof NMS]: GetSpliceKey<N, NMS[N]>
}[keyof NMS]

// type xx = GetSpliceKeys<ALLGetters>

type GetFun<T, A, B> = T[A & keyof T][B & keyof T[A & keyof T]]
// type GetSpliceObj = {
//   [K in xx]: K extends `${infer A}/${infer B}` ? GetFun<ALLGetters, A, B> : unknown
// }
type GetSpliceObj<T> = {
  [K in GetSpliceKeys<T>]: K extends `${infer A}/${infer B}` ? GetFun<T, A, B> : unknown
}

type ModuleGeters = GetSpliceObj<ALLGetters>
type Getters = {
  [K in keyof ModuleGeters]: ReturnType<ModuleGeters[K]>
}

export { Getters }

//增强Commit type 类型
type GetMutation<M> = M extends { mutations: infer T } ? T : unknown
type GetMutations<MS> = {
  [K in keyof MS]: GetMutation<MS[K]>
}
type ALLMutations = GetMutations<typeof modules>
type CommitTypes = keyof GetSpliceObj<ALLMutations>
export { CommitTypes }

//增强Dispatch type 类型
type GetAction<M> = M extends { actions: infer T } ? T : unknown
type GetActions<MS> = {
  [K in keyof MS]: GetAction<MS[K]>
}
type ALLActions = GetActions<typeof modules>
type DispatchTypes = keyof GetSpliceObj<ALLActions>
export { DispatchTypes }
