/* eslint-disable react-hooks/rules-of-hooks */
import type { NextPage } from 'next'
import Container from '@mui/material/Container';
import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import { useState, useEffect } from 'react';
import { Alert, AlertTitle, Backdrop, Checkbox, CircularProgress, FormControlLabel, Slide, Snackbar } from '@mui/material';
import { UserRequest } from '../../interfaces/logres/UserRequest';
import axios from 'axios';
import { useRouter } from 'next/router';


const Success: NextPage = () => {
  const router = useRouter();

  const [backdrop, setBackdrop] = useState(false);

  const [name, useName] = useState("");
  const [surname, useSurname] = useState("");
  const [phoneNumber, usePhoneNumber] = useState("");
  const [login, useLogin] = useState("");
  const [password, usePassword] = useState("");

  useEffect(() => {
    useName(localStorage.getItem('name'));
    useSurname(localStorage.getItem('surname'))
    usePhoneNumber(localStorage.getItem('phoneNumber'))
    useLogin(localStorage.getItem('login'))
    usePassword(localStorage.getItem('password'));
  }, []);

  const onSubmit = async () => {
    setBackdrop(true);
    const userRequest = {
      "login": login,
      "password": password,
      "name": name,
      "surname": surname,
      "phoneNumber": phoneNumber
    } as UserRequest;
    try {
      console.log(userRequest);
      const { data } = await axios.post('../api/register', userRequest);
      await router.push('/register/success');
    } catch (error) {
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
      <Box
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography>
          Are you sure with this data?
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container>
          <Grid item key="1">
            <Typography>
              Name and Surname: <b>{name + " " + surname}</b>
            </Typography>
          </Grid>
          <Grid item key="2">
            <Typography>
              Email: <b>{login}</b>
            </Typography>
          </Grid>
          <Grid item key="3">
            <Typography>
              Phone Number: <b>{phoneNumber}</b>
            </Typography>
          </Grid>
        </Grid>
        <Grid>
          <Button
            onClick={onSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Grid>
      </Box>
    </Container >
  );
}


export default Success;