import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import AppRoutes from './routes/Routes';
import Footer from './components/Footer';
import theme from './theme';
import Navbar from './components/Navbar';
import { HelmetProvider } from 'react-helmet-async';

const App = () => (
  <HelmetProvider>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Navbar />
          <Box as="main" flex="1">
            <AppRoutes />
          </Box>
          <Footer />
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  </HelmetProvider>
);

export default App;
