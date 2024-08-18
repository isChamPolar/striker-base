import { Box, Button, Text, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { cookieManager } from '../lib/cookieManager';

const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const consent = cookieManager.getCookie('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    cookieManager.setCookie('cookie_consent', 'accepted', 30); // 30日間クッキー同意を保存
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <Box
          position="fixed"
          bottom="env(safe-area-inset-bottom)"
          width="100%"
          bg="rgba(255, 255, 255, 0.8)"
          color="gray.800"
          py={2}
          px={4}
          zIndex={1000}
          boxShadow="0px -2px 10px rgba(0, 0, 0, 0.1)"
        >
          <Flex
            justifyContent="space-between"
            alignItems="center"
            flexDirection={{ base: 'column', md: 'row' }}
            textAlign={{ base: 'center', md: 'left' }}
          >
            <Text fontSize="sm" mb={{ base: 2, md: 0 }} color="gray.700">
              このサイトでは、ユーザー体験を向上させるためにCookieを使用しています。詳細はプライバシーポリシーをご覧ください。
            </Text>
            <Button
              colorScheme="gray"
              variant="outline"
              onClick={handleAccept}
              size="sm"
              width={{ base: '80%', md: 'auto' }}
              minW={{ base: '80%', md: '100px' }}
              px={4}
              py={2}
              color="black" // テキストカラーを黒に設定
              borderColor="gray.600" // ボタンの枠線カラーを濃いグレーに設定
            >
              同意する
            </Button>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default CookieConsentBanner;
