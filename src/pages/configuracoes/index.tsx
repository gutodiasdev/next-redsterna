import { Box, Button, Flex, Grid, Heading, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { ExcludeAccountModal } from '../../components/Modals/ExcludeAccountModal';
import { NewHeader } from '../../components/NewHeader';
import { SettingsMenu } from '../../components/SettingsMenu';
import { ServerSideUser } from '../../config/@types/user';
import { api } from '../../services/apiClient';
import { withSSRAuth } from '../../utils/withSSRAuth';

export default function Settings ({ user }: ServerSideUser) {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <NewHeader pageTitle='RedSterna - Configurações da conta' name={user.name} />
      <SettingsMenu>
        <Heading as='h2' fontSize={'md'}>Configurações</Heading>
        <Box my={'16px'}>
          <Button colorScheme={'red'} variant={'outline'} float={'right'} onClick={onOpen}>
            Excluir Conta
          </Button>
        </Box>
      </SettingsMenu>
      <ExcludeAccountModal isOpen={isOpen} onClose={onClose} user={user.id} />
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