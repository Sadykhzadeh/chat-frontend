import type { NextPage } from 'next'
import React from 'react'
import styles from '../styles/Home.module.css'
import FavoriteIcon from '@mui/icons-material/Favorite';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">:Chat!</a>
        </h1>

        <p className={styles.description}>
          Yet another great messenger.
        </p>

        <div className={styles.grid}>
          <a rel="noreferrer" href="https://github.com/Sadykhzadeh/chat-frontend" target={"_blank"} className={styles.card}>
            <h2>FrontEnd Source Code &rarr;</h2>
            <p>Made with <FavoriteIcon /> by Azer Sadykhzadeh.</p>
          </a>

          <a rel="noreferrer" href="https://github.com/IZOBRETATEL777/chat-backend" target={"_blank"} className={styles.card}>
            <h2>BackEnd Source Code &rarr;</h2>
            <p>Made with <FavoriteIcon /> by Roman Tolstosheyev.</p>
          </a>
        </div>
      </main>
    </div>
  )
}

export default Home
