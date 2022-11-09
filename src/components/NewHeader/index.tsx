import { Flex, HStack, Avatar, Icon, Divider, Menu, MenuList, MenuGroup, MenuItem, MenuButton, MenuDivider, useDisclosure, Skeleton } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { AiOutlineUserAdd, AiOutlineBell } from 'react-icons/ai';
import { BsSignpostSplit } from 'react-icons/bs';
import { CiRollingSuitcase } from 'react-icons/ci';
import { HiOutlineGlobeAmericas } from 'react-icons/hi2';
import { VscSignIn, VscSignOut } from 'react-icons/vsc';
import { useQuery } from 'react-query';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/apiClient';
import { LoginModal } from '../LoginModal';

type HeaderProps = {
  name?: string;
};

type UserProfile = {
  id: string,
  email: string,
  name: string,
  image: string | null,
  pictures: string | null;
};

export function NewHeader ({ name }: HeaderProps) {
  const { isAuthenticated, user, signOut } = useContext(AuthContext);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { data, isLoading } = useQuery(['user', String(user?.id)], async () => {
    const { data } = await api.get<UserProfile>(`/user/profile/${String(user?.id)}`);

    return data;
  }, {
    staleTime: 1000 * 60 * 5
  });

  return (
    <>
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

          {!isAuthenticated || isLoading ? (
            <>
              <Flex alignItems={'center'} gap={'4px'}>
                <Icon as={AiOutlineUserAdd} />
                <Link href={'/cadastre-se'}>Cadastre-se</Link>
              </Flex>
              <Flex alignItems={'center'} gap={'4px'} onClick={onOpen}>
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
                    <Skeleton isLoaded={!isLoading}>
                      <span>
                        {data?.name}
                      </span>
                    </Skeleton>
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
                      Configurações
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
