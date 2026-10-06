import '../styles/globals.css'
import { CacheProvider, EmotionCache, ThemeProvider } from '@emotion/react'
import theme from '../styles/theme';
import darkTheme from '../styles/darkTheme';
import { AppBar, Avatar, Box, Button, createTheme, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import Head from 'next/head';
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import React from 'react';
import createCache from "@emotion/cache";
import { createContext } from "react";
import { destroyCookie, parseCookies } from 'nookies'
import { useRouter } from 'next/router';

const ColorModeContext = createContext({ toggleColorMode: () => { } });

// Client-side cache, shared for the whole session of the user in the browser.
const createEmotionCache = () => createCache({ key: "css" });
const clientSideCache = createEmotionCache();

const SwitchTheme = ({ mode }: { mode: 'light' | 'dark' }) => {
  // color mode context for the theme provider
  const colorMode = React.useContext(ColorModeContext);
  return (
    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
      {/* This read theme.palette.mode off the statically imported light
          theme, which is always 'light', so the icon never changed. */}
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}

const MyApp = (props: { Component: any; emotionCache?: EmotionCache; pageProps: any; }) => {
  // main theme provider
  const { Component, emotionCache = clientSideCache, pageProps } = props;
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const router = useRouter();

  // toggleColorMode has always written the choice to localStorage, but nothing
  // ever read it, so the theme reset to light on every page load. Reading it
  // after mount rather than in the initial state keeps the server-rendered
  // markup and the first client render identical.
  React.useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') setMode(saved);
  }, []);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newMode);
          return newMode;
        });
      },
    }),
    [],
  );

  // which theme to use based on the current color mode
  const whichTheme = React.useMemo(
    () => mode === 'light' ? createTheme(theme) : createTheme(darkTheme),
    [mode],
  );


  const cookies = parseCookies();
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>:Chat!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />

        <meta name='application-name' content=':Chat!' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content=':Chat!' />
        <meta name='description' content='Yet another great messenger.' />
        <meta name='mobile-web-app-capable' content='yes' />

        <link rel='manifest' href='/manifest.json' />

        <meta property='og:type' content='website' />
        <meta property='og:title' content=':Chat!' />
        <meta property='og:description' content='Yet another great messenger.' />

      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={whichTheme}>
          <CssBaseline />
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Link href={"/"} passHref>
                  <Avatar src="/logo.svg" />
                </Link>
                <Link href={"/"} passHref>
                  <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    :Chat!
                  </Typography>
                </Link>
                {
                  !router.pathname.includes('/chat') &&
                    cookies.token ? (
                    <>
                      <Link href={'/chat'} passHref>
                        <Button color="inherit">
                          Open :Chat!
                        </Button>
                      </Link>
                      <Link href={'/'} passHref>
                        <Button color="inherit"
                          onClick={() => {
                            destroyCookie(null, 'token');
                            destroyCookie(null, 'decryptionKey');
                            router.push('/');
                          }}>
                          Logout
                        </Button>
                      </Link>
                    </>
                  ) : cookies.token ? (
                    <Link href={'/'} passHref>
                      <Button color="inherit"
                        onClick={() => {
                          destroyCookie(null, 'token');
                          destroyCookie(null, 'decryptionKey');
                          router.push('/');
                        }}>
                        Logout
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link href={'/login'} passHref>
                        <Button color="inherit">
                          Log In
                        </Button>
                      </Link>
                      <Link href={'/register'} passHref>
                        <Button color="inherit">
                          Register
                        </Button>
                      </Link>
                    </>
                  )}
                <SwitchTheme mode={mode} />
              </Toolbar>
            </AppBar>
          </Box>
          <Component {...pageProps} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
}

export default MyApp
