/* eslint-disable import/no-extraneous-dependencies */
// i18n
import '../locales/i18n';

// scroll bar
import 'simplebar-react/dist/simplebar.min.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

import { CacheProvider, EmotionCache } from '@emotion/react';
// next
import { NextPage } from 'next';
import Head from 'next/head';
import { AppProps } from 'next/app';
// react-query
import { QueryClientProvider } from 'react-query';
// utils
import { queryClient } from 'src/utils/reactQueryConfig';
import { Provider } from 'react-redux';
import { store } from 'src/redux/store';
import { useEffect } from 'react';
import AuthGuard from 'src/auth/AuthGuard';
import RoleBasedGuard from 'src/auth/RoleBasedGuard';
import createEmotionCache from '../utils/createEmotionCache';
// theme
import ThemeProvider from '../theme';
// locales
import ThemeLocalization from '../locales';
// components
import ProgressBar from '../components/progress-bar';
import SnackbarProvider from '../components/snackbar';
import { MotionLazyContainer } from '../components/animate';
import { ThemeSettings, SettingsProvider } from '../components/settings';

// Check our docs
// https://docs.minimals.cc/authentication/ts-version

import { AuthProvider } from '../auth/JwtContext';

import { socket } from '../socket';

// ----------------------------------------------------------------------

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      console.log('connected to socket');

      // socket.io.engine.on("upgrade", (transport) => {
      //   setTransport(transport.name);
      // });
    }

    function onDisconnect() {
      console.log('disconnected socket');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {/* {process.env.NODE_ENV === 'development' ? (
            <AuthGuard>
              <RoleBasedGuard>
                <Provider store={store}>
                  <SettingsProvider>
                    <MotionLazyContainer>
                      <ThemeProvider>
                        <ThemeSettings>
                          <ThemeLocalization>
                            <SnackbarProvider>
                              <ProgressBar />
                              {getLayout(<Component {...pageProps} />)}
                            </SnackbarProvider>
                          </ThemeLocalization>
                        </ThemeSettings>
                      </ThemeProvider>
                    </MotionLazyContainer>
                  </SettingsProvider>
                </Provider>
              </RoleBasedGuard>
            </AuthGuard>
          ) : ( */}
            <Provider store={store}>
              <SettingsProvider>
                <MotionLazyContainer>
                  <ThemeProvider>
                    <ThemeSettings>
                      <ThemeLocalization>
                        <SnackbarProvider>
                          <ProgressBar />
                          {getLayout(<Component {...pageProps} />)}
                        </SnackbarProvider>
                      </ThemeLocalization>
                    </ThemeSettings>
                  </ThemeProvider>
                </MotionLazyContainer>
              </SettingsProvider>
            </Provider>
          {/* )} */}
        </AuthProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}
