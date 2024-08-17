import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: 'black',
        bg: 'white',
      },
    },
  },
  fonts: {
    heading: `'Noto Sans JP', sans-serif`,
    body: `'Noto Sans JP', sans-serif`,
  },
  config: {
    initialColorMode: 'light', // 初期カラー モードをライト モードに設定
    useSystemColorMode: false, // システムカラー モードの使用を無効化
  },
});

export default theme;
