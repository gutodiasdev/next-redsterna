export type ServerSideUser = {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    pictures: {
      cover: string;
      profile: string;
    } | null;
  };
};