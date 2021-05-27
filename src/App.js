import React, { useEffect } from 'react'
import Styles from './App.module.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from "./hooks/auth.hook"
import { AuthContext } from "./context/AuthContext"

import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init({ duration: 1500, startEvent: 'load' })
export const App = ({hideLoader}) => {
    const { status, login, logout } = useAuth()
	const isAuthentificated = !!status
	const routes = useRoutes(isAuthentificated)

	useEffect(() => {
        hideLoader()
        return () => {
            hideLoader()
        }
    }, [hideLoader])
	
	return (
		<AuthContext.Provider value={{
			status, login, logout, isAuthentificated
		}}>
			<Router >
				<div className={Styles.app}>
					{ isAuthentificated }
					{ routes }
				</div>
			</Router>
		</AuthContext.Provider>
  	)
}
