import { Box, Flex, Grid, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { BsGear } from 'react-icons/bs';
import { MdOutlinePersonOutline } from 'react-icons/md';

type SettingsMenuProps = {
  children: ReactNode;
};

export function SettingsMenu ({ children }: SettingsMenuProps) {
  return (
    <Grid gridTemplateColumns={'auto 1fr'} maxWidth={'1100px'} margin={'0 auto'} border={'1px'} borderColor={'gray.300'} borderRadius={'lg'} my={'16px'}>
      <Flex
        flexDirection={'column'}
        p={'16px'}
        gap={'24px'}
        borderRight={'1px'}
        width={'240px'}
        borderColor={'gray.300'}
      >
        <Link href={'/configuracoes'}>
          <Flex gap={'8px'} alignItems={'center'}>
            <BsGear />
            Configurações
          </Flex>
        </Link>
        <Link href={'/configuracoes/editar-perfil'}>
          <Flex gap={'8px'} alignItems={'center'}>
            <MdOutlinePersonOutline />
            Editar perfil
          </Flex>
        </Link>
      </Flex>
      <Box p={'16px'}>
        {children}
      </Box>
    </Grid>
  );
}