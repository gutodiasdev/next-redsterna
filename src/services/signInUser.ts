import { api } from './api';

type SignProps = {
  email: string;
  password: string;
};

type SignInOutput = {
  id: string;
  email: string;
};

async function signInUser (input: SignProps): Promise<SignInOutput> {
  const { data } = await api.post<SignInOutput>('/user/signin', input);

  return data;
}

export { signInUser };