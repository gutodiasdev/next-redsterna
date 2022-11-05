import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { signOut as nextSignOut } from 'next-auth/react';
import decode from 'jwt-decode';

import { api } from "../services/apiClient";

export interface SignInRequest {
  email: string;
  password: string;
}

type User = {
  id: string;
};

type RegisterProps = {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
};

type RegisterResponse = {
  token: string,
  refreshToken: {
    id: string;
    expriresIn: number;
    userId: string;
  };
};

interface AuthContextData {
  signIn (data: SignInRequest): Promise<void>;
  signOut: () => void;
  signUpRedSterna (data: RegisterProps): Promise<void>;
  user: User | undefined;
  isAuthenticated: boolean;
}

type SignInResponse = {
  token: string;
  refreshToken: {
    id: string;
    expriresIn: number;
    userId: string;
  };
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function signOut () {
  const { 'redsterna.token': token, 'next-auth.session-token': nextauthtoken } = parseCookies();

  if (token) destroyCookie(undefined, 'redsterna.token');
  if (nextauthtoken) nextSignOut();

  Router.push('/');
}

export function AuthProvider ({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    async () => {
      const { 'redsterna.token': token } = parseCookies();
      const { data } = await api.get('/user/me');
      setUser({ id: data.id });
    };

  }, []);

  const signIn = async (input: SignInRequest) => {
    try {
      const response = await api.post<SignInResponse>("/user/sessions", input);
      const { token, refreshToken } = response.data;

      setCookie(undefined, 'redsterna.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      });

      setCookie(undefined, 'redsterna.refreshToken', refreshToken.id, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      });


      setUser({ id: refreshToken.id });

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      Router.push('/my-account');
    } catch (e: any) {
      throw new Error(e);
    }
  };

  async function signUpRedSterna (input: RegisterProps): Promise<void> {
    try {
      const response = await api.post<RegisterResponse>('/user/register', input);
      const { token, refreshToken } = response.data;

      setCookie(undefined, 'redsterna.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      });

      setCookie(undefined, 'redsterna.refreshToken', refreshToken.id, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      });

      setUser({ id: refreshToken.userId });

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      Router.push('/my-account');
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        signOut,
        signUpRedSterna,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};