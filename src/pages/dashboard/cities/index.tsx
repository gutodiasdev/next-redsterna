import { Box, Button, Flex, Grid, Heading, IconButton, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { RiEditLine } from 'react-icons/ri';
import { useQuery } from 'react-query';
import { DashboardMenu } from '../../../components/DashboardMenu';
import { AuthContext } from '../../../contexts/AuthContext';
import { api } from '../../../services/apiClient';

type CityProps = {
  id: string;
  image: string;
  name: string;
  description: string;
  author: string;
};

export function TableIsLoading () {
  const times = Array.from(Array(10).keys());

  return (
    <>
      {times.map((element, id) => {
        return (
          <Tr key={id}>
            <Td>
              <Skeleton height='20px' />
            </Td>
            <Td>
              <Skeleton height='20px' />
            </Td>
            <Td>
              <Skeleton height='20px' />
            </Td>
            <Td>
              <Skeleton height='20px' />
            </Td>
            <Td>
              <Skeleton height='20px' />
            </Td>
          </Tr>
        );
      })}
    </>
  );
}

export default function DashboardCities () {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const { data, isLoading, error } = useQuery(['allCities', user?.id], async () => {
    const response = await api.get('/city/all');

    return response.data;
  }, {
    staleTime: 1000 * 60 * 5
  });

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
            Cidades
          </Heading>
          <Flex
            w={'100%'}
            py={'32px'}
          >
            <Link href={'/dashboard/cities/criar'}>
              <Button colorScheme={'red'}>
                Criar nova cidade
              </Button>
            </Link>
          </Flex>
          <TableContainer border={'1px'} borderColor={'gray.400'} borderRadius={'8px'}>
            <Table>
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Nome</Th>
                  <Th>Descrição</Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {isLoading ? (
                  // <Flex w={'100%'} justifyContent={'center'}>
                  //   <Spinner />
                  // </Flex>
                  <TableIsLoading />
                ) : (
                  data.map((city: CityProps) => {
                    return (
                      <Tr key={city.id}>
                        <Td>
                          <Image src={city.image} alt={city.name} width={56} height={56} />
                        </Td>
                        <Td>
                          <Text>{city.name}</Text>
                        </Td>
                        <Td>
                          <Text>{city.description}</Text>
                        </Td>
                        <Td>
                          <Text>{city.author}</Text>
                        </Td>
                        <Td>
                          <Flex w={'100%'} justifyContent={'flex-end'}>
                            <IconButton
                              aria-label={'Editar cidade'}
                              icon={<RiEditLine />}
                              onClick={() => router.push(`/dashboard/cities/${city.id}`)}
                            />
                          </Flex>
                        </Td>
                      </Tr>
                    );
                  })
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </>
  );
}