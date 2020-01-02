import React from 'react'
import ReactDOM from 'react-dom'
import Home from './home'

import './css/dashboard.css'
import '../node_modules/bootstrap/dist/css/bootstrap-theme.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'

const App = () => (
  <Home />
)
ReactDOM.render(
  <App />,
  document.getElementById('root')
)