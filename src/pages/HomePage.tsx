import { Box, Heading, Stack, Text, Avatar, Flex, VStack, Link } from '@chakra-ui/react';
import { XTwitterButton, YouTubeButton } from '../components/SocialButton';
import React from 'react';
import { getReleaseNotes } from '../constants/releaseNotes';

const HomePage = () => {
  return (
    <Box p={4}>
      <Heading
        fontWeight={600}
        fontSize={{ base: '3xl', sm: '3xl', md: '4xl' }}
        lineHeight={{ base: '160%', sm: '150%' }}
        mt={{ base: 6, sm: 8, md: 10 }}
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
        direction={'column'}
      >
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
            src={'/owner-icon.png'}
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
          <Text fontSize={{ base: 'lg', md: '2xl' }} textAlign={'center'} maxW={'4xl'} lineHeight={{ base: '170%', md: '160%' }}>
            STRIKER BASEは、人気ゲームアプリ「モンスターストライク」を愛する全てのストライカーのために
            <br />
            便利なツールや攻略情報を提供いたします。
            <br />
            「こういったツールが欲しかった」
            「こんな情報が知りたかった」
            <br />
            という声にお応えします。
            <br />
            誠心誠意、全力でサポートします。
          </Text>
        </Box>
        <Box
          mt={8}
          p={6}
          maxW={'3xl'}
          borderWidth={'1px'}
          borderRadius={'lg'}
          boxShadow={'xl'}
          bg={'gray.50'} // 背景色を変更
          w={'full'} // 親要素いっぱいに広げる
        >
          <Heading
            fontSize={'xl'}
            fontWeight={600}
            color={'black.400'}
            mb={4}
          >
            リリースノート
          </Heading>
          <VStack align={'start'} spacing={4} w={'full'}>
            {getReleaseNotes().slice(0, 3).map((note, index) => (
              <Box
                key={index}
                p={4}
                bg={'white'}
                borderRadius={'md'}
                boxShadow={'md'} // カードの影を追加
                w={'full'} // 親要素いっぱいに広げる
              >
                <Text fontSize={'md'} fontWeight={600} color={'gray.400'}>
                  {note.date}
                </Text>
                <Text fontSize={'lg'} fontWeight={700} color={'black.400'} mt={2}>
                  {note.title}
                </Text>
              </Box>
            ))}
          </VStack>
          <Link href="/release-notes" color={'blue.500'} fontWeight={600} mt={4} display={'block'}>
            リリースノート一覧を見る
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};

export default HomePage;