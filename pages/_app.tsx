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

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>:Chat!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" type="image/png" href="../logo.svg" />
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
                  (typeof window !== 'undefined') &&
                    localStorage.getItem('t') ? (
                    <Button
                      color="inherit"
                      onClick={() => {
                        localStorage.removeItem('t');
                        localStorage.removeItem('d');
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
