import { useContext, useState } from "react";
import * as S from "../styles/profile";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import DeleteItinerary from "../components/deleteItineraryModal";
import StarRating from "../components/starRating";
import { ColumnContainer } from "../styles/create-itineraries";
import { useQuery } from 'react-query';
import Link from 'next/link';
import Image from 'next/image';
import { Flex, HStack, Spinner } from '@chakra-ui/react';
import { api } from '../services/apiClient';
import { AuthContext } from '../contexts/AuthContext';
import { withSSRAuth } from '../utils/withSSRAuth';


/* eslint-disable */
export default function Profile () {
  const [itineraries, setItineraries] = useState<any>([]);
  const [favoriteItineraries, setFavoriteItineraries] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itinerary, setItinerary] = useState({});

  const { user: userData } = useContext(AuthContext);

  const user = {
    _id: '',
    following: [],
    followers: [],
    pictures: {
      cover: '',
      profile: ''
    },
    ranking: '',
    social: {
      instagram: '',
      facebook: ''
    },
    firstname: '',
    lastname: '',
    about: ''
  };

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

  const { data, isLoading, error } = useQuery([user._id, 'data'], async () => {
    const { data: itineraries } = await api.get(`/itineraries/user/${String(userData?.id)}`);
    const { data: userProfile } = await api.get(`/user/me`);
    const { data: followers } = await api.get(`/user/followersFrom/${String(userData?.id)}`);
    const { data: followees } = await api.get(`/user/followeesFrom/${String(userData?.id)}`);

    return {
      itineraries: itineraries.itineraries,
      user: userProfile,
      followers: followers,
      followees: followees,
    };
  }, {
    staleTime: 1000 * 10
  });

  return (
    <>
      <Flex
        justifyContent={'center'}
      >
        {user && (
          <Flex
            maxW={'72%'}
            flexDirection={'column'}
          >
            <DeleteItinerary
              itinerary={itinerary}
              isOpen={isModalVisible}
              closeModal={() => setIsModalVisible(false)}
            />

            <S.Header>
              <S.HeaderTab>
                <S.LargeText> Viajante Redsterna</S.LargeText>

                <Link href="/buscar-usuarios">
                  <Image
                    src="/images/desktop/profile/search_icon.png"
                    height={30}
                    width={30}
                    alt="Icone de configuração"
                  />
                </Link>
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
                    Bem-vindo,{" "}
                    <S.UserName>
                      {isLoading ? (<Spinner />) : (data?.user.name)}!
                    </S.UserName>
                  </S.Title>

                  <Link href="/editar-perfil">
                    <Image
                      src="/images/desktop/profile/config_icon.png"
                      height={25}
                      width={25}
                      alt="Ícone de uma mochila de trilha"
                    />
                  </Link>
                </S.HeadingContainer>
                <S.HeadingContainer>
                  <Image
                    src="/images/desktop/profile/bag_icon.png"
                    height={35}
                    width={32}
                    alt="Ícone de uma mochila de trilha"
                  />
                  <S.Text>Perfil {user.ranking || "Latão"}</S.Text>
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
                  about
                  <S.Section>
                    <S.Destination>
                      <S.SmallText>{isLoading ? (<Spinner />) : (data?.itineraries.length)}</S.SmallText>
                      <S.SmallText>Destino</S.SmallText>
                    </S.Destination>
                    <S.Itinerary>
                      <S.SmallText>{isLoading ? (<Spinner />) : (data?.itineraries.length)}</S.SmallText>
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
                    <S.Text>Seguindo</S.Text>
                    <S.Counter>{isLoading ? (<Spinner />) : (data?.followees.length)}</S.Counter>
                  </S.FollowColumn>
                  <S.FollowColumn>
                    <S.Text>Seguidores</S.Text>
                    <S.Counter>{isLoading ? (<Spinner />) : (data?.followers.length)}</S.Counter>
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
                title="Sobre mim"
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
                <Link href="/criar-roteiro">
                  <S.ItineraryButton >
                    incluir roteiros
                  </S.ItineraryButton>
                </Link>
              </S.HeadingItinerary>
              <S.Divider />
              {isLoading ? (<Spinner />) : data?.itineraries.length > 0 ? (
                data?.itineraries.map((itinerary: any, index: any) => (
                  <Flex
                    w={'100%'}
                    justifyContent={'space-between'}
                    paddingBottom={'16px'}
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
                    <HStack spacing={'16px'}>
                      <Link
                        href={`editar-roteiro/${itinerary.id}`}
                      >
                        <AiFillEdit size={16} />
                      </Link>
                      <AiFillDelete
                        size={16}
                        color="red"
                        onClick={() => {
                          setItinerary(itinerary);
                          setIsModalVisible(true);
                        }}
                      />
                    </HStack>
                  </Flex>
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
              {favoriteItineraries.length > 0 ? (
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
                  <S.Counter>{user.followers}</S.Counter>
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
                  <S.Counter>{user.following.length}</S.Counter>
                </S.TitleContainer>
              </S.HeadingItinerary>
              <S.Divider />
            </S.FollowContainer>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  };
});