import type { NextPage } from 'next'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Lock from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormHelperText from '@mui/material/FormHelperText';
import { JWTRequest } from '../interfaces/logres/JWTRequest';
import { Alert, AlertTitle, Backdrop, CircularProgress, Slide, Snackbar } from '@mui/material';
import { Checkbox, FormControlLabel } from '@mui/material';
import nookies from 'nookies'

// Login page
const LogIn: NextPage = () => {
  const router = useRouter();

  const [backdrop, setBackdrop] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const passShow = () => setShowPass(!showPass)

  // State for the snackbar
  const [snackbar, setSnackbar] = useState(false);

  // Validation schema for the form fields of the login page
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Email is required')
      .email('Invalid email'),
    password: Yup.string().required('Password is required')
      .min(6, 'Password must be at least 6 characters').max(255, 'Password can have at most 255 characters'),
  });

  // Hook for the form
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  // Function for the login button
  const Submit = async (data) => {
    setBackdrop(true);
    const JWTData = data as JWTRequest;
    try {
      await axios.post('api/login', JWTData).then(res => {
        const { token, decryptionKey } = res.data;
        // keep the token and the decryption key in nookies
        nookies.set(null, 'token', token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/'
        });
        nookies.set(null, 'decryptionKey', decryptionKey, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/'
        });
      });
      await router.push('/chat');
      setBackdrop(false);
    } catch (error) {
      setBackdrop(false);
      setSnackbar(true);
    }
  };


  // if user is already logged in, redirect to home page
  if (typeof window !== 'undefined' && nookies.get(null, 'token').length) {
    router.push('/');
  }

  // JSX for the login page
  return (
    <Container maxWidth="xs">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Snackbar
          open={snackbar}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          TransitionComponent={(props) => <Slide direction='down' {...props} />}
          onClose={(event: React.SyntheticEvent | Event, reason?: string) => setSnackbar(false)}
        >
          <Alert severity="warning" sx={{ marginBottom: 5 }}>
            <AlertTitle>Invalid username or password. <br />Please try again.</AlertTitle>
            If you have not registered yet, please click <Link href="/register"><a>here</a></Link> to register.
          </Alert>
        </Snackbar>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <Lock />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(Submit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            autoFocus
            {...register('username')}
            error={errors.username?.message.length > 0}
          />
          <FormHelperText>{errors.username?.message}</FormHelperText>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPass ? 'text' : 'password'}
            id="password"
            {...register('password')}
            error={errors.password?.message.length > 0}
          />
          <FormHelperText>{errors.password?.message}</FormHelperText>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="primary" onClick={passShow} />
              }
              label="Show password"
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="/register">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container >
  )
}

export default LogIn