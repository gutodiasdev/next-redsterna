import { AxiosError, AxiosResponse } from 'axios';
import api from './api';

type RegisterProps = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

type ServerResponse = {
  message: string;
};

async function registerUser (input: RegisterProps): Promise<ServerResponse> {
  const response = await api.post('/user/register', input);

  return response.data;
};

export { registerUser };