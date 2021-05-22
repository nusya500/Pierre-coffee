import React from 'react'
import { NavLink, useHistory } from "react-router-dom"
import Styles from './Header.module.css'

export const Header = ({ heading, order }) => {
    let history = useHistory()
    const goToPreviousPath = () => {
        history.goBack()
    }

    return (
        <header className={Styles.header}>
            <div className="container">
                <div className={Styles.block}>
                    <button onClick={goToPreviousPath}>
                        <span className={`material-icons ${Styles.icon}`}>
                            arrow_back
                        </span>
                    </button>
                    <h2>{ heading }</h2>
                    <NavLink to="/cart" style={order === false ? {transform: 'scale(0)'} : {}}>
                        <span className={`material-icons ${Styles.icon}`}>
                            receipt_long
                        </span>
                    </NavLink>
                </div>                
            </div>
        </header>
    )
}
