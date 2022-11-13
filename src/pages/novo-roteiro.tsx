import React, { useContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { withSSRAuth } from '../utils/withSSRAuth';
import { AuthContext } from '../contexts/AuthContext';
import { NewHeader } from '../components/NewHeader';
import { Box, Button, Checkbox, CircularProgress, CircularProgressLabel, Divider, Flex, FormControl, FormLabel, Grid, Heading, HStack, Icon, Input, Radio, RadioGroup, Text, Textarea, VStack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsUpload } from 'react-icons/bs';
import { City } from 'country-state-city';
import { useMutation, useQuery } from 'react-query';
import { api } from '../services/apiClient';
import Image from 'next/image';
import { AxiosRequestConfig } from 'axios';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useRouter } from 'next/router';

type FormProps = {
  roadmap_type: string;
  title: string;
  tripDate: string;
  best_description: string[];
  roadmap_cover: string;
  daysOnTrip: number;
  perPersonCost: string;
  roadmapReview: string;
};

type CityProps = {
  countryCode: string;
  latitude: string;
  longitude: string;
  name: string;
  stateCode: string;
};
type DestinationProps = {
  name: string,
  countryCode: string,
  stateCode: string,
  latitude: string,
  longitude: string,
  hotel: string,
  hotelRate: number,
  cityRate: number;
  images: Array<string>;
  destinationReview: string;
};

