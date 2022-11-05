export const apiUrlProvider = (path: string) => {
  if (process.env.NODE_ENV !== 'production') {
    return `http://localhost:3001${path}`;
  } else {
    return '';
  }
};