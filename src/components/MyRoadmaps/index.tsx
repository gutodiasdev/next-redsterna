import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Spinner,
  Text
} from '@chakra-ui/react';
import Link from 'next/link';
import { RiEmotionSadLine } from 'react-icons/ri';
import { useQuery } from 'react-query';

import { api } from '../../services/apiClient';
import { RoadmapItem } from './RoadmapItem';

type MyRoadmapsProps = {
  id: string;
};

type Roadmap = {
  id: string;
  author: string;
  cover: string;
  createdAt: string;
  daysOnTrip: number;
  interests: Array<string>;
  made: boolean;
  perPersonCost: string;
  rate: number;
  roadmapReview: string;
  title: string;
  triDate: string;
};

export function MyRoadmaps ({ id }: MyRoadmapsProps) {

  const { data: roadmaps, isLoading, error } = useQuery(['myDestinations', id], async () => {
    const { data } = await api.get(`/roadmaps/user?id=${id}`);

    return data.roadmaps;
  });

  const checkOwnership = (author: string) => {
    if (author === id) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Box px={'40px'} mb={'32px'}>
        <Heading as='h3' color={'gray.400'} fontSize={'1.5rem'} fontWeight={'normal'} mb={'24px'}>
          Meus Roteiros
        </Heading>
        {isLoading ? (
          <Flex w={'100%'} justify={'center'}>
            <Spinner />
          </Flex>
        ) : (roadmaps.length === 0) ? (
          <Flex
            textAlign={'center'}
            flexDirection={'column'}
            justifyContent={'center'}
            margin={'0 auto'}
            alignItems={'center'}
            gap={'24px'}
            w={'296px'}
            py={'40px'}
          >
            <Icon as={RiEmotionSadLine} size={'2rem'} />
            <Text>Você ainda não tem destinos</Text>
            <Button variant={'outline'} colorScheme={'red'}>
              Adicionar novo destino
            </Button>
          </Flex>
        ) : error ? (
          <Flex w={'100%'} justify={'center'}>

          </Flex>
        ) : (
          <Flex flexDirection={'column'} gap={'16px'} my={'8px'}>
            {
              roadmaps.slice(0, 5).map((roadmap: Roadmap) => {
                return <RoadmapItem key={roadmap.id} roadmap={roadmap} isOwner={() => checkOwnership(roadmap.author)} />;
              })
            }
          </Flex>
        )}
      </Box>
      <Button size={'lg'} colorScheme={'red'} variant={'outline'} margin={'0 auto'}>
        <Link href={'/roteiros/todos'} >
          Todos os roteiros
        </Link>
      </Button>
    </>
  );
}