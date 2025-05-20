import React, { useState } from 'react';
import { FormControl, TextField, FormHelperText } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import { TextFieldProps } from '@mui/material/TextField';

type Props = TextFieldProps & {
  name: string;
  formlabel?: string;
  required?: boolean;
};

export default function RHFTextFieldLabelMoves({
  name,
  formlabel,
  required = false,
  ...other
}: Props) {
  const { control } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            label={formlabel}
            value={field.value || ''}
            InputLabelProps={{
              shrink: isFocused || !!field.value || field.value === 0,
              required,
            }}
            error={!!error}
            helperText={error ? error.message : ''}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              field.onBlur(e); // Ensure onBlur is called to handle form state
            }}
            {...other}
          />
        )}
      />
      {other.helperText && !other.error && <FormHelperText>{other.helperText}</FormHelperText>}
    </FormControl>
  );
}
