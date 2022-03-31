import type { NextPage } from 'next'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormHelperText from '@mui/material/FormHelperText';
import { JWTRequest } from './../interfaces/logres/JWTRequest';
import { Alert, AlertTitle, Slide, Snackbar } from '@mui/material';
import { Checkbox, FormControlLabel } from '@mui/material';

// Login page
const LogIn: NextPage = () => {
  const router = useRouter();

  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const handleChange = (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // State for the snackbar
  const [open, setOpen] = useState(false);

  // Validation schema for the form fields of the login page
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Email is required')
      .email('Invalid email'),
    password: Yup.string().required('Password is required')
      .min(6, 'Password must be at least 6 characters').max(10, 'Password can have at most 10 characters'),
  });

  // Hook for the form
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  // Function for the login button
  const Submit = async (data) => {
    const JWTData = data as JWTRequest;
    // console.log(JWTData);
    try {
      await axios.post('api/login', JWTData).then(res => {
        const { token, decryptionKey } = res.data;
        // keep token in local storage
        localStorage.setItem('t', token);
        localStorage.setItem('d', decryptionKey);
      });
      await router.push('/');
    } catch (error) {
      setOpen(true);
    }
  };

  // if user is already logged in, redirect to home page
  if (typeof window !== 'undefined' && localStorage.getItem('t')) {
    router.push('/');
  }

  // JSX for the login page
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
        <Snackbar
          open={open}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          TransitionComponent={(props) => <Slide direction='down' {...props} />}
          onClose={(event: React.SyntheticEvent | Event, reason?: string) => setOpen(false)}
        >
          <Alert severity="warning" sx={{ marginBottom: 5 }}>
            <AlertTitle>Invalid username or password. <br />Please try again.</AlertTitle>
            If you have not registered yet, please click <Link href="/register"><a>here</a></Link> to register.
          </Alert>
        </Snackbar>
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
            type={values.showPassword ? 'text' : 'password'}
            id="password"
            {...register('password')}
            error={errors.password?.message.length > 0 ? true : false}
          />
          <FormHelperText>{errors.password?.message}</FormHelperText>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              onClick={handleClickShowPassword}
              label="Show password"
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={errors.username?.message.length + errors.password?.message.length > 0}
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