import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'
import * as serviceWorker from './serviceWorker';

const loader = document.querySelector('#loader')

const showLoader = () => loader.classList.remove('hideLoader')

const hideLoader = () => loader.classList.add('hideLoader')

ReactDOM.render(
  <React.StrictMode>
      <App hideLoader={hideLoader} showLoader={showLoader} />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();