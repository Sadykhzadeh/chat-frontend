import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

const ProfileInfo = ({ user }) => <Card sx={{
  mt: 4
}}>
  <CardHeader
    avatar={
      <Avatar aria-label="recipe">
        {(user?.name[0].toUpperCase() + user?.surname[0].toUpperCase())}
      </Avatar>
    }
    title={user?.name + ' ' + user?.surname + ' (ID: ' + user?.id + ')'}
    subheader={user?.login}
  />
</Card >

export default ProfileInfo;