import React, { useState } from 'react'
import Styles from './Item.module.css'

import Img from './../../assets/images/item.png'

export const Item = ({ data, categoryId, orders, setOrders, setShow, i }) => {
    const [count, setCount] = useState(1)
    const [full, setFull] = useState(null)

    // console.log(orders.reverse().filter((v, i, a) => a.findIndex(t => (t.data === v.data)) === i))
    const showMore = (i) => {
        setFull(i)
    }

    const addProduct = () => {
        setOrders([...orders, {count: count, data: data}])
        setShow(true)
    }
    
    const decreaseCount = () => {
        count !== 1 ? setCount(count - 1) : setCount(1)
    }

    const increaseCount = () => {
        setCount(count + 1)
    }

    return (
        <div className={Styles.item} data-aos="fade-left" data-aos-delay={i * 100}>
            <img src={ Img } alt={ data.name } />
            <div className={Styles.desc}>
                <button onClick={() => {showMore(data.id)}} className={Styles.category}>
                    <h3 className={Styles.title}>{ data.name }</h3>
                </button>
                <p>{ data.price } сом</p>
                <div className={Styles.add}>
                    <p className={Styles.count} onChange={addProduct}>
                        <button onClick={() => {decreaseCount()}}>{'<'}</button>
                        { count }
                        <button onClick={() => {increaseCount()}}>{'>'}</button>
                    </p>
                    <button onClick={() => {addProduct()}}>Заказать</button>
                </div>
            </div>
            <div className={`${Styles.full} ${full === data.id ? Styles.active : ''}`}>
                <h4>
                    { data.name }
                    <button onClick={() => {showMore(null)}}>
                        <span className={`material-icons ${Styles.icon}`}>close</span>
                    </button>
                </h4>
                <div className={Styles.text}>
                    <p>{ data.description }</p>
                    <p>{ data.weight } г.</p>
                </div>
            </div>
        </div>
    )
}
