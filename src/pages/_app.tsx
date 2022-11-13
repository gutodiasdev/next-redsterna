import { Box, ChakraProvider } from '@chakra-ui/react';
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from "react-toastify";
import { createGlobalStyle } from "styled-components";

import { AuthProvider } from '../contexts/AuthContext';
import { ItinerariesProvider } from '../contexts/itinerary.context';

const GlobalStyle = createGlobalStyle`
html,
body {
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

@media (prefers-color-scheme: dark) {
  body {
    background: white;
    color: black;
  }
}`;

export const queryClient = new QueryClient();

export default function App ({ Component, pageProps }: AppProps<{ session: Session; }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <ItinerariesProvider>
              <GlobalStyle />
              <ToastContainer />
              <Component {...pageProps} />
            </ItinerariesProvider>
          </ChakraProvider>
        </QueryClientProvider >
      </AuthProvider>
    </SessionProvider>
  );
}
