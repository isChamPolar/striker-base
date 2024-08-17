import { chakra, VisuallyHidden } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const SocialButton = ({
    children,
    label,
    href,
  }: {
    children: ReactNode
    label: string
    href: string
  }) => {
    return (
      <chakra.button
        bg={'blackAlpha.100'}
        rounded={'full'}
        w={12}
        h={12}
        cursor={'pointer'}
        as={'a'}
        href={href}
        display={'inline-flex'}
        alignItems={'center'}
        justifyContent={'center'}
        transition={'background 0.3s ease'}
        _hover={{
          bg: 'blackAlpha.200',
        }}>
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </chakra.button>
    )
}
  
const XTwitterButton: React.FC = () => {
    return (
        <SocialButton label={'X'} href={'https://x.com/isChamPolar'}>
            <FaXTwitter />
        </SocialButton>
    );
};

const YouTubeButton: React.FC = () => {
    return (
        <SocialButton label={'YouTube'} href={'https://www.youtube.com/@isChamPolar'}>
            <FaYoutube />
        </SocialButton>
    );
};

export { XTwitterButton, YouTubeButton };