import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";

type WithSSRAuthOptions = {
  permissions?: string[];
  roles?: string[];
};

export function withSSRAuth<P extends { [key: string]: any; }> (fn: GetServerSideProps<P>, options?: WithSSRAuthOptions) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P> | undefined> => {
    const cookies = parseCookies(ctx);
    const token = cookies['redsterna.token'];
    const nextauthToken = cookies['next-auth.session-token'];

    if (!token && !nextauthToken) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      };
    };

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'redsterna.token');
        destroyCookie(ctx, 'redsterna.refreshToken');

        return {
          redirect: {
            destination: '/',
            permanent: false,
          }
        };
      }
    }
  };
}