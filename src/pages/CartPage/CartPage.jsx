import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Header } from '../../components/Header/Header'
import { Message } from '../../components/Message/Message'
import Styles from './CartPage.module.css'

export const CartPage = () => {
    const [show, setShow] = useState(false)

    const template = /(order)/
    const items = Object.keys(localStorage).filter(el => el.match(template))
    const orders = items.map(el => {
        return JSON.parse(localStorage[el])
    })

    console.log(orders)

    let history = useHistory()

    const cancelOrder = () => {
        history.goBack()
        items.map(el => {
            localStorage.removeItem(el)
            return ''
        })
    }

    const deleteOrderItem = (id) => {
        history.goBack()
        localStorage.removeItem(`order${id}`)
    }

    let total = []

    return (
        <div className={Styles.cartPage}>
            <Header previous={'menu'} heading={ 'Ваши заказы' } order={false} setShow={setShow} />
            <div className="container">
                {
                    orders.length === 0 ?
                    <div className={Styles.empty}>
                        <span className={`material-icons ${Styles.icon}`}>
                            search_off
                        </span>
                        <h2>Заказов нет! Добавьте блюда из нашего меню</h2>
                    </div> :
                    <div className={Styles.block}>
                        {
                            orders ?
                            orders.map(({ count, data }, i) => {
                                total.push(count * data.price)
                                return (
                                    <div key={ i } className={Styles.item} data-aos="fade-down" data-aos-delay={i * 100}>
                                        <h3>{ data.name }</h3>
                                        <div className={Styles.right}>
                                            <p>{ count } x { data.price } сом = { count * data.price } сом</p>
                                            <button onClick={() => {deleteOrderItem(data.id)}}>
                                                <span className={`material-icons ${Styles.delete}`}>
                                                    delete
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                )
                            }) : ''
                        }
                    </div>
                }
                {
                    orders.length !== 0 ?
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
