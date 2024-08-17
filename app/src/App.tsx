import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import AppRoutes from './routes/Routes';
import theme from './theme';  // カスタムテーマをインポート
import Footer from './components/Footer';

const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Box display="flex" flexDirection="column" minHeight="100vh" bg="white">
        {/* <Navbar /> */}
        <Box as="main" flex="1" bg="white">
          <AppRoutes />
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  </ChakraProvider>
);

export default App;
