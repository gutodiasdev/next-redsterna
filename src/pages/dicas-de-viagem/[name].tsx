import Image from 'next/image';
import * as C from "../../styles/suggestions-page";

/* eslint-disable */
const SuggestionPage = (props: any) => {
  const name: string = '';

  const page: any = {
    aluguel: {
      title: "ALUGUEL DE CARRO",
      image: "/images/dicas/aluguel.jpg",
      description: (
        <article className="col-xs-12 travel-tip-body">
          <p> </p>
          <h3>
            <strong>
              Aqui você encontrará informações de como alugar seu carro no
              Brasil e no exterior
            </strong>
          </h3>{" "}
          <p></p>
          <p> </p>
          <h4>
            <strong>
              Por que a Rentcars em parceria com a Red Sterna é a melhor opção
              para aluguel de carros no exterior?
            </strong>
          </h4>{" "}
          <p></p>
          <p>
            Além de já sair do Brasil com a reserva do carro garantida, você tem
            a opção de fazer o pagamento do aluguel em reais, com cartão de
            crédito ou boleto e sem IOF – o que já significa uma economia de
            6,38%! E tem mais: a Rent Cars da todo o suporte necessário, com
            atendimento personalizado em português independentemente de onde
            você estiver.
          </p>
          <p> </p>
          <h4>
            <strong>
              Para contratar o aluguel do seu carro para o Brasil ou para o
              exterior com segurança, agilidade e conforto e melhor preço
              garantido, basta clicar na imagem abaixo:
            </strong>
          </h4>{" "}
          <p></p>
          <object
            data="https://widgets.rentcars.com/widget-v8.html?requestor=4376&amp;locale=pt-br&amp;utm_source=redsterna.com.br&amp;utm_medium=afiliado-widget"
            width="300"
            height="300"
          ></object>
          <p> </p>
          <h4>
            <strong>Outras dúvidas:</strong>
          </h4>
          <p> </p>
          <h4>
            <strong>Como comparar preços de aluguel de carros?</strong>
          </h4>
          <p>
            Para pesquisar pelos melhores preços, basta inserir o local onde
            você deseja retirar o carro (pode ser uma cidade ou aeroporto), a
            data e o horário de retirada e devolução. Também é possível retirar
            o carro em um local e devolvê-lo em outro, basta selecionar a opção
            ‘’devolver em outra cidade’’. Depois de clicar em pesquisar, é
            listado as melhores ofertas de aluguel de carros e você pode filtrar
            pela sua locadora de preferência, categoria de carro desejada,
            intervalo de preços, entre outros.
          </p>
          <object
            data="https://widgets.rentcars.com/widget-v2.html?requestor=4376&amp;locale=pt-br&amp;utm_source=redsterna.com.br&amp;utm_medium=afiliado-widget"
            width="300"
            height="330"
          ></object>
          <p> </p>
          <h4>
            <strong>
              Quais são os requisitos mínimos para aluguel de carros?
            </strong>
          </h4>{" "}
          <p></p>
          <p>
            Existem algumas regras diferentes para aluguel de carros no Brasil e
            no exterior. No Brasil o locatário precisar ter 21 anos, carteira
            nacional de habilitação (CNH) válida e emitida há 2 anos (CNH
            definitiva) e cartão de crédito com limite suficiente para o
            bloqueio do caução, também chamado de pré-autorização. Já no
            exterior, a idade mínima é de 25 anos e, além da CNH, é necessário
            apresentar o passaporte e, em alguns países, a permissão
            internacional para dirigir (PID). O cartão de crédito para caução
            precisa ser internacional.{" "}
          </p>
          <p> </p>
          <h4>
            <strong>
              Países que exigem a permissão internacional para dirigir: Áustria,
              Grécia, Itália e em alguns países da África, Oriente Médio e da
              Oceania o documento costuma ser exigido, portanto, não
              recomendamos viajar sem.{" "}
            </strong>
          </h4>{" "}
          <p></p>
          <p> </p>
          <h4>
            <strong>Como funciona o caução no aluguel de carros?</strong>
          </h4>{" "}
          <p></p>
          <p>
            O bloqueio caução ou pré-autorização é um valor retido no cartão de
            crédito do locatário para a segurança da locadora. Esta quantia, que
            é determinada pela própria locadora, não é cobrada como uma compra
            comum, mas sim bloqueada do limite do cartão de crédito. Essa é uma
            exigência das locadoras, que fazem o bloqueio no momento da retira
            do veículo alugado. Mas pode ficar tranquilo! O valor é desbloqueado
            após a vistoria e entrega do carro nas mesmas condições de retirada.
          </p>
        </article>
      ),
    },
    seguro: {
      title: "SEGURO VIAGEM",
      image: "/images/dicas/seguro.jpeg",
      description: (
        <article className="col-xs-12 travel-tip-body">
          <p> </p>
          <h3>
            <strong>
              Seguro Viagem: Tudo o que você precisa saber sobre despesas
              médicas!{" "}
            </strong>
          </h3>{" "}
          <p></p>
          <p>
            {" "}
            Antes de fazer uma viagem é importante tomar alguns cuidados. Para
            não ter dores de cabeça no futuro. Por isso, o mais indicado é
            contratar um seguro viagem que te deixa tranquilo quanto alguns
            problemas. Além disso, em alguns países como os da União Europeia
            ele é obrigatório. Mas afinal, você sabe como funciona a cobertura
            de um seguro viagem? Sabe quais despesas médicas estão inclusas? Se
            você não sabe ou ainda tem alguma dúvida, fique tranquilo, neste
            post vamos te explicar melhor como funciona o seguro viagem.
          </p>
          <p> </p>
          <h3>
            <strong>
              O que é a cobertura de despesas médicas hospitalares no seguro
              viagem?
            </strong>
          </h3>{" "}
          <p></p>
          <p>
            {" "}
            A cobertura para despesas médicas hospitalares consiste no valor
            disponibilizado para eventualidades médicas de acordo com o plano
            contratado. Essa cobertura garante o reembolso de despesas médicas
            emergenciais ou para o tratamento imediato decorrido de acidente
            pessoal ou doença aguda contraída durante a viagem.{" "}
          </p>
          <p> </p>
          <h3>
            <strong>
              Como acionar a cobertura de despesas médicas hospitalares?{" "}
            </strong>
          </h3>{" "}
          <p></p>
          <p>
            {" "}
            Em caso de alguma eventualidade, o segurado deverá entrar em contato
            com a seguradora através dos telefones ou canais de atendimento
            disponibilizados na apólice. A ligação pode ser feita à cobrar
            (Collect Call) de qualquer telefone fixo no exterior. Algumas
            seguradoras oferecem o atendimento até mesmo por Skype, Whatsapp ou
            aplicativo próprio. Ao entrar em contato, o segurado deve informar a
            necessidade do atendimento e, em seguida, a seguradora o encaminhará
            ao hospital e/ ou rede credenciada mais próxima.{" "}
          </p>
          <p> </p>
          <h3>
            <strong>
              Como é realizada o pagamento das despesas médicas hospitalares?{" "}
            </strong>
          </h3>{" "}
          <p></p>
          <p>
            {" "}
            O pagamento das despesas médicas pode ser realizado de duas formas:{" "}
          </p>
          <p>
            {" "}
            &gt; Através da seguradora: neste caso, o pagamento das despesas
            médicas será feito pela seguradora diretamente com o hospital e/ou
            rede credenciada;{" "}
          </p>
          <p>
            {" "}
            &gt; Através do reembolso das despesas: neste caso, o segurado arca
            com as despesas médicas em um primeiro momento e depois solicita o
            reembolso à seguradora, mediante toda documentação apresentada e de
            acordo com as condições gerais das mesmas.{" "}
          </p>
          <p>
            {" "}
            Fique atento: É de extrema importância que o segurado solicite ao
            hospital, no momento da sua saída, o relatório médico da sua
            internação e/ou atendimento, tanto para o acionamento da cobertura
            médica quanto para o reembolso. Esse relatório deve conter o motivo
            pelo qual ele foi atendido e todos os procedimentos que foram
            realizados, bem como a relação de valores gastos.{" "}
          </p>
          <p> </p>
          <h3>
            <strong>Encontre o melhor seguro para sua viagem!</strong>
          </h3>{" "}
          <p></p>
          <p>
            Vai fazer uma viagem internacional e não sabe qual seguro adquirir?
            Nós temos a melhor solução para você! Pensando nisso nos afiliamos a
            uma das maiores plataformas de seguro viagem do Brasil, a Seguros
            Promo. Basta clicar no link abaixo e aproveitar o cupom de 5% de
            desconto
          </p>
          <iframe
            src="https://www.segurospromo.com.br/site/banner/redsterna/113?tt=banner113"
            style={{
              height: 350,
              width: 300,
              order: "none",
              padding: 0,
              margin: 0,
              overflow: "hidden",
            }}
          ></iframe>
          <p></p>
          <h3>
            <strong>O que é seguro viagem?</strong>
          </h3>{" "}
          <p></p>
          <p>
            {" "}
            O seguro viagem é o serviço que vai certificar a segurança e
            tranquilidade da sua viagem. Ele garante ao viajante o amparo
            necessário em qualquer situação de emergência, oferecendo
            assistência em caso de eventualidades. Assim, dentro do valor das
            coberturas, o segurado estará coberto de diversas situações como
            consultas médicas hospitalares, assistência jurídica, extravio de
            bagagem e até cancelamento de voos.
          </p>
          <p></p>
          <h3>
            <strong>
              Como faço para escolher o seguro ideal para minha viagem?
            </strong>
          </h3>{" "}
          <p></p>
          <p>
            {" "}
            Na hora de escolher o seguro viagem, contrate o que atenderá melhor
            às necessidades da sua viagem. O destino, a duração da viagem, o
            roteiro e a idade dos viajantes são alguns fatores que influenciam
            essa decisão. Se, por exemplo, você estiver viajando durante uma
            gestação ou for praticar esportes, contrate o plano de seguro viagem
            que apresente coberturas específicas para a sua viagem.{" "}
          </p>
          <p></p>
          <h3>
            <strong>Por que contratar com o Seguros Promo?</strong>
          </h3>{" "}
          <p></p>
          <p>
            {" "}
            Uma das maiores vantagens de contratar com o Seguros Promo é a
            possibilidade de comparar planos de seguros diferentes. Dessa forma,
            você garante o melhor valor e a melhor cobertura para sua viagem.
            Além disso, contam com profissionais capacitados para esclarecer
            quaisquer eventuais dúvidas que possam surgir no momento da pesquisa
            ou compra. Você pode entrar em contato com o Seguros Promo via
            telefone, e-mail, chat e whatsapp. Eles garantem também, total
            segurança no momento da compra. Dados, como número de cartão e
            senha, são criptografados e permanecem particulares em todo o tempo.
          </p>
          <p>
            <a
              target="_blank"
              href="https://www.segurospromo.com.br/?utm_medium=afiliado&amp;utm_source=banner&amp;pcrid=4662&amp;pcrtt=parceiros_banner99"
              rel="noreferrer"
            >
              <Image
                alt="Seguros Promo"
                width="300"
                height="250"
                style={{ height: "250px", width: "300px" }}
                src="https://static.parceirospromo.com.br/segurospromo/banners/79349796-de30-902e-6e7e-dea0d57ba90b/banner_institucional_300x250.png"
              />
            </a>
          </p>
          <p></p>
          <h3>
            <strong>
              Vale a pena utilizar apenas o seguro de viagem do cartão de
              crédito?{" "}
            </strong>
          </h3>{" "}
          <p></p>
          <p>
            O benefício oferecido por algumas categorias de cartões pode até
            parecer economia, mas a cobertura disponibilizada pode ser
            insuficiente para a viagem planejada. Nas principais empresas do
            mercado - como Visa, Mastercard, American Express - esse serviço
            está disponível apenas para portadores das bandeiras superiores,
            como platinum e black.{" "}
          </p>
          <p>
            Além disso, para ter direito ao seguro, a compra da passagem deve
            ter sido realizada pelo cartão de crédito e a viagem deve ter
            duração máxima de 30 dias. Quem viaja para fazer intercâmbio ou
            mochilão terá que contratar um seguro viagem direto da seguradora.
            Práticas de esportes e complicações na gravidez também não costumam
            ser cobertas.{" "}
          </p>
          <p>
            Por isso, mesmo tendo direito a esse benefício, é preciso estar
            bastante atento a cobertura. O ideal é sempre ligar para a central
            do cartão, avisar que vai viajar e solicitar as condições gerais da
            cobertura de do seguro viagem disponibilizada.{" "}
          </p>
          <p>
            Lembre-se também de comparar o seguro das operadoras de cartão de
            crédito com os planos das seguradoras. Além de serem especializadas
            em seguros para viagem, essas empresas possuem planos mais completos
            e mais opções de cobertura.
          </p>
          <a
            target="_blank"
            href="https://www.segurospromo.com.br/?utm_medium=afiliado&amp;utm_source=banner&amp;pcrid=4662&amp;pcrtt=parceiros_banner91"
            rel="noreferrer"
          >
            <Image
              alt="Seguros Promo"
              width="300"
              height="250"
              style={{ height: "250px", width: "300px" }}
              src="https://static.parceirospromo.com.br/segurospromo/banners/4d1c1c09-3f27-bf47-e3f5-f02e040a4dee/banner_compareplanos_300x250.png"
            />
          </a>
        </article>
      ),
    },
    planejamento: {
      title: "PLANEJANDO SUA VIAGEM",
      image: "/images/dicas/planejando.jpeg",
      description: (
        <article className="col-xs-12 travel-tip-body">
          <p></p>
          <h3>
            <strong>
              Aqui você encontrará informações de como planejar sua viagem sem
              entrar numa fria!
            </strong>
          </h3>{" "}
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <h4>Dicas e descontos: </h4>
          <p></p>
          <p></p>
        </article>
      ),
    },
    descontos: {
      title: "DESCONTOS EM INGRESSOS E PASSEIOS",
      image: "/images/dicas/passeios.jpeg",
      description: (
        <article className="col-xs-12 travel-tip-body">
          <p> </p>
          <h3>
            <strong>
              Aqui você encontrará informações de como adquirir seus ingressos e
              passeios de sites renomados com descontos e dicas imperdíveis!
            </strong>
          </h3>{" "}
          <p></p>
          <p>
            Você também sente dificuldades em planejar sua viagem? Em saber por
            exemplo quais são as principais atrações do local, o custo dos
            passeios e shows que quer conhecer?{" "}
          </p>
          <p>
            Pensando nisso nos afiliamos a maior plataforma de entretenimento do
            Brasil e do mundo para que você se planeje e adquira as melhores
            informações e promoções possíveis.
          </p>
          <p></p>
          <h4>
            <strong>Sobre a Viator</strong>
          </h4>{" "}
          <p></p>
          <p>
            {" "}
            A Viator é uma empresa da Trip Advisor, o maior site de viagens do
            mundo e fornece ingressos pra diversas atrações no mundo inteiro.
            Possui sistema de cancelamento gratuito, para a maioria das
            experiências, você receberá um reembolso integral se cancelar com
            até 24 horas de antecedência.
          </p>
          <p> </p>
          <h4>
            <strong>Comprando ingressos pela Viator</strong>
          </h4>{" "}
          <p></p>
          <p>
            Em cada cidade que você selecionar pelo{" "}
            <strong>Mapa Interativo</strong> você encontrará informações da
            cidade como lugares para conhecer, shows e eventos em geral além de
            é claro roteiros de pessoas que já conheceram o local. Porém caso
            esta cidade ainda não tenha esta informação, não se preocupe!
            Através do link abaixo você poderá encontrar todas as atrações da
            cidade desejada! O link te levará a Viator, uma empresa da Trip
            Advisor que garante o melhor preço para atração desejada!
          </p>
          <div className="col-xs-12 banner-pic">
            {" "}
            <Image src="LINK DA IMAGEM VAI AQUI" alt='' />{" "}
          </div>
          <p> </p>
          <h4>
            <strong>
              Caso a cidade desejada não possua dica ainda, você poderá clicar
              aqui nesse link e realizar sua pesquisa, siga o passo a passo
              abaixo:
            </strong>
          </h4>{" "}
          <p></p>
          <div className="col-xs-12 banner-pic">
            {" "}
            <Image src="LINK DA IMAGEM DA VIATOR" alt='' />{" "}
          </div>
        </article>
      ),
    },
    chip: {
      title: "CHIP PARA VIAGEM INTERNACIONAL",
      image: "/images/dicas/chip.jpeg",
      description: (
        <article className="col-xs-12 travel-tip-body">
          <p> </p>
          <h3>
            <strong>
              A melhor forma de adquirir um chip para viagem internacional
            </strong>
          </h3>{" "}
          <p></p>
          <p>
            {" "}
            Vamos supor que você acabou de chegar em um país completamente
            desconhecido, acabou de sair pela sala de desembarque do aeroporto e
            está totalmente offline! Não seria muito mais fácil já sair
            conectado, poder se localizar, pedir seu uber e sair andando
            tranquilamente por aí?{" "}
          </p>
          <p> </p>
          <h4>
            <strong>A solução é mais fácil que você imagina!</strong>
          </h4>{" "}
          <p></p>
          <p> Sobre a Viaje Conectado</p>
          <p>
            {" "}
            A Viaje Conectado é uma empresa criada há mais de 30 anos com sede
            em Orlando EUA, que vende chip internacional para vários lugares do
            mundo. O chip internacional da Viaje Conectado é prático de comprar
            e usar. É uma opção para já sair do Brasil com tudo funcionando e
            chegar lá com internet habilitada e eles entregam na sua casa.{" "}
          </p>
          <a
            href="https://viajeconectado.com/?ref=redsterna"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="//372978-1166811-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2020/02/336x280_3.jpg" alt='' />
          </a>
          <p>
            {" "}
            Você compra o seu chip online, recebe em casa e já sai do Brasil com
            a certeza de que terá internet em qualquer um dos países que fazem
            parte da área de cobertura da empresa.{" "}
          </p>
          <p> </p>
          <h4>
            <strong>
              Quais são as maiores utilidades de você ter um chip internacional
              em sua viagem?{" "}
            </strong>
          </h4>{" "}
          <p></p>
          <p> Utilizar o Whatsapp, Instagram e Facebook</p>
          <p> Chamar o Uber ao chegar no aeroporto</p>
          <p> Utilizar o google maps, google e e-mails</p>
          <p> </p>
          <h4>
            <strong>
              Quais os planos disponibilizados pela Viaje Conectado{" "}
            </strong>
          </h4>{" "}
          <p></p>
          <p>
            Os planos oferecidos pela empresa Viaje Conectado variam de acordo
            com seu destino. Veja cada um deles, o que oferecem e quanto custa
            para entender qual é o mais adequado para você.{" "}
          </p>
          <p> </p>
          <h4>
            <strong>Dados x Voz e Dados</strong>
          </h4>{" "}
          <p></p>
          <p>
            Os pacotes de Dados é basicamente um plano de internet ilimitada que
            funciona em diversos países. Esse chip NÃO permite a realização de
            chamadas ou SMS, mas lembre-se que você pode fazer chamadas pelo
            WhatsApp!{" "}
          </p>
          <p>
            {" "}
            Já o pacote de Voz e Dados, é válido apenas nos EUA e Europa e com
            ele você tem internet, ligações e SMS ilimitadas, podendo até ligar
            para o Brasil também sem pagar nada.{" "}
          </p>
          <p> </p>
          <h4>
            <strong>Onde eu compro o chip Viaje Conectado? </strong>
          </h4>{" "}
          <p></p>
          <p>
            {" "}
            Para comprar o chip basta clicar neste link: e efetuar sua compra. É
            totalmente seguro e prático. Eles entregam em casa e você já sai do
            Brasil conectado para sua viagem!
          </p>
          <p> </p>
          <h4>
            <strong>Como comprar? </strong>
          </h4>{" "}
          <p></p>
          <p> </p>
          <h4>
            <strong>1. Monte seu plano</strong>
          </h4>{" "}
          <p></p>
          <p>
            {" "}
            Clique na imagem abaixo, ela te direcionará até o site da Viaje
            conectado, escolha o plano levando em conta as suas necessidades
          </p>
          <a
            href="https://viajeconectado.com/?ref=redsterna"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="//372978-1166811-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2020/02/300x250_4.jpg" alt='' />
          </a>
          <p> </p>
          <h4>
            <strong>2. Escolha o local para onde irá viajar </strong>
          </h4>{" "}
          <p></p>
          <p>
            {" "}
            Escolha qual lugar vai viajar: Europa, EUA, Canada, México ou
            outros;
          </p>
          <p> </p>
          <h4>
            <strong>3. Selecione a quantidade de dias que irá precisar</strong>
          </h4>{" "}
          <p></p>
          Selecione a quantidade de dias de acordo com a sua viagem e
          necessidade.
          <p> </p>
          <h4>
            <strong>4. Clique em compre agora</strong>
          </h4>{" "}
          <p></p>
          <p> </p>
          <h4>
            <strong>5. Escolha o tipo de entrega</strong>
          </h4>{" "}
          <p></p>
          <p>
            Dependendo do seu endereço, aparecerão diferentes opções de frete.
            Escolha a que melhor funciona para você e clique em ‘Prosseguir para
            pagamento’.{" "}
          </p>
          <p> </p>
          <h4>
            <strong>6. Realizando o pagamento</strong>
          </h4>{" "}
          <p></p>
          <p>
            Escolha as opções de pagamento: paypal, cartão de crédito (note que
            para parcelar é preciso escolher cartão de crédito parcelamento) ou
            pagamento com débito online. OBS: O cartão de crédito deve estar
            autorizado para transações internacionais. Os locais de retirada do
            chip Viaje Conectado são diversos espalhados por todo Brasil. Várias
            agências de intercambio, viagens e turismo estão na lista em
            diversas capitais, interior de São Paulo, entre outras cidades. A
            seguir, estão as informações de entrega fornecidas pelo site.{" "}
          </p>
          <p> </p>
          <h4>
            <strong>
              {" "}
              Qualquer dúvida para comprar ou problemas técnicos para usar o
              chip, dá para entrar em contato com eles diretamente pelo whatsapp
              ou chat online. O número do WhatsApp é +1 (407) 334-3633 e para o
              chat é só entrar no site deles{" "}
            </strong>
          </h4>{" "}
          <p></p>
        </article>
      ),
    },
    hospedagens: {
      title: "HOSPEDAGENS - MELHORES PREÇOS",
      image: "/images/dicas/hospedagem.jpeg",
      description: (
        <article className="col-xs-12 travel-tip-body">
          <p> </p>
          <h3>
            <strong>Vai viajar e não sabe onde ficar? Vamos te ajudar!</strong>
          </h3>{" "}
          <p></p>
          <p>
            {" "}
            Antes de realizar uma hospedagem seja em um hotel ou em um hostel, é
            preciso ter em mente o que você vai precisar. Por exemplo, se está
            fazendo um mochilão na europa e não precisará em momento algum de
            atender uma vídeo chamada com seu chefe, então você não precisa se
            preocupar muito com a infraestrutura de internet local podendo ser
            apenas um wifi básico para utilizar o whatsapp e pesquisar lugares
            de interesse. Pensando em exemplos desse tipo listamos os principais
            pontos que deverão ser levados em consideração antes de definir onde
            vai ficar em sua viagem:
          </p>
          <ins
            className="bookingaff"
            data-aid="2110244"
            data-target_aid="2110244"
            data-prod="dfl2"
            data-width="300"
            data-height="350"
            data-lang="xb"
            data-currency="BRL"
            data-df_num_properties="3"
            data-bk-touched="true"
          >
            <iframe
              src="//www.booking.com/flexiproduct.html?product=dfl2&amp;w=300&amp;h=350&amp;lang=xb&amp;aid=2110244&amp;target_aid=2110244&amp;selected_currency=BRL&amp;df_num_properties=3&amp;fid=1662861827351&amp;"
              style={{
                height: 350,
                width: 300,
                order: "none",
                padding: 0,
                margin: 0,
                overflow: "hidden",
              }}
              id="booking_widget__2110244__1662861827351"
              data-responsive="false"
            ></iframe>
          </ins>
          <p> </p>
          <h4>
            <strong>localização</strong>
          </h4>{" "}
          <p></p>
          <p>
            O ideal é sempre que você fique mais próximo dos lugares de
            interesse, dos passeios que você irá realizar. Se isso não for
            possível, procure escolher um local próximo a avenida de fácil
            acesso aos seus lugares de interesse pois assim você economizará
            tempo e dinheiro uber ou transporte público até o local de interesse
          </p>
          <p> </p>
          <h4>
            <strong>Infraestrutura</strong>
          </h4>{" "}
          <p></p>
          <p>
            Como já comentando anteriormente, se você está fazendo uma viagem de
            negócios ou precisará atendar vídeo chamadas, atente-se a internet e
            locais onde poderá levar seu computador ou celular e atender com
            tranquilidade e pouco barulho
          </p>
          <p> </p>
          <h4>
            <strong>Conforto</strong>
          </h4>{" "}
          <p></p>
          <p>
            Se você é uma pessoa que não liga muito para conforto e não se
            incomoda em compartilhar o quarto e está com o orçamento apertado,
            um hostel pode ser uma ótima opção. O Airbnb também poderá te
            oferecer opções de casa compartilhada, onde você poderá alugar um
            quarto ao invés de todo local, podendo assim economizar bastante em
            sua viagem.
          </p>
          <p> </p>
          <h3>
            <strong>
              Recomendações de hospedagem e segurança na contratação
            </strong>
          </h3>{" "}
          <p></p>
          <p>
            No Redsterna você pode ler relatos através dos roteiros dos
            viajantes. Além disso as hospedagens possuem uma avaliação de 1 a 5
            estrelas onde nossos viajantes poderão emitir sua opinião sobre os
            locais onde ficaram
          </p>
          <p>
            Em cada cidade selecionada no mapa você poderá utilizar o mapa
            interativo do Booking para olhar localização e preços. Caso a cidade
            desejada não possua esta opção, você poderá{" "}
            <strong>Utilizar o simulador do booking abaixo</strong> e ir direto
            para o Booking pesquisar o local desejado.{" "}
          </p>
          <ins
            className="bookingaff"
            data-aid="2110245"
            data-target_aid="2110245"
            data-prod="banner"
            data-width="300"
            data-height="250"
            data-lang="xb"
            data-bk-touched="true"
          >
            <iframe
              src="//www.booking.com/flexiproduct.html?product=banner&amp;w=300&amp;h=250&amp;lang=xb&amp;aid=2110245&amp;target_aid=2110245&amp;tmpl=affiliate_banner&amp;fid=1662861827352&amp;"
              style={{
                height: 350,
                width: 300,
                order: "none",
                padding: 0,
                margin: 0,
                overflow: "hidden",
              }}
              id="booking_widget__2110245__1662861827352"
              data-responsive="true"
            ></iframe>
          </ins>
        </article>
      ),
    },
  };

  const content = page[name];

  return (
    <C.Container>
      <C.Section>
        {/* <C.Image src={content.image} /> */}
        {/* <h2>{content.title}</h2>
        {content.description} */}
      </C.Section>
    </C.Container>
  );
};

export default SuggestionPage;
