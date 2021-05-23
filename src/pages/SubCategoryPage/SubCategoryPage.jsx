import React, { useState } from 'react'
import { useParams } from 'react-router'
import { Item } from '../../components/Item/Item'
import { useGet } from '../../hooks/get.hook'
import { useSuccess } from '../../hooks/success.hook'
import { Message } from '../../components/Message/Message'
import Styles from './SubCategoryPage.module.css'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export const SubCategoryPage = () => {
    toast.configure({
        position: 'top-right',
        autoClose: 3000,
        draggable: true
    })

    const { category } = useParams()
    const categoryId = category.replace('category=', '')

    const { data, loading } = useGet(`category/getById/${categoryId}`)
    const items = useGet(`item/getByCategory/${data.name}`)

    const [orders, setOrders] = useState([])
    const [show, setShow] = useState(false)
    const successMessage = useSuccess()

    const orderProduct = () => {
        console.log(orders.reverse().filter((v, i, a) => a.findIndex(t => (t.data === v.data)) === i))
        localStorage.setItem('orders', JSON.stringify({ orders: orders.reverse().filter((v, i, a) => a.findIndex(t => (t.data === v.data)) === i) }))
        successMessage(`Заказ добавлен(-а) в Ваши заказы`)
        setShow(false)
    }

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
                            ? items.data.map((el, i) => {
                                  return (
                                      <Item
                                          key={el.id}
                                          data={el}
                                          categoryId={categoryId}
                                          orders={orders}
                                          setOrders={setOrders}
                                          setShow={setShow}
                                          i={ i }
                                      />
                                  )
                              })
                            : ''}
                    </div>
                )}
            </div>
            {
                show ?
                <Message 
                    text={ 'Вы уверенны, что хотите оформить заказ?' }
                    data={ orders.reverse().filter((v, i, a) => a.findIndex(t => (t.data === v.data)) === i) }
                    func={ orderProduct }
                    setOrders={ setOrders }
                    setShow={ setShow } /> :
                ''
            }
        </div>
    )
}
