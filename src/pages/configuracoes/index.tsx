import { Box, Flex, Grid, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { NewHeader } from '../../components/NewHeader';
import { SettingsMenu } from '../../components/SettingsMenu';

export default function Settings () {
  return (
    <>
      <NewHeader pageTitle='RedSterna - Configurações da conta' />
      <SettingsMenu>
        <Heading as='h2' fontSize={'md'}>Configurações</Heading>
      </SettingsMenu>
    </>
  );
}