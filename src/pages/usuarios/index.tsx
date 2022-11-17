import { Box } from '@chakra-ui/react';
import { parseCookies } from 'nookies';
import Footer from '../../components/Footer';
import { NewHeader } from '../../components/NewHeader';
import { ServerSideUser } from '../../config/@types/user';
import { api } from '../../services/apiClient';
import { withSSRAuth } from '../../utils/withSSRAuth';

export default function AllUsers ({ user }: ServerSideUser) {
  return (
    <>
      <NewHeader pageTitle='RedSterna - Todos os Usuários' name={user.name} />
      <Box width={'1100px'} margin={'0 auto'}>
        Todos usuários
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