import type { NextPage } from 'next'
import React from 'react'
import axios from 'axios'
import UserResponse from '../interfaces/userManagement/userResponse'
import nookies from 'nookies'

const Home: NextPage = (
  { user }
) => {
  const drawerWidth = 240;
  // if logged in, open chat
  if (user) {
    return (
      <h1>Good!</h1>
    )
  }
  return (
    <h1>:(</h1>
  )

}

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  if (!cookies.token) {
    return {
      props: {}
    };
  }
  const token = cookies.token
  console.log(ctx.resolvedUrl);

  const res = await axios.get(`http://0.0.0.0:3000/api/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const user = res.data as UserResponse
  return {
    props: {
      user
    }
  }
}

export default Home
