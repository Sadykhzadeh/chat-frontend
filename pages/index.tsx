import type { NextPage } from 'next'
import React from 'react'
import { Container } from '@mui/material'
import { Typography } from '@mui/material'
// import axios from 'axios'
// import UserResponse from '../interfaces/userManagement/userResponse'
// import { InferGetServerSidePropsType } from 'next'

const Home: NextPage = () => {
  // console.log(props);
  return (
    <Container component="main">
      <Typography component="h1" variant="h4">
        Hello, user! Welcome to :Chat!
      </Typography>
    </Container>
  )
}

// const getServerSideProps = async () => {
//   // if logged in
//   if (typeof window !== 'undefined' && localStorage.getItem('t')) {
//     const data: UserResponse = await axios.get('/api/me');
//     return {
//       props: {
//         loggedIn: true,
//         who: data.login,
//         name: data.name,
//         surname: data.surname
//       }
//     };
//   } else {
//     return {
//       props: {
//         loggedIn: false
//       }
//     };
//   }
// }


export default Home
