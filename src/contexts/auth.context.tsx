import { createContext, useContext } from "react";

import api from "../services/api";

export interface SignInRequest {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn (data: SignInRequest): Promise<void>;
  signOut: () => void;
  signUp (data: ISignUpRequest): Promise<void>;
}

interface ISignUpRequest {
  firstname: string;
  lastname: string;
  country?: string;
  birthdate: string;
  email: string;
  password: string;
  interests?: string[];
  pictures?: {
    profile?: string;
    cover?: string;
  };
  social?: {
    facebook?: string;
    instagram?: string;
  };
  gender?: string;
  about?: string;
  confirmPolicy: any;
}

type SignInResponse = {
  token: string,
  user: {
    id: string;
    firstname: string;
    lastname: string;
    country?: string;
    birthdate: string;
    email: string;
    interests?: string[];
    pictures?: {
      profile?: string;
      cover?: string;
    };
    social?: {
      facebook?: string;
      instagram?: string;
    };
    gender: string;
    about: string;
    confirmPolicy: any;
    uniqueIdentifier: string;
    status: boolean,
    intineraries: [],
    followings: [],
    followers: [];
  };
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: any) => {
  const signIn = async ({ email, password }: SignInRequest) => {
    try {
      const response = await api.post<SignInResponse>("/user/auth", { email, password });
      const { token, user } = response.data;

      api.defaults.headers.common.token = `Bearer ${token}`;

      window.localStorage.setItem("token", token);
      window.localStorage.setItem("user", JSON.stringify(user));

      return;
    } catch (e: any) {
      throw new Error(e);
    }
  };

  const signUp = async (register: ISignUpRequest) => {
    try {
      const confirmPolicy = Boolean(
        register.confirmPolicy[0] && register.confirmPolicy[0] === "confirmed"
      );

      const response = await api.post("user/register", {
        ...register,
        confirmPolicy,
      });

      return response.data;
    } catch (e: any) {
      throw new Error(e);
    }
  };

  const signOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth (): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
