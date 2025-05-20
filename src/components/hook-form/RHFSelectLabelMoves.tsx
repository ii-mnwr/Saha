import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import { SelectProps } from '@mui/material/Select';

type RHFSelectProps = SelectProps & {
  name: string;
  formlabel?: string;
};

export default function RHFSelectLabelsMoves({ name, formlabel, ...other }: RHFSelectProps) {
  const { control } = useFormContext();

  return (
    <FormControl fullWidth size="small">
      <InputLabel>{formlabel}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Select
            {...field}
            fullWidth
            label={formlabel}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
              getContentAnchorEl: null,
            }}
            error={!!error}
            {...other}
          >
            <MenuItem value="">
              <em>{formlabel}</em>
            </MenuItem>
            {other.children}
          </Select>
        )}
      />
      {other.helperText && !other.error && <FormHelperText>{other.helperText}</FormHelperText>}
    </FormControl>
  );
}
