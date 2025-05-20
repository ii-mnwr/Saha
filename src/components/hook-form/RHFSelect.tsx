// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Box,
  Chip,
  Select,
  Checkbox,
  MenuItem,
  TextField,
  InputLabel,
  SelectProps,
  FormControl,
  OutlinedInput,
  TextFieldProps,
  FormHelperText,
  FormControlLabel,
  Typography,
} from '@mui/material';

// ----------------------------------------------------------------------

type RHFSelectProps = TextFieldProps & {
  name: string;
  native?: boolean;
  maxHeight?: boolean | number;
  fontWeight?: number;
  bgColor?: string;
  border?: string;
  children: React.ReactNode;
  formlabel?: string;
};

export function RHFSelect({
  name,
  native,
  maxHeight = 220,
  helperText,
  border,
  fontWeight,
  bgColor,
  children,
  formlabel,
  ...other
}: RHFSelectProps) {
  const { control } = useFormContext();

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
                  select
                  fullWidth
                  value={field?.value ?? ''}
                  SelectProps={{
                    native,
                    MenuProps: {
                      PaperProps: {
                        sx: {
                          ...(!native && {
                            px: 1,
                            borderRadius: 0.75,
                            maxHeight: typeof maxHeight === 'number' ? maxHeight : 'unset',
                            '& .MuiMenuItem-root': {
                              px: 1,
                              borderRadius: 0.75,
                              typography: 'body2',
                              textTransform: 'capitalize',
                              color: field?.value ? '#000000' : '#0000005C',
                            },
                          }),
                        },
                      },
                    },
                    sx: {
                      textTransform: 'capitalize',
                      color: field?.value ? '#000000' : '#0000005C',
                      borderRadius: 0.75,
                      '&.MuiOutlinedInput-root': {
                        background: bgColor || '#FFF',
                        fontWeight: fontWeight || 600,
                        fontFamily: 'Work Sans,sans-serif',
                        '.MuiOutlinedInput-notchedOutline': {
                          border: border || '1px solid rgba(145, 158, 171, 0.32)',
                          borderRadius: 0.75,
                          '& fieldset': {
                            border: 'transparent',
                          },
                        },
                      },
                    },
                  }}
                  error={!!error}
                  helperText={error ? error?.message : helperText}
                  {...other}
                >
                  {children}
                </TextField>
              )}
            />
          }
          label={
            <Typography fontSize={16} fontWeight={600} fontFamily="Work Sans ,sans-serif">
              {formlabel}
            </Typography>
          }
          labelPlacement="top"
        />
      ) : (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              select
              fullWidth
              value={field?.value ?? ''}
              SelectProps={{
                native,
                MenuProps: {
                  PaperProps: {
                    sx: {
                      ...(!native && {
                        px: 1,
                        maxHeight: typeof maxHeight === 'number' ? maxHeight : 'unset',
                        '& .MuiMenuItem-root': {
                          px: 1,
                          borderRadius: 0.75,
                          typography: 'body2',
                          textTransform: 'capitalize',
                        },
                      }),
                    },
                  },
                },
                sx: {
                  textTransform: 'capitalize',
                  '&.MuiOutlinedInput-root': {
                    background: bgColor || '#FFF',
                    fontWeight: fontWeight || 600,
                    fontFamily: 'Work Sans,sans-serif',
                    '.MuiOutlinedInput-notchedOutline': {
                      border: border || '1px solid rgba(145, 158, 171, 0.32)',
                    },
                  },
                },
              }}
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...other}
            >
              {children}
            </TextField>
          )}
        />
      )}
    </FormControl>
  );
}

// ----------------------------------------------------------------------

type RHFMultiSelectProps = SelectProps & {
  name: string;
  label?: string;
  chip?: boolean;
  checkbox?: boolean;
  placeholder?: string;
  helperText?: React.ReactNode;
  options: {
    label: string;
    value: string;
  }[];
};

export function RHFMultiSelect({
  name,
  chip,
  label,
  options,
  checkbox,
  placeholder,
  helperText,
  sx,
  ...other
}: RHFMultiSelectProps) {
  const { control } = useFormContext();

  const renderValues = (selectedIds: string[]) => {
    const selectedItems = options.filter((item) => selectedIds.includes(item.value));

    if (!selectedItems.length && placeholder) {
      return (
        <Box component="em" sx={{ color: 'text.disabled' }}>
          {placeholder}
        </Box>
      );
    }

    if (chip) {
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selectedItems.map((item) => (
            <Chip key={item.value} size="small" label={item.label} />
          ))}
        </Box>
      );
    }

    return selectedItems.map((item) => item.label).join(', ');
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl sx={sx}>
          {label && <InputLabel id={name}> {label} </InputLabel>}

          <Select
            {...field}
            multiple
            displayEmpty={!!placeholder}
            labelId={name}
            input={<OutlinedInput fullWidth label={label} error={!!error} />}
            renderValue={renderValues}
            MenuProps={{
              PaperProps: {
                sx: { px: 1, maxHeight: 280 },
              },
            }}
            {...other}
          >
            {placeholder && (
              <MenuItem
                disabled
                value=""
                sx={{
                  py: 1,
                  px: 2,
                  borderRadius: 0.75,
                  typography: 'body2',
                }}
              >
                <em> {placeholder} </em>
              </MenuItem>
            )}

            {options.map((option) => {
              const selected = field.value.includes(option.value);

              return (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{
                    py: 1,
                    px: 2,
                    borderRadius: 0.75,
                    typography: 'body2',
                    ...(selected && {
                      fontWeight: 'fontWeightMedium',
                    }),
                    ...(checkbox && {
                      p: 0.25,
                    }),
                  }}
                >
                  {checkbox && <Checkbox disableRipple size="small" checked={selected} />}

                  {option.label}
                </MenuItem>
              );
            })}
          </Select>

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
