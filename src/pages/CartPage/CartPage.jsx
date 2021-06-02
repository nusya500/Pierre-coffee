import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Header } from '../../components/Header/Header'
import { Message } from '../../components/Message/Message'
import Styles from './CartPage.module.css'

export const CartPage = ({ language }) => {
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
            <Header previous={'menu'} heading={ language === 'RU' ? 'Ваши заказы' : language === 'TR' ? 'Siparişleriniz' : language === 'EN' ? 'Your orders' : ''} order={false} setShow={setShow} />
            <div className="container">
                {
                    orders.length === 0 ?
                    <div className={Styles.empty}>
                        <span className={`material-icons ${Styles.icon}`}>
                            search_off
                        </span>
                        <h2>
                            { language === 'RU' ? 'Заказов нет! Добавьте блюда из нашего меню' : language === 'TR' ? 'Sipariş yok! Menümüzden yemekler ekleyin' : language === 'EN' ? 'No orders! Add dishes from menu' : ''}
                        </h2>
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
                                            <p>{ count } x { data.price } {language === 'RU' ? 'сом' : language === 'TR' ? 'som' : language === 'EN' ? 'som' : ''} = { count * data.price } {language === 'RU' ? 'сом' : language === 'TR' ? 'som' : language === 'EN' ? 'som' : ''}</p>
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
                        <p>{language === 'RU' ? 'Итого' : language === 'TR' ? 'Toplam' : language === 'EN' ? 'Total' : ''}: {total.reduce((a, b) => a + b, 0)} {language === 'RU' ? 'сом' : language === 'TR' ? 'som' : language === 'EN' ? 'som' : ''}</p>
                    </div> : ''
                }
            </div>
            {
                show ?
                <Message 
                    language={language}
                    text={ 
                        language === 'RU' ? 'Вы уверенны, что хотите удалить заказ?' : language === 'TR' ? 'Siparişi silmek istediğinizden emin misiniz?' : language === 'EN' ? 'Are you sure you want to delete the order?' : ''
                    }
                    data={ [] }
                    func={ cancelOrder }
                    setShow={ setShow }
                     /> :
                ''
            }
        </div>
    )
}
