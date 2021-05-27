import React from 'react'
import { Category } from '../../components/Category/Category'
import { Header } from '../../components/Header/Header'
import Styles from './MenuPage.module.css'

export const MenuPage = ({ categoryData }) => {
    return (
        <div className={Styles.menuPage}>
            <Header heading={ 'Menu' } />
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
