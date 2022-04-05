import { Container, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Link from 'next/link'

const err: NextPage = () => {
  return (
    <Container component="main">
      <Typography component="h1" variant="h4">
        No way, 404! :0
      </Typography>
      <Link href="/">
        Go to home page
      </Link>
    </Container>
  )
}

export default err