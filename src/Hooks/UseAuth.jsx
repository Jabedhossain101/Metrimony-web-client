import React, { use } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

const UseAuth = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};

export default UseAuth;
