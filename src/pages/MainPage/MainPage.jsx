import React from 'react'
import { NavLink } from 'react-router-dom'
import Styles from './MainPage.module.css'

import Logo from './../../assets/images/logo.svg'

export const MainPage = ({ language }) => {
    const setLanguage = (language) => {
        localStorage.setItem('language', JSON.stringify(language))
        document.location.reload()
    }

    const changeHandler = event => {
        setLanguage(event.target.value)
    }

    const languages = [
        { value: JSON.parse(localStorage.getItem('language')) === null ? 'EN' : JSON.parse(localStorage.getItem('language')) },
        { value: 'EN' },
        { value: 'RU' },
        { value: 'TR' }
    ]

    return (
        <div className={Styles.mainPage}>
            <div className={Styles.block}>
                <img src={Logo} alt="logo" />
                <NavLink to="/menu">{language === 'RU' ? 'меню' : language === 'TR' ? 'menü' : language === 'EN' ? 'menu' : ''}</NavLink>
                <select name="language" id="language" onChange={changeHandler}>
                    {
                        languages.map(({ value }, i) => {
                            return (
                                <option key={ i } value={ value }>{ value }</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    )
}
