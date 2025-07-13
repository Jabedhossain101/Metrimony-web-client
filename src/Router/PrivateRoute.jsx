import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
  const { user, loading } = UseAuth();

  if (loading) {
    return (
      <div>
        <span className="loading loading-spinner text-success"></span>
      </div>
    );
  }

  if (!user) {
    <Navigate to={'/login'}></Navigate>;
  }

  return children;
};

export default PrivateRoute;
