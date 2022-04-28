import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormHelperText from '@mui/material/FormHelperText';
import nookies from 'nookies';
import { useRouter } from 'next/router';
import { Alert, AlertTitle, Backdrop, Checkbox, CircularProgress, FormControlLabel, Slide, Snackbar } from '@mui/material';

const SignUp = () => {
  const [backdrop, setBackdrop] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const passShow = () => setShowPass(!showPass)
  const router = useRouter();

  // if user is already logged in, redirect to home page


  if (typeof window !== 'undefined' && nookies.get(null, 'token').length) {
    router.push('/');
  }

  // Validation schema for the form fields of the register page
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(1, 'Name should have at least 1 character')
      .max(50, 'Name can have at most 50 character'),
    surname: Yup.string()
      .required('Surname is required')
      .min(1, 'Surname should have at least 1 character')
      .max(50, 'Surname can have at most 50 character'),
    login: Yup.string()
      .required('Email is required')
      .email('Invalid email'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(255, 'Password can have at most 255 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    phoneNumber: Yup.string().required('Phone number is required')
      .min(9, 'Phone number must have at least 9 character')
      .max(15, 'Phone number can have at most 10 characters')
      .matches(/^[0-9,\-\+]{9,15}$|^$/, 'Phone number is invalid')
  });

  // Hook for the form
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  // Function for the register button
  const onSubmit = async (data) => {
    // 
    // const userRequest = data as UserRequest;
    // try {
    //   const { data } = await axios.post('api/register', userRequest);
    //   await router.push('/register/success');
    // } catch (error) {
    //   if (error.response.status === 409) {
    //     setBackdrop(false);
    //     setSnackbar(true);
    //   }
    // }
    try {
      setBackdrop(true);
      localStorage.setItem('name', data.name);
      localStorage.setItem('surname', data.surname);
      localStorage.setItem('phoneNumber', data.phoneNumber);
      localStorage.setItem('login', data.login);
      localStorage.setItem('password', data.password);
      await router.push('/register/confirm');
    } catch (e) {
      console.log(e);
      setBackdrop(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={snackbar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={(props) => <Slide direction='down' {...props} />}
        onClose={(event: React.SyntheticEvent | Event, reason?: string) => setSnackbar(false)}
      >
        <Alert severity="warning" sx={{ marginBottom: 5 }}>
          <AlertTitle>This user already exists</AlertTitle>
          If you opened this page mistakenly, click <Link href="/login"><a>here</a></Link> to login.
        </Alert>
      </Snackbar>
      <Box
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                name="firstName"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                {...register('name')}
                error={errors.name?.message.length > 0 ? true : false}
              />
              <FormHelperText>{errors.name?.message}</FormHelperText>
            </Grid>
            <Grid item xs={12} >
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                {...register('surname')}
                error={errors.surname?.message.length > 0 ? true : false}
              />
              <FormHelperText>{errors.surname?.message}</FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete='email'
                {...register('login')}
                error={errors.login?.message.length > 0 ? true : false}
              />
              <FormHelperText>{errors.login?.message}</FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                id="phoneNumber"
                {...register('phoneNumber')}
                error={errors.phoneNumber?.message.length > 0 ? true : false}
              />
              <FormHelperText>{errors.phoneNumber?.message}</FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type={showPass ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                // onChange={handleChange('password')}
                {...register('password')}
                error={errors.password?.message.length > 0 ? true : false}
              />
              <FormHelperText>{errors.password?.message}</FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox color="primary" onClick={passShow} />
                }
                label="Show password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="another password"
                label="Comfirm Password"
                type={showPass ? 'text' : 'password'}
                id="confirmPassword"
                autoComplete="new-password"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message.length > 0 ? true : false}
              />
              <FormHelperText>{errors.confirmPassword?.message}</FormHelperText>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;