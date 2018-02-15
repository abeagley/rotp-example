import createSagaMiddleware from 'redux-saga'

import { indexSaga } from '../pages/index/index.saga'

export const sagaMiddleware = createSagaMiddleware()

// Saga init
export const runSagas = () => {
  sagaMiddleware.run(indexSaga)
}
