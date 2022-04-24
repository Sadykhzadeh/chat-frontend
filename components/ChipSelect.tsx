import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const getStyles = (name: string, personName: readonly string[], theme: Theme) => ({
  fontWeight:
    personName.indexOf(name) === -1
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
});

export default function MultipleSelectChip({ contactList, error, register }) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const chipHandleChip = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="chip-label">Select contacts</InputLabel>
        <Select
          value={personName}
          {...register}
          error={!!error}
          labelId="chip-label"
          multiple
          onChange={chipHandleChip}
          input={<OutlinedInput id="multiple-chip" label="Select contacts" />}
          renderValue={(selected: any) => {
            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
                width: 250,
              },
            },
          }}
        >
          {contactList.map((contact: { id: number; name: string; surname: string; }) => (
            <MenuItem
              key={contact.id}
              value={contact.id + '| ' + contact.name + ' ' + contact.surname}
              style={getStyles(contact.name, personName, theme)}
            >
              {contact.name + ' ' + contact.surname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
