import { Avatar, Badge, Box, Button, Divider, Flex, FormControl, FormLabel, Grid, GridItem, Heading, Icon, Skeleton, Spinner, Text, Textarea, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { AiFillStar, AiOutlineCalendar, AiOutlineStar } from 'react-icons/ai';
import { BiTime } from 'react-icons/bi';
import { CiMoneyBill } from 'react-icons/ci';
import { useMutation, useQuery } from 'react-query';
import Rating from 'react-rating';
import Footer from '../../components/Footer';
import { NewHeader } from '../../components/NewHeader';
import { ServerSideUser } from '../../config/@types/user';
import { api } from '../../services/apiClient';
import { parseBadgeContent } from '../../utils/parseBadgeContent';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { queryClient } from '../_app';

type Roadmap = {
  status: string;
  data: {
    id: string;
    author: string;
    cover: string;
    made: boolean;
    title: string;
    tripDate: string;
    daysOnTrip: number;
    interests: Array<string>;
    perPersonCost: string;
    roadmapReview: string;
    createdAt: string;
    rate: number;
  };
};

type RatingProps = {
  id: string,
  author: string,
  content: string,
  rating: number,
  roadmapId: string;
  roadmap: {
    user: {
      name: string,
      pictures: {
        profile: string,
      };
    };
  };
};

type RatingForm = {
  author: string,
  content: string,
  rating: number,
};

export default function SingleRoadmap ({ user }: ServerSideUser) {
  const toast = useToast();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const router = useRouter();
  const { id } = router.query as { id: string; };

  const fecthRoadmap = async () => {
    const { data } = await api.get<Roadmap & any>(`/roadmaps/${id}`);
    return data.data;
  };
  const fecthRoadmapComments = async () => {
    const { data } = await api.get(`/roadmaps/comments/${id}`);
    return data.data;
  };

  const { data, isLoading, error } = useQuery(['roadmap', id], fecthRoadmap, { staleTime: 1000 * 60 * 24 });
  const comments = useQuery(['roadmapComments', id], fecthRoadmapComments, { staleTime: 1000 * 10 });

  const updateRoadmapComment = async (values: RatingForm) => {
    await api.post(`/comments/roadmap/${id}`, values);
  };

  const mutation = useMutation(updateRoadmapComment, {
    onSuccess: () => {
      toast({
        title: 'Comentário adicionado com sucesso',
        status: 'success'
      });
      queryClient.invalidateQueries(['roadmapComments', id]);
      setRating(0);
      setReview('');
    },
    onError: () => {
      toast({
        title: 'Falha ao enviar comentário',
        status: 'error'
      });
    }
  });

  const handleRoadmapComment = async () => {
    try {
      await mutation.mutateAsync({ author: user.id, content: review, rating: rating });
    } catch {
      toast({
        status: 'error',
        title: 'Algo deu errado'
      });
    }
  };

  console.log(comments.data);

  return (
    <>
      <NewHeader pageTitle={data?.title ? 'RedStern - ' + data.title : 'RedSterna - Rede Social de Viagens'} name={user.name} />
      <Box width={'1100px'} margin={'0 auto'}>
        <Box>
          {isLoading ? (
            <Box pb={'40px'}>
              <Skeleton>
                <Box borderRadius={'16px'} overflow={'hidden'} width={'1100px'} height={'300px'} position={'relative'}>
                  <Image src='/images/background_header.jpg' alt={'Header'} width={1100} height={300} style={{ objectFit: 'cover', objectPosition: 'center' }} />
                </Box>
              </Skeleton>
              <Grid
                gridTemplateColumns={'1fr auto'}
                pt={'16px'}
                gap={'32px'}
                alignItems={'flex-start'}
              >
                <Box>
                  <Skeleton>
                    <Heading as={'h1'}>
                      loading
                    </Heading>
                  </Skeleton>
                  <Skeleton>
                    <Flex gap={'8px'} mt={'8px'}>
                      loading
                    </Flex>
                  </Skeleton>
                </Box>
                <Flex>
                  <Skeleton>
                    <Flex gap={'4px'} alignItems={'center'}>
                      <Icon as={AiFillStar} />
                      <Text>loading</Text>
                    </Flex>
                  </Skeleton>
                </Flex>
              </Grid>
              <Box width={'50%'}>
                <Grid gridTemplateColumns={'1fr 1fr'} gap={'24px'}>
                  <GridItem>
                    <Heading as={'h3'} fontSize={'1rem'} color={'gray.600'}>Dias na viagem</Heading>
                    <Flex alignItems={'center'} gap={'16px'} mt={'8px'}>
                      <BiTime />
                      {'loading'}
                    </Flex>
                  </GridItem>
                  <GridItem>
                    <Heading as={'h3'} fontSize={'1rem'} color={'gray.600'}>Custo por pessoa</Heading>
                    <Flex alignItems={'center'} gap={'16px'} mt={'8px'}>
                      <CiMoneyBill />
                      {'loading'}
                    </Flex>
                  </GridItem>
                  <GridItem>
                    <Heading as={'h3'} fontSize={'1rem'} color={'gray.600'}>Data da Viagem</Heading>
                    <Flex alignItems={'center'} gap={'16px'} mt={'8px'}>
                      <AiOutlineCalendar />
                      loading
                    </Flex>
                  </GridItem>
                </Grid>
                <Text py={'24px'}>
                  landing
                </Text>
              </Box>
            </Box>
          ) : error ? (
            <Spinner />
          ) : (
            <Box pb={'40px'}>
              <Box borderRadius={'16px'} overflow={'hidden'} width={'1100px'} height={'300px'} position={'relative'}>
                <Image src={String(data?.cover)} alt={'Header'} width={1100} height={300} style={{ objectFit: 'cover', objectPosition: 'center' }} />
              </Box>
              <Grid
                gridTemplateColumns={'1fr auto'}
                pt={'16px'}
                gap={'32px'}
                alignItems={'flex-start'}
              >
                <Box pb={'32px'}>
                  <Heading as={'h1'}>
                    {data?.title}
                  </Heading>
                  <Flex gap={'8px'} mt={'8px'}>
                    {data?.interests.map((interest: string, index: number) => (
                      <Badge key={index} rounded={'full'} fontSize={'0.6rem'} fontWeight={'normal'} colorScheme={'red'}>
                        {parseBadgeContent(interest)}
                      </Badge>
                    ))}
                  </Flex>
                </Box>
                <Flex>
                  <Flex gap={'4px'} alignItems={'center'}>
                    <Icon as={AiFillStar} />
                    <Text>({data?.rate})</Text>
                  </Flex>
                </Flex>
              </Grid>
              <Box width={'50%'}>
                <Grid gridTemplateColumns={'1fr 1fr'} gap={'24px'}>
                  <GridItem>
                    <Heading as={'h3'} fontSize={'1rem'} color={'gray.600'}>Dias na viagem</Heading>
                    <Flex alignItems={'center'} gap={'16px'} mt={'8px'}>
                      <BiTime />
                      {data?.daysOnTrip}
                    </Flex>
                  </GridItem>
                  <GridItem>
                    <Heading as={'h3'} fontSize={'1rem'} color={'gray.600'}>Custo por pessoa</Heading>
                    <Flex alignItems={'center'} gap={'16px'} mt={'8px'}>
                      <CiMoneyBill />
                      {'R$ ' + data?.perPersonCost}
                    </Flex>
                  </GridItem>
                  <GridItem>
                    <Heading as={'h3'} fontSize={'1rem'} color={'gray.600'}>Data da Viagem</Heading>
                    <Flex alignItems={'center'} gap={'16px'} mt={'8px'}>
                      <AiOutlineCalendar />
                      {new Date(String(data?.tripDate)).toLocaleDateString('pt-BR')}
                    </Flex>
                  </GridItem>
                </Grid>
                <Text py={'24px'}>
                  {data?.roadmapReview}
                </Text>
              </Box>
              <Divider />
              <Box py={'24px'}>
                {
                  comments.isLoading ? (
                    <Spinner />
                  ) : (
                    comments.data.map((comment: RatingProps, index: number) => (
                      <Box py={'32px '} width={{ md: '50%' }}>
                        <Flex alignItems={'center'} gap={'8px'}>
                          <Avatar src={comment.roadmap.user.pictures.profile} name={comment.roadmap.user.name} />
                          <Box>
                            <Heading as={'h3'} fontSize={'1.1rem'}>{comment.roadmap.user.name}</Heading>
                            {Array(5)
                              .fill(0)
                              .map((_, index) => (
                                comment.rating >= index + 1 ? (
                                  <Icon as={AiFillStar} color={'red.400'} />
                                ) : (
                                  <Icon as={AiOutlineStar} />
                                )
                              ))
                            }
                          </Box>
                        </Flex>
                        <Box py={'24px'}>
                          <Text>{comment.content}</Text>
                        </Box>
                        <Divider />
                      </Box>
                    ))
                  )
                }
                <Grid as='form' gap={'16px'}>
                  <FormControl>
                    <FormLabel>Comentário</FormLabel>
                    <Textarea onChange={(e) => setReview(e.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Avaliação</FormLabel>
                    <Flex>
                      {Array(5)
                        .fill(0)
                        .map((_, index) => (
                          rating >= index + 1 ? (
                            <Icon as={AiFillStar} color={'red.400'} onClick={() => setRating(index + 1)} cursor={'pointer'} />
                          ) : (
                            <Icon as={AiOutlineStar} onClick={() => setRating(index + 1)} cursor={'pointer'} />
                          )
                        ))
                      }
                    </Flex>
                  </FormControl>
                  <Button width={'300px'} float={'right'} colorScheme={'red'} onClick={handleRoadmapComment} isLoading={mutation.isLoading}>
                    Publicar comentário
                  </Button>
                </Grid>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Footer />
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