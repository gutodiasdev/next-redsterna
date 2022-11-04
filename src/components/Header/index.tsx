import {
  Box,
  Flex,
  Grid,
  useDisclosure,
  Button
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { LoginModal } from "../LoginModal";
import { IoIosLogOut } from 'react-icons/io';
import { BiUser } from 'react-icons/bi';
import Head from 'next/head';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { parseCookies } from 'nookies';

export function Header () {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { signOut } = useContext(AuthContext);

  const cookies = parseCookies();
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="./images/pin.png" type="image/x-icon" />
      </Head>
      <Grid
        templateColumns={'300px 1fr'}
        px={'16px'}
      >
        <Box>
          <Link href="/">
            <Image
              src="/images/desktop/header_logo.png"
              height={90}
              width={300}
              alt="redsterna logo"
            />
          </Link>
        </Box>
        <Flex
          alignItems={'center'}
          justify={'space-between'}
        >
          <Link href="/mapa">
            <Button
              variant={'ghost'}
              fontWeight={'normal'}
              leftIcon={<Image
                height={35}
                width={35}
                src="/images/desktop/planet_icon.png"
                alt="Icone do planeta terra"
              />
              }
              _hover={{
                background: 'none'
              }}
            >
              Mapa Interativo
            </Button>
          </Link>
          <Link href="/destinos">
            <Button
              variant={'ghost'}
              fontWeight={'normal'}
              leftIcon={<Image
                height={35}
                width={35}
                src="/images/desktop/bag_icon.png"
                alt="Ícone de mala de bagagem"
              />
              }
              _hover={{
                background: 'none'
              }}
            >
              Destinos
            </Button>
          </Link>
          <Link href="/dicas-de-viagem">
            <Button
              variant={'ghost'}
              fontWeight={'normal'}
              leftIcon={<Image
                height={35}
                width={35}
                src="/images/desktop/board_icon.png"
                alt="Ícone de placa indicando caminhos"
              />
              }
              _hover={{
                background: 'none'
              }}
            >
              Dicas de Viagem
            </Button>
          </Link>
          {!session && !cookies['redsterna.token'] ? (
            <>
              <Link href="/cadastre-se">
                <Button
                  variant={'ghost'}
                  fontWeight={'normal'}
                  leftIcon={
                    <Image
                      height={35}
                      width={35}
                      src="/images/desktop/people_icon.png"
                      alt="Ícone de duas pessoas"
                    />
                  }
                  _hover={{
                    background: 'none'
                  }}
                >
                  Cadastre-se
                </Button>
              </Link>
              <Button
                variant={'ghost'}
                fontWeight={'normal'}
                onClick={onOpen}
                leftIcon={<BiUser />}
                _hover={{
                  background: 'none'
                }}
              >
                Login
              </Button>
            </>
          ) : (
            <>
              <Link href="/minha-conta">
                <Button
                  variant={'ghost'}
                  fontWeight={'normal'}
                  leftIcon={
                    <Image
                      height={30}
                      width={30}
                      src="/images/login_icon.png"
                      alt="Ícone de duas pessoas"
                    />
                  }
                  _hover={{
                    background: 'none'
                  }}
                >
                  Minha Conta
                </Button>
              </Link>
              <Button
                variant={'ghost'}
                fontWeight={'normal'}
                onClick={() => signOut()}
                rightIcon={<IoIosLogOut />}
                _hover={{
                  background: 'none'
                }}
              >
                Sair
              </Button>
            </>
          )}
        </Flex>
      </Grid>
      <LoginModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};