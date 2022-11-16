
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";
import { api } from '../services/apiClient';

export function withSSRGuest<P extends { [key: string]: any; }> (fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    if (cookies['redsterna.token']) {
      return await fn(ctx);
    }

    return await fn(ctx);
  };
}