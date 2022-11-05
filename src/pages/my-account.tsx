import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  useToast,
  Skeleton
} from '@chakra-ui/react';
import Image from 'next/image';
import {
  AiOutlineHeart,
  AiFillHeart,
} from 'react-icons/ai';
import { BiPlus } from 'react-icons/bi';
import { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import Head from 'next/head';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/apiClient';
import { NewHeader } from '../components/NewHeader';
import { withSSRAuth } from '../utils/withSSRAuth';

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
      <NewHeader />
      <Grid maxWidth={'1400'} justifyContent={'center'} margin={'0 auto'}>
        <Flex maxWidth={'100%'} justify={'center'}>
          <Box borderRadius={'16px'} overflow={'hidden'}>
            <Image src='/images/background_header.jpg' alt={'Header'} width={'1100'} height={'300'} placeholder='blur' blurDataURL='/images/background_header.jpg' />
          </Box>
        </Flex>
        <Grid gridTemplateColumns={'auto 1fr'} px={'40px'} gap={'32px'}>
          <Avatar size={'2xl'} mt={'-56px'} />
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Heading as={'h4'}>{<Skeleton height={'32px'} />}</Heading>
            {!isFollowed && !isSameUser ? (
              <Button leftIcon={<AiOutlineHeart />} variant={'outline'} colorScheme={'red'} onClick={handleFollowUnfollow} borderRadius={'full'}>
                Seguir
              </Button>
            ) : isFollowed && !isSameUser ? (
              <Button leftIcon={<AiFillHeart />} colorScheme={'red'} onClick={handleFollowUnfollow} borderRadius={'full'}>
                Seguindo
              </Button>
            ) : (
              <Button leftIcon={<BiPlus />} colorScheme={'red'} borderRadius={'full'}>
                Criar
              </Button>
            )}
          </Flex>
        </Grid>
      </Grid>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  };
});