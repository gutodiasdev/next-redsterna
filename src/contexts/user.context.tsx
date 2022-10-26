import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

import api from "../services/api";

interface UserContextData {
  updateUser (data: any): Promise<void>;
  getUserData: () => Promise<void>;
  listUsers: () => Promise<void>;
  uploadFile (file: any): Promise<string>;
  user: IUser;
}

export interface IUsers {
  _id: string;
  firstname: string;
  lastname: string;
  about?: string;
  pictures?: {
    profile: string;
    cover: string;
  };
}
export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  country?: string;
  birthdate: string;
  email: string;
  interests?: string[];
  pictures?: {
    profile: string;
    cover: string;
  };
  social?: {
    facebook: string;
    instagram: string;
  };
  gender?: "M" | "F" | "NB" | "AN";
  about?: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  status: boolean;
  ranking?: string;
  itineraries: [];
  favorites: [];
  followers: number;
  following: [];
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState("");

  const listUsers = async () => {
    try {
      const { data } = await api.get("/user/all");

      return data;
    } catch (error: any) {
      console.log(error);
      toast.error(
        "Não foi possível carregar os usuários, tente novamente mais tarde",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    }
  };

  const getUserData = async () => {
    try {
      const { data: user } = await api.get("/user");

      if (window) {
        window.localStorage.setItem("user", JSON.stringify(user));
      }

      setUser(JSON.stringify({ ...user, password: null }));

      return;
    } catch (error: any) {
      toast.error("Sessão exiprada, faça login novamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        localStorage.clear();
        window.location.href = "/";
      }, 3500);
    }
  };

  const updateUser = async (register: any) => {
    try {
      const response = await api.put("/user/update", {
        ...register,
        social: {
          instagram: register.instagram,
          facebook: register.facebook,
        },
      });

      toast.success("Conta atualizada com sucesso!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      return response.data;
    } catch (e: any) {
      toast.error("Não foi possível editar os dados, tente novamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const uploadFile = async (file: any) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post("/user/upload", formData);

    return response.data.locationInS3;
  };

  const stringifyUser: any = window ? window.localStorage.getItem("user") : null;

  const storageUser =
    stringifyUser && stringifyUser.length > 1
      ? JSON.parse(stringifyUser)
      : false;

  return (
    <UserContext.Provider
      value={{
        user: user !== "" ? JSON.parse(user) : storageUser,
        getUserData,
        updateUser,
        uploadFile,
        listUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser (): UserContextData {
  const context = useContext(UserContext);

  return context;
}
