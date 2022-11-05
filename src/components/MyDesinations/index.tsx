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
    const { data } = await api.get(`/itineraries/user/${userId}`);

    return data;
  });

  return (
    <>
      <Box>
        <Heading as='h3' fontWeight={'normal'} fontSize={'1.5rem'}>
          Meus destinos
        </Heading>
        <Divider py={'8px'} />
        {isLoading ? (
          <Flex w={'100%'} justify={'center'}>
            <Spinner />
          </Flex>
        ) : (data.itineraries.length === 0) ? (
          <Flex
            textAlign={'center'}
            flexDirection={'column'}
            justifyContent={'center'}
            w={'100%'}
          >
            <Icon as={RiEmotionSadLine} />
            <Text>Ainda não há destinos</Text>
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