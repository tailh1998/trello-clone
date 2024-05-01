import { AxiosError, type AxiosRequestConfig } from "axios"
import BaseService from "~/apis/base/BaseService"
const END_POINT = "/board"

class Board extends BaseService {
  moveCardToDiffColumn = async <T>(payload?: T, config: AxiosRequestConfig<T> = {}) => {
    try {
      const { data } = await useApi<T>(config).put(`${this.endpoint}/supports/moving_card`, payload)
      return data
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        this.showError({
          title: error.name,
          text: error.message
        })
      }

      throw error
    }
  }
}

export default new Board(END_POINT)
