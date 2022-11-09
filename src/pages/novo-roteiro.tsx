import React, { useContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useItineraries } from '../contexts/itinerary.context';
import { withSSRAuth } from '../utils/withSSRAuth';
import Head from 'next/head';
import { AuthContext } from '../contexts/AuthContext';
import { NewHeader } from '../components/NewHeader';
import { Box, Button, Checkbox, Divider, Flex, FormControl, FormLabel, Grid, GridItem, Heading, HStack, Input, Radio, RadioGroup, Select, Text, Textarea, VStack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsUpload } from 'react-icons/bs';
import { City } from 'country-state-city';
import debounce from 'debounce';

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
  const [isSearchingCity, setIsSearchingCity] = useState(false);
  const [cityNameToSearch, setCityNameToSearch] = useState('');
  const [chosenCity, setChosenCity] = useState();

  const { uploadFile } = useItineraries();
  const { user } = useContext(AuthContext);
  const { register, formState: { isSubmitting } } = useForm<FormProps>();

  const addItinerary = () => {
    setIndexes(prevIndexes => [...prevIndexes, counter]);
    setCounter(prevCounter => prevCounter + 1);
  };

  const removeItinerary = (index: number) => {
    setIndexes(prevIndexes => [...prevIndexes.filter((item) => item !== index)]);
    setCounter(prevCounter => prevCounter - 1);
  };

  const uploadFileCallback = async (file: any) => {
    const response = await uploadFile(file);

    return response;
  };

  const handleCreateRoadMap: SubmitHandler<FormProps> = (values) => {
    console.log(values);
  };

  const getCitiesByName = (): Array<CityProps> => {
    const cities = City.getAllCities().filter(city => city.name.includes(cityNameToSearch));
    return cities;
  };

  const handleCitySelect = (values: any): void => {
    setIsSearchingCity(true);
    setCityNameToSearch(values);
    debounce(getCitiesByName, 500);
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
              <Checkbox colorScheme={'red'} value='historical_city'>Cidade Histórica</Checkbox>
              <Checkbox colorScheme={'red'} value='modern_city'>Cidade Moderna</Checkbox>
              <Checkbox colorScheme={'red'} value='beach'>Praia</Checkbox>
              <Checkbox colorScheme={'red'} value='countryside'>Campo</Checkbox>
              <Checkbox colorScheme={'red'} value='mountain'>Montanha</Checkbox>
              <Checkbox colorScheme={'red'} value='cachoeira'>Cachoeira</Checkbox>
              <Checkbox colorScheme={'red'} value='camping'>Camping</Checkbox>
              <Checkbox colorScheme={'red'} value='trekking'>Trekking</Checkbox>
            </Grid>
          </FormControl>
          <FormControl>
            <Text mb={'8px'}>Foto de capa</Text>
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
              width={'100%'}
            >
              <VStack textAlign={'center'}>
                <BsUpload />
                <Text>Faça o upload da imagem de capa</Text>
              </VStack>
              <Input type='file' display={'none'} />
            </FormLabel>
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
                    <Input type='text' borderColor={'gray.600'} _hover={{ boderColor: 'gray.600' }} size={'lg'} onChange={(e) => handleCitySelect(e.target.value)} />
                    <Box zIndex={'99'} marginTop={'-4px'} position={'absolute'} backgroundColor={'white'} borderLeft={'1px'} borderRight={'1px'} borderBottom={'1px'} height={'200px'} overflowY={'auto'} width={'100%'}>
                      {isSearchingCity ? (
                        getCitiesByName().map((city: CityProps, index) => {
                          return (
                            <Flex key={index} p={'8px 16px'} cursor={'pointer'} _hover={{ backgroundColor: 'gray.200' }} justifyContent={'space-between'} width={'100%'}>
                              {city.name}
                              <Flex>
                                {city.stateCode}, {city.countryCode}
                              </Flex>
                            </Flex>
                          );
                        })
                      ) : null}
                    </Box>
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
