import React from 'react';
import { Container, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';

const IndexPage = () => {
  return (
    <Container maxW={'12xl'}>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            fontWeight={600}
            fontSize={'sm'}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            Our Story
          </Text>
          <Heading>A digital Product design agency</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
            eirmod tempor invidunt ut labore
          </Text>
        </Stack>
    </Container>
  );
};

export default IndexPage;
