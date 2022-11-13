import { Heading } from '@chakra-ui/react';
import { NewHeader } from '../../components/NewHeader';
import { SettingsMenu } from '../../components/SettingsMenu';

export default function EditProfile () {

  return (
    <>
      <NewHeader pageTitle='Editar perfil - RedSterna' />
      <SettingsMenu>
        <Heading as='h2' fontSize={'md'}>Editar perfil</Heading>
      </SettingsMenu>
    </>
  );
}