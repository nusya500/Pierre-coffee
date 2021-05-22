import React from 'react'
import { NavLink } from 'react-router-dom'
import Styles from './Category.module.css'

import Img from './../../assets/images/test.png'

export const Category = ({ data }) => {
    return (
        <NavLink to={`/menu/category=${data.id}`} className={Styles.category}>
            <img src={ Img } alt={ data.name } />
            <h3 className={Styles.title}>{ data.name }</h3>
        </NavLink>
    )
}
