import React from 'react';
import { AuthProvider } from '../hocs/AuthContext';
import Login from './Login';
import './App.css';

function App () {
  return (
    <AuthProvider>
      <div className='App'>
        <Login />
      </div>
    </AuthProvider>
  )
}

export default App;
