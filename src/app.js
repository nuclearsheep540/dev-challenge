import React from 'react'
import ReactDOM from 'react-dom'
import Home from './home'

import './css/dashboard.scss'

const App = () => (
  <Home />
)
ReactDOM.render(
  <App />,
  document.getElementById('root')
)