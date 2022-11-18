import {
  Box,
  Heading,
  Spinner
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Map, Marker, Point, ZoomControl } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import { useQuery } from 'react-query';
import { api } from '../../services/apiClient';

type MapPageProps = {
  height: number;
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

export function InteractiveMap (props: MapPageProps) {
  const router = useRouter();

  const { data, error, isLoading } = useQuery(['itineraries'], async () => {
    const { data } = await api.get('/destinations/all');
    return data;
  }, {
    staleTime: 1000 * 60 * 5
  });

  const handleClick = ({ event, anchor, payload }: ClickPointHandler) => {
    router.push(`/destinos/${payload.id}`);
  };

  return (
    <Box width={'100%'} >
      <Map
        provider={osm}
        height={props.height}
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
    </Box>
  );
};
