import { AxiosError, type AxiosRequestConfig } from "axios"
import type { NuxtError } from "nuxt/app"

class BaseService {
  endpoint: string
  showError: (option: ToastOption) => void

  constructor(endpoint: string) {
    this.endpoint = endpoint
    this.showError = (option) => {
      option.type = "error"
      useToastStore().open(option)
    }
  }

  getList = async <T extends AxiosRequestConfig<any>>(
    payload?: T,
    config: AxiosRequestConfig<T> = {}
  ) => {
    try {
      const { data } = await useApi<T>(config).get(`${this.endpoint}`, payload)

      return data.metadata
    } catch (error) {
      showError(error as NuxtError)
    }
  }

  getById = async <T extends AxiosRequestConfig<any>>(
    id: string,
    config: AxiosRequestConfig<T> = {}
  ) => {
    try {
      const { data } = await useApi<T>(config).get(`${this.endpoint}/${id}`)

      return data.metadata
    } catch (error) {
      showError(error as NuxtError)
    }
  }

  insert = async <T>(payload?: T, config: AxiosRequestConfig<T> = {}) => {
    try {
      const { data } = await useApi<T>(config).post(`${this.endpoint}`, payload)

      return data.metadata
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

  updateById = async <T>(id: string, payload?: T, config: AxiosRequestConfig<T> = {}) => {
    try {
      const { data } = await useApi<T>(config).put(`${this.endpoint}/${id}`, payload)

      return data.metadata
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

  deleteOne = async <T>(id: string, config: AxiosRequestConfig<T> = {}) => {
    try {
      const { data } = await useApi<T>(config).delete(`${this.endpoint}/${id}`)

      return data.metadata
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

  deleteMany = async <T>(payload?: string[], config: AxiosRequestConfig<T> = {}) => {
    try {
      const { data } = await useApi<T>(config).post(`${this.endpoint}/delete-many`, payload)

      return data.metadata
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

export default BaseService
