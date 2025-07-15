import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { RouterProvider } from 'react-router';
import { router } from './Router/Router.jsx';
import AuthProvider from './Contexts/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import Aos from 'aos';
import { ToastContainer } from 'react-toastify';

Aos.init();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-center" />
    <ToastContainer></ToastContainer>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
