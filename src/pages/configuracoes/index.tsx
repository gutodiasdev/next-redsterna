import { Box, Flex, Grid, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { NewHeader } from '../../components/NewHeader';
import { SettingsMenu } from '../../components/SettingsMenu';
import { ServerSideUser } from '../../config/@types/user';
import { api } from '../../services/apiClient';
import { withSSRAuth } from '../../utils/withSSRAuth';

export default function Settings ({ user }: ServerSideUser) {
  return (
    <>
      <NewHeader pageTitle='RedSterna - Configurações da conta' name={user.name} />
      <SettingsMenu>
        <Heading as='h2' fontSize={'md'}>Configurações</Heading>
      </SettingsMenu>
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