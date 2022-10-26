import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from "react-toastify";
import { createGlobalStyle } from "styled-components";
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

import RootProvider from "../contexts/index";

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

export default function App ({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ChakraProvider>
          <RootProvider>
            <GlobalStyle />
            <ToastContainer />
            <Component {...pageProps} />
          </RootProvider>
        </ChakraProvider>
      </RecoilRoot>
    </QueryClientProvider >
  );
}
