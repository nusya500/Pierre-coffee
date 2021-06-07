import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Header } from '../../components/Header/Header'
import { Message } from '../../components/Message/Message'
import Styles from './CartPage.module.css'

export const CartPage = ({ language }) => {
    const [show, setShow] = useState(false)
    const [hide, setHide] = useState('')

    const template = /(order)/
    const items = Object.keys(localStorage).filter(el => el.match(template))
    let orders = items.map(el => {
        return JSON.parse(localStorage[el])
    })

    console.log()

    let history = useHistory()

    const cancelOrder = () => {
        history.goBack()
        items.map(el => {
            localStorage.removeItem(el)
            return ''
        })
    }

    const deleteOrderItem = (id) => {
        // history.goBack()
        setHide(id)
        localStorage.removeItem(`order${id}`)
    }

    let total = []

    return (
        <div className={Styles.cartPage}>
            <Header previous={'menu'} heading={ language === 'RU' ? 'Ваши заказы' : language === 'TR' ? 'Siparişleriniz' : language === 'EN' ? 'Your orders' : language === 'KG' ? 'Ваши заказы' : ''} order={false} setShow={setShow} />
            <div className="container">
                {
                    orders.length === 0 ?
                    <div className={Styles.empty}>
                        <span className={`material-icons ${Styles.icon}`}>
                            search_off
                        </span>
                        <h2>
                            { language === 'RU' ? 'Заказов нет! Добавьте блюда из нашего меню' : language === 'TR' ? 'Sipariş yok! Menümüzden yemekler ekleyin' : language === 'EN' ? 'No orders! Add dishes from menu' : language === 'KG' ? 'Заказов нет! Добавьте блюда из нашего меню' : ''}
                        </h2>
                    </div> :
                    <div className={Styles.block}>
                        {
                            orders ?
                            orders.map(({ count, data }, i) => {
                                total.push(data ? count * data.price : '')
                                return (
                                    <div key={ i } className={hide === data.id ? `${Styles.item} ${Styles.hide}` : Styles.item} data-aos="fade-down" data-aos-delay={i * 100}>
                                        <h3>{ data.name }</h3>
                                        <div className={Styles.right}>
                                            <p>{ count } x { data.price } {language === 'RU' ? 'сом' : language === 'TR' ? 'som' : language === 'EN' ? 'som' : language === 'KG' ? 'сом' : ''} = { count * data.price } {language === 'RU' ? 'сом' : language === 'TR' ? 'som' : language === 'EN' ? 'som' : language === 'KG' ? 'сом' : ''}</p>
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
                        <p>{language === 'RU' ? 'Обслуживание 10%' : language === 'TR' ? 'Servis 10%' : language === 'EN' ? 'Service 10%' : language === 'KG' ? 'Тейлөө кызматы 10%' : ''}: {total.reduce((a, b) => a + b, 0)*10/100} {language === 'RU' ? 'сом' : language === 'TR' ? 'som' : language === 'EN' ? 'som' : language === 'KG' ? 'сом' : ''}</p>
                        <p>{language === 'RU' ? 'Итого' : language === 'TR' ? 'Toplam' : language === 'EN' ? 'Total' : language === 'KG' ? 'Итого' : ''}: {total.reduce((a, b) => a + b, 0) + total.reduce((a, b) => a + b, 0)*10/100} {language === 'RU' ? 'сом' : language === 'TR' ? 'som' : language === 'EN' ? 'som' : language === 'KG' ? 'сом' : ''}</p>
                    </div> : ''
                }
            </div>
            {
                show ?
                <Message 
                    language={language}
                    text={ 
                        language === 'RU' ? 'Вы уверенны, что хотите удалить заказ?' : language === 'TR' ? 'Siparişi silmek istediğinizden emin misiniz?' : language === 'EN' ? 'Are you sure you want to delete the order?' : language === 'KG' ? 'Вы уверенны, что хотите удалить заказ?' : ''
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
