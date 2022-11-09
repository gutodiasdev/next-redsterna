/* eslint-disable react-hooks/exhaustive-deps */
import { Box, FormControl, Grid, Heading, Input, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import { parseCookies } from 'nookies';
import { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { Map, Marker } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import { NewHeader } from '../../components/NewHeader';
import { api } from '../../services/apiClient';

import { withSSRAuth } from '../../utils/withSSRAuth';

type DestinationProps = {
  id: string,
  name: string,
  countryCode: string,
  stateCode: string,
  latitude: string,
  longitude: string,
  roadmapId: string;
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

  const handleClick = () => {
    console.log('Clicked');
  };

  return (
    <>
      <Head>
        <title>RedSterna - Todos os roteiros</title>
      </Head>

      <NewHeader />
      <Box>
        {/* <Box maxWidth={'1100px'} margin={'0 auto'} borderRadius={'lg'} overflow={'hidden'}>
          <Image src='/images/desktop/itinerary/list.jpg' width={1100} height={300} alt='Todos os roteiros' />
          <Heading mt={'-142px'} position={'absolute'} px={'32px'} color={'white'}>
            Destinos
          </Heading>
        </Box> */}

        <Grid as='form' my={'8px'} gridTemplateColumns={'1fr 1fr'}>
          <Box p={'24px'} position={'sticky'}>
            <FormControl>
              <Heading mb={'16px'} fontSize={'1.25rem'}>
                Procure por cidades
              </Heading>
              <Input type='text' size={'lg'} placeholder={'Ex.: São Paulo, Lima, Lisboa...'} borderColor={'gray.500'} _hover={{ borderColor: 'gray.500' }} />
            </FormControl>
          </Box>
          <Box>
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
                    <Marker key={index} offset={[0, -50]} anchor={[Number(destination.latitude), Number(destination.longitude)]} onClick={handleClick} color={'hsl(0, 100%, 50%)'} />
                  );
                })
              )}
            </Map>
          </Box>
        </Grid>
      </Box>



      {/* <Container>
        <Header>DESTINOS</Header>
        <Line fullWidth>
          <Title>Navegue pelos roteiros publicados</Title>
        </Line>
        <Line fullWidth style={{ justifyContent: "space-between" }}>
          <Input
            type="text"
            placeholder="Procurar por cidade..."
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <div>
            <Input
              type="number"
              placeholder="Valor Minimo"
              onChange={(e) => setMinPrice(Number(e.target.value))}
              step="0.01"
              min="0"
              value={minPrice}
            />
            <Input
              type="number"
              placeholder="Valor Maximo"
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              step="0.01"
              min="0"
              value={maxPrice}
            />
          </div>
        </Line>
        <Line fullWidth>
          <CheckboxContainer>
            <Checkbox
              onChange={(e: any) =>
                interest === e.target.value
                  ? setInterest("")
                  : setInterest(e.target.value)
              }
              value="cidade histórica"
              checked={!!(interest === "cidade histórica")}
              type="checkbox"
            />
            <CheckboxLabel>Cidade Histórica</CheckboxLabel>
          </CheckboxContainer>

          <CheckboxContainer>
            <Checkbox
              onChange={(e: any) =>
                interest === e.target.value
                  ? setInterest("")
                  : setInterest(e.target.value)
              }
              value="praia"
              checked={!!(interest === "praia")}
              type="checkbox"
            />
            <CheckboxLabel>Praia</CheckboxLabel>
          </CheckboxContainer>

          <CheckboxContainer>
            <Checkbox
              onChange={(e: any) =>
                interest === e.target.value
                  ? setInterest("")
                  : setInterest(e.target.value)
              }
              value="montanha"
              checked={!!(interest === "montanha")}
              type="checkbox"
            />
            <CheckboxLabel>Montanha</CheckboxLabel>
          </CheckboxContainer>

          <CheckboxContainer>
            <Checkbox
              onChange={(e: any) =>
                interest === e.target.value
                  ? setInterest("")
                  : setInterest(e.target.value)
              }
              value="camping"
              checked={!!(interest === "camping")}
              type="checkbox"
            />
            <CheckboxLabel>Camping</CheckboxLabel>
          </CheckboxContainer>
          <CheckboxContainer>
            <Checkbox
              onChange={(e: any) =>
                interest === e.target.value
                  ? setInterest("")
                  : setInterest(e.target.value)
              }
              value="cidade moderna"
              checked={!!(interest === "cidade moderna")}
              type="checkbox"
            />
            <CheckboxLabel>Cidade Moderna</CheckboxLabel>
          </CheckboxContainer>

          <CheckboxContainer>
            <Checkbox
              onChange={(e: any) =>
                interest === e.target.value
                  ? setInterest("")
                  : setInterest(e.target.value)
              }
              value="campo"
              checked={!!(interest === "campo")}
              type="checkbox"
            />
            <CheckboxLabel>Campo</CheckboxLabel>
          </CheckboxContainer>

          <CheckboxContainer>
            <Checkbox
              onChange={(e: any) =>
                interest === e.target.value
                  ? setInterest("")
                  : setInterest(e.target.value)
              }
              value="cachoeira"
              checked={!!(interest === "cachoeira")}
              type="checkbox"
            />
            <CheckboxLabel>Cachoeira</CheckboxLabel>
          </CheckboxContainer>

          <CheckboxContainer>
            <Checkbox
              onChange={(e: any) =>
                interest === e.target.value
                  ? setInterest("")
                  : setInterest(e.target.value)
              }
              value="trekking"
              checked={!!(interest === "trekking")}
              type="checkbox"
            />
            <CheckboxLabel>Trekking</CheckboxLabel>
          </CheckboxContainer>
        </Line>
        <List>
          {/* {filteredtineraries.length > 0 ? (
          filteredtineraries.map((itinerary: any, index: any) => (
            <Card
              key={itinerary._id}
              to={{
                pathname: `/destino/${itinerary._id}`,
                state: { itinerary },
              }}
            >
              <Line>
                <Column>
                  <Image
                    cover={
                      itinerary.cover
                        ? itinerary.cover
                        : "/images/desktop/home/redsterna_gray_logo.png"
                    }
                  />
                </Column>
                <Column>
                  <h4>{itinerary.title}</h4>
                </Column>
              </Line>
              <Column>
                {itinerary?.rate?.quantity <= 0 ? (
                  <span style={{ fontSize: 11 }}>Ainda não há avaliações</span>
                ) : (
                  <Line>
                    <StarRating
                      value={Number(
                        itinerary.rate.media / itinerary.rate.quantity
                      )}
                    />
                    <span>{itinerary?.rate.quantity} avaliações</span>
                  </Line>
                )}
              </Column>
            </Card>
          ))
        ) : (
          <Title>Não há roteiros para serem listados</Title>
        )}
        </List>
      </Container> 
    */}
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
