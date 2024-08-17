'use client'

import {
  Box,
  Container,
  Stack,
  Text,
} from '@chakra-ui/react'
import { XTwitterButton, YouTubeButton } from './SocialButton'

export default function SmallCentered() {
  return (
    <Box
      bg={'gray.50'}
      color={'gray.700'}
      borderTopWidth={1}
      borderStyle={'solid'}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}>
        {/* <Logo /> */}
        <Stack direction={'row'} spacing={6}>
          <Box as="a" href={'#'}>
            Home
          </Box>
          <Box as="a" href={'#'}>
            About
          </Box>
          <Box as="a" href={'#'}>
            Blog
          </Box>
          <Box as="a" href={'#'}>
            Contact
          </Box>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={'gray.200'}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Text>© 2024 STRIKER BASE. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <XTwitterButton />
            <YouTubeButton />
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}