import Router from 'next/router';
import { destroyCookie, setCookie } from 'nookies';
import { createContext, ReactNode, useContext, useState } from "react";

import { api } from "../services/api";

export interface SignInRequest {
  email: string;
  password: string;
}

type User = {
  id: string;
  email: string;
};

type RegisterProps = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

type ServerResponse = {
  message: string;
};


interface AuthContextData {
  signIn (data: SignInRequest): Promise<void>;
  signOut: () => void;
  signUpRedSterna (data: RegisterProps): Promise<ServerResponse>;
  user: User | undefined;
}

type SignInResponse = {
  token: string;
  id: string;
  email: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut () {
  destroyCookie(undefined, 'nextauth.token');
  destroyCookie(undefined, 'nextauth.refreshToken');

  authChannel.postMessage('signOut');

  Router.push('/');
}

export function AuthProvider ({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();

  const signIn = async (input: SignInRequest) => {
    try {
      const response = await api.post<SignInResponse>("/user/sessions", input);
      const { token, id, email } = response.data;


      setCookie(undefined, 'redsterna.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      });

      setUser({ id, email });

      api.defaults.headers.common.token = `Bearer ${token}`;

      Router.push('/minha-conta');
    } catch (e: any) {
      throw new Error(e);
    }
  };

  async function signUpRedSterna (input: RegisterProps): Promise<ServerResponse> {
    try {
      const response = await api.post('/user/register', input);
      const { token, id, email } = response.data;

      setCookie(undefined, 'redsterna.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      });

      setUser({ id, email });

      api.defaults.headers.common.token = `Bearer ${token}`;

      Router.push('/minha-conta');

      return {
        message: 'Usuário criado com sucesso'
      };
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        signUpRedSterna,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};