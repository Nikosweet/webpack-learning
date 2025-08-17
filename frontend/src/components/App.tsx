
import { Link, Outlet } from 'react-router-dom'
import * as classes from './App.module.scss'

export default function App() {
  return (
    <div>
      <header className={classes.header}>
        <ul className={classes.list}>
          <Link to={'/shop'} className={classes.shopLink}><h1 className={classes.logo}>MyShop</h1></Link>
          <button className={classes.categories}>Категории</button>
          <input type="text" className={classes.filter} placeholder='Введите название товара'/>
        </ul>
        <nav className={classes.nav}>
          <button className={classes.login}>Войти</button>
          <button className={classes.basket}>Корзина</button>
        </nav>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  )
}
