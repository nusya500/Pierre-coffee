import React from 'react'
import Styles from './App.module.css'
import { Switch, Route } from 'react-router-dom'
import { MainPage } from './pages/MainPage/MainPage'
import { MenuPage } from './pages/MenuPage/MenuPage'
import { CategoryPage } from './pages/CategoryPage/CategoryPage'
import { CartPage } from './pages/CartPage/CartPage'
// import { ItemPage } from './pages/ItemPage/ItemPage'

export const useRoutes = () => {
    return (
        <div className={Styles.routes}>
            <Switch>
                <Route path="/" exact>
					<MainPage />
                </Route>
                <Route path="/menu" exact>
					<MenuPage />
                </Route>
                <Route path="/menu/:category">
					<CategoryPage />
                </Route>
                <Route path="/cart" exact>
					<CartPage />
                </Route>
                {/* <Route path="/:category/:item" exact>
					<ItemPage />
                </Route> */}
            </Switch>
        </div>
    )
}
