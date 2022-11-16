import {
  Box,
  Grid,
  Heading,
  Popover,
  PopoverContent,
  Spinner,
  useDisclosure
} from '@chakra-ui/react';
import Image from 'next/image';
import { Draggable, Map, Marker } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import { useState } from 'react';
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

const MapPage = (props: MapPageProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [destinationContent, setDestinationContent] = useState<DestinationProps | null>();

  const { data, error, isLoading } = useQuery(['itineraries'], async () => {
    const { data } = await api.get('/destinations/all');
    return data;
  }, {
    staleTime: 1000 * 60 * 5
  });

  const handlePinHover = (destination: DestinationProps) => {
    if (!isOpen) {
      setDestinationContent(destination);
      onOpen();
    } else {
      setDestinationContent(null);
    }
  };

  return (
    <>
      <Grid gridTemplateColumns={'1fr 1fr'}>
        <Box></Box>
        <Box height={'300px'}>
          <Map
            provider={osm}
            height={512}
            defaultCenter={[-23, -10]}
            defaultZoom={4}
            center={[-15.77972000, -47.92972000]}
          >
            {isLoading ? (
              <Spinner />
            ) : error ? (
              <Heading as={'h2'}>
                Falha aos encontrar os itinerários
              </Heading>
            ) : (
              data.destinations.map((destination: DestinationProps, index: number) => {
                return (
                  <Box as={Marker} key={index} offset={[10, 0]}
                    anchor={[Number(destination.latitude), Number(destination.longitude)]}
                    onClick={() => handlePinHover(destination)} cursor={'pointer'}>
                    <Image width={15} height={20} src="/images/pin.png" alt={destination.name + '_' + destination.id} />
                  </Box>
                );
              })
            )}
          </Map>
        </Box>
      </Grid>
      <Popover isOpen={isOpen} onClose={onClose}>
        <PopoverContent>
          {destinationContent?.name}
        </PopoverContent>
      </Popover>

    </>
  );
};

export default MapPage;
