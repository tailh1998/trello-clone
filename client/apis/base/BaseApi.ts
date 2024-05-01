import type { AxiosRequestConfig } from "axios"

import BaseService from "./BaseService"
import type {
  TDynamicKeyMutateApi,
  TMutateApi,
  TQueryApi,
  TUpdatePayload,
  TUseMutationOptions,
  TUseQueryOptions
} from "./type"

// z: https://stackoverflow.com/questions/68092396/dynamically-create-objects-in-typescript-using-dynamic-keys-without-widening-ty
const BaseQueryApi = <T extends AxiosRequestConfig<T>>(
  name: string,
  service: BaseService
): TQueryApi<T> => {
  const customName = capitalizeFirstLetter(name)

  return {
    [`get${customName}s`]: (payload, option: TUseQueryOptions) =>
      useQuery<T>({
        queryKey: [`${name}s`],
        queryFn: () => service.getList<AxiosRequestConfig<T[]>>(payload),
        ...option
      }),
    [`get${customName}ById`]: (id: string, option: TUseQueryOptions) =>
      useQuery<T>({
        queryKey: [name, id],
        queryFn: () => service.getById<AxiosRequestConfig<T>>(id),
        ...option
      })
  }
}

const BaseMutationApi = <T extends string>(name: string, service: BaseService): TMutateApi<T> => {
  const customName = capitalizeFirstLetter(name)

  return {
    [`add${customName}`]: (option?: TUseMutationOptions, serviceConfig?: AxiosRequestConfig) =>
      useMutation({
        mutationFn: (payload: any) => service.insert(payload, serviceConfig),
        ...option
      }),
    [`update${customName}ById`]: (
      option?: TUseMutationOptions,
      serviceConfig?: AxiosRequestConfig
    ) =>
      useMutation({
        mutationFn: (payload: TUpdatePayload) =>
          service.updateById(payload.id, payload.body, serviceConfig),
        ...option
      }),
    [`delete${customName}`]: (option?: TUseMutationOptions, serviceConfig?: AxiosRequestConfig) =>
      useMutation({
        mutationFn: (id: string) => service.deleteOne(id, serviceConfig),
        ...option
      }),
    [`deleteRange${customName}`]: (
      option?: TUseMutationOptions,
      serviceConfig?: AxiosRequestConfig
    ) =>
      useMutation({
        mutationFn: (ids: string[]) => service.deleteMany(ids, serviceConfig),
        ...option
      })
  } as Record<TDynamicKeyMutateApi<T>, (option?: TUseMutationOptions | undefined) => any>
}

export default {
  BaseQueryApi,
  BaseMutationApi
}
