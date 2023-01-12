
import axios from 'axios'

//let authCallback: any

const httpClient = axios.create({
  baseURL: '/api',
  timeout: 5000
})

httpClient.interceptors.response.use(function (response: any) {
  return response
}, function (error: any) {
  if (error.response && error.response.status === 401) {
    //sauthCallback()
  } else {
    return Promise.reject(error)
  }
})

export default {
  get: function (path: string, timeout?: number, rawResponse?: boolean) {
    let extraParam = {}
    if (timeout !== undefined) {
      extraParam = { timeout: timeout }
    }
    return httpClient.get(path, extraParam)
      .then(rawResponse ? this._handleResponseRaw : this._handleResponse)
      .catch((error: any) => this._handleError(error))
  },
  post: function (path: string, load?: any, contentType?: string, timeout?: number, onUploadProgress?: any) {
    let extraParams = {}
    // TODO refactor this: maybe pass extraParams directly
    if (contentType || timeout || onUploadProgress) {
      extraParams = {
        headers: contentType ? { 'Content-Type': contentType } : undefined,
        onUploadProgress: onUploadProgress,
        timeout: timeout
      }
    }
    return httpClient.post(path, load, extraParams)
      .then(this._handleResponse)
      .catch((error: any) => this._handleError(error))
  },
  put: function (path: string, load?: any, contentType?: string, timeout?: number) {
    let extraParam = {}
    if (contentType || timeout) {
      extraParam = {
        headers: contentType ? { 'Content-Type': contentType } : undefined,
        timeout: timeout
      }
    }
    return httpClient.put(path, load, extraParam)
      .then(this._handleResponse)
      .catch((error: any) => this._handleError(error))
  },
  delete: function (path: string, load?: any) {
    return httpClient.delete(path, load)
      .then(this._handleResponse)
      .catch((error: any) => this._handleError(error))
  },
  _handleResponse: function (response: any) {
    if (response && response.data) return response.data
    else return undefined
  },
  _handleResponseRaw: function (response: any) {
    return response
  },
  _handleError: function (error: any) {
  },
  getBaseUrl: function (): string {
    return httpClient.defaults.baseURL ? httpClient.defaults.baseURL : ''
  },
  setOnAuthRequiredListener: function (authRequiredCallback: (() => any)) {
    //authCallback = authRequiredCallback
  }
}
