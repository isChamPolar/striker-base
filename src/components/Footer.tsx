'use client'

import {
  Box,
  Container,
  Link,
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
      borderColor={'gray.200'}
      pb={{ base: 'env(safe-area-inset-bottom)', md: 0 }} // PWA時に余白を追加
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={2}
        justify={'center'}
        align={'center'}>
        <Stack direction={'row'} spacing={5}>
          <Box as="a" href={'/'} fontSize={12}>
            トップ
          </Box>
          <Box as="a" href={'/about'} fontSize={12}>
            ご利用について
          </Box>
          <Box as="a" href={'/privacy-policy'} fontSize={12}>
            プライバシーポリシー
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
          <Stack direction={'row'} spacing={6}>
            <XTwitterButton />
            <YouTubeButton />
          </Stack>
          <Text>© 2024 STRIKER BASE. All rights reserved</Text>
        </Container>
      </Box>
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
          align={{ base: 'center', md: 'center' }}
          fontSize={12}
        >
          <Text>モンスターストライクはXFLAG様が配信するiOS・Android用ゲームアプリです。</Text>
          <Link href='https://www.monster-strike.com/'>▶モンスターストライク公式サイト</Link>
        </Container>
      </Box>
    </Box>
  )
}
