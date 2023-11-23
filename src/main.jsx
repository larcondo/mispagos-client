import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

// CSS
import './css/Root.css'

// Contexts
import { UserProvider } from './contexts/userDetails'

// Routes
import Login from './routes/Login'
import Register from './routes/Register'
import Home from './routes/Home'
import Inicio from './routes/home/Inicio'
import Config from './routes/home/Config'
import Graficas from './routes/home/Graficas'
import Pagos from './routes/home/Pagos'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: 'inicio',
        element: <Inicio />
      },
      {
        path: 'pagos',
        element: <Pagos />
      },
      {
        path: 'graficas',
        element: <Graficas />
      },
      {
        path: 'config',
        element: <Config />
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  // </React.StrictMode>,
)