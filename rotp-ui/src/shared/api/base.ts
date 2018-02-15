import axios, { AxiosInstance } from 'axios'

// This would be a bit more integrated usually, but for examples sake - here it is.
const baseURL = 'https://*Your Id*.execute-api.us-west-2.amazonaws.com/dev'

export class BaseApi {
  protected api: AxiosInstance

  constructor () {
    // Configure axios
    this.api = axios.create({
      baseURL,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
  }
}
