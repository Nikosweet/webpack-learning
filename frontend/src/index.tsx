import {createRoot} from 'react-dom/client'
import App from './components/App';
import './index.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LazyShop } from './pages/shop/Shop.lazy';

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found')
}

const container = createRoot(root)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        path: '/shop',
        element: <LazyShop />
      }
    ]
  }
])

container.render(<RouterProvider router={router} />)