import { ITestResult } from '../../shared/models/test-result'

export enum ActionTypeDefs {
  REQUEST_RESULTS = '[Index] Request Results',
  REQUEST_RESULTS_FAILED = '[Index] Request Results Failed',
  REQUEST_RESULTS_SUCCEEDED = '[Index] Request Results Succeeded'
}

export interface IRequestResultsAction {
  readonly payload: string,
  readonly type: ActionTypeDefs.REQUEST_RESULTS
}
export const RequestResults = (fileContents: string): IRequestResultsAction => ({
  payload: btoa(fileContents),
  type: ActionTypeDefs.REQUEST_RESULTS
})

export interface IRequestResultsFailedAction {
  readonly payload: string
  readonly type: ActionTypeDefs.REQUEST_RESULTS_FAILED
}
export const RequestResultsFailed = (message: string): IRequestResultsFailedAction => ({
  payload: message,
  type: ActionTypeDefs.REQUEST_RESULTS_FAILED
})

export interface IRequestResultsSucceededAction {
  readonly payload: ITestResult[]
  readonly type: ActionTypeDefs.REQUEST_RESULTS_SUCCEEDED
}
export const RequestResultsSucceeded = (results: ITestResult[]): IRequestResultsSucceededAction => ({
  payload: results,
  type: ActionTypeDefs.REQUEST_RESULTS_SUCCEEDED
})

export type ActionTypes = IRequestResultsAction |
  IRequestResultsFailedAction |
  IRequestResultsSucceededAction
