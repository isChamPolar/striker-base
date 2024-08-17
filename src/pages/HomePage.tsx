import { Box, Heading, Stack, Text, Avatar, Flex } from '@chakra-ui/react';
import { XTwitterButton, YouTubeButton } from '../components/SocialButton';

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
          py={4}
          maxW={'400px'}
          borderWidth={'2px'}
          borderRadius={'lg'}
          overflow={'hidden'}
          boxShadow={'md'}
          bg={'white'}
        >
          <Avatar
            src={'../public/owner-icon.png'}
            mb={4}
            w={24}
            h={24}
            border={'2px solid'}
            borderColor={'gray.200'}
          />
          <Text fontWeight={600} fontSize={'lg'}>
            よしちゃぽ
          </Text>
          <Text fontSize={'sm'} color={'gray.400'}>
            ストライカー / エンジニア
          </Text>
          <Flex
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={4}
            mt={4}
          >
            <Box>
              <XTwitterButton />
            </Box>
            <Box>
              <YouTubeButton />
            </Box>
          </Flex>
        </Box>
        <Box
          textAlign={'center'}
          py={6}
        >
          <Text fontSize={{ base: 'lg', md: '2xl' }} textAlign={'center'} maxW={'3xl'} lineHeight={{ base: '170%', md: '160%' }}>
            このサイトは、人気ゲームアプリ「モンスターストライク」を愛する全てのストライカーのために
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
        </Box>
      </Stack>
    </Box>
  );
};

export default HomePage;
