import React from 'react';
import Nav from './Nav';
import { Box } from '@chakra-ui/react';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box>
      <Nav />
      <Box as="main" flex="1">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
