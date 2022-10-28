/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import * as S from "../../styles/user";

import { api } from "../../services/api";
import { ColumnContainer } from "../../styles/create-itineraries";
import StarRating from "../../components/starRating";
import Image from 'next/image';
import Link from 'next/link';

const User = (props: any) => {
  const [itineraries, setItineraries] = useState<any>([]);
  const [favoriteItineraries, setFavoriteItineraries] = useState<any>([]);
  const [destinies, setDestinies] = useState(0);

  const user: any = {};

  const DEFAULT_TEXT =
    "Viajante RedSterna que busca viver e compartilhar experiências incríveis ao redor do mundo! Siga-me para acompanhar minha jornada.";

  const icons = {
    editIcon: "/images/desktop/profile/edit_icon.png",
    deleteIcon: "/images/desktop/profile/delete_icon.png",
    followIcon: "/images/desktop/profile/follow_icon.png",
  };

  const Collapse = (props: any) => {
    return (
      <>
        <S.Select>
          <S.Title>{props.title}</S.Title>
        </S.Select>
        {props.hiddenContent}
      </>
    );
  };

  const getItineraries = async (): Promise<void> => {
    const response = await api.get(`/itineraries/user/id?id=${user._id}`);

    setItineraries(response.data);
    return;
  };

  const getFavoriteItineraries = async (): Promise<void> => {
    const response = await api.get(`/user/favorite/itinerary?id=${user._id}`);

    setFavoriteItineraries(response.data);
    return;
  };

  const loadData = async (): Promise<void> => {
    await getItineraries();
    await getFavoriteItineraries();
  };

  useEffect(() => {
    (async () => {
      await loadData();
      return;
    })();
  }, [user]);

  useEffect(() => {
    let qtt = 0;
    itineraries.map((itinerary: any) => {
      return (qtt = qtt + itinerary.simple.cities.length);
    });
    setDestinies(qtt);
  }, [itineraries]);

  return (
    <>
      {user && (
        <S.Container>
          <S.Header>
            <S.HeaderTab>
              <S.LargeText> Viajante Redsterna</S.LargeText>
            </S.HeaderTab>

            <S.Cover>
              <S.CoverIcon
                src={
                  user?.pictures?.cover !== ""
                    ? user?.pictures?.cover
                    : "/images/desktop/profile/default_cover.png"
                }
              />
            </S.Cover>
            <S.DescriptionWrapper>
              <S.HeadingContainer>
                <S.Title>
                  {user.firstname} {user.lastname}
                </S.Title>
              </S.HeadingContainer>
              <S.HeadingContainer>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: 50,
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src="/images/desktop/profile/bag_icon.png"
                    height={24}
                    width={24}
                    alt="Ícone de uma mochila de trilha"
                  />
                  <S.Text>Perfil {user.ranking || "Latão"}</S.Text>
                </div>

                {user?.social?.instagram && user?.social?.instagram !== "" && (
                  <S.SocialMediaButton
                    href={user.social.instagram}
                    target="_blank"
                  >
                    <Image
                      src="/images/desktop/profile/insta_icon.png"
                      height={47}
                      width={53}
                      alt="Símbolo do instagram"
                    />
                  </S.SocialMediaButton>
                )}
                {user?.social?.facebook && user?.social?.facebook !== "" && (
                  <S.SocialMediaButton
                    href={user.social.facebook}
                    target="_blank"
                  >
                    <Image
                      src="/images/desktop/profile/facebook_icon.png"
                      height={47}
                      width={53}
                      alt="Símbolo do Facebook"
                    />
                  </S.SocialMediaButton>
                )}
                <S.Section onClick={() => alert("wefasf")}>Seguir</S.Section>
                <S.Section>
                  <S.Destination>
                    <S.SmallText>{destinies || 0}</S.SmallText>
                    <S.SmallText>Destinos</S.SmallText>
                  </S.Destination>
                  <S.Itinerary>
                    <S.SmallText>{itineraries?.length || 0}</S.SmallText>
                    <S.SmallText>Roteiros</S.SmallText>
                  </S.Itinerary>
                </S.Section>
              </S.HeadingContainer>
            </S.DescriptionWrapper>
            <S.ProfileImageContainer>
              <S.ProfileIcon
                src={
                  user?.pictures?.profile !== ""
                    ? user?.pictures?.profile
                    : "/images/empty-profile.png"
                }
                alt="Foto de perfil"
              />
            </S.ProfileImageContainer>
          </S.Header>

          <S.Description>
            <S.FollowGroupContainer>
              <S.FollowIcon
                src={icons.followIcon}
                height={36}
                width={40}
                alt="Ícone de uma mochila de trilha"
              />
              <S.RowContainer>
                <S.FollowColumn>
                  <S.Text>Seguidores</S.Text>
                  <S.Counter>{user.followers || 0}</S.Counter>
                </S.FollowColumn>
                <S.FollowColumn>
                  <S.Text>Seguindo</S.Text>
                  <S.Counter>{user?.following?.length || 0}</S.Counter>
                </S.FollowColumn>
              </S.RowContainer>
            </S.FollowGroupContainer>

            <S.InterestsContainer>
              <S.FollowColumn>
                <S.InterestsHeading>
                  <Image
                    src="/images/desktop/profile/bag_icon.png"
                    height={35}
                    width={32}
                    alt="Ícone de uma mochila de trilha"
                  />
                  <S.SmallText>Interesses</S.SmallText>
                </S.InterestsHeading>
              </S.FollowColumn>
            </S.InterestsContainer>
          </S.Description>
          <S.AboutContainer>
            <Collapse
              title="Sobre"
              hiddenContent={
                <S.CollapseDescription>
                  <S.Select>
                    <S.SelectDescription>
                      {user.about && user?.about?.length > 0
                        ? user.about
                        : DEFAULT_TEXT}
                    </S.SelectDescription>
                  </S.Select>
                </S.CollapseDescription>
              }
            />
          </S.AboutContainer>
          <S.Roadmap></S.Roadmap>
          <S.ItineraryContainer>
            <S.HeadingItinerary>
              <S.TitleContainer>
                <Image
                  src="/images/desktop/profile/bag_icon.png"
                  height={35}
                  width={32}
                  alt="Ícone de uma mochila de trilha"
                />
                <S.Title>Roteiros publicados</S.Title>
              </S.TitleContainer>
            </S.HeadingItinerary>
            <S.Divider />
            {itineraries && itineraries.length > 0 ? (
              itineraries.map((itinerary: any, index: any) => (
                <Link
                  key={index}
                  // href={{
                  //   pathname: `/destino/${itinerary._id}`,
                  //   state: { itinerary },
                  // }}
                  href={`/destino/${itinerary._id}`}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      paddingLeft: 10,
                    }}
                  >
                    <Image
                      src={
                        itinerary.cover ||
                        "/images/desktop/home/redsterna_gray_logo.png"
                      }
                      width={50}
                      height={50}
                      alt={itinerary.title}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        marginLeft: 20,
                      }}
                    >
                      <h4>{itinerary.title}</h4>
                    </div>
                  </div>
                  <ColumnContainer>
                    {itinerary.rate.quantity >= 1 ? (
                      <StarRating
                        value={Number(
                          itinerary.rate.media / itinerary.rate.quantity
                        )}
                      />
                    ) : (
                      <p style={{ fontSize: 11 }}>Ainda não há avaliações</p>
                    )}
                  </ColumnContainer>
                </Link>
              ))
            ) : (
              <S.SmallText>Nenhum roteiro publicado</S.SmallText>
            )}
            <S.Divider />
          </S.ItineraryContainer>
          <S.ItineraryContainer>
            <S.HeadingItinerary>
              <S.TitleContainer>
                <Image
                  src="/images/desktop/profile/bag_icon.png"
                  height={35}
                  width={32}
                  alt="Ícone de uma mochila de trilha"
                />
                <S.Title>Roteiros favoritos</S.Title>
              </S.TitleContainer>
            </S.HeadingItinerary>
            {favoriteItineraries && favoriteItineraries.length > 0 ? (
              favoriteItineraries.map((itinerary: any, index: any) => (
                // <Link
                //   to={{
                //     pathname: `/destino/${itinerary._id}`,
                //     state: { itinerary },
                //   }}
                //   key={index}
                //   style={{
                //     width: "100%",
                //     display: "flex",
                //     justifyContent: "space-between",
                //     alignItems: "flex-start",
                //   }}
                // >
                <Link
                  href={`/destino/${itinerary._id}`}
                  key={index}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      paddingLeft: 10,
                    }}
                  >
                    <Image
                      src={
                        itinerary.cover ||
                        "/images/desktop/home/redsterna_gray_logo.png"
                      }
                      width={50}
                      height={50}
                      alt={itinerary.title}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        marginLeft: 20,
                      }}
                    >
                      <h4>{itinerary.title}</h4>
                    </div>
                  </div>
                  <ColumnContainer>
                    {itinerary.rate.quantity >= 1 ? (
                      <StarRating
                        value={Number(
                          itinerary.rate.media / itinerary.rate.quantity
                        )}
                      />
                    ) : (
                      <p style={{ fontSize: 11 }}>Ainda não há avaliações</p>
                    )}
                  </ColumnContainer>
                </Link>
              ))
            ) : (
              <S.SmallText>Nenhum roteiro favoritado</S.SmallText>
            )}
          </S.ItineraryContainer>

          <S.FollowContainer>
            <S.HeadingItinerary>
              <S.TitleContainer>
                <S.FollowIcon
                  src={icons.followIcon}
                  height={36}
                  width={35}
                  alt="Ícone de uma mochila de trilha"
                />
                <S.Title>Seguidores</S.Title>
                <S.Counter>{user.followers || 0}</S.Counter>
              </S.TitleContainer>
            </S.HeadingItinerary>
            <S.Divider />
          </S.FollowContainer>

          <S.FollowContainer>
            <S.HeadingItinerary>
              <S.TitleContainer>
                <S.FollowIcon
                  src={icons.followIcon}
                  height={36}
                  width={35}
                  alt="Ícone de uma mochila de trilha"
                />
                <S.Title>Seguindo</S.Title>
                <S.Counter>{user?.following?.length || 0}</S.Counter>
              </S.TitleContainer>
            </S.HeadingItinerary>
            <S.Divider />
          </S.FollowContainer>
        </S.Container>
      )}
    </>
  );
};

export default User;
