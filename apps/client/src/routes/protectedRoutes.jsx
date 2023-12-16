import React from 'react';
import { Navigate, Routes } from 'react-router-dom';

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const ProtectedRoutes = ({ children }) => {
  if (isAuthenticated()) {
    return <Routes>{children}</Routes>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;