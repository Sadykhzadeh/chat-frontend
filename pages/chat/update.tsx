import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormHelperText from '@mui/material/FormHelperText';
import axios from 'axios';
import nookies from 'nookies';
import { useRouter } from 'next/router';
import { Backdrop, CircularProgress } from '@mui/material';

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
    setBackdrop(true);
    try {
      await axios.post('../api/update', data);
      await router.push('/chat/');
    } catch (error) {
      if (error.response.status === 409) {
        setBackdrop(false);
        setSnackbar(true);
      }
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
      <Box
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Update Profile
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
                name="phoneNumber"
                label="Phone Number"
                id="phoneNumber"
                {...register('phoneNumber')}
                error={errors.phoneNumber?.message.length > 0 ? true : false}
              />
              <FormHelperText>{errors.phoneNumber?.message}</FormHelperText>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;