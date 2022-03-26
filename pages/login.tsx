import type { NextPage } from 'next'
import { Router } from 'next/router';
import { useState } from 'react';

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { }


const logIn: NextPage = () => {
  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}

export default logIn