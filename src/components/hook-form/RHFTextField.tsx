// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  formlabel?: string;
  label?: string;
  bgColor?: string;
  fontWeight?: number;
  border?: string;
  required?: boolean;
};

export default function RHFTextField({
  name,
  formlabel,
  label,
  helperText,
  bgColor,
  fontWeight,
  border,
  required = false,
  rows,
  ...other
}: Props) {
  const { control } = useFormContext();

  const renderLabel = (labelText: string | undefined) => (
    <Typography fontSize={16} fontWeight={600} fontFamily="Work Sans, sans-serif">
      {labelText} {required && <span style={{ color: 'red' }}> *</span>}
    </Typography>
  );

  return (
    <FormControl
      fullWidth
      error={other.error}
      variant="outlined"
      sx={{
        mb: 1,
      }}
    >
      {formlabel ? (
        <FormControlLabel
          sx={{
            alignItems: 'flex-start',
            margin: 0,
            gap: 1,
          }}
          control={
            <Controller
              name={name}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  // value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
                  // value={field.value ?? ''}
                  value={field.value ? (field.value === 0 ? '' : field.value) : ''}
                  error={!!error}
                  helperText={error ? error?.message : helperText}
                  sx={{
                    '.MuiOutlinedInput-root': {
                      background: bgColor || '#FFF',
                      borderRadius: 1,
                      fontWeight: fontWeight || 600,
                      fontFamily: 'Work Sans,sans-serif',
                      '.MuiOutlinedInput-notchedOutline': {
                        border: border || '1px solid rgba(145, 158, 171, 0.32)',
                      },
                    },
                  }}
                  {...other}
                />
              )}
            />
          }
          label={renderLabel(formlabel)}
          labelPlacement="top"
        />
      ) : (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              // value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
              // value={field.value ?? ''}
              value={field.value ? (field.value === 0 ? '' : field.value) : ''}
              error={!!error}
              helperText={error ? error?.message : helperText}
              sx={{
                '.MuiOutlinedInput-root': {
                  background: '#FFF',
                  borderRadius: 1,
                },
              }}
              // label={renderLabel(formlabel)}
              {...other}
            />
          )}
        />
      )}
      {!other.error && helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
