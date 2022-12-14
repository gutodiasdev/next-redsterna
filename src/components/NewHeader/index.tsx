import { Flex, HStack, Avatar, Icon, Divider, Menu, MenuList, MenuGroup, MenuItem, MenuButton, MenuDivider, useDisclosure, Skeleton } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { AiOutlineUserAdd, AiOutlineBell } from 'react-icons/ai';
import { BsSignpostSplit } from 'react-icons/bs';
import { CiRollingSuitcase } from 'react-icons/ci';
import { HiOutlineGlobeAmericas, HiOutlineUsers } from 'react-icons/hi2';
import { VscSignIn, VscSignOut } from 'react-icons/vsc';
import { AuthContext } from '../../contexts/AuthContext';
import { LoginModal } from '../LoginModal';

type HeaderProps = {
  name?: string;
  pageTitle?: string;
};

export function NewHeader ({ name, pageTitle }: HeaderProps) {
  const { signOut } = useContext(AuthContext);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      {pageTitle ? (
        <Head>
          <title>{pageTitle}</title>
        </Head>
      ) : null}

      <Flex maxWidth={'1100'} margin={'0 auto'} justify={'space-between'} py={'24px'}>
        <Link href={'/'}>
          <Image src='/images/desktop/header_logo.png' alt='RedSterna logo' width={150} height={100} />
        </Link>
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
          {name &&
            <Flex alignItems={'center'} gap={'4px'}>
              <Icon as={HiOutlineUsers} />
              <Link href={'/usuarios'}>Usuários</Link>
            </Flex>
          }


          {!name ? (
            <>
              <Flex alignItems={'center'} gap={'4px'}>
                <Icon as={AiOutlineUserAdd} />
                <Link href={'/cadastre-se'}>Cadastre-se</Link>
              </Flex>
              <Flex alignItems={'center'} gap={'4px'} onClick={onOpen} cursor={'pointer'}>
                <Icon as={VscSignIn} />
                Login
              </Flex>
            </>
          ) : (
            <Flex gap={'16px'} alignItems={'center'}>
              <HStack>
                <AiOutlineBell />
              </HStack>
              <Menu>
                <MenuButton>
                  <Divider orientation='vertical' />
                  <Flex alignItems={'center'} gap={'4px'} cursor={'pointer'} border={'1px'} p={'8px'} borderRadius={'99px'} borderColor={'gray.400'}>
                    <Avatar size={'sm'} />
                    <span>
                      {name}
                    </span>
                  </Flex>
                </MenuButton>
                <MenuList>
                  <MenuGroup>
                    <Link href={'/my-account'}>
                      <MenuItem display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                        Minha conta
                      </MenuItem>
                    </Link>
                    <MenuItem display={'flex'} alignItems={'center'} justifyContent={'space-between'} onClick={signOut}>
                      Sair
                      <VscSignOut />
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup>
                    <MenuItem>
                      <Link href={'/dashboard'}>
                        Painel Administrativo
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href={'/configuracoes'}>
                        Configurações
                      </Link>
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </Flex>
          )}
        </HStack>
      </Flex>
      <LoginModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
