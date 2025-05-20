import { FormControl, FormControlLabel, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useFormContext } from 'react-hook-form';

type Props =
  | {
      name: string;
      formlabel?: string;
      required?: boolean;
    }
  | any;

export default function RHFDatePicker({ name, formlabel, required = false, ...other }: Props) {
  const { control } = useFormContext();

  const renderLabel = (labelText: string | undefined) => (
    <Typography fontSize={16} fontWeight={600} fontFamily="Work Sans, sans-serif">
      {labelText} {required && <span style={{ color: 'red' }}> *</span>}
    </Typography>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormControl
        fullWidth
        variant="outlined"
        error={other.error}
        sx={{
          mb: 1,
          // border: 'transparent',
          // ':hover': {
          //   border: 'transparent',
          // },
          // ':focus': {
          //   border: 'transparent',
          // },
        }}
      >
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
                <>
                  {error && (
                    <Typography color="error" variant="caption">
                      {error.message}
                    </Typography>
                  )}
                  <DatePicker
                    {...field}
                      renderInput={(params: any) => (
                        <TextField {...params} helperText={error ? error?.message : null} />
                      )}
                    value={field?.value ?? null}
                    //   error={!!error}
                    // sx={{
                    //   background: '#086BFF1F',
                    //   color: field?.value ? '#000000' : '#0000005C',
                    //   width: '100%',
                    //   borderRadius: 1,
                    //   '& .MuiOutlinedInput-root': {
                    //     '& fieldset': {
                    //       border: 'transparent',
                    //     },
                    //     // '&:hover fieldset': {
                    //     //   border: 'transparent',
                    //     //   // borderColor: 'transparent',
                    //     // },
                    //     // '&.Mui-focused fieldset': {
                    //     //   border: 'transparent',
                    //     //   // borderColor: 'transparent',
                    //     // },
                    //   },
                    // }}
                    // slots={{
                    //   // Override default <ActionBar /> with a custom one
                    //   actionBar: CustomActionBar,
                    // }}
                    // slotProps={{
                    //   // pass props `actions={['clear']}` to the actionBar slot
                    //   actionBar: { actions: ['clear'] },
                    // }}
                  />
                </>
              )}
            />
          }
          label={renderLabel(formlabel)}
          labelPlacement="top"
        />
      </FormControl>
    </LocalizationProvider>
  );
}
