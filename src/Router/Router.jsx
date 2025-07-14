import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Home/Home';
import AuthLayout from '../Authentication/AuthLayout/AuthLayout';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';
import BiodataDetails from '../Pages/BiodataDetails';
import PrivateRoute from './PrivateRoute';
import BiodatasPage from '../Pages/BiodatasPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'biodata',
        Component: BiodatasPage,
      },
      {
        path: 'biodata/:id',
        element: (
          <PrivateRoute>
            <BiodataDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
    ],
  },
]);