export default function Itinerary () {
  const [indexes, setIndexes] = useState<Array<number>>([]);
  const [counter, setCounter] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [tripNiche, setTripNiche] = useState<Array<string>>([]);
  const [isDone, setIsDone] = useState<boolean>(true);
  const [isFilteringCity, setIsFilteringCity] = useState(false);
  const [filteredCities, setFilteredCities] = useState<Array<CityProps>>([]);
  const [destinations, setDestinations] = useState<Array<DestinationProps>>([]);
  const [destinationImages, setDestinationImages] = useState<Array<string>>([]);

  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [roadmapImage, setRoadmapImage] = useState('');
  const { register, formState: { isSubmitting }, handleSubmit } = useForm<FormProps>();

  const { data: allCities } = useQuery(['allCities'], City.getAllCities, { staleTime: 1000 * 60 * 60 * 24 });

  const addItinerary = () => {
    setIndexes(prevIndexes => [...prevIndexes, counter]);
    setCounter(prevCounter => prevCounter + 1);
  };

  const removeItinerary = (index: number) => {
    destinations.splice(index, 1);
    setIndexes(prevIndexes => [...prevIndexes.filter((item) => item !== index)]);
    setCounter(prevCounter => prevCounter - 1);
  };

  const config = {
    headers: { 'content-type': 'multipart/form-data' },
    onUploadProgress: (e: ProgressEvent) => {
      setProgress(Math.round((e.loaded * 100) / e.total));
    },
  } as AxiosRequestConfig;

  const uploadFileCallback = async (file: any) => {
    try {
      setIsSending(true);
      const formData = new FormData();
      formData.append('file', file[0] as File);
      api.post('/roadmaps/upload', formData, config)
        .then(response => {
          const { source } = response.data;
          setRoadmapImage(source);
        });
      setIsSending(false);
    } catch (e) {
      console.log(e);
    }
  };

  const uploadDestinationFile = async (file: any, index: number) => {
    try {
      setIsSending(true);
      const formData = new FormData();
      formData.append('file', file[0] as File);
      api.post('/roadmaps/upload', formData, config)
        .then(response => {
          const { source } = response.data;
          setDestinationImages([...destinationImages, source]);
        });
      setIsSending(false);
      destinations[index].images = destinationImages;
    } catch (e) {
      console.log(e);
    }
  };

  const mutation = useMutation(async (values: any) => {
    const roadmap = await api.post('/roadmaps/create', {
      ...values,
      daysOnTrip: Number(values.daysOnTrip),
      author: String(user?.id),
      cover: roadmapImage,
      made: isDone,
      interests: tripNiche,
      rate: 5,
      destinations: destinations
    });
    router.push(`/destinos/${roadmap.data.id}`);
  }, {
    onSuccess: () => {
      console.log('success');
    }
  });

  const handleCreateRoadMap: SubmitHandler<FormProps> = async (values) => {
    try {
      await mutation.mutateAsync(values);
    } catch (e) {
      console.log(e);
    }
  };

  function handleFilterCities (value: string) {
    if (value.length > 2) {
      setIsFilteringCity(true);
      setTimeout(() => {
        setFilteredCities(allCities?.filter(city => city.name.includes(value))!);
      }, 500);
    } else {
      setIsFilteringCity(false);
    }
  }

  function handleSelectCity (event: any) {
    let updatedList = [...destinations];
    setIsFilteringCity(false);
    if (event) {
      updatedList = [...destinations, event];
    } else {
      updatedList.splice(destinations.indexOf(event), 1);
    }
    setDestinations(updatedList);
  }

  const handleCheck = (event: any) => {
    let updatedList = [...tripNiche];
    if (event.target.checked) {
      updatedList = [...tripNiche, event.target.value];
    } else {
      updatedList.splice(tripNiche.indexOf(event.target.value), 1);
    }
    setTripNiche(updatedList);
  };

  return (
    <>
      <NewHeader pageTitle='Crie um roteiro - RedSterna' />
      <Box w={'1100px'} margin={'0 auto'} my={'32px'}>
        <Heading mb={'32px'}>
          Criar Roteiro
        </Heading>
        <VStack as='form' spacing={'24px'} onSubmit={handleSubmit(handleCreateRoadMap)}>
          <FormControl>
            <Text mb={'8px'}>Foto de capa</Text>
            <FormLabel
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              border={'1px'}
              borderColor={'gray.400'}
              borderStyle={'dashed'}
              borderRadius={'lg'}
              height={'200px'}
              width={'100%'}
              cursor={isSending ? 'progress' : 'pointer'}
              opacity={isSending ? 0.5 : 1}
            >
              {
                roadmapImage && !isSending ? (
                  <Box width={1100} height={200} borderRadius={'lg'} overflow={'hidden'} position={'relative'}>
                    <Icon as={AiFillCloseCircle} position={'absolute'} zIndex={99} color={'red'} right={1} top={1} backgroundColor={'white'} borderRadius={'full'} />
                    <Image src={roadmapImage} alt='roadmap cover' fill />
                  </Box>
                ) : (
                  <VStack textAlign={'center'}>
                    {isSending ? (
                      <>
                        <CircularProgress
                          trackColor="pGray.200"
                          value={progress}
                          color="orange.500"
                        >
                          <CircularProgressLabel>{progress}%</CircularProgressLabel>
                        </CircularProgress>
                        <Text as="span" pt={2} textAlign="center">
                          Enviando...
                        </Text>
                      </>
                    ) : (
                      <Input type='file' border={'none'} onChange={(e) => uploadFileCallback(e.target.files)} />
                    )}
                  </VStack>
                )
              }
            </FormLabel>
          </FormControl>
          <FormControl>
            <FormLabel>Tipo de roteiro</FormLabel>
            <RadioGroup defaultValue={'done'}>
              <HStack spacing={'80px'}>
                <Box border={'1px'} borderRadius={'lg'} p={'8px 16px'}>
                  <Radio colorScheme={'red'} onChange={(e) => setIsDone(true)} value='done' checked>Já fiz este Roteiro</Radio>
                </Box>
                <Box border={'1px'} borderRadius={'lg'} p={'8px 16px'}>
                  <Radio colorScheme={'red'} onChange={(e) => setIsDone(false)} value='not done'>Estou planejando este Roteiro</Radio>
                </Box>
              </HStack>
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='title'>Título da viagem</FormLabel>
            <Input type='text' {...register('title')} borderColor={'gray.600'} size={'lg'} placeholder={'Ex.: ORLANDO/DISNEY - MIAMI - KEY WEST E NOVA YORK'} _placeholder={{ color: 'gray.400' }} _hover={{ boderColor: 'gray.600' }} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='tripDate'>Data da Viagem</FormLabel>
            <Input type='date' {...register('tripDate')} borderColor={'gray.600'} size={'lg'} _hover={{ boderColor: 'gray.600' }} w={'50%'} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='tripDate'>Quais dessas opções melhor descrevem essa viagem?</FormLabel>
            <Grid gridTemplateColumns={'1fr 1fr'}>
              <Checkbox colorScheme={'red'} onChange={handleCheck} value='historical_city'>Cidade Histórica</Checkbox>
              <Checkbox colorScheme={'red'} onChange={handleCheck} value='modern_city'>Cidade Moderna</Checkbox>
              <Checkbox colorScheme={'red'} onChange={handleCheck} value='beach'>Praia</Checkbox>
              <Checkbox colorScheme={'red'} onChange={handleCheck} value='countryside'>Campo</Checkbox>
              <Checkbox colorScheme={'red'} onChange={handleCheck} value='mountain'>Montanha</Checkbox>
              <Checkbox colorScheme={'red'} onChange={handleCheck} value='cachoeira'>Cachoeira</Checkbox>
              <Checkbox colorScheme={'red'} onChange={handleCheck} value='camping'>Camping</Checkbox>
              <Checkbox colorScheme={'red'} onChange={handleCheck} value='trekking'>Trekking</Checkbox>
            </Grid>
          </FormControl>
          <Grid gridTemplateColumns={'1fr 1fr'} w={'100%'} gap={'24px'}>
            <FormControl>
              <FormLabel>Dias de viagem</FormLabel>
              <Input type='number' {...register('daysOnTrip')} borderColor={'gray.600'} size={'lg'} _placeholder={{ color: 'gray.400' }} _hover={{ boderColor: 'gray.600' }} />
            </FormControl>
            <FormControl>
              <FormLabel>Custo total por pessoa</FormLabel>
              <Input type='number' {...register('perPersonCost')} borderColor={'gray.600'} size={'lg'} placeholder={'R$ 0.0'} _placeholder={{ color: 'gray.400' }} _hover={{ boderColor: 'gray.600' }} />
            </FormControl>
          </Grid>
          <FormControl>
            <FormLabel>Resumo da viagem</FormLabel>
            <Textarea {...register('roadmapReview')} borderColor={'gray.600'} size={'lg'} placeholder={'Quais cidades você visitou? O que viu de bacana? Quais os pontos fortes e fracos? Divida suas experiências com a gente!'} _placeholder={{ color: 'gray.400' }} _hover={{ boderColor: 'gray.600' }} height={'200px'} />
          </FormControl>

          <Divider />

          <Box width={'100%'}>
            <Heading>
              Cidades visitadas
            </Heading>
            <Text>Insira abaixo as cidades que visitou, onde ficou e qual sua avaliação do local.</Text>
          </Box>

          {indexes.map((itinerary, index) => {
            return (
              <Box key={index} border={'1px'} borderColor={'gray.400'} borderRadius={'lg'} width={'100%'} p={'24px'}>
                <Grid gridTemplateColumns={'1fr auto'} gap={'24px'}>
                  <FormControl>
                    <FormLabel>Cidade</FormLabel>
                    <Input type='text' borderColor={'gray.600'} _hover={{ boderColor: 'gray.600' }} size={'lg'} onChange={(e) => handleFilterCities(e.target.value)} />
                    {
                      isFilteringCity ? (
                        <Box position={'absolute'} backgroundColor={'white'} zIndex={'99'} width={'100%'} p={'4px 16px'} borderColor={'gray.600'} borderLeft={'1px'} borderRight={'1px'} borderBottom={'1px'} boxShadow={'lg'} borderRadius={'0 0 8px 8px'} maxHeight={'200px'} overflowY={'auto'} mt={'-4px'}>
                          <Divider orientation='horizontal' position={'fixed'} top={'0'} />

                          {
                            filteredCities.map((city: CityProps, index) => {
                              return (
                                <Flex key={index} width={'100%'} justifyContent={'space-between'} _hover={{ backgroundColor: 'gray.200' }} cursor={'pointer'} my={'8px'} onClick={(e) => handleSelectCity(city)}>
                                  <Text>{city.name}</Text>
                                  <Flex gap={'16px'}>
                                    <Text>{city.stateCode}, </Text>
                                    <Text>{city.countryCode}</Text>
                                  </Flex>
                                </Flex>
                              );
                            })
                          }
                        </Box>
                      ) : null
                    }
                  </FormControl>
                  <FormControl>
                    <FormLabel>Avaliação</FormLabel>
                    <Input type='number' borderColor={'gray.600'} size={'lg'} onChange={(e) => destinations[index].cityRate = Number(e.target.value)} />
                  </FormControl>
                </Grid>
                <Grid gridTemplateColumns={'1fr auto'} gap={'24px'} mt={'32px'}>
                  <FormControl>
                    <FormLabel>Hospedagem</FormLabel>
                    <Input type='text' borderColor={'gray.600'} _hover={{ boderColor: 'gray.600' }} size={'lg'} onChange={(e) => destinations[index].hotel = e.target.value} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Avaliação</FormLabel>
                    <Input type='number' borderColor={'gray.600'} size={'lg'} onChange={(e) => destinations[index].hotelRate = Number(e.target.value)} />
                  </FormControl>
                </Grid>
                <FormControl mt={'24px'}>
                  <FormLabel>Resumo da viagem</FormLabel>
                  <Textarea borderColor={'gray.600'} size={'lg'} placeholder={'Quais cidades você visitou? O que viu de bacana? Quais os pontos fortes e fracos? Divida suas experiências com a gente!'} _placeholder={{ color: 'gray.400' }} _hover={{ boderColor: 'gray.600' }} height={'200px'} onChange={(e) => destinations[index].destinationReview = e.target.value} />
                </FormControl>
                <FormControl mt={'24px'}>
                  <Text mb={'8px'}>Imagens da viagem</Text>
                  <Flex gap={'16px'}>
                    {
                      destinationImages !== null ? (
                        destinationImages.map((image: string, index: number) => {
                          return (
                            <Image key={index} src={image} alt={'Image'} width={200} height={200} />
                          );
                        })
                      ) : null
                    }
                    <FormLabel
                      display={'flex'}
                      cursor={'pointer'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      border={'1px'}
                      borderColor={'gray.400'}
                      borderStyle={'dashed'}
                      borderRadius={'lg'}
                      height={'200px'}
                      width={'200px'}
                    >
                      <VStack textAlign={'center'}>
                        <BsUpload />
                        <Text>Adicionar imagem</Text>
                      </VStack>
                      <Input type='file' display={'none'} onChange={(e) => uploadDestinationFile(e.target.files, index)} />
                    </FormLabel>
                  </Flex>
                </FormControl>

                <Button onClick={() => removeItinerary(index)} variant={'outline'} colorScheme={'red'} float={'right'} mt={'32px'}>
                  Remover destino
                </Button>
              </Box>
            );
          })}
          <Button onClick={addItinerary}>
            Adicionar destino
          </Button>
          <Box py={'40px'} width={'100%'}>
            <Button type='submit' isLoading={isSubmitting} colorScheme={'red'} size={'lg'} float={'right'}>
              Criar Roteiro
            </Button>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  };
});
