import type { AxiosRequestConfig } from "axios"
import BaseApi from "./base/BaseApi"
import service from "./services/columns"

const SERVICE_NAME = "column"
type TQuery = Column & AxiosRequestConfig<Column>

export default {
  queries: BaseApi.BaseQueryApi<TQuery>(SERVICE_NAME, service),
  mutations: BaseApi.BaseMutationApi<"Column">(SERVICE_NAME, service)
}
