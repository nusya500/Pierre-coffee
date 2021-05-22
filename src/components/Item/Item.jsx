import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSuccess } from '../../hooks/success.hook'
import Styles from './Item.module.css'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import Img from './../../assets/images/item.png'

export const Item = ({ data, categoryId, orders, setOrders }) => {
    toast.configure({
        position: 'top-right',
        autoClose: 3000,
        draggable: true
    })

    

    const [count, setCount] = useState(1)
    const successMessage = useSuccess()

    const addProduct = (name) => {
        setOrders([...orders, {count: count, data: data}])
        localStorage.setItem('orders', JSON.stringify({ orders }))
        successMessage(`${name} добавлен(-а) в Ваши заказы`)
    }

    return (
        <div className={Styles.item}>
            <img src={ Img } alt={ data.name } />
            <div className={Styles.desc}>
                <NavLink to={`/menu/category=${categoryId}/item=${data.id}`} className={Styles.category}>
                    <h3 className={Styles.title}>{ data.name }</h3>
                </NavLink>
                <p>{ data.price } сом</p>
                <div className={Styles.add}>
                    <p className={Styles.count}>
                        <button onClick={() => {count !== 1 ? setCount(count - 1) : setCount(1)}}>{'<'}</button>
                        { count }
                        <button  onClick={() => {setCount(count + 1)}}>{'>'}</button>
                    </p>
                    <button onClick={() => {addProduct(data.name)}}>Заказать</button>
                </div>
            </div>
        </div>
    )
}
