/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import StarRating from "../../components/starRating";
import api from '../../services/api';

import {
  Container,
  Header,
  Image,
  List,
  Line,
  Title,
  Card,
  Column,
  Input,
  Checkbox,
  CheckboxContainer,
  CheckboxLabel,
} from "../../styles/list-itineraries";

export default function ListItinerary () {
  const [itineraries, setItineraries] = useState<any>([]);

  const [city, setCity] = useState("");
  const [interest, setInterest] = useState("");
  const [minPrice, setMinPrice] = useState<any>("");
  const [maxPrice, setMaxPrice] = useState<any>("");

  const getItineraries = async (): Promise<void> => {
    const response = await api.get("/itineraries/all");

    setItineraries(response.data);
    return;
  };

  const loadData = async (): Promise<void> => {
    await getItineraries();
  };

  useEffect(() => {
    (async () => {
      await loadData();
      return;
    })();
  }, []);

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

  return (
    <Container>
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
        )} */}
      </List>
    </Container>
  );
}
