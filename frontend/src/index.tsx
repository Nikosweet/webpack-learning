import {createRoot} from 'react-dom/client'
import App from './components/App';
import './index.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LazyAbout } from './pages/about/About.lazy';
import { LazyShop } from './pages/shop/Shop.lazy';
import { Suspense } from 'react';

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
        path: '/about',
        element: <LazyAbout />
      },
      {
        path: '/shop',
        element: <LazyShop />
      }
    ]
  }
])

container.render(<RouterProvider router={router} />)