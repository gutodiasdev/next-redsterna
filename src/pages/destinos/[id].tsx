import { useEffect, useState } from "react";

import LoginModal from "../../components/modal";
import StarRating from "../../components/starRating";

import { Column, Container, Content, Header, Line, Star } from "../../styles/show-itineraries";
import Image from 'next/image';
import { useItineraries } from '../../contexts/itinerary.context';

/* eslint-disable */
export default function ShowItinerary (props: any) {
  const itinerary: any = {};

  const [isModalVisible, setIsModalVisible] = useState(false);

  const { favoriteItinerary, rateItinerary } = useItineraries();

  const user: any = {};

  const authenticated = !!user;

  // const onFavoriteItinerary = async (id: string) => {
  //   if (authenticated) {
  //     await favoriteItinerary(id);
  //     await getUserData();
  //   } else {
  //     setIsModalVisible(true);
  //   }
  // };

  const onRateItinerary = async ({
    id,
    rate,
  }: {
    id: string;
    rate: number;
  }) => {
    if (authenticated) {
      await rateItinerary({ id, rate });
      return;
    } else {
      setIsModalVisible(true);
    }
  };

  const isFavorited = user.favorites.find((id: any) => id === itinerary._id);

  return (
    <Container>
      <LoginModal
        isOpen={isModalVisible}
        closeModal={() => setIsModalVisible(false)}
      />
      <Header
        cover={
          itinerary.cover
            ? itinerary.cover
            : "/images/desktop/home/redsterna_gray_logo.png"
        }
      />
      <Line fullWidth>
        <Content>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h4>Título: {itinerary.title}</h4>
            <Star
              color={isFavorited ? "#ffc107" : "#bfbfbf"}
              onClick={() => { }}
              size={40}
            />
          </div>
          <Line style={{ marginBottom: 30 }}>
            <span style={{ marginRight: 20 }}>Avalie este roteiro </span>
            <StarRating
              value={itinerary.rate.media / itinerary.rate.quantity}
              onClick={(value: number) =>
                onRateItinerary({ id: itinerary._id, rate: value })
              }
            />
          </Line>
          <span style={{ marginBottom: 10 }}>
            <b>Dias de viagem:</b> {itinerary.days}
          </span>
          <span style={{ marginBottom: 10 }}>
            <b>Custo total por pessoa:</b> R$ {itinerary.spent}
          </span>
          <span style={{ marginBottom: 10 }}>
            <b>Resumo da viagem:</b>
          </span>
          <textarea readOnly style={{ width: 500, height: 300 }}>
            {itinerary.simple.summary !== ""
              ? itinerary.simple.summary
              : "Este roteiro não possui resumo"}
          </textarea>
          <Column>
            <b style={{ marginTop: 30 }}>Cidades visitadas:</b>
            {itinerary.simple.cities.length > 0 &&
              itinerary.simple.cities.map((city: any, i: number) => (
                <Column key={i}>
                  <Line fullWidth>
                    <span style={{ marginRight: 30 }}>{city.name}</span>
                    {city.rate >= 1 ? (
                      <StarRating value={city.rate} />
                    ) : (
                      <span>Sem avaliação</span>
                    )}
                  </Line>
                  {city.accommodations.length > 0 &&
                    city.accommodations.map((host: any, index: number) => (
                      <>
                        {host.name && host.name !== "" && (
                          <Line fullWidth key={index}>
                            <span>{host.name}</span>
                            {host.rate >= 1 ? (
                              <StarRating value={host.rate} />
                            ) : (
                              <span>Sem avaliação</span>
                            )}
                          </Line>
                        )}
                      </>
                    ))}
                  <b>Descrição da cidade: </b>
                  <Line fullWidth>
                    <textarea readOnly style={{ width: 500, height: 300 }}>
                      {city.description}
                    </textarea>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        width: "100%",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {city.images.length > 0 &&
                        city.images.map((image: string) => (
                          <Image
                            src={image}
                            width={300}
                            height={300}
                            key={image}
                            alt={city.name}
                          />
                        ))}
                    </div>
                  </Line>
                </Column>
              ))}
          </Column>
        </Content>
      </Line>
    </Container>
  );
}
