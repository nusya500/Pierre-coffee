import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { useGet } from './hooks/get.hook'
import Styles from './App.module.css'
import { MainPage } from './pages/MainPage/MainPage'
import { MenuPage } from './pages/MenuPage/MenuPage'
import { CategoryPage } from './pages/CategoryPage/CategoryPage'
import { CartPage } from './pages/CartPage/CartPage'
import { Admin } from './pages/Admin/Admin'
import { Auth } from './pages/Auth/Auth'
import { useCategory } from './hooks/category.hook'
// import { ItemPage } from './pages/ItemPage/ItemPage'

export const useRoutes = (isAuthentificated) => {
    const { data } = useGet('main/getUpdate')
    const language = JSON.parse(localStorage.getItem('language')) === null ? 'EN' : JSON.parse(localStorage.getItem('language'))
    const { categoryData } = useCategory(data, language)
    const categoryFiltered = categoryData.filter(
        (el) => el.subCategoryStatus === false
    )

    console.log(language)
    console.log(categoryData)

    if (isAuthentificated) {
        return (
            <div className={Styles.main}>
                <Admin />
            </div>
        )
    }

    return (
        <div className={Styles.routes}>
            <Switch>
                <Route path="/" exact>
                    <MainPage language={language} />
                </Route>
                <Route path="/menu" exact>
                    <MenuPage language={language} categoryData={categoryFiltered} />
                </Route>
                <Route path="/menu/:category">
                    <CategoryPage language={language} data={categoryData} />
                </Route>
                <Route path="/cart" exact>
                    <CartPage language={language} />
                </Route>
                <Route path="/admin" exact>
                    <Auth />
                </Route>
                {/* <Route path="/:category/:item" exact>
					<ItemPage />
                </Route> */}
            </Switch>
        </div>
    )
}
