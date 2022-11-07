import { Box, Grid, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import { DashboardMenu } from '../../components/DashboardMenu';


export default function Dashboard () {
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
        <Box p={'24px'}>
          <Heading
            as='h1'
            color={'gray.400'}
            fontSize={'1.5rem'}
            fontWeight={'normal'}
          >
            Painel Administrativo
          </Heading>
        </Box>
      </Grid>
    </>
  );
}