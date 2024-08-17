import { Box, Heading, Stack, Text, Avatar, Flex } from '@chakra-ui/react';
import { XTwitterButton, YouTubeButton } from '../components/SocialButton';

export const About = () => {
  return (
    <Box p={4}>
      <Heading
        fontWeight={600}
        fontSize={{ base: '3xl', sm: '3xl', md: '4xl' }} // モバイル時に少し大きく
        lineHeight={{ base: '160%', sm: '150%' }} // モバイル時に行間を少し広く
        mt={{ base: 6, sm: 8, md: 10 }} // 上部に余白を追加
      >
        <Text as={'span'} color={'black.400'}>
        推奨動作環境
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
          OS<br />
            ・Windows<br />
            ・Mac<br />
            ・Android<br />
            ・iOS<br />
            <br />
            推奨ブラウザ<br />
            ・Google Chrome 最新版<br />
            ・FireFox 最新版<br />
            ・Safari 最新版<br />
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
        免責事項
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
          当サイトの利用によって生じた、いかなるトラブル・損失・損害に対しても、当サイトの管理人は責任を負うものではありません。
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
        著作権
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
          当サイト内の文章・プログラムの著作権は当サイトの管理人に帰属します。無断での転載・複製・改変・販売・貸与などはお断りいたします。
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};
