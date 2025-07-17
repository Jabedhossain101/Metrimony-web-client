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
import AdminLayout from '../AdminPanel/Layout/AdminLayout';
import AdminDashboard from '../AdminPanel/AdminDashboard';
import ManageUsers from '../AdminPanel/ManageUsers';
import ApprovedPremium from '../AdminPanel/ApprovedPremium';
import ApprovedContactRequest from '../AdminPanel/ApprovedContactRequest';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';

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
      // <UserRoute>
      //   {' '}
      //   <UserLayout />
      // </UserRoute>
      <UserLayout />
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
  {
    path: 'admin-dashboard',
    Component: AdminLayout,
    children: [
      {
        index: true,
        element: <AdminDashboard />, // ✅ element
      },
      {
        path: 'manage',
        element: <ManageUsers />,
      },
      {
        path: 'approvedPremium',
        element: <ApprovedPremium />,
      },
      {
        path: 'approvedContactRequest',
        element: <ApprovedContactRequest />,
      },
    ],
  },
]);
