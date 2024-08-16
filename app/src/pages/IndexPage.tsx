import React from 'react';
import { Container, Heading, Text } from '@chakra-ui/react';

const IndexPage = () => {
  return (
    <Container maxW="container.xl" py={6}>
      <Heading>Welcome to Striker Base</Heading>
      <Text mt={4}>Find the best tools and resources for your gameplay!</Text>
    </Container>
  );
};

export default IndexPage;
