import { parseCookies } from 'nookies';
import { useQuery } from 'react-query';
import MapPage from '../components/Map';
import { NewHeader } from '../components/NewHeader';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';

type UserProfile = {
  id: string,
  email: string,
  name: string,
  image: string | null,
  pictures: string | null;
};

type AccountProps = {
  user: {
    id: string;
    email: string;
    name: string | null;
    image: string | null;
    pictures: string | null;
  };
};

export default function Map ({ user }: AccountProps) {

  const { data, isLoading } = useQuery(['user', user.id], async () => {
    const { data } = await api.get<UserProfile>(`/user/profile/${user.id}`);

    return data;
  }, {
    staleTime: 1000 * 60 * 5
  });

  return (
    <>
      <NewHeader name={isLoading ? '' : String(data?.name)} />
      <MapPage height={300} />
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const cookies = parseCookies(ctx);
  const token = cookies['redsterna.token'];

  const response = await fetch('https://redsterna.herokuapp.com/user/me', {
    headers: new Headers({
      'Authorization': `Bearer ${token}`
    })
  });

  const user = await response.json();

  return {
    props: {
      user
    },
  };
});
