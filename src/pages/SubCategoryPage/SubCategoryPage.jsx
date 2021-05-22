import React, { useState } from 'react'
import { useParams } from 'react-router'
import { Item } from '../../components/Item/Item'
import { useGet } from '../../hooks/get.hook'
import Styles from './SubCategoryPage.module.css'

export const SubCategoryPage = () => {
    const { category } = useParams()
    const categoryId = category.replace('category=', '')

    const { data, loading } = useGet(`category/getById/${categoryId}`)
    const items = useGet(`item/getByCategory/${data.name}`)

    const [orders, setOrders] = useState([])
    console.log(orders)

    return (
        <div className={Styles.subCategoryPage}>
            <div className="container">
                {loading ? (
                    <div className="center">
                        <div className="loading"></div>
                    </div>
                ) : (
                    <div className={Styles.block}>
                        {items.data
                            ? items.data.map((el) => {
                                  return (
                                      <Item
                                          key={el.id}
                                          data={el}
                                          categoryId={categoryId}
                                          orders={orders}
                                          setOrders={setOrders}
                                      />
                                  )
                              })
                            : ''}
                    </div>
                )}
            </div>
        </div>
    )
}
