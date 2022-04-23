import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Card, CardHeader, List, Typography } from '@mui/material';
import UserResponse from '../interfaces/userManagement/userResponse';

const ContactList = ({ contactList }) => {
  console.log(contactList);
  return <List sx={{
    width: '100%',
    bgcolor: 'background.paper',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
    '& ul': { padding: 0 },
  }}
    subheader={<li />}>
    {contactList.length > 0 ? contactList.map((contact: UserResponse) => <>
      <Card sx={{
        mt: 4
      }}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              {contact?.name[0].toUpperCase() + contact?.surname[0].toUpperCase()}
            </Avatar>
          }
          title={contact?.name + ' ' + contact?.surname + ' (ID: ' + contact?.id + ')'}
          subheader={contact?.login}
        />
      </Card >
    </>) :
      <Typography sx={{ textAlign: 'center' }}>
        No Contacts
      </Typography>}
  </List>
}

export default ContactList;