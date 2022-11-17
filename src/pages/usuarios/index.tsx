import { Avatar, Box, Grid, GridItem, Heading, Input } from '@chakra-ui/react';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { useQuery } from 'react-query';
import Footer from '../../components/Footer';
import { NewHeader } from '../../components/NewHeader';
import { ServerSideUser } from '../../config/@types/user';
import { api } from '../../services/apiClient';
import { withSSRAuth } from '../../utils/withSSRAuth';

export default function AllUsers ({ user }: ServerSideUser) {
  const fetchUsers = async () => {
    const { data } = await api.get('/user/all');
    let updatedList = [...data.data];
    updatedList.splice(data.data.indexOf(user.id, 1));
    return updatedList;
  };

  const users = useQuery(['allUsers', user], fetchUsers, { staleTime: 1000 * 10 });

  return (
    <>
      <NewHeader pageTitle='RedSterna - Todos os Usuários' name={user.name} />
      <Box width={'1100px'} minHeight={'512px'} margin={'0 auto'} pb={'40px'}>
        <Box as='form'>
          <Input />
        </Box>
        <Grid gridTemplateColumns={'repeat(4, 1fr)'}>
          {users.data?.map((user, index) => {
            return (
              <Link href={`/usuarios/${user.id}`} key={index}>
                <GridItem display={'flex'} flexDirection={'column'} alignItems={'center'} p={'32px'} boxShadow={'md'} borderRadius={'lg'}>
                  <Avatar src={user.pictures?.cover} name={user.name} size={'xl'} />
                  <Heading as='h2' textAlign={'center'} fontSize={'md'} color={'gray.700'}>{user.name}</Heading>
                </GridItem>
              </Link>
            );
          })}
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