import React from 'react'
import { useParams } from 'react-router-dom'
import { Category } from '../../components/Category/Category'
import { Header } from '../../components/Header/Header'
import { useGet } from '../../hooks/get.hook'
import { SubCategoryPage } from '../SubCategoryPage/SubCategoryPage'
import Styles from './CategoryPage.module.css'

export const CategoryPage = () => {
    const { category } = useParams()
    const categoryId = category.replace('category=', '')

    const { data, loading } = useGet(`category/getById/${categoryId}`)

    return (
        <div className={Styles.categoryPage}>
            {
                loading ?
                <div className={Styles.loading}>
                    <div className="center">
                        <div className="loading"></div>
                    </div>
                </div> :
                <>
                    <Header
                        previous={data.subCategoryStatus === false ? 'menu' : `menu/category=${data.id}`}
                        heading={
                            data.name
                        }
                    />
                    {
                        data.subCategoryStatus === false ?
                        <div className="container">
                            <div className={Styles.block}>
                                {
                                    data.subCategory !== undefined ?
                                    data.subCategory.map((el) => {
                                        return <Category key={el.id} data={el} />
                                    }) : ''
                                }
                            </div>
                        </div> : 
                        <SubCategoryPage />
                    }
                </>
            }
        </div>
    )
}
