import type { AxiosRequestConfig } from "axios"
import type { TUseMutationOptions } from "./base/type"

import BaseApi from "./base/BaseApi"
import service from "./services/boards"

const SERVICE_NAME = "board"

// Extends new Api
const moveCardToDiffColumn = (option?: TUseMutationOptions, serviceConfig?: AxiosRequestConfig) => {
  return useMutation({
    mutationFn: (payload: any) => service.moveCardToDiffColumn(payload, serviceConfig),
    ...option
  })
}
type TQuery = Board & AxiosRequestConfig<Board>
export default {
  queries: BaseApi.BaseQueryApi<TQuery>(SERVICE_NAME, service),
  mutations: {
    ...BaseApi.BaseMutationApi<"Board">(SERVICE_NAME, service),
    moveCardToDiffColumn
  }
}
