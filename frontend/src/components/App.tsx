import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import * as classes from './App.module.scss'

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <Link to={'/about'}>About</Link>
      <br />
      <Link to={'/shop'}>Shop</Link>
      <div className={classes.text}>{count}</div>
      <button onClick={() => setCount(count+1)}>increment</button>
      <Outlet></Outlet>
      <img src="./assets/example.png" alt="" />
    </div>
  )
}
