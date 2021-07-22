import React from 'react'
import { NavLink, useHistory } from "react-router-dom"
import Styles from './Header.module.css'

import Arrow from './../../assets/images/arrow_back_white_24dp.svg'
import Receipt from './../../assets/images/receipt_long_white_24dp.svg'
import Cancel from './../../assets/images/cancel_white_24dp.svg'

export const Header = ({ heading, order, setShow }) => {
    // const [form, setForm] = useState({
    //     language: 'RU'
    // })

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
                            <img src={ Arrow } alt="arrow" />
                        </span>
                    </button>
                    <h2>{ heading }</h2>
                    <NavLink to="/cart" style={order === false ? {display: 'none'} : {}}>
                        <span className={`material-icons ${Styles.icon}`}>
                            <img src={ Receipt } alt="arrow" />
                        </span>
                    </NavLink>
                    {
                        order === false ?
                        <button onClick={() => {setShow(true)}}>
                            <span className={`material-icons ${Styles.icon}`}>
                                <img src={ Cancel } alt="arrow" />
                            </span>
                        </button> : ''
                    }
                </div>                
            </div>
        </header>
    )
}
