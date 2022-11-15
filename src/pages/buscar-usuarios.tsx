import Link from 'next/link';
import { useEffect, useState } from "react";
import Footer from '../components/Footer';
import { NewHeader } from '../components/NewHeader';
import * as S from "../styles/user-search";

const UserSearch = () => {
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState<any>([]);

  const filteredUsers =
    search.length > 0
      ? users.filter(
        (user: any) =>
          user.firstname.toLowerCase().includes(search.toLowerCase()) ||
          user.lastname.toLowerCase().includes(search.toLowerCase())
      )
      : [];

  return (
    <>
      <NewHeader pageTitle='Encontrar usuário - RedSterna' />
      <S.Wrapper>
        <S.Container>
          <S.TitleContainer>
            <S.Title>Buscar Viajante</S.Title>
            <S.Divider />
            <S.Description>Pesquisa por nome de usuário:</S.Description>
          </S.TitleContainer>
          <S.RowContainer>
            <S.Input
              type="input"
              placeholder="Procurar..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </S.RowContainer>

          <S.UserWrapper>
            {search.length > 0 ? (
              <>
                {filteredUsers.map((user: any, id: any) => {
                  return (
                    <Link href={`usuario/${user._id}`} key={id}>
                      <S.UserContainer>
                        {/* <S.UserContainer
                    to={{
                      pathname: `usuario/${user._id}`,
                      state: { user },
                    }}
                  > */}
                        <S.RowContainer>
                          <S.ProfileImageContainer>
                            <S.ProfileIcon
                              src={
                                user?.pictures?.profile &&
                                  user?.pictures?.profile !== ""
                                  ? user?.pictures?.profile
                                  : "/images/empty-profile.png"
                              }
                            />
                          </S.ProfileImageContainer>

                          <S.CollumnContainer>
                            <Link
                              href={`usuario/${user._id}`}
                            >
                              <S.UserTitle>
                                {/* <S.UserTitle
                          to={{
                            pathname: `usuario/${user._id}`,
                            state: { user },
                          }}
                        > */}
                                {`${user.firstname} ${user.lastname}`}
                              </S.UserTitle>
                            </Link>
                            <S.UserSummary>{user.about}</S.UserSummary>
                          </S.CollumnContainer>
                        </S.RowContainer>
                      </S.UserContainer>
                    </Link>
                  );
                })}
              </>
            ) : (
              <>
                {users.map((user: any, id: any) => {
                  return (
                    <Link href={`usuario/${user._id}`} key={id}>
                      <S.UserContainer>
                        {/* <S.UserContainer
                      to={{
                        pathname: `usuario/${user._id}`,
                        state: { user },
                      }}
                    > */}
                        <S.RowContainer>
                          <S.ProfileImageContainer>
                            <S.ProfileIcon
                              src={
                                user?.pictures?.profile &&
                                  user?.pictures?.profile !== ""
                                  ? user?.pictures?.profile
                                  : "/images/empty-profile.png"
                              }
                            />
                          </S.ProfileImageContainer>

                          <S.CollumnContainer>
                            <Link href={`usuario/${user._id}`}>
                              <S.UserTitle>
                                {/* <S.UserTitle
                            to={{
                              pathname: `usuario/${user._id}`,
                              state: { user },
                            }}
                          > */}
                                {`${user.firstname} ${user.lastname}`}
                              </S.UserTitle>
                            </Link>
                            <S.UserSummary>{user.about}</S.UserSummary>
                          </S.CollumnContainer>
                        </S.RowContainer>
                      </S.UserContainer>
                    </Link>
                  );
                })}
              </>
            )}
          </S.UserWrapper>
          <Link href="/minha-conta">
            <S.BackButton>Voltar</S.BackButton>
          </Link>
        </S.Container>
      </S.Wrapper >
      <Footer />
    </>
  );
};

export default UserSearch;
