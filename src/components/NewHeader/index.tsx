import { Flex, HStack, Avatar, Icon } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { AiOutlineUserAdd, AiOutlineBell } from 'react-icons/ai';
import { BsSignpostSplit } from 'react-icons/bs';
import { CiRollingSuitcase } from 'react-icons/ci';
import { HiOutlineGlobeAmericas } from 'react-icons/hi2';
import { VscSignIn } from 'react-icons/vsc';
import { Divider } from 'semantic-ui-react';
import { AuthContext } from '../../contexts/AuthContext';

export function NewHeader () {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <Flex maxWidth={'1100'} margin={'0 auto'} justify={'space-between'} py={'24px'}>
      <Image src='/images/desktop/header_logo.png' alt='RedSterna logo' width={150} height={100} />
      <HStack as='nav' spacing={'32px'}>
        <Flex alignItems={'center'} gap={'4px'}>
          <Icon as={HiOutlineGlobeAmericas} />
          <Link href={'/mapa'}>Mapa Interativo</Link>
        </Flex>
        <Flex alignItems={'center'} gap={'4px'}>
          <Icon as={CiRollingSuitcase} />
          <Link href={'/destinos'}>Destinos</Link>
        </Flex>
        <Flex alignItems={'center'} gap={'4px'}>
          <Icon as={BsSignpostSplit} />
          <Link href={'/dicas-de-viagem'}>Dicas de Viagem</Link>
        </Flex>

        {!isAuthenticated ? (
          <>
            <Flex alignItems={'center'} gap={'4px'}>
              <Icon as={AiOutlineUserAdd} />
              <Link href={'/cadastre-se'}>Cadastre-se</Link>
            </Flex>
            <Flex alignItems={'center'} gap={'4px'}>
              <Icon as={VscSignIn} />
              <Link href={'/login'}>Login</Link>
            </Flex>
          </>
        ) : (
          <Flex gap={'16px'} alignItems={'center'}>
            <HStack>
              <AiOutlineBell />
            </HStack>
            <Divider orientation='vertical' />
            <Flex alignItems={'center'} gap={'4px'} cursor={'pointer'} border={'1px'} p={'8px'} borderRadius={'99px'} borderColor={'gray.400'}>
              <Avatar size={'sm'} />
              <span>
                Nome de Exemplo
              </span>
            </Flex>
          </Flex>
        )}
      </HStack>
    </Flex>
  );
}
