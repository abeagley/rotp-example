import { AxiosPromise } from 'axios'
import { BaseApi } from '../../shared/api/base'
import { ITestResult } from '../../shared/models/test-result'

export class IndexService extends BaseApi {
  getTestResults = (fileContents: string): AxiosPromise<ITestResult[]> => {
    return this.api.post('/rotp-go', {
      testContents: fileContents
    })
  }
}

export default new IndexService()
