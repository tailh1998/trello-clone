import type { AxiosRequestConfig } from "axios"
import BaseApi from "./base/BaseApi"
import service from "./services/cards"

const SERVICE_NAME = "card"

type TQuery = Card & AxiosRequestConfig<Card>

export default {
  queries: BaseApi.BaseQueryApi<TQuery>(SERVICE_NAME, service),
  mutations: BaseApi.BaseMutationApi<"Card">(SERVICE_NAME, service)
}
