import type { NextPage } from 'next'
import Container from '@mui/material/Container';
import { Typography } from '@mui/material'


const Success: NextPage = () => (
  <Container component="main" maxWidth="xs">
    <Typography component="h1" variant="h2">
      Success!
    </Typography>
    <Typography component="h2" variant="h3">
      You have successfully registered!
    </Typography>

  </Container>
);

export default Success;