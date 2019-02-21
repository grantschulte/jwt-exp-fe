import React, { createContext, useState, useEffect } from 'react';
import * as api from '../services/api.service';

const AuthContext = createContext({});

export function AuthProvider (props) {
  let [user, setUser] = useState(null);
  let [error, setError] = useState(null);

  const login = async (username, password) => {
    setError(null);

    try {
      let user = await api.login(username, password);
      window.localStorage.setItem('__token', user.token);
      setUser(user);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('__token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      error
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export function withAuth (WrappedComponent) {
  return function (props) {
    return (
      <AuthContext.Consumer>
        {auth => (
          <WrappedComponent
            {...props}
            auth={auth}  />
        )}
      </AuthContext.Consumer>
    );
  };
}