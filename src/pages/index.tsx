import { Box, Flex, Heading } from '@chakra-ui/react';
import Image from 'next/image';
import MapPage from '../components/Map';
import {
  Container,
  RegisterText,
  RoadmapText,
  RowContainer,
  TipBanner,
  TipsText,
} from "../styles/home";
import { withSSRGuest } from '../utils/withSSRGuest';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import { NewHeader } from '../components/NewHeader';

export default function Home () {
  return (
    <>
      <NewHeader />
      <Container>
        <MapPage height={300} />
        <Box>
          <Heading
            as='h2'
            p={'40px'}
            fontFamily={'Montserrat'}
            fontWeight={'normal'}
            color={'gray.500'}
          >
            Roteiros
          </Heading>
          <Flex
            justifyContent={'center'}
          >
            <Image
              src="/images/desktop/home/roadmap.png"
              height={370}
              width={1366}
              alt="Fotos de roteiros de viagens e um texto informativo"
            />
            <RoadmapText>
              Aqui na RedSterna registramos experiências incríveis dos seus sonhos
              de viagens, realizados ou planejados. Também encontrarão dicas do
              que fazer e o que se deve evitar em determinados destinos.
            </RoadmapText>
          </Flex>
        </Box>
        <Box>
          <Heading
            as='h2'
            p={'40px'}
            fontFamily={'Montserrat'}
            fontWeight={'normal'}
            color={'gray.500'}
          >
            Faça Parte dessa viagem, junte-se a nós!!!
          </Heading>
          <RegisterText>
            Faça o registro das suas viagens, compartilhe suas histórias e inspire
            pessoas.
          </RegisterText>
          <Flex
            justifyContent={'center'}
          >
            <Image
              src="/images/desktop/home/register.png"
              height={500}
              width={1366}
              alt="Fotos de roteiros de viagens e um texto informativo"
            />
          </Flex>
        </Box>
        <Box>
          <Flex>
            <Heading
              as='h2'
              p={'40px'}
              fontFamily={'Montserrat'}
              fontWeight={'normal'}
              color={'gray.500'}
            >
              Dicas de Viagem
            </Heading>
            <Image
              src="/images/desktop/home/letter_redsterna.png"
              height={72}
              width={460}
              alt="Fotos de roteiros de viagens e um texto informativo"
            />
          </Flex>
          <TipBanner>
            <Image
              src="/images/desktop/home/tip_banner.jpg"
              height={370}
              width={1366}
              alt="Fotos de roteiros de viagens e um texto informativo"
            />
            <TipsText>
              Aqui você encontrará o que precisa para planejar sua viagem e ainda
              sair economizando.
            </TipsText>
          </TipBanner>
          <Heading
            as='h2'
            p={'40px'}
            fontFamily={'Montserrat'}
            fontWeight={'normal'}
            color={'gray.500'}
          >
            Qual será sua próxima história? Conta pra gente!
          </Heading>
        </Box>
      </Container>
      <Footer />
    </>
  );
};


export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  };
});
