import React, { useState } from 'react'
import { useParams } from 'react-router'
import { Item } from '../../components/Item/Item'
import Styles from './SubCategoryPage.module.css'
import Fuse from "fuse.js"

export const SubCategoryPage = ({ language, subCategoryData }) => {
    const { category } = useParams()
    const categoryId = category.replace('category=', '')
    const [form, setForm] = useState("")

    const items = subCategoryData.items || [{ loading: true }]

    const fuse = new Fuse(items, {
        keys: [
            "name"
        ]
    })

    const results = fuse.search(form)
    const itemsFiltered = form ? results.map(result => result.item) : items

    const changeHandler = ({ currentTarget = {} }) => {
        const { value } = currentTarget
        setForm(value)
    }

    return (
        <div className={Styles.subCategoryPage}>
            <div className="container">
                <div className={Styles.search}>
                    <input type="text" className={Styles.input} name="name" onChange={changeHandler} placeholder="..." autoComplete="off" />
                </div>
                <div className={Styles.block}>
                    {
                        itemsFiltered[0] ?
                        itemsFiltered[0].loading ?
                        <div className="center" style={{width: '100%'}}>
                            <div className="loading"></div>
                        </div> :
                        itemsFiltered.map((el, i) => {
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
