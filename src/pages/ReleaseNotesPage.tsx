import { Box, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { releaseNotes } from '../constants/releaseNotes';

// 改行コードを <br /> タグに変換する関数
const formatContentWithBreaks = (content) => {
  return content.split('\n').map((part, index) => (
    <React.Fragment key={index}>
      {part}
      {index < content.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
};

const ReleaseNotesPage = () => {
  return (
    <Box p={4}>
      <Heading
        fontWeight={600}
        fontSize={{ base: '2xl', sm: '2xl', md: '3xl' }}
        lineHeight={{ base: '160%', sm: '150%' }}
        mb={4}
      >
        リリースノート
      </Heading>
      <VStack align={'start'} spacing={6}>
        {releaseNotes.map((note, index) => (
          <Box
            key={index}
            p={6}
            bg={'white'}
            borderRadius={'md'}
            boxShadow={'md'} // カードの影を追加
            w={'full'}
          >
            <Text fontSize={'md'} fontWeight={600} color={'gray.400'} mt={2}>
              {note.date}
            </Text>
            <Text fontSize={'lg'} fontWeight={700} color={'black.400'}>
              {note.title}
            </Text>
            <Text mt={2} color={'gray.800'}>
              {formatContentWithBreaks(note.content)}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default ReleaseNotesPage;