import { Box, Heading, Stack, Text } from '@chakra-ui/react';

export const Policy = () => {
  return (
    <Box p={4}>
      <Heading
        fontWeight={600}
        fontSize={{ base: '3xl', sm: '3xl', md: '4xl' }} // モバイル時に少し大きく
        lineHeight={{ base: '160%', sm: '150%' }} // モバイル時に行間を少し広く
        mt={{ base: 6, sm: 8, md: 10 }} // 上部に余白を追加
      >
        <Text as={'span'} color={'black.400'}>
        個人情報の保護・管理についての基本方針
        </Text>
      </Heading>
      <Stack
        py={6}
        px={5}
        spacing={{ base: 4, md: 5 }}
        direction={'column'}>
        <Box
          py={6}
        >
          <Text fontSize={{ base: 'lg', md: '2xl' }} maxW={'3xl'} lineHeight={{ base: '170%', md: '160%' }}>
          当サイト「STRIKER BASE」では、サイトをご利用される訪問者様の個人情報について、個人情報に関して適用される日本の法令を遵守し、適切な管理体制のもと、その保護に努めます。
          </Text>
        </Box>
      </Stack>
      <Heading
        fontWeight={600}
        fontSize={{ base: '3xl', sm: '3xl', md: '4xl' }} // モバイル時に少し大きく
        lineHeight={{ base: '160%', sm: '150%' }} // モバイル時に行間を少し広く
        mt={{ base: 6, sm: 8, md: 10 }} // 上部に余白を追加
      >
        <Text as={'span'} color={'black.400'}>
        お問い合わせについて
        </Text>
      </Heading>
      <Stack
        py={6}
        px={5}
        spacing={{ base: 4, md: 5 }}
        direction={'column'}>
        <Box
          py={6}
        >
          <Text fontSize={{ base: 'lg', md: '2xl' }} maxW={'3xl'} lineHeight={{ base: '170%', md: '160%' }}>
          当サイト「STRIKER BASE」では、管理者のXアカウントを通じてお問い合わせを受け付けております。お問い合わせいただいた内容については、できる限り迅速に対応いたしますが、返信をお約束するものではありません。
          </Text>
        </Box>
      </Stack>
      <Heading
        fontWeight={600}
        fontSize={{ base: '3xl', sm: '3xl', md: '4xl' }} // モバイル時に少し大きく
        lineHeight={{ base: '160%', sm: '150%' }} // モバイル時に行間を少し広く
        mt={{ base: 6, sm: 8, md: 10 }} // 上部に余白を追加
      >
        <Text as={'span'} color={'black.400'}>
        Cookieの使用について
        </Text>
      </Heading>
      <Stack
        py={6}
        px={5}
        spacing={{ base: 4, md: 5 }}
        direction={'column'}>
        <Box
          py={6}
        >
          <Text fontSize={{ base: 'lg', md: '2xl' }} maxW={'3xl'} lineHeight={{ base: '170%', md: '160%' }}>
          当サイト「STRIKER BASE」では、訪問者様によりよいサイト体験を提供するために、Cookieを使用しています。Cookieの使用については、訪問者様がブラウザの設定でCookieを無効化することができます。
          無効化することで、一部の機能が制限される場合がありますので、予めご了承ください。
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};
