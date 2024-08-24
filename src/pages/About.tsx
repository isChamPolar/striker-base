import { Box, Heading, Stack, Text, Link, IconButton, useClipboard, Flex } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { useState } from 'react';

export const About = () => {
  const textToCopy = `STRIKER BASE: https://striker-base.com\nSTRIKER BASE開発者 よしちゃぽ: https://x.com/isChamPolar`;
  const { hasCopied, onCopy } = useClipboard(textToCopy);

  const handleCopy = () => {
    onCopy();
  };

  return (
    <Box p={4}>
      <Box mb={6}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '3xl', md: '4xl' }} // モバイル時に少し大きく
          lineHeight={{ base: '160%', sm: '150%' }} // モバイル時に行間を少し広く
          mt={{ base: 6, sm: 8, md: 10 }} // 上部に余白を追加
        >
          <Text as={'span'} color={'black.400'}>
            配信や動画でご利用いただく際のお願い
          </Text>
        </Heading>
        <Stack
          py={6}
          px={5}
          spacing={{ base: 4, md: 5 }}
          direction={'column'}>
          <Box py={6}>
            <Text fontSize={{ base: 'lg', md: '2xl' }} maxW={'3xl'} lineHeight={{ base: '170%', md: '160%' }}>
              このツールを配信や動画でご利用いただく際は、概要欄等に以下のテキストを記載いただけると幸いです。なお、これらのテキストを掲載いただければ、特に制限なくご自由にお使いいただけます。
            </Text>
            <Flex mt={4} justifyContent="space-between" alignItems="center">
              <Text fontSize={{ base: 'lg', md: 'xl' }}>
                STRIKER BASE: <Link href="https://striker-base.com" isExternal color="blue.500">https://striker-base.com</Link><br />
                STRIKER BASE開発者 よしちゃぽ: <Link href="https://x.com/isChamPolar" isExternal color="blue.500">https://x.com/isChamPolar</Link>
              </Text>
              <IconButton
                onClick={handleCopy}
                icon={<CopyIcon />}
                aria-label="コピーする"
                colorScheme="teal"
                size="md"
                ml={2}
              />
            </Flex>
          </Box>
        </Stack>
      </Box>
      
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
        <Box py={6}>
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
        <Box py={6}>
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
        <Box py={6}>
          <Text fontSize={{ base: 'lg', md: '2xl' }} maxW={'3xl'} lineHeight={{ base: '170%', md: '160%' }}>
            本サイトは、モンスターストライクのファンサイトとして運営されており、株式会社MIXI様および関連会社とは一切関係ありません。<br /><br />
            「モンスターストライク」およびその関連する商標、ロゴ、キャラクターの名称、ならびにモンスターのステータス情報は、株式会社MIXIの登録商標および知的財産です。<br /><br />
            本サイトに掲載されているすべてのオリジナルコンテンツ（独自に作成されたテキスト、画像、コードなど）は、STRIKER BASEに帰属します。これらのコンテンツの無断転載や再配布を禁止します。<br /><br />
            万が一、著作権または商標権の侵害が疑われる場合は、速やかに対応させていただきますので、開発者Xアカウントまでご連絡ください。
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};
