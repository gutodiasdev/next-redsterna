/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, FormControl, Grid, Heading, Input, Spinner, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { useQuery } from 'react-query';
import { Map, Marker, Point, ZoomControl } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import { NewHeader } from '../../components/NewHeader';
import { api } from '../../services/apiClient';

import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import { withSSRGuest } from '../../utils/withSSRGuest';
import { useRouter } from 'next/router';
import Image from 'next/image';

export type ServerSideUser = {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    pictures: {
      cover: string;
      profile: string;
    } | null;
  };
};

type DestinationProps = {
  id: string,
  name: string,
  countryCode: string,
  stateCode: string,
  latitude: string,
  longitude: string,
  roadmapId: string;
};

type ClickPointHandler = {
  event: any,
  anchor: Point,
  payload: {
    countryCode: string;
    id: string;
    latitude: string;
    longitude: string;
    name: string;
    roadmapId: string;
    stateCode: string;
  };
};

type RoadmapProps = {
  id: string,
  author: string,
  cover: string,
  made: boolean,
  title: string,
  tripDate: string,
  daysOnTrip: number,
  interests: Array<string>,
  perPersonCost: string,
  roadmapReview: string,
  createdAt: string,
  rate: number;
};

type RoadmapFetcherProps = {
  success: string,
  roadmaps: Array<RoadmapProps>;
};

export default function ListItinerary ({ user }: ServerSideUser) {
  const router = useRouter();
  const { data, error, isLoading } = useQuery(['destinations'], async () => {
    const { data } = await api.get('/destinations/all');
    return data;
  }, {
    staleTime: 1000 * 60 * 5
  });

  const roadmaps = useQuery(['roadmaps'], async () => {
    const { data } = await api.get<RoadmapFetcherProps>('/roadmaps/all');
    return data.roadmaps;
  }, {
    staleTime: 1000 * 60 * 60 * 24
  });

  const handleClick = ({ event, anchor, payload }: ClickPointHandler) => {
    console.log(payload, anchor);
    router.push(`/destinos/${payload.id}`);
  };

  return (
    <>
      <NewHeader pageTitle='RedSterna - Todos os roteiros' name={user.name} />
      <Box overflowWrap={'normal'}>
        <Box my={'8px'}>
          <Map
            provider={osm}
            height={300}
            defaultZoom={3}
            defaultCenter={[-15.77972000, -47.92972000]}
            minZoom={3}
          >
            <ZoomControl />
            {isLoading ? (
              <Spinner />
            ) : error ? (
              <Heading as={'h2'}>
                Falha aos encontrar os itinerários
              </Heading>
            ) : (
              data.destinations.map((destination: DestinationProps, index: number) => {
                return (
                  <Marker key={index} offset={[0, -5]} anchor={[Number(destination.latitude), Number(destination.longitude)]} onClick={({ event, anchor, payload }) => handleClick({ event, anchor, payload: destination })} color={'hsl(0, 100%, 50%)'} />
                );
              })
            )}
          </Map>
          <Box as='form' px={'24px'} width={'1100px'} margin={'24px auto'}>
            <FormControl>
              <Heading mb={'16px'} fontSize={'1.25rem'} fontWeight={'normal'}>
                Procure por cidades
              </Heading>
              <Input type='text' size={'lg'} placeholder={'Ex.: São Paulo, Lima, Lisboa...'} borderColor={'gray.500'} _hover={{ borderColor: 'gray.500' }} />
            </FormControl>
            <Box>
              <Text mt={'24px'} mb={'8px'} color={'gray.400'}>Roteiros publicados: {roadmaps.data?.length}</Text>
              <Grid gridTemplateColumns={'repeat(3, 1fr)'} mb={'24px'} gap={'24px'}>
                {
                  roadmaps.isLoading ? (
                    <Spinner />
                  ) : (
                    roadmaps.data?.reverse().map((roadmap: RoadmapProps) => {
                      return (
                        <Link key={roadmap.id} href={`/destinos/${roadmap.id}`}>
                          <Box>
                            <Box borderRadius={'lg'} overflow={'hidden'} maxHeight={'150px'}>
                              <Image src={roadmap.cover} alt={roadmap.title} width={350} height={200} style={{ objectFit: 'cover' }} />
                            </Box>
                            <Grid p={'8px'} width={'100%'} justifyContent={'space-between'} gridTemplateColumns={'1fr auto'} alignItems={'start'}>
                              <Box>
                                <Heading as={'h2'} fontSize={'1rem'} fontWeight={'semibold'}>{roadmap.title}</Heading>
                                <Flex color={'gray.500'} flexDirection={'column'} gap={'4px'}>
                                  <Text>{roadmap.roadmapReview.substring(0, 24)}...</Text>
                                  <Flex flexDirection={'column'} gap={'2px'}>
                                    <Text fontSize={'0.825rem'}>Dias de viagem: {roadmap.daysOnTrip}</Text>
                                    <Text fontSize={'0.825rem'}>Custo por pessoa: R${roadmap.perPersonCost}</Text>
                                  </Flex>
                                </Flex>
                              </Box>
                              <Flex gap={'4px'} alignItems={'center'} ml={'8px'}>
                                <AiFillStar />
                                <span>{roadmap.rate}</span>
                              </Flex>
                            </Grid>
                          </Box>
                        </Link>
                      );
                    })
                  )
                }
              </Grid>
            </Box>
          </Box>

        </Box>
      </Box>
    </>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
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
