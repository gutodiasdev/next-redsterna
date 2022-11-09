import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Heading, Skeleton,
  useToast
} from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import { parseCookies } from 'nookies';
import { useContext, useState } from 'react';
import {
  AiFillHeart, AiOutlineHeart
} from 'react-icons/ai';
import { useMutation, useQuery } from 'react-query';
import { MyAccountCreateMenu } from '../components/MyAccountCreateMenu';
import { MyDestinations } from '../components/MyDesinations';
import { NewHeader } from '../components/NewHeader';
import { apiUrlProvider } from '../config';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';

type UserProfile = {
  id: string,
  email: string,
  name: string,
  image: string | null,
  pictures: string | null;
};

type AccountProps = {
  user: {
    id: string;
    email: string;
    name: string | null;
    image: string | null;
    pictures: string | null;
  };
};

export default function MyAccountPage () {
  const { user } = useContext(AuthContext);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isSameUser, setIsSameUser] = useState(true);
  const toast = useToast();

  console.log(user);

  const followMutation = useMutation(async () => {
    await api.post('/user/follow', {
      followee: 'ID DO USUÁRIO A SER SEGUIDO',
      follower: 'ID DO USUÁRIO QUE IRÁ SEGUIR O USUÁRIO',
    });
  }, {
    onError: () => {
      toast({
        status: 'error',
        title: 'Não foi possível executar a requisição'
      });
    }
  });

  const unfollowMutation = useMutation(async () => {
    await api.post('/user/follow', {
      followId: 'ID DO RELACIONAMENTO DE FOLLOW'
    });
  }, {
    onError: () => {
      toast({
        status: 'error',
        title: 'Não foi possível executar a requisição'
      });
    }
  });

  const handleFollowUnfollow = () => {
    if (!isFollowed) {
      followMutation.mutateAsync().then(() => setIsFollowed(true));
    } else {
      unfollowMutation.mutateAsync().then(() => setIsFollowed(false));
    }
  };

  return (
    <>
      <Head>
        <title>Minha Conta - RedSterna</title>
      </Head>
      <NewHeader name={user?.name || 'Bem vindo'} />
      <Grid maxWidth={'1400'} justifyContent={'center'} margin={'0 auto'}>
        <Flex maxWidth={'100%'} justify={'center'}>
          <Box borderRadius={'16px'} overflow={'hidden'}>
            <Image src='/images/background_header.jpg' alt={'Header'} width={'1100'} height={'300'} placeholder='blur' blurDataURL='/images/background_header.jpg' />
          </Box>
        </Flex>
        <Grid
          gridTemplateColumns={'auto 1fr'}
          px={'40px'}
          pt={'16px'}
          gap={'32px'}
          minHeight={'160px'}
          alignItems={'flex-start'}
        >
          <Avatar size={'2xl'} mt={'-72px'} name={user?.name || 'Bem vindo'} />
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Heading as={'h4'}>{user?.name || 'Bem vindo'} </Heading>
            {!isFollowed && !isSameUser ? (
              <Button leftIcon={<AiOutlineHeart />} variant={'outline'} colorScheme={'red'} onClick={handleFollowUnfollow} borderRadius={'full'}>
                Seguir
              </Button>
            ) : isFollowed && !isSameUser ? (
              <Button leftIcon={<AiFillHeart />} colorScheme={'red'} onClick={handleFollowUnfollow} borderRadius={'full'}>
                Seguindo
              </Button>
            ) : (
              <MyAccountCreateMenu />
            )}
          </Flex>
        </Grid>
        {/* <MyDestinations userId={String(user?.id)} /> */}
      </Grid>
    </>
  );
}

// export const getServerSideProps = withSSRAuth(async (ctx) => {
//   const cookies = parseCookies(ctx);
//   const token = cookies['redsterna.token'];

//   const response = await fetch('https://redsterna.herokuapp.com/user/me', {
//     headers: new Headers({
//       'Authorization': `Bearer ${token}`
//     })
//   });

//   // console.log(await response.json());

//   const user = await response.json();

//   return {
//     props: {
//       user
//     },
//   };
// });
