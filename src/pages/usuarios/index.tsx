import { Avatar, Box, Button, Flex, Grid, GridItem, Heading, Input } from '@chakra-ui/react';
import { debounce } from 'debounce';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useQuery } from 'react-query';
import Footer from '../../components/Footer';
import { NewHeader } from '../../components/NewHeader';
import { ServerSideUser } from '../../config/@types/user';
import { api } from '../../services/apiClient';
import { withSSRAuth } from '../../utils/withSSRAuth';

export default function AllUsers ({ user }: ServerSideUser) {
  const [searchUser, setSearchUser] = useState('');

  const fetchUsers = async () => {
    const { data } = await api.get('/user/all');
    return data.data;
  };
  const users = useQuery(['allUsers'], fetchUsers, { staleTime: 1000 * 10 });

  const filterUsers = async () => {
    if (searchUser.length >= 3) {
      const { data } = await api.get('/user/findByname', { params: { searchName: searchUser } });
      return data.data;
    }
  };

  const filtered = useQuery(['filteredUsers'], filterUsers, { staleTime: 1000 * 60 * 5 });

  const handleSearchUser = (value: any) => {
    setSearchUser(value);
  };

  return (
    <>
      <NewHeader pageTitle='RedSterna - Todos os Usuários' name={user.name} />
      <Box width={'1100px'} minHeight={'512px'} margin={'0 auto'} pb={'40px'}>
        <Box as='form' my={'16px'}>
          <Flex gap={'16px'}>
            <Input size={'lg'} onChange={(e) => handleSearchUser(e.target.value)} />
            <Button leftIcon={<HiMagnifyingGlass />} px={'24px'} size={'lg'} onClick={() => filtered.refetch()}>
              Buscar Usuário
            </Button>
          </Flex>
        </Box>
        <Grid gridTemplateColumns={'repeat(4, 1fr)'} gap={'24px'} py={'24px'}>
          {filtered.data ? (
            filtered.data?.map((user: any, index: number) => {
              return (
                <Link href={`/usuarios/${user.id}`} key={index}>
                  <GridItem display={'flex'} flexDirection={'column'} alignItems={'center'} p={'32px'} boxShadow={'md'} borderRadius={'lg'}>
                    <Avatar src={user.pictures?.profile} name={user.name} size={'xl'} />
                    <Heading as='h2' textAlign={'center'} fontSize={'md'} color={'gray.700'}>{user.name}</Heading>
                  </GridItem>
                </Link>
              );
            })
          ) : (
            users.data?.map((user: any, index: number) => {
              return (
                <Link href={`/usuarios/${user.id}`} key={index}>
                  <GridItem display={'flex'} flexDirection={'column'} alignItems={'center'} p={'32px'} boxShadow={'md'} borderRadius={'lg'}>
                    <Avatar src={user.pictures?.profile} name={user.name} size={'xl'} />
                    <Heading as='h2' textAlign={'center'} fontSize={'md'} color={'gray.700'} mt={'16px'}>{user.name}</Heading>
                  </GridItem>
                </Link>
              );
            })
          )}
        </Grid>
      </Box>
      <Footer />
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const cookies = parseCookies(ctx);
  const token = cookies['redsterna.token'];

  const { data: user } = await api.get('/user/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return {
    props: {
      user
    }
  };
});