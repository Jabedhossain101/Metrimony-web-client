import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../Firebase/firebase.init';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ✅ Get user role from DB after Firebase auth
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async currentUser => {
      setLoading(true);

      if (currentUser) {
        try {
          const res = await fetch(
            `http://localhost:3000/users/${currentUser.email}`
          );
          const dbUser = await res.json();

          const updatedUser = {
            email: currentUser.email,
            name: currentUser.displayName,
            role: dbUser?.role || 'user',
          };

          setUser(updatedUser);
        } catch (error) {
          console.error('Failed to fetch user role:', error);
          setUser({ email: currentUser.email, role: 'user' });
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    logOut,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
