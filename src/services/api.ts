import axios from 'axios';

export function setupAPIClient (ctx = undefined) {
  if (process.env.NODE_ENV !== 'production') {
    return axios.create({
      baseURL: "http://localhost:3001",
    });
  } else {
    return axios.create({
      baseURL: "https://next-redsterna.vercel.app/api",
    });
  }
}