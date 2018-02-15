import { call, put, takeLatest } from 'redux-saga/effects'
import { ActionTypeDefs, IRequestResultsAction, RequestResultsFailed, RequestResultsSucceeded } from './index.actions'
import IndexService from './index.service'

export function * requestResults (action: IRequestResultsAction) {
  try {
    const resp = yield call(IndexService.getTestResults, action.payload)
    const results = resp.data
    yield put(RequestResultsSucceeded(results.data))
  } catch (e) {
    console.error(e)
    yield put(RequestResultsFailed(e.message))
  }
}

export function * indexSaga () {
  yield takeLatest(ActionTypeDefs.REQUEST_RESULTS, requestResults)
}
