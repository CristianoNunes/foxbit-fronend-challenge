import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/global';
import { theme } from '../styles/theme';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Foxbit - Frontend Challenge</title>
        <meta name="description" content="Foxbit frontend challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
