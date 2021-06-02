import React from 'react'
import { useParams } from 'react-router'
import { Item } from '../../components/Item/Item'
import Styles from './SubCategoryPage.module.css'

export const SubCategoryPage = ({ language, subCategoryData }) => {
    const { category } = useParams()
    const categoryId = category.replace('category=', '')

    const items = subCategoryData.items || [{ loading: true }]

    return (
        <div className={Styles.subCategoryPage}>
            <div className="container">
                <div className={Styles.block}>
                    {
                        items[0] ?
                        items[0].loading ?
                        <div className="center" style={{width: '100%'}}>
                            <div className="loading"></div>
                        </div> :
                        items.map((el, i) => {
                            return (
                                <Item
                                    language={language}
                                    key={i}
                                    data={el}
                                    categoryId={categoryId}
                                    i={ i }
                                />
                            )
                        }) : ''
                    }
                </div>
            </div>
        </div>
    )
}
