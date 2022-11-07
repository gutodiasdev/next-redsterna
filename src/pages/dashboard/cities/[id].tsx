import { Box, Button, Grid } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { DashboardMenu } from '../../../components/DashboardMenu';

export default function SingleCity () {
  const router = useRouter();
  const { id } = router.query;
  const singleCityId = String(id);

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
        </Box>
      </Grid>
    </>
  );
}