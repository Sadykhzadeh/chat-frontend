import type { NextPage } from 'next'
import React from 'react'
import { Container } from '@mui/material'
import { Typography } from '@mui/material'

const Home: NextPage = () => (
  <Container component="main">
    <Typography component="h1" variant="h4">
      Hello, welcome to :Chat!
    </Typography>
  </Container>
)

export default Home
