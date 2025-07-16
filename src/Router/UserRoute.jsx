import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { Navigate } from 'react-router';

const UserRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // ✅ Check if role is 'user'
  return user?.role === 'user' ? children : <Navigate to="/" />;
};

export default UserRoute;
