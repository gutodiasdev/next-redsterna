import React, { useContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useItineraries } from '../contexts/itinerary.context';
import { withSSRAuth } from '../utils/withSSRAuth';
import Head from 'next/head';
import { AuthContext } from '../contexts/AuthContext';
import { NewHeader } from '../components/NewHeader';
import { Box, Button, Checkbox, CircularProgress, CircularProgressLabel, Divider, filter, Flex, FormControl, FormLabel, Grid, Heading, HStack, Icon, Input, Radio, RadioGroup, Text, Textarea, VStack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsUpload } from 'react-icons/bs';
import { City } from 'country-state-city';
import { useQuery } from 'react-query';
import { api } from '../services/apiClient';
import Image from 'next/image';
import { AxiosRequestConfig } from 'axios';
import { AiFillCloseCircle } from 'react-icons/ai';
import { GiField } from 'react-icons/gi';

type FormProps = {
  roadmap_type: string;
  title: string;
  trip_date: string;
  best_description: string[];
  roadmap_cover: string;
  trip_days: number;
  person_cost: string;
  trip_review: string;
};

type CityProps = {
  countryCode: string;
  latitude: string;
  longitude: string;
  name: string;
  stateCode: string;
};

export default function Itinerary () {
  const [indexes, setIndexes] = useState<Array<number>>([]);
  const [counter, setCounter] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [checked, setChecked] = useState<Array<string>>([]);
  const [isFilteringCity, setIsFilteringCity] = useState(false);
  const [filteredCities, setFilteredCities] = useState<Array<CityProps>>([]);

  const { uploadFile } = useItineraries();
  const { user } = useContext(AuthContext);
  const [roadmapImage, setRoadmapImage] = useState('');
  const { register, formState: { isSubmitting } } = useForm<FormProps>();

  const { data: allCities } = useQuery(['allCities'], City.getAllCities, { staleTime: 1000 * 60 * 60 * 24 });

  const addItinerary = () => {
    setIndexes(prevIndexes => [...prevIndexes, counter]);
    setCounter(prevCounter => prevCounter + 1);
  };

  const removeItinerary = (index: number) => {
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
      const formData = new FormData();
      formData.append('file', file[0] as File);
      api.post('/roadmaps/upload', formData, config)
        .then(response => {
          const { source } = response.data;
          setRoadmapImage(source);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateRoadMap: SubmitHandler<FormProps> = (values) => {
    console.log(values);
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

  const handleCheck = (event: any) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  return (
    <>
      <Head>
        <title>Crie um roteiro - RedSterna</title>
      </Head>
      <NewHeader />
      <Box w={'1100px'} margin={'0 auto'} my={'32px'}>
        <Heading mb={'32px'}>
          Criar Roteiro
        </Heading>
        <VStack as='form' spacing={'24px'}>
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
                  <Radio colorScheme={'red'} value='done'>Já fiz este Roteiro</Radio>
                </Box>
                <Box border={'1px'} borderRadius={'lg'} p={'8px 16px'}>
                  <Radio colorScheme={'red'} value='planned'>Estou planejando este Roteiro</Radio>
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
            <Input type='date' {...register('trip_date')} borderColor={'gray.600'} size={'lg'} _hover={{ boderColor: 'gray.600' }} w={'50%'} />
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
              <Input type='number' {...register('trip_days')} borderColor={'gray.600'} size={'lg'} _placeholder={{ color: 'gray.400' }} _hover={{ boderColor: 'gray.600' }} />
            </FormControl>
            <FormControl>
              <FormLabel>Custo total por pessoa</FormLabel>
              <Input type='number' {...register('trip_days')} borderColor={'gray.600'} size={'lg'} placeholder={'R$ 0.0'} _placeholder={{ color: 'gray.400' }} _hover={{ boderColor: 'gray.600' }} />
            </FormControl>
          </Grid>
          <FormControl>
            <FormLabel>Resumo da viagem</FormLabel>
            <Textarea {...register('trip_review')} borderColor={'gray.600'} size={'lg'} placeholder={'Quais cidades você visitou? O que viu de bacana? Quais os pontos fortes e fracos? Divida suas experiências com a gente!'} _placeholder={{ color: 'gray.400' }} _hover={{ boderColor: 'gray.600' }} height={'200px'} />
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
                                <Flex key={index} width={'100%'} justifyContent={'space-between'} _hover={{ backgroundColor: 'gray.200' }} cursor={'pointer'} my={'8px'}>
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
                    <Input type='text' borderColor={'gray.600'} size={'lg'} />
                  </FormControl>
                </Grid>
                <Grid gridTemplateColumns={'1fr auto'} gap={'24px'} mt={'32px'}>
                  <FormControl>
                    <FormLabel>Hospedagem</FormLabel>
                    <Input type='text' borderColor={'gray.600'} _hover={{ boderColor: 'gray.600' }} size={'lg'} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Avaliação</FormLabel>
                    <Input type='text' borderColor={'gray.600'} size={'lg'} />
                  </FormControl>
                </Grid>
                <FormControl mt={'24px'}>
                  <FormLabel>Resumo da viagem</FormLabel>
                  <Textarea borderColor={'gray.600'} size={'lg'} placeholder={'Quais cidades você visitou? O que viu de bacana? Quais os pontos fortes e fracos? Divida suas experiências com a gente!'} _placeholder={{ color: 'gray.400' }} _hover={{ boderColor: 'gray.600' }} height={'200px'} />
                </FormControl>
                <FormControl mt={'24px'}>
                  <Text mb={'8px'}>Imagens da viagem</Text>
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
                    <Input type='file' display={'none'} />
                  </FormLabel>
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
