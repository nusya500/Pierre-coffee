import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { AuthContext } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import Styles from './Admin.module.css'
import Overlay from "./../../App.module.css"
import { useHttp } from '../../hooks/http.hook'
import { useError } from '../../hooks/error.hook'
import { useSuccess } from '../../hooks/success.hook'
import { useGet } from '../../hooks/get.hook'

export const Admin = () => {
    toast.configure({
        position: 'top-center',
        autoClose: 3000,
        draggable: true,
    })

    const [show, setShow] = useState(false)
    const history = useHistory()
    const auth = useContext(AuthContext)

    const { request, API_URL } = useHttp()
    const successMessage = useSuccess()
    const errorMessage = useError()
    const [category, setCategory] = useState({})
    const [subCategory, setSubCategory] = useState({})
    const [item, setItem] = useState({})

    // useEffect(() => {
    //     window.scrollTo(0,0);
    //     return () => {
    //         window.scrollTo(0,0);
    //     }
    // })

    const { data, loading } = useGet(`category/getAll`)

    const postHandler = async () => {
        try {
            await request(
                `${API_URL}category/create`,
                'POST',
                { ...category }
            )
            successMessage(`Категория ${category.name} успешно создана!`)
            window.location.reload()
        } catch (e) {
            errorMessage(e.message)
        }
    }

    const subCategoryPostHandler = async () => {
        try {
            await request(
                `${API_URL}category/setSubCategory/${subCategory.parent}/${subCategory.child}`,
                'POST'
            )
            successMessage(`Подкатегория успешно привязана!`)
            window.location.reload()
        } catch (e) {
            errorMessage(e.message)
        }
    }

    const itemPostHandler = async () => {
        try {
            await request(
                `${API_URL}item/create`,
                'POST',
                { ...item }
            )
            successMessage(`Блюдо ${item.name} успешно создано!`)
        } catch (e) {
            errorMessage(e.message)
        }
    }

    const changeHandler = event => {
        setCategory({ ...category, [event.target.name]: event.target.value })
    }

    const subCategoryChangeHandler = event => {
        setSubCategory({ ...subCategory, [event.target.name]: event.target.value })
    }

    const itemChangeHandler = event => {
        if (event.target.name === 'category') {
            setItem({ ...item, [event.target.name]: {id: +event.target.value} })
        } else {
            if (event.target.name === 'price' || event.target.name === 'discount') {
                setItem({ ...item, [event.target.name]: +event.target.value })
            } else {
                setItem({ ...item, [event.target.name]: event.target.value })
            }
        }
    }

    console.log(category)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push("/")
    }

    const showModal = event => {
        event.preventDefault()
        setShow(true)
    }

    const logoutCancel = useCallback(() => {
        setShow(false)
    }, [setShow])

    const escHandler = useCallback((event) => {
        if(event.keyCode === 27) {
            logoutCancel()
        }
    }, [logoutCancel])

    useEffect(() => {
        document.addEventListener("keydown", escHandler, false)
        return () => {
            document.removeEventListener("keydown", escHandler, false)
        }
    }, [escHandler])

    const categoryCreate = [
        { type: 'text', name: 'name', placeholder: 'Название' },
        { type: 'text', name: 'pictureUrl', placeholder: 'Изображение' },
    ]

    const subCategoryCreate = [
        {
            select: [
                {
                    name: 'parent',
                    options: [
                        [{ label: 'Не выбрано', id: '' }],
                        data.filter(el => el.subCategoryStatus === false).map(({ name, id }) => {
                            return { label: name, id: id }
                        })
                    ],
                },
            ],
            name: 'parent',
        },{
            select: [
                {
                    name: 'child',
                    options: [
                        [{ label: 'Не выбрано', id: '' }],
                        data.filter(el => el.subCategoryStatus === false && el.subCategory.length === 0).map(({ name, id }) => {
                            return { label: name, id: id }
                        })
                    ],
                },
            ],
            name: 'child',
        }
    ]

    const itemCreate = [
        {
            select: [
                {
                    name: 'category',
                    options: [
                        [{ label: 'Не выбрано', id: '' }],
                        data.filter(el => el.subCategoryStatus === true).map(({ name, id }) => {
                            return { label: name, id: id }
                        })
                    ],
                },
            ],
            name: 'category',
        },
        { type: 'text', name: 'name', placeholder: 'Название' },
        { type: 'text', name: 'description', placeholder: 'Описание' },
        { type: 'text', name: 'pictureURL', placeholder: 'Изображение' },
        { type: 'text', name: 'weight', placeholder: 'Вес' },
        { type: 'number', name: 'price', placeholder: 'Стоимость' },
        { type: 'number', name: 'discount', placeholder: 'Скидка' },
    ]

    return (
        <div className={Styles.admin}>
            <header className={Styles.header}>
                <div className="container">
                    <div className={Styles.block}>
                        <h2>Админ панель</h2>
                        <div className={Styles.item}>
                            <a href="/" className={Styles.link} onClick={showModal}>
                                <i className={`material-icons ${Styles.icon}`}>exit_to_app</i>
                            </a>
                        </div>
                        <div className={`${Overlay.overlay} ${show ? Styles.active : !show}`} onClick={logoutCancel}></div>
                        <div className={`${Styles.message} ${show ? Styles.active : !show}`}>
                            <p className={Styles.text}>Вы уверены, что хотите выйти?</p>
                            <a href="/" className={Styles.submit} onClick={logoutHandler}>Да</a>
                            <a href="/" className={Styles.submit} onClick={e => {e.preventDefault(); logoutCancel()}}>Нет</a>
                        </div>
                    </div>
                </div>
            </header>
            {
                loading ?
                <div className="center">
                    <div className="loading"></div>
                </div> :
                <div className={Styles.forms}>
                    <form action="#" className={Styles.form}>
                        <h3 className={Styles.title}>Создание категории</h3>
                        {
                            categoryCreate.map(({ type, name, placeholder }, i) => {
                                return (
                                    <input key={ i } className={Styles.input} type={ type } name={ name } placeholder={ placeholder } onChange={changeHandler} />
                                )
                            })
                        }
                        {/* <textarea className={Styles.input} onChange={changeHandler} name="description" cols="30" rows="10" placeholder="Описание"></textarea> */}
                        <div className={Styles.button}>
                            <button onClick={ e => {e.preventDefault(); postHandler()} } className={Styles.submit} type={Styles.submit}>Создать</button>
                        </div>
                    </form>
                    <form action="#" className={Styles.form}>
                        <h3 className={Styles.title}>Привязка подкатегории</h3>
                        {
                            subCategoryCreate.map(({ type, name, placeholder, select }, i) => {
                                if (select) {
                                    return (
                                        select.map(({ name, options }, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className={`${Styles.item} ${Styles.relative}`}
                                                >
                                                    <select
                                                        className={Styles.select}
                                                        name={name}
                                                        onChange={subCategoryChangeHandler}
                                                    >
                                                        {options.map((element) => {
                                                            return element
                                                                ? element.map(
                                                                    ({ label, id }, i) => {
                                                                        return label ===
                                                                            '' ? null : (
                                                                            <option
                                                                                key={i}
                                                                                value={id}
                                                                            >
                                                                                {label}
                                                                            </option>
                                                                        )
                                                                    }
                                                                )
                                                                : ''
                                                        })}
                                                    </select>
                                                    <i
                                                        className={`material-icons ${Styles.arrow}`}
                                                    >
                                                        play_arrow
                                                    </i>
                                                </div>
                                            )
                                        })
                                    )
                                }
                                return (
                                    <input key={ i } className={Styles.input} type={ type } name={ name } placeholder={ placeholder } onChange={subCategoryChangeHandler} />
                                )
                            })
                        }
                        {/* <textarea className={Styles.input} onChange={changeHandler} name="description" cols="30" rows="10" placeholder="Описание"></textarea> */}
                        <div className={Styles.button}>
                            <button onClick={ e => {e.preventDefault(); subCategoryPostHandler()} } className={Styles.submit} type={Styles.submit}>Создать</button>
                        </div>
                    </form>
                    <form action="#" className={Styles.form}>
                        <h3 className={Styles.title}>Создание блюда</h3>
                        {
                            itemCreate.map(({ type, name, placeholder, select }, i) => {
                                if (select) {
                                    return (
                                        select.map(({ name, options }, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className={`${Styles.item} ${Styles.relative}`}
                                                >
                                                    <select
                                                        className={Styles.select}
                                                        name={name}
                                                        onChange={itemChangeHandler}
                                                    >
                                                        {options.map((element) => {
                                                            return element
                                                                ? element.map(
                                                                    ({ label, id }, i) => {
                                                                        return label ===
                                                                            '' ? null : (
                                                                            <option
                                                                                key={i}
                                                                                value={id}
                                                                            >
                                                                                {label}
                                                                            </option>
                                                                        )
                                                                    }
                                                                )
                                                                : ''
                                                        })}
                                                    </select>
                                                    <i
                                                        className={`material-icons ${Styles.arrow}`}
                                                    >
                                                        play_arrow
                                                    </i>
                                                </div>
                                            )
                                        })
                                    )
                                }
                                return (
                                    <input key={ i } className={Styles.input} type={ type } name={ name } placeholder={ placeholder } onChange={itemChangeHandler} />
                                )
                            })
                        }
                        {/* <textarea className={Styles.input} onChange={changeHandler} name="description" cols="30" rows="10" placeholder="Описание"></textarea> */}
                        <div className={Styles.button}>
                            <button onClick={ e => {e.preventDefault(); itemPostHandler()} } className={Styles.submit} type={Styles.submit}>Создать</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}
