import { Box, Heading, Stack, Text, Avatar } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Box p={4}>
      <Heading
        fontWeight={600}
        fontSize={{ base: '3xl', sm: '3xl', md: '4xl' }} // モバイル時に少し大きく
        lineHeight={{ base: '160%', sm: '150%' }} // モバイル時に行間を少し広く
        mt={{ base: 6, sm: 8, md: 10 }} // 上部に余白を追加
      >
        <Text as={'span'} color={'black.400'}>
          ようこそ <br />
        </Text>
        <Text as={'span'} color={'blue.400'}>
          STRIKER BASEへ
        </Text>
      </Heading>
      <Stack
        py={6}
        px={5}
        spacing={{ base: 4, md: 5 }}
        align={'center'}
        direction={'column'}>
        <Box
          textAlign={'center'}
          px={6}
        >
          <Avatar
            src={
              '../public/owner-icon.png'
            }
            mb={2}
            w={24}
            h={24}
            style={{ borderRadius: '50%' }}
            border={'2px solid'}
            borderColor={'gray.200'}
          />
          <Text fontWeight={600}>よしちゃぽ</Text>
          <Text fontSize={'sm'} color={'gray.400'}>
            開発者 / ストライカー
          </Text>
        </Box>
        <Text fontSize={{ base: 'lg', md: '2xl' }} textAlign={'center'} maxW={'3xl'} lineHeight={{ base: '170%', md: '160%' }}>
          このサイトは、全てのストライカーのために
          <br />
          便利なツールや攻略情報を提供するサイトです。
          <br />
          「こういったツールが欲しかった」
          「こんな情報が知りたかった」
          <br />
          という声にお応えします。
          <br />
          誠心誠意、全力でサポートします。
        </Text>
      </Stack>
    </Box>
  );
};

export default HomePage;
