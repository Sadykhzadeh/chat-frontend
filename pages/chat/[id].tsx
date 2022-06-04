import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Avatar, Box, Button, FormHelperText, TextField, Typography } from '@mui/material'
import axios from 'axios'
import type { NextPage } from 'next'
import React from 'react'
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import SendIcon from '@mui/icons-material/Send';

//@ts-expect-error
const ChatDialog: NextPage = ({ chatRes }) => {
  const validationSchema = Yup.object().shape({
    message: Yup.string().required('Message is required')
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const Submit = async (data) => {
    const message = data.message;
    try {
      console.log(chatRes.chatId);
      await axios.post('../api/sendMessage', {
        "message": message,
        "chatId": chatRes.chatId
      })
      // refresh the page
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return <>
    <Head>
      <title>{chatRes.title} | :Chat!</title>
    </Head>
    {/* chat title as h1 */}
    <Box sx={{ width: '100%', typography: 'body1', pl: '4%' }}>
      <h1>{chatRes.title}</h1>
    </Box>
    <List sx={{ width: '100%'}}>
        {chatRes.messages.map((message, index) => <>
          <ListItem alignItems="flex-start" key={index}>
            <ListItemAvatar>
              <Avatar aria-label="recipe">
                {message.author.name.charAt(0) + message.author.surname.charAt(0)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={message.author.name + ' ' + message.author.surname}
                secondary={
                  <React.Fragment>
                    {message.content}
                    <Typography
                        sx={{ color: 'textSecondary', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                      {message.creationTime}
                    </Typography>
                  </React.Fragment>
                }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
        )}
    </List>
    <Box sx={{ typography: 'body1', display: 'flex',
    alignItems: 'center'}} component="form" onSubmit={handleSubmit(Submit)}>
      <TextField
          margin="normal"
          required
          fullWidth
          id="message"
          label="Message"
          autoFocus
          {...register('message')}
          error={errors.message?.message.length > 0}
      />
      <FormHelperText>{errors.message?.message}</FormHelperText>
      <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, width: '10%', color: 'primary' }}
      >
        <SendIcon/>
      </Button>
    </Box>
  </>
}

export const getServerSideProps = async (ctx) => {
  // get id from url
  const { id } = ctx.query;
  const res = await axios.post('api/chatDialog', {
    "chatId": id
  }, {
    baseURL: process.env.URL,
    headers: {
      Authorization: `Bearer ${ctx.req.cookies.token}`
    }
  });
  const { data } = res;
  return { props: { chatRes: data } };
}

// <Card sx={{ maxWidth: "50%", margin: '30px 30px 30px 0' }} key={key}>
//   <CardHeader
//     avatar={
//       <Avatar aria-label="recipe">
//         {message.author.name.charAt(0) + message.author.surname.charAt(0)}
//       </Avatar>
//     }
//     title={message.author.name + ' ' + message.author.surname}
//     subheader={message.creationTime}
//   />
//   <CardContent>
//     <Typography variant="body2">
//       {message.content}
//     </Typography>
//   </CardContent>
// </Card>
export default ChatDialog;