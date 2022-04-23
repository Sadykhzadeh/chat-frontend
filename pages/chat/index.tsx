import { Avatar, Box, Button, Container, Divider, FormHelperText, List, ListItem, ListItemAvatar, ListItemText, Tab, TextField, Typography } from '@mui/material'
import axios from 'axios'
import type { NextPage } from 'next'
import ProfileInfo from '../../components/ProfileInfo'
import ChatList from '../../components/ChatList'
import UserResponse from '../../interfaces/userManagement/userResponse'
import nookies from 'nookies'
import React from 'react'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import { useForm } from 'react-hook-form'
import ContactList from '../../components/ContactList'

//@ts-expect-error
const MainChatList: NextPage = ({ user, chatRes, contactList }) => {
  const [value, setValue] = useState('1');

  const addContactSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email')
  });

  // Hook for the form
  const addContact = { resolver: yupResolver(addContactSchema) };
  const { register, handleSubmit, reset, formState } = useForm(addContact);
  const { errors } = formState;

  const addContactPost = async (data) => {
    const { email } = data;
    try {
      const token = nookies.get(null, 'token').token;
      await axios.post('/api/contacts/add', {
        login: email
      }).then(res => {
        const { success } = res.data;
        if (success) {
          reset();
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <Container component="main" maxWidth="xs">
      <ProfileInfo
        user={user}
      />
      <Divider variant="fullWidth" sx={{ mt: 3, mb: 3 }} />
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={() => { setValue(value == '2' ? '1' : '2'); }}>
              <Tab label="Chats" value="1" />
              <Tab label="Contacts" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <List sx={{
              width: '100%',
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 300,
              '& ul': { padding: 0 },
            }}
              subheader={<li />}>
              {chatRes.length ? chatRes.map((chat: { chatsData: { title: any; members: string | any[] } }) => (
                // eslint-disable-next-line react/jsx-key
                <ChatList info={{
                  chatName: chat.chatsData.title,
                  message: chat.chatsData.members?.length > 1 ? chat.chatsData.members.length + ' members' : '',
                }} />
              )) : <Typography sx={{ textAlign: 'center' }}>
                No Chats
              </Typography>}
            </List>
          </TabPanel>
          <TabPanel value="2">
            <ContactList contactList={contactList as UserResponse[]} />
            <Box component="form" onSubmit={handleSubmit(addContactPost)}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="email"
                autoFocus
                {...register('email')}
                error={errors.email?.message.length > 0}
              />
              <FormHelperText>{errors.email?.message}</FormHelperText>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add contact
              </Button>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
      {/* {JSON.stringify(chatRes)} */}
    </Container>
  )
}

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  if (!cookies.token) return { props: {} };
  const token = cookies.token
  console.log("ROMAN" + token)
  const aboutMe = await axios.get(`/api/me`, {
    baseURL: process.env.URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const chats = await axios.get(`/api/getChats`, {
    baseURL: process.env.URL,
    headers: {
      Authorization: `Bearer ${token}`,
      Dec: cookies.decryptionKey
    }
  })

  const contacts = await axios.get(`/api/contacts/list`, {
    baseURL: process.env.URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const user = aboutMe.data as UserResponse
  const chatRes = chats.data
  const contactList = contacts.data as UserResponse[]
  console.info(contactList)

  return { props: { user, chatRes, contactList } }
}

export default MainChatList