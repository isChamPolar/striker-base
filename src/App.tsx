import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import AppRoutes from './routes/Routes';
import Footer from './components/Footer';
import theme from './theme';
import Navbar from './components/Navbar';

const App = () => (
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
);

export default App;
