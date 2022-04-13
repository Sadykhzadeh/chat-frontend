import type { NextPage } from 'next'
import React from 'react'
import { Container } from '@mui/material'

const Home: NextPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      Chat!
    </Container>
  )
}

// export const getServerSideProps = async (ctx) => {
//   const cookies = nookies.get(ctx)
//   if (!cookies.token) {
//     return {
//       props: {}
//     };
//   }
//   const token = cookies.token
//   console.log(ctx.resolvedUrl);

//   const res = await axios.get(`http://0.0.0.0:3000/api/me`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   })
//   const user = res.data as UserResponse
//   return {
//     props: {
//       user
//     }
//   }
// }

export default Home
