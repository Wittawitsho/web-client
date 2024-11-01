import React from 'react';
import { Outlet } from 'react-router-dom';
import useWebStore from '../store/web-store';
import Navbar from '../components/Navbar';
import Navbar_user from '../components/Navbar_user';

const Layout = () => {
  const token = useWebStore((state) => state.token);

  return (
    <>
      {token ? <Navbar_user /> : <Navbar />}
      <Outlet /> {/* This will render the child routes */}
    </>
  );
};

export default Layout;
