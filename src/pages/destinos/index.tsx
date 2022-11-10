/* eslint-disable react-hooks/exhaustive-deps */
import { Box, FormControl, Grid, Heading, Input, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import { parseCookies } from 'nookies';
import { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { Map, Marker, Point, ZoomControl } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import { NewHeader } from '../../components/NewHeader';
import { api } from '../../services/apiClient';

import { withSSRAuth } from '../../utils/withSSRAuth';
import { BsBoxArrowInLeft } from 'react-icons/bs';

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

export default function ListItinerary () {
  const [itineraries, setItineraries] = useState<any>([]);

  const [city, setCity] = useState("");
  const [interest, setInterest] = useState("");
  const [minPrice, setMinPrice] = useState<any>("");
  const [maxPrice, setMaxPrice] = useState<any>("");

  const filteredByCitytineraries =
    city !== ""
      ? itineraries.filter((itinerary: any) =>
        itinerary.simple.cities.some((cit: any) =>
          cit.name.toLowerCase().includes(city.toLowerCase())
        )
      )
      : itineraries;

  const filteredByCategorytineraries =
    interest !== ""
      ? filteredByCitytineraries.filter((itinerary: any) =>
        itinerary.interests.includes(interest)
      )
      : filteredByCitytineraries;

  const filteredtineraries =
    maxPrice > 0
      ? filteredByCategorytineraries.filter(
        (itinerary: any) =>
          Number(itinerary.spent) >= minPrice &&
          Number(itinerary.spent) <= maxPrice
      )
      : filteredByCategorytineraries;

  const { data, error, isLoading } = useQuery(['destinations'], async () => {
    const { data } = await api.get('/destinations/all');
    return data;
  }, {
    staleTime: 1000 * 60 * 5
  });

  const handleClick = ({ event, anchor, payload }: ClickPointHandler) => {
    console.log(payload, anchor);
  };

  console.log(data);

  return (
    <>
      <Head>
        <title>RedSterna - Todos os roteiros</title>
      </Head>

      <NewHeader />
      <Box overflowWrap={'normal'}>
        <Grid as='form' my={'8px'} gridTemplateColumns={'1fr 1fr'}>
          <Box px={'24px'} position={'sticky'}>
            <FormControl>
              <Heading mb={'16px'} fontSize={'1.25rem'} fontWeight={'normal'}>
                Procure por cidades
              </Heading>
              <Input type='text' size={'lg'} placeholder={'Ex.: São Paulo, Lima, Lisboa...'} borderColor={'gray.500'} _hover={{ borderColor: 'gray.500' }} />
            </FormControl>
          </Box>
          <Map
            provider={osm}
            height={512}
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
                  <Marker key={index} offset={[0, -50]} anchor={[Number(destination.latitude), Number(destination.longitude)]} onClick={({ event, anchor, payload }) => handleClick({ event, anchor, payload: destination })} color={'hsl(0, 100%, 50%)'} />
                );
              })
            )}
          </Map>
        </Grid>
      </Box>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const cookies = parseCookies(ctx);
  const token = cookies['redsterna.token'];

  const response = await fetch('https://redsterna.herokuapp.com/user/me', {
    headers: new Headers({
      'Authorization': `Bearer ${token}`
    })
  });

  const user = await response.json();

  return {
    props: {
      user
    },
  };
});
