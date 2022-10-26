import Image from 'next/image';
import Link from 'next/link';
import MapPage from '../components/Map';
import {
  AditionalInfoButton,
  Banner,
  Container,
  RegisterButton,
  RegisterText,
  RoadmapButton,
  RoadmapText,
  RowContainer,
  Section,
  TipBanner,
  TipsText,
  Title
} from "../styles/home";

const Home = () => {
  return (
    <Container>
      <MapPage height={300} />
      <Section>
        <Title>Roteiros</Title>
        <Banner>
          <Image
            src="/images/desktop/home/roadmap.png"
            height={370}
            width={1400}
            alt="Fotos de roteiros de viagens e um texto informativo"
          />
          <RoadmapText>
            Aqui na RedSterna registramos experiências incríveis dos seus sonhos
            de viagens, realizados ou planejados. Também encontrarão dicas do
            que fazer e o que se deve evitar em determinados destinos.
          </RoadmapText>
          <Link href="/destinos">
            <RoadmapButton className="img-link" />
          </Link>
        </Banner>
      </Section>
      <Section>
        <Title>Faça Parte dessa viagem, junte-se a nós!!!</Title>
        <RegisterText>
          Faça o registro das suas viagens, compartilhe suas histórias e inspire
          pessoas.
        </RegisterText>
        <Link href="/cadastre-se">
          <RegisterButton className="img-link" />
        </Link>
        <Banner>
          <Image
            src="/images/desktop/home/register.png"
            height={500}
            width={1400}
            alt="Fotos de roteiros de viagens e um texto informativo"
          />
        </Banner>
      </Section>
      <Section>
        <RowContainer>
          <Title>Dicas de Viagem </Title>
          <Image
            src="/images/desktop/home/letter_redsterna.png"
            height={72}
            width={460}
            alt="Fotos de roteiros de viagens e um texto informativo"
          />
        </RowContainer>
        <TipBanner>
          <Image
            src="/images/desktop/home/tip_banner.jpg"
            height={370}
            width={1500}
            alt="Fotos de roteiros de viagens e um texto informativo"
          />
          <AditionalInfoButton className="img-link" href="/pages/cadastre-se" />
          <TipsText>
            Aqui você encontrará o que precisa para planejar sua viagem e ainda
            sair economizando.
          </TipsText>
        </TipBanner>
        <Title
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          Qual será sua próxima história? Conta pra gente!
        </Title>
      </Section>
    </Container>
  );
};

export default Home;
