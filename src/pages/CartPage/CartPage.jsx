import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Header } from '../../components/Header/Header'
import { Message } from '../../components/Message/Message'
import Styles from './CartPage.module.css'

export const CartPage = () => {
    const [data, setData] = useState({
        orders: []
    })
    const [show, setShow] = useState(false)

    let history = useHistory()

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

    const cancelOrder = () => {
        history.goBack()
        localStorage.removeItem('orders')
    }

    let total = []

    return (
        <div className={Styles.cartPage}>
            <Header previous={'menu'} heading={ 'Ваши заказы' } order={false} setShow={setShow} />
            <div className="container">
                {
                    data.orders.length === 0 ?
                    <div className={Styles.empty}>
                        <span className={`material-icons ${Styles.icon}`}>
                            search_off
                        </span>
                        <h2>Заказов нет! Добавьте блюда из нашего меню</h2>
                    </div> :
                    <div className={Styles.block}>
                        {
                            data.orders ?
                            data.orders.map(({ count, data }, i) => {
                                total.push(count * data.price)
                                return (
                                    <div key={ i } className={Styles.item} data-aos="fade-down" data-aos-delay={i * 100}>
                                        <h3>{ data.name }</h3>
                                        <p>{ count } x { data.price } сом = { count * data.price } сом</p>
                                    </div>
                                )
                            }) : ''
                        }
                    </div>
                }
                {
                    data.orders.length !== 0 ?
                    <div className={Styles.total}>
                        <p>Итого: {total.reduce((a, b) => a + b, 0)} сом</p>
                    </div> : ''
                }
            </div>
            {
                show ?
                <Message 
                    text={ 'Вы уверенны, что хотите удалить заказ?' }
                    data={ [] }
                    func={ cancelOrder }
                    setShow={ setShow }
                     /> :
                ''
            }
        </div>
    )
}
