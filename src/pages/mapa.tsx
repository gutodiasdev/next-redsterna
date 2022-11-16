import { parseCookies } from 'nookies';
import Footer from '../components/Footer';
import { InteractiveMap } from '../components/Map/InteractiveMap';
import { NewHeader } from '../components/NewHeader';
import { ServerSideUser } from '../config/@types/user';
import { api } from '../services/apiClient';
import { withSSRGuest } from '../utils/withSSRGuest';

export default function Map ({ user }: ServerSideUser) {

  return (
    <>
      <NewHeader pageTitle='Mapa Interativo - RedSterna' />
      <InteractiveMap height={480} />
      <Footer />
    </>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  };
});