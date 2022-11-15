import { Heading } from '@chakra-ui/react';
import { parseCookies } from 'nookies';
import { NewHeader } from '../../components/NewHeader';
import { SettingsMenu } from '../../components/SettingsMenu';
import { EditProfileForm } from '../../components/SettingsMenu/EditProfileForm';
import { ServerSideUser } from '../../config/@types/user';
import { api } from '../../services/apiClient';
import { withSSRAuth } from '../../utils/withSSRAuth';

export default function EditProfile ({ user }: ServerSideUser) {
  return (
    <>
      <NewHeader pageTitle='Editar perfil - RedSterna' name={user.name} />
      <SettingsMenu>
        <Heading as='h2' fontSize={'md'}>Editar perfil</Heading>
        <EditProfileForm userId={user.id} />
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