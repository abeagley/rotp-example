import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { IIndexState, reducer as indexReducer } from '../pages/index/index.reducer'
import { sagaMiddleware, runSagas } from '../sagas'

// This is setup to be expanded. What's here currently isn't necessary for just a single reducer, but
// is nice to have when the application is expanded.

export interface IAppState {
  testResults: IIndexState
}

export default createStore(
  combineReducers({
    testResults: indexReducer
  }),
  compose(
    applyMiddleware(sagaMiddleware),
    window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']()
  )
)

runSagas()
