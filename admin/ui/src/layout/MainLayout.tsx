import React from 'react';
import Navbar from '../components/Navbar';
import NetworkActivityIndicator from '../components/NetworkActivityIndicator';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Navbar />
      <NetworkActivityIndicator />
      {children}
    </>
  );
};

export default MainLayout;
