import React from 'react'
import { useParams } from 'react-router-dom'
import { Category } from '../../components/Category/Category'
import { Header } from '../../components/Header/Header'
import { SubCategoryPage } from '../SubCategoryPage/SubCategoryPage'
import Styles from './CategoryPage.module.css'

export const CategoryPage = ({ data }) => {
    const { category } = useParams()
    const categoryId = category.replace('category=', '')

    const categoryData = data.filter(el => el.id === +categoryId)[0] || [{ name: '' }]
    
    return (
        <div className={Styles.categoryPage}>
            <Header
                heading={
                    categoryData.name
                }
            />
            {
                categoryData.subCategoryStatus === false ?
                <div className="container">
                    <div className={Styles.block}>
                        {
                            categoryData.subCategory.map((el, i) => {
                                return <Category key={el.id} data={el} i={ i } />
                            })
                        }
                    </div>
                </div> : 
                <SubCategoryPage subCategoryData={categoryData} />
            }
        </div>
    )
}
