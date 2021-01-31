import React, { useState, createContext } from 'react';

export const AuthContext = createContext({
  userLogged: Boolean,
  setUserLogged: () => { },
});

export const AuthProvider = () => {
  const [userLogged, setUserLogged] = useState(false);

  return (
    <AuthContext.Provider value={{ userLogged, setUserLogged }} />
  );
};
