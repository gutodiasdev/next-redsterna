import Link from 'next/link';
import Footer from '../../components/Footer';
import { NewHeader } from '../../components/NewHeader';
import * as C from "../../styles/suggestions";
import { withSSRGuest } from '../../utils/withSSRGuest';

export default function Suggestions () {
  const cardprops = [
    {
      title: "ALUGUEL DE CARRO",
      description:
        "Aqui você encontrará informações de como alugar seu carro no Brasil e no exterior Por que a Rentcars...",
      image: "/images/dicas/aluguel.jpg",
      action: "/dicas-de-viagem/aluguel",
    },
    {
      title: "SEGURO VIAGEM",
      description:
        "Seguro Viagem: Tudo o que você precisa saber sobre despesas médicas! Antes de fazer uma viagem é importante tomar alguns...",
      image: "/images/dicas/seguro.jpeg",
      action: "/dicas-de-viagem/seguro",
    },
    {
      title: "PLANEJANDO SUA VIAGEM",
      description:
        "Aqui você encontrará informações de como planejar sua viagem sem entrar numa fria! Dicas e...",
      image: "/images/dicas/planejando.jpeg",
      action: "/dicas-de-viagem/planejamento",
    },
    {
      title: "DESCONTOS EM INGRESSOS E PASSEIOS",
      description:
        "Aqui você encontrará informações de como adquirir seus ingressos e...",
      image: "/images/dicas/passeios.jpeg",
      action: "/dicas-de-viagem/descontos",
    },
    {
      title: "CHIP PARA VIAGEM INTERNACIONAL",
      description:
        "A melhor forma de adquirir um chip para viagem internacional Vamos supor...",
      image: "/images/dicas/chip.jpeg",
      action: "/dicas-de-viagem/chip",
    },
    {
      title: "HOSPEDAGENS - MELHORES PREÇOS",
      description:
        "Vai viajar e não sabe onde ficar? Vamos te ajudar! Antes de realizar uma hospedagem...",
      image: "/images/dicas/hospedagem.jpeg",
      action: "dicas-de-viagem/hospedagens",
    },
  ];

  const Card = (props: any) => (
    <C.Card>
      <C.Line>
        <C.Profile>
          <C.Image src={props.image} />
        </C.Profile>
        <C.Description>
          <Link href={props.action}>
            <h4>{props.title}</h4>
          </Link>
          <p>{props.description}</p>
        </C.Description>
      </C.Line>
      <C.Line>
        <C.ButtonContainer>
          <Link href={props.action}>+</Link>
        </C.ButtonContainer>
      </C.Line>
    </C.Card>
  );

  return (
    <>
      <NewHeader />
      <C.Container>
        <C.ImageContainer>
          <h2>DICAS DE VIAGEM</h2>
        </C.ImageContainer>
        <C.Section>
          {cardprops.map((props, index) => (
            <Card {...props} key={index} />
          ))}
        </C.Section>
      </C.Container>
      <Footer />
    </>
  );
};

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  };
});
