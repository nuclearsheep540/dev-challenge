import React from 'react'
import ReactDOM from 'react-dom'
import Home from './home'

import './css/dashboard.scss'
import '../node_modules/bootstrap/dist/js/bootstrap.js'

const App = () => (
  <Home />
)
ReactDOM.render(
  <App />,
  document.getElementById('root')
)