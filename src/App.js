import React from 'react'
import Styles from './App.module.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'

import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init({ duration: 1500, startEvent: 'load' })
export const App = () => {
    const routes = useRoutes()

    return (
        <Router>
            <div className={Styles.app}>{routes}</div>
        </Router>
    )
}
