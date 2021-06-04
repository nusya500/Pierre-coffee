import React from 'react'
import { Category } from '../../components/Category/Category'
import { Header } from '../../components/Header/Header'
import Styles from './MenuPage.module.css'

export const MenuPage = ({ language, categoryData }) => {
    return (
        <div className={Styles.menuPage}>
            <Header heading={ language === 'RU' ? 'Меню' : language === 'TR' ? 'Menü' : language === 'EN' ? 'Menu' : language === 'KG' ? 'Меню' : '' } />
            <div className="container">
                <div className={Styles.block}>
                    {
                        categoryData.map((el, i) => {
                            return (
                                <Category key={ i } data={ el } i={ i } />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
