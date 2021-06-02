import React from 'react'
import Styles from './Message.module.css'

export const Message = ({ language, text, data, func, setShow }) => {
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
                    <button onClick={() => {func()}}>{language === 'RU' ? 'Да' : language === 'TR' ? 'Evet' : language === 'EN' ? 'Yes' : ''}</button>
                    <button onClick={() => {setShow(false)}}>{language === 'RU' ? 'Нет' : language === 'TR' ? 'Hayır' : language === 'EN' ? 'No' : ''}</button>
                </div>
            </div>
        </div>
    )
}
