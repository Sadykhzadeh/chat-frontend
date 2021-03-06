import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material';
import { useRouter } from 'next/router';

const ChatList = ({ info }) => {
  const router = useRouter();
  return <>
    <ListItem alignItems="flex-start" button onClick={
      () => {
        router.push(`/chat/${info.id}`);
      }
    }>
      <ListItemAvatar>
        <Avatar>
          {info.chatName ? info.chatName[0] : info.name?.[0] + ' ' + info.surname?.[0]}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={info.chatName || info.name + ' ' + info.surname}
        secondary={<React.Fragment>
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {!info.chatName ? info.name + ' ' + info.surname + ' — ' : ""}
          </Typography>
          {info.message || "message"}
        </React.Fragment>} />
    </ListItem><Divider variant="inset" component="li" />
  </>
}

export default ChatList;