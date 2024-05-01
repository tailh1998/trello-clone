import type {
  QueryKey,
  DefaultError,
  UseQueryOptions,
  UseQueryReturnType,
  MutationObserverOptions,
  UseMutationReturnType
} from "@tanstack/vue-query"
import type { MaybeRefDeep } from "@tanstack/vue-query/build/legacy/types"

// type for query
export type TUseQueryOptions = UseQueryOptions<any, DefaultError, any, any, QueryKey> & {
  onSuccess?: (data: any) => void
}

export type TQueryApi<T> = Record<
  string,
  (x: any, option: TUseQueryOptions) => UseQueryReturnType<T, Error>
>

// type for mutation
export type TUseMutationOptions = MaybeRefDeep<MutationObserverOptions<any, DefaultError, any, any>>
export type TUseMutationReturnType = UseMutationReturnType<any, DefaultError, any, any, any>

type ValueOf<T> = T[keyof T]

export type TMutationFunc<T extends string> = {
  add: `add${T}`
  updateById: `update${T}ById`
  delete: `delete${T}`
  deleteRange: `deleteRange${T}`
}

export type TDynamicKeyMutateApi<T extends string> = ValueOf<TMutationFunc<T>>

export type TMutateApi<T extends string> = Record<
  TDynamicKeyMutateApi<T>,
  (option?: TUseMutationOptions) => TUseMutationReturnType
>

export type TUpdatePayload = {
  body?: any
  id: string
}
