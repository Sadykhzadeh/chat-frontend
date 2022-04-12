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
// import MenuIcon from '@material-ui/icons/Menu';

const ColorModeContext = createContext({ toggleColorMode: () => { } });

// Client-side cache, shared for the whole session of the user in the browser.
const createEmotionCache = () => createCache({ key: "css" });
const clientSideCache = createEmotionCache();

const SwitchTheme = () => {
  // color mode context for the theme provider
  const colorMode = React.useContext(ColorModeContext);
  return (
    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}

const MyApp = (props: { Component: any; emotionCache?: EmotionCache; pageProps: any; }) => {
  // main theme provider
  const { Component, emotionCache = clientSideCache, pageProps } = props;
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

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
        <link rel="icon" type="image/png" href="../logo.svg" />

        <meta name='application-name' content=':Chat!' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content=':Chat!' />
        <meta name='description' content='Yet another great messenger.' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-config' content='../lovo.svg' />
        <meta name='msapplication-TileColor' content='#' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='theme-color' content='#000000' />

        <link rel='manifest' href='/manifest.json' />

        <meta property='og:type' content='website' />
        <meta property='og:title' content=':Chat!' />
        <meta property='og:description' content='Yet another great messenger.' />
        <meta property='og:image' content='https://i.ibb.co/fYj73t6/image.png' />

      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={whichTheme}>
          <CssBaseline />
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
                <Link href={"/"} passHref>
                  <Avatar srcSet="../logo.svg" />
                </Link>
                <Link href={"/"} passHref>
                  <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    :Chat!
                  </Typography>
                </Link>
                {
                  cookies.token ? (
                    <Button
                      color="inherit"
                      onClick={() => {
                        destroyCookie(null, 'token');
                        destroyCookie(null, 'decryptionKey');
                        window.location.reload();
                      }}
                    >
                      Logout
                    </Button>
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
                <SwitchTheme />
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
