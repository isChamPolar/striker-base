import React from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom'; 
import Nav from './Nav';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Nav />
      <Box ml={{ base: 0, md: 60 }} flex="1" p={4}>
        <Outlet /> {/* ページのコンテンツがここに表示されます */}
      </Box>
      <Box ml={{ base: 0, md: 60 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
