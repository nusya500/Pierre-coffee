import React, { useState, useEffect, useCallback, useContext } from "react"
import Styles from "./Auth.module.css"

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useHttp } from "./../../hooks/http.hook"
import { useError } from "./../../hooks/error.hook"
import { AuthContext } from './../../context/AuthContext'

export const Auth = () => {
    toast.configure({
        position: "top-center",
        autoClose: 3000,
        draggable: true
    })

    const auth = useContext(AuthContext)
    const errorMessage = useError()
    const { loading } = useHttp()
    const [form, setForm] = useState({})

    useEffect(() => {
        window.scrollTo(0,0);
        return () => {
            window.scrollTo(0,0);
        }
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = useCallback(async () => {
        const cyrillicPattern = /^[\u0400-\u04FF]+$/
        let mounted = true

        try {
            if (form.login === '' || form.password === '') {
                errorMessage('Поля не должны быть пустыми!')
            } else if (cyrillicPattern.test(form.login) === true || cyrillicPattern.test(form.password)) {
                errorMessage('Нельзя вводить русские символы!')
            } else if (form.login === 'pierre' && form.password === 'coffee123') {
                if (mounted) {
                    const data = {
                        token: 'qwerty12345',
                        userId: '09128734765'
                    }
                    auth.login(data.token, data.userId)
                }
            }
        } catch (e) {
            errorMessage('Введены некорректные данные!')
        }
        return () => mounted = false

    }, [auth, form, errorMessage])
    
    const enterHandler = useCallback((event) => {
        if(event.keyCode === 13) {
            loginHandler()
        }
    }, [loginHandler])

    useEffect(() => {
        document.addEventListener("keydown", enterHandler, false)
        return () => {
            document.removeEventListener("keydown", enterHandler, false)
        }
    }, [enterHandler])

    return(
        <div className={Styles.container}>
            <div className={Styles.block}>
                <h2 className={Styles.heading}>Вход</h2>
                <form action="#" className={Styles.form}>
                    <div className={Styles.inputBlock}>
                        <input 
                            type="text"
                            className={Styles.input}
                            name="login"
                            placeholder="Логин"
                            autoComplete="off"
                            onChange={changeHandler} />
                        <label htmlFor="login" className={Styles.label}>Логин</label>
                    </div>
                    <div className={Styles.inputBlock}>
                        <input 
                            type="password"
                            className={Styles.input}
                            name="password"
                            placeholder="Пароль"
                            autoComplete="off"
                            onChange={changeHandler} />
                        <label htmlFor="password" className={Styles.label}>Пароль</label>
                    </div>
                    <div className={loading ? 'loading' : Styles.buttons}>
                        <a 
                            href="/" 
                            className={loading ? 
                                Styles.dn : Styles.submit}
                            onClick={e => {e.preventDefault(); loginHandler()}}>Войти</a>
                    </div>
                </form>
            </div>
        </div>
    )
}