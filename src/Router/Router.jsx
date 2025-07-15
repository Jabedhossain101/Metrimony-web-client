import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Home/Home';
import AuthLayout from '../Authentication/AuthLayout/AuthLayout';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';
import BiodataDetails from '../Pages/BiodataDetails';
import PrivateRoute from './PrivateRoute';
import BiodatasPage from '../Pages/BiodatasPage';
import AddedMember from '../Form/AddedMember';
import UserLayout from '../UserDashBoard/UserLayout/UserLayout';
import EditBiodata from '../UserDashBoard/UserComponents/EditBiodata';
import ViewBiodata from '../UserDashBoard/UserComponents/ViewBiodata';
import ContactRequests from '../UserDashBoard/UserComponents/ContactRequests ';
import Favourites from '../UserDashBoard/UserComponents/Favourites ';
import CheckoutPage from '../Pages/CheckoutPage';

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

      {
        path: 'added-member',
        element: (
          <PrivateRoute>
            <AddedMember />
          </PrivateRoute>
        ),
      },
      {
        path: '/checkout/:biodataId',
        element: (
          <PrivateRoute>
            <CheckoutPage />
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
  {
    path: 'dashboard',
    element: (
      <PrivateRoute>
        {' '}
        <UserLayout />
      </PrivateRoute>
    ),

    children: [
      {
        path: 'edit-biodata',
        Component: EditBiodata,
      },
      {
        path: 'view-biodata',
        Component: ViewBiodata,
      },
      {
        path: 'contact-requests',
        Component: ContactRequests,
      },
      {
        path: 'favourites',
        Component: Favourites,
      },
    ],
  },
]);
