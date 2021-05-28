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
// import { ItemPage } from './pages/ItemPage/ItemPage'

export const useRoutes = (isAuthentificated) => {
    const { data } = useGet('main/getUpdate')
    const categoryData = data.filter(
        (el) => el.subCategoryStatus === false
    )

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
                    <MainPage />
                </Route>
                <Route path="/menu" exact>
                    <MenuPage categoryData={categoryData} />
                </Route>
                <Route path="/menu/:category">
                    <CategoryPage data={data} />
                </Route>
                <Route path="/cart" exact>
                    <CartPage />
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
