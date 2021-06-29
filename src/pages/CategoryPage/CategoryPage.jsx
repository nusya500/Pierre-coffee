import React from 'react'
import { useParams } from 'react-router-dom'
import { Category } from '../../components/Category/Category'
import { Header } from '../../components/Header/Header'
import { Item } from '../../components/Item/Item'
import { SubCategoryPage } from '../SubCategoryPage/SubCategoryPage'
import Styles from './CategoryPage.module.css'

export const CategoryPage = ({ language, data }) => {
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
                categoryData.subCategoryStatus === false && categoryData.items.length > 0 ?
                <div className="container">
                    <div className={Styles.block}>
                        {
                            categoryData.items.map((el, i) => {
                                return (
                                    <Item
                                        language={language}
                                        key={i}
                                        data={el}
                                        categoryId={categoryId}
                                        i={ i }
                                    />
                                )
                            })
                        }
                    </div>
                </div> :
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
                <SubCategoryPage language={language} subCategoryData={categoryData} />
            }
        </div>
    )
}
