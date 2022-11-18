import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

let isRefreshing = false;
let failedRequestsQueue: Array<any> = [];

export function setupAPIClient (ctx = undefined) {
  let cookies = parseCookies();
  let api: AxiosInstance;

  api = axios.create({
    // baseURL: "https://redsterna.herokuapp.com/",
    baseURL: "http://localhost:3001",
    headers: {
      Authorization: `Bearer ${cookies['redsterna.token']}`
    }
  });

  api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError<{ code: string; }>) => {
    if (error.response?.status === 401) {
      if (error.response.data?.code === 'token.expired') {
        cookies = parseCookies(ctx);

        const { 'redsterna.refreshToken': refreshToken } = cookies;
        const originalConfig = error.config;

        if (!isRefreshing) {
          api.post('/user/refresh', {
            refresh_token: refreshToken
          }).then(response => {
            const { token, refreshToken } = response.data;

            setCookie(ctx, 'redsterna.token', token, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/'
            });

            setCookie(ctx, 'redsterna.refreshToken', refreshToken, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/'
            });

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            failedRequestsQueue.forEach(request => request.onSuccess(token));
            failedRequestsQueue = [];
          }).catch(err => {
            failedRequestsQueue.forEach(request => request.onFailure(err));
            failedRequestsQueue = [];

            if (window) {
              signOut();
            }
          }).finally(() => {
            isRefreshing = false;
          });
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers!['Authorization'] = `Bearer ${token}`;

              resolve(api(originalConfig));
            },
            onFailure: (err: AxiosError) => {
              reject(err);
            }
          });
        });
      } else {
        if (window) {
          signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
    }
    return Promise.reject(error);
  }
  );

  return api;
}