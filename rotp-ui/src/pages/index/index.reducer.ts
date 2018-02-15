import { ITestResult } from '../../shared/models/test-result'
import { ActionTypes, ActionTypeDefs } from './index.actions'

export interface IIndexState {
  error: string | null
  loading: boolean
  results: ITestResult[]
}

export const initialState: IIndexState = {
  error: null,
  loading: false,
  results: []
}

export const reducer = (state: IIndexState = initialState, action: ActionTypes): IIndexState => {
  switch (action.type) {
    case ActionTypeDefs.REQUEST_RESULTS:
      return {
        error: null,
        loading: true,
        results: []
      }

    case ActionTypeDefs.REQUEST_RESULTS_FAILED:
      return {
        error: action.payload,
        loading: false,
        results: []
      }

    case ActionTypeDefs.REQUEST_RESULTS_SUCCEEDED:
      return {
        error: null,
        loading: false,
        results: action.payload
      }

    default:
      return state
  }
}
