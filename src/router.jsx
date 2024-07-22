import { createBrowserRouter } from 'react-router-dom';

import Login from '@pages/Login';
import Register from '@pages/Register';
import Home from '@pages/Home';
import Config from '@pages/Home/Config';
import Inicio from '@pages/Home/Inicio';
import Graficas from '@pages/Home/Graficas';
import Pagos from '@pages/Home/Pagos';

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
]);

export default router;