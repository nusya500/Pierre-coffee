import React from 'react'
import Styles from './Message.module.css'

export const Message = ({ text, data, func, setShow }) => {
    console.log(data)
    return (
        <div className={Styles.message} data-aos="fade-down">
            <div className={Styles.block}>
                <h3>{ text }</h3>
                {
                    data ?
                    <div className={Styles.order}>
                        {
                            data.map(({count, data}, i) => {
                                return (
                                    <p key={ i }>{data.name} - {count}</p>
                                )
                            })
                        }
                    </div> :
                    ''
                }
                <div className={Styles.buttons}>
                    <button onClick={() => {func()}}>Да</button>
                    <button onClick={() => {setShow(false)}}>Нет</button>
                </div>
            </div>
        </div>
    )
}
