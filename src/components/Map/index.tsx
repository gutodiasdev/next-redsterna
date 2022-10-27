import { Draggable, Map } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import { useEffect } from "react";
import { useQuery } from 'react-query';
// import { useItineraries } from "../../contexts/itinerary.context";

import * as C from "./styles";

/* eslint-disable */
const MapPage = (props: any) => {
  // const { listItineraries, itineraries } = useItineraries();

  // useEffect(() => {
  //   listItineraries();
  // }, []);

  // const { data, error } = useQuery(['itineraries'], listItineraries, {
  //   staleTime: 1000 * 10
  // });

  return (
    <C.Container>
      <Map
        provider={osm}
        height={props.height || 500}
        defaultCenter={[-23, -10]}
        defaultZoom={3}
        width={1366}
      >
        {/* {itineraries.map((itinerary: any) => {
          return itinerary.simple.cities.map(
            (city: {
              coordinates: { latitude: number; longitude: number; };
            }) => (
              <Draggable
                offset={[20, 10]}
                anchor={[city.coordinates.latitude, city.coordinates.longitude]}
              >
                <img width={15} height={20} src="/images/pin.png" alt="a" />
              </Draggable>
            )
          );
        })} */}
      </Map>
    </C.Container>
  );
};

export default MapPage;
