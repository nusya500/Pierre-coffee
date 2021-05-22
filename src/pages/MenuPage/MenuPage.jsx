import React from 'react'
import { Category } from '../../components/Category/Category'
import { Header } from '../../components/Header/Header'
import { useGet } from '../../hooks/get.hook'
import Styles from './MenuPage.module.css'

export const MenuPage = () => {
    const { data, loading } = useGet('category/getAll')

    return (
        <div className={Styles.menuPage}>
            <Header previous={''} heading={ 'Menu' } />
            <div className="container">
                {
                    loading ?
                    <div className="center">
                        <div className="loading"></div>
                    </div> :
                    <div className={Styles.block}>
                        {
                            data.filter((el) => 
                                el.subCategoryStatus === false
                            ).map((el) => {
                                return (
                                    <Category key={ el.id } data={ el } />
                                )
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}
