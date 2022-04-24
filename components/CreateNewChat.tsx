import * as React from 'react';
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Snackbar, Slide, Alert, AlertTitle, Link, Avatar, Typography, TextField, FormHelperText, Grid, FormControlLabel, Checkbox, Button } from '@mui/material';
import axios from 'axios';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import ChipSelect from './ChipSelect';

const getStyles = (name: string, personName: readonly string[], theme: Theme) => ({
  fontWeight:
    personName.indexOf(name) === -1
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
});

export default function CreateNewChat({ contactList }) {
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    chatTitle: Yup.string().required('Chat title is required'),
    participants: Yup.array().min(1, 'At least one participant is required'),
  });

  // Hook for the form
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  // Function for the login button
  const Submit = async (data) => {
    const { chatTitle, participants } = data;
    try {
      const participantsIds = participants.map(p => parseInt(p.split('|')[0]));
      await axios.post('api/newChat', {
        "title": chatTitle,
        "usersIds": participantsIds
      }).then(res => {
        const { chatId } = res.data;
        router.push(`/chat/`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // JSX for the login page
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" onSubmit={handleSubmit(Submit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="chatTitle"
            label="Chat Title"
            autoFocus
            {...register('chatTitle')}
            error={errors.chatTitle?.message.length > 0}
          />
          <FormHelperText>{errors.chatTitle?.message}</FormHelperText>
          <ChipSelect contactList={contactList} error={errors.participants?.message.length > 0}
            register={register("participants")}
          />
          <FormHelperText>{errors.participants?.message}</FormHelperText>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create New Chat
          </Button>
        </Box>
      </Box>
    </Container >
  )
}