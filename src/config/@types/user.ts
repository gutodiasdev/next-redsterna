export type ServerSideUser = {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    pictures: {
      id: string;
      cover: string;
      profile: string;
      userProfileId: string;
    } | null;
  };
};

export type InputUserUpdate = {
  name?: string;
  email?: string;
  emailVerified?: string;
  image?: string;
  firstname?: string;
  lastname?: string;
  gender?: string;
  pictures?: {
    cover?: string;
    profile?: string;
  };
  social?: {
    facebook?: string;
    instagram?: string;
  };
  about?: string;
  birthdate?: string;
  confirmPolicy?: boolean;
  country?: string;
  ranking?: string;
  interests?: Array<string>;
  username?: string;
  password?: string;
};