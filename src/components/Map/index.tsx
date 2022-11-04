import {
  Heading,
  Spinner
} from '@chakra-ui/react';
import { Draggable, Map } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import { useQuery } from 'react-query';
import { useItineraries } from '../../contexts/itinerary.context';
import { api } from '../../services/api';
// import { useItineraries } from "../../contexts/itinerary.context";

import * as C from "./styles";

type MapPageProps = {
  height: number;
};

/* eslint-disable */
const MapPage = (props: MapPageProps) => {
  const { listItineraries, itineraries } = useItineraries();

  const { data, error, isLoading } = useQuery(['itineraries'], async () => {
    const { data } = await api.get('/itineraries/all');
    return data;
  }, {
    staleTime: 1000 * 10
  });

  return (
    <C.Container>
      <Map
        provider={osm}
        height={props.height || 500}
        defaultCenter={[-23, -10]}
        defaultZoom={3}
      >
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Heading as={'h2'}>
            Falha aos encontrar os itinerários
          </Heading>
        ) : (
          <Heading as={'h2'}>
            Falha aos encontrar os itinerários
          </Heading>
          // data.map((itinerary: any) => {
          //   if (itineraries.simple.cities) {
          //     return itinerary.simple.cities.map(
          //       (city: {
          //         coordinates: { latitude: number; longitude: number; };
          //       }) => (
          //         <Draggable
          //           offset={[20, 10]}
          //           anchor={[city.coordinates.latitude, city.coordinates.longitude]}
          //         >
          //           <img width={15} height={20} src="/images/pin.png" alt="a" />
          //         </Draggable>
          //       )
          //     );
          //   } else {
          //     return null;
          //   }

          // })
        )}
      </Map>
    </C.Container>
  );
};

export default MapPage;
