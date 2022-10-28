
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

export function withSSRGuest<P extends { [key: string]: any; }> (fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    if (cookies['redsterna.token']) {
      return {
        redirect: {
          destination: '/minha-conta',
          permanent: false,
        }
      };
    }

    return await fn(ctx);
  };
}