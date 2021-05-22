import React, { useEffect, useState } from 'react'
import { Header } from '../../components/Header/Header'
import Styles from './CartPage.module.css'

export const CartPage = () => {
    const [data, setData] = useState({
        orders: []
    })

    useEffect(() => {
        let mounted = true
        try {
            if (mounted) {
                if (JSON.parse(localStorage.getItem('orders')) !== null) {
                    setData(JSON.parse(localStorage.getItem('orders')))
                }
            }
        } catch (e) {}
        return () => mounted = false
    }, [])

    return (
        <div className={Styles.cartPage}>
            <Header previous={'menu'} heading={ 'Ваши заказы' } order={false} />
            <div className="container">
                <div className={Styles.block}>
                    {
                        data.orders ?
                        data.orders.map(({ count, data }, i) => {
                            return (
                                <div key={ i } className={Styles.item}>
                                    <h3>{ data.name } -</h3>
                                    <p>{ count }</p>
                                </div>
                            )
                        }) : ''
                    }
                </div>
            </div>
        </div>
    )
}
