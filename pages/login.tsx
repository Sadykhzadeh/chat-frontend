import type { NextPage } from 'next'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import axios from 'axios';
import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormHelperText from '@mui/material/FormHelperText';
import { JWTRequest } from './../interfaces/logres/JWTRequest';

const LogIn: NextPage = () => {
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Email is required')
      .email('Invalid email'),
    password: Yup.string().required('Password is required')
      .min(6, 'Password must be at least 6 characters').max(10, 'Password can have at most 10 characters'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const Submit = async (data) => {
    const JWTData = data as JWTRequest;
    console.log(JWTData);
    try {
      await axios.post('api/login', JWTData).then(res => {
        const { token, decryptionKey } = res.data;
        // keep token in local storage
        localStorage.setItem('t', token);
        localStorage.setItem('d', decryptionKey);
      });
      await router.push('/');
    } catch (error) {
    }
  };

  // if user is already logged in, redirect to home page
  if (typeof window !== 'undefined' && localStorage.getItem('t')) {
    router.push('/');
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(Submit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            {...register('username')}
            error={errors.username?.message.length > 0 ? true : false}
          />
          <FormHelperText>{errors.username?.message}</FormHelperText>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            {...register('password')}
            error={errors.password?.message.length > 0 ? true : false}
          />
          <FormHelperText>{errors.password?.message}</FormHelperText>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
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