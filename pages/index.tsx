import type { NextPage } from 'next'
import React from 'react'
import { Container } from '@mui/material'
import { Typography } from '@mui/material'
import axios from 'axios'
import UserResponse from '../interfaces/userManagement/userResponse'

//@ts-expect-error
const Home: NextPage = ({ data }) => {
  return (
    <Container component="main">
      <Typography component="h1" variant="h4">
        Hello, user! Welcome to :Chat!
      </Typography>
      {data}
    </Container>
  )
}

export const getServerSideProps = async () => {
  try {
    // get api/me with bearer token from localhost
    const response = await axios.get('users/me', {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`
      }
    })
    const data = response.data as UserResponse
    return {
      props: {
        data
      }
    }
  } catch (e) {
    console.log(e.message);
    return {
      props: {
        data: ":("
      }
    }
  }
}


export default Home
