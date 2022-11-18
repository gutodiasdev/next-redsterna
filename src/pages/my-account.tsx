import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Heading, Icon, IconButton, Skeleton,
  SkeletonCircle,
  Spinner,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import { parseCookies } from 'nookies';
import { useContext, useState } from 'react';
import {
  AiFillHeart, AiOutlineHeart
} from 'react-icons/ai';
import { RiEditFill } from 'react-icons/ri';
import { useMutation, useQuery } from 'react-query';
import Footer from '../components/Footer';
import { AvatarModal } from '../components/Modals/AvatarModal';
import { CoverModal } from '../components/Modals/CoverModal';
import { ExcludeRoadmapModal } from '../components/Modals/ExcludeRoadmapModal';
import { MyAccountCreateMenu } from '../components/MyAccountCreateMenu';
import { MyRoadmaps } from '../components/MyRoadmaps';
import { NewHeader } from '../components/NewHeader';
import { ServerSideUser } from '../config/@types/user';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function MyAccountPage ({ user }: ServerSideUser) {
  const avatarForm = useDisclosure();
  const coverForm = useDisclosure();

  const [isFollowed, setIsFollowed] = useState(false);
  const [isSameUser, setIsSameUser] = useState(true);
  const toast = useToast();

  const { data, isLoading, error } = useQuery(['account', user.id], async () => {
    const { data } = await api.get(`/user/${user.id}`);
    return data;
  }, {
    staleTime: 1000 * 60 * 60 * 24
  });

  const fetchFollowers: any = useQuery(['followers', user.id], async () => {
    const { data } = await api.get(`/user/follows/${user.id}`, {
      params: {
        method: 'followers'
      }
    });
    return data;
  }, {
    staleTime: 1000 * 60 * 60 * 24
  });

  const fetchFollowees: any = useQuery(['followees', user.id], async () => {
    const { data } = await api.get(`/user/follows/${user.id}`, {
      params: {
        method: 'followees'
      }
    });

    return data;
  }, {
    staleTime: 1000 * 60 * 60 * 24
  });

  console.log(fetchFollowees.data);

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
      <NewHeader name={user.name ? user.name : 'Usuário'} pageTitle='Minha Conta - RedSterna' />
      <Grid maxWidth={'1400'} justifyContent={'center'} margin={'0 auto'} pb={'64px'}>
        <Flex maxWidth={'100%'} justify={'center'}>
          <Box borderRadius={'16px'} overflow={'hidden'} width={'1100px'} height={'300px'} position={'relative'}>
            <Image src={isLoading ? '/images/background_header.jpg' : error ? '/images/background_header.jpg' : data.user.pictures?.cover || '/images/background_header.jpg'} alt={'Header'} width={1100} height={300} style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <IconButton as={RiEditFill} size={'xs'} cursor={'pointer'} aria-label={'Editar Capa'} position={'absolute'} zIndex={99} bottom={5} right={5} onClick={coverForm.onOpen} />
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
          <Avatar size={'2xl'} mt={'-72px'} name={user.name ? user.name : 'Usuário'} onClick={avatarForm.onOpen} cursor={'pointer'} src={isLoading ? null : error ? null : data.user.pictures?.profile || null} boxShadow={'md'} />
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Box>
              <Heading as={'h4'}>{user.name} </Heading>
              <Flex gap={'16px'} my={'8px'}>
                {fetchFollowers.isLoading ? (
                  <>
                    <Text><Skeleton /> seguidores</Text>
                    <Text><Skeleton /> seguindo</Text>
                  </>
                ) : (
                  <>
                    <Text>
                      {fetchFollowers.data.data.length} seguidor{fetchFollowers.data.data.length > 1 && 'es'}</Text>
                    <Text>0 seguindo</Text>
                  </>
                )}
              </Flex>
            </Box>
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
        <MyRoadmaps id={user.id} />
        <Flex gap={'24px'} width={'100%'}>
          <Box>
            <Heading as='h3' color={'gray.400'} fontSize={'1.5rem'} fontWeight={'normal'} mb={'24px'}>
              Seguidores
            </Heading>
            {
              fetchFollowers.isLoading ? (
                <Spinner />
              ) : (
                fetchFollowers.data.data.map((element: any, index: number) => (
                  <Avatar key={index} name={element.follower.name} src={element.follower.pictures?.profile} />
                ))
              )
            }
          </Box>
          <Box>
            <Heading as='h3' color={'gray.400'} fontSize={'1.5rem'} fontWeight={'normal'} mb={'24px'}>
              Seguindo
            </Heading>
            {
              fetchFollowees.isLoading ? (
                <Spinner />
              ) : (
                fetchFollowees.data.data.map((element: any, index: number) => (
                  // <Avatar key={index} name={element.follower.name} src={element.follower.pictures?.profile} />
                  <Text key={index}>{element.followeeId}</Text>
                ))
              )
            }
          </Box>
        </Flex>
      </Grid>
      <Footer />
      <AvatarModal isOpen={avatarForm.isOpen} onClose={avatarForm.onClose} avatarSource={String(user.pictures?.id)} user={user.id} />
      <CoverModal isOpen={coverForm.isOpen} onClose={coverForm.onClose} avatarSource={String(user.pictures?.id)} user={user.id} />
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