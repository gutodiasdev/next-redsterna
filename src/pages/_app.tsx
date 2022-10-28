import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from "react-toastify";
import { createGlobalStyle } from "styled-components";
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ItinerariesProvider } from '../contexts/itinerary.context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthProvider } from '../contexts/AuthContext';

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

const queryClient = new QueryClient();

export default function App ({ Component, pageProps }: AppProps<{ session: Session; }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <ChakraProvider>
              <ItinerariesProvider>
                <GlobalStyle />
                <ToastContainer />
                <Header />
                <Component {...pageProps} />
                <Footer />
              </ItinerariesProvider>
            </ChakraProvider>
          </RecoilRoot>
        </QueryClientProvider >
      </AuthProvider>
    </SessionProvider>
  );
}
