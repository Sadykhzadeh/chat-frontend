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
import { Alert, Snackbar } from '@mui/material';
import { JWTRequest } from './../interfaces/logres/JWTRequest';

const LogIn: NextPage = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email'),
    password: Yup.string().required('Password is required')
      .min(6, 'Password must be at least 6 characters').max(10, 'Password can have at most 10 characters'),
  });
  const router = useRouter();


  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    const JWTData = data as JWTRequest;
    console.log(JWTData);
    // try {
    // await axios.post('api/login', JWTData).then(res => {
    //   const { token } = res.data;
    //   document.cookie = `token=${token}; secure; samesite;`;
    // });
    // await router.push('/');
    //   return false;
    // } catch (error) {
    // await router.push('/login?error=true');
    // }
  };
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
        {router.query.error && (
          <Snackbar open={true}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            autoHideDuration={5000}
          >
            <Alert severity="warning">
              Wrong user or password! Try again.
            </Alert>
          </Snackbar>
        )}
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            {...register('email')}
            error={errors.email?.message.length > 0 ? true : false}
          />
          <FormHelperText>{errors.email?.message}</FormHelperText>
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
    </Container>
  )
}

export default LogIn