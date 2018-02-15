import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Index from './pages/index/index.container'
import registerServiceWorker from './registerServiceWorker'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

ReactDOM.render(
  <Provider store={store}>
    <Index/>
  </Provider>,
  document.getElementById('root') as HTMLElement
)

registerServiceWorker()
