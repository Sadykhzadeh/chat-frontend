import type { NextPage } from 'next'
import axios from 'axios'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* link to '/login' page */}
      <Link href={'/login'}>Log In</Link>
      <h1>Hello Next.js</h1>
    </div>
  )
}

export default Home
