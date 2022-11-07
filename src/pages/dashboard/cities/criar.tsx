import { Box, Button, Grid, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { useContext } from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { CreateCityForm } from '../../../components/Dashboard/CreateCityForm';
import { DashboardMenu } from '../../../components/DashboardMenu';
import { AuthContext } from '../../../contexts/AuthContext';

export default function DashboardCreateCity () {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>RedSterna - Painel Administrativo</title>
      </Head>
      <Grid
        gridTemplateColumns={'auto 1fr'}
        height={'100vh'}
      >
        <DashboardMenu />
        <Box p={'24px'} w={{ lg: '40%' }}>
          <Link href={'/dashboard/cities'}>
            <Button leftIcon={<MdOutlineKeyboardArrowLeft />} colorScheme={'red'} variant={'outline'}>
              Voltar
            </Button>
          </Link>
          <Heading
            as='h1'
            color={'gray.400'}
            fontSize={'1.5rem'}
            fontWeight={'normal'}
            mt={'32px'}
          >
            Criar cidade
          </Heading>
          <Box py={'40px'}>
            <CreateCityForm userId={String(user?.id)} />
          </Box>
        </Box>
      </Grid>
    </>
  );
}
