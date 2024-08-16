import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      900: '#1a202c', // Dark gray
      800: '#2D3748', // Gray
      700: '#4A5568', // Lighter gray
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#0D0D0D', // Very dark background
        color: 'white', // White text
      },
      a: {
        color: 'teal.500',
        _hover: {
          color: 'teal.300',
        },
      },
    },
  },
});

export default theme;
