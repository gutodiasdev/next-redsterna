import {
  Box, Button, Divider,
  Flex,
  Grid,
  Heading, Icon, Spinner,
  Text
} from '@chakra-ui/react';
import { RiEmotionSadLine } from 'react-icons/ri';
import { useQuery } from 'react-query';

import { api } from '../../services/apiClient';

type MyDestinationsProps = {
  userId: string;
};

export function MyDestinations ({ userId }: MyDestinationsProps) {

  const { data, isLoading, error } = useQuery(['myDestinations'], async () => {
    const { data } = await api.get(`/roadmaps/user?id=${userId}`);

    return data.roadmaps;
  });

  console.log(data);

  return (
    <>
      <Box px={'40px'}>
        <Heading as='h3' color={'gray.400'} fontSize={'1.5rem'} fontWeight={'normal'}>
          Meus destinos
        </Heading>
        <Divider py={'8px'} />
        {isLoading ? (
          <Flex w={'100%'} justify={'center'}>
            <Spinner />
          </Flex>
        ) : (data.length === 0) ? (
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
          <Grid>

          </Grid>
        )}
      </Box>
    </>
  );
}