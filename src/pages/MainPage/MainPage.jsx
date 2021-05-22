import React from 'react'
import { NavLink } from 'react-router-dom'
import Styles from './MainPage.module.css'

import Logo from './../../assets/images/logo.svg'

export const MainPage = () => {
    return (
        <div className={Styles.mainPage}>
            <div className={Styles.block}>
                <img src={Logo} alt="logo" />
                <NavLink to="/menu">menu</NavLink>
            </div>
        </div>
    )
}
