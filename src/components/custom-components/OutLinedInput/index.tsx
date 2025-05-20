/* eslint-disable no-nested-ternary */
import { FormControl, FormHelperText, OutlinedInput, OutlinedInputProps, TextFieldProps, Typography } from '@mui/material';
import React from 'react';
import useScreenSizes from 'src/hooks/useScreenSizes';

type Props = OutlinedInputProps & {
  variant: 'standard',
  label?: string,
  required: boolean,
  placeholder: string,
  type: string,
  sx?: {},
  fullWidth?: boolean
}

const RHFOutlinedInput = ({ variant, label, required, fullWidth, placeholder, type, sx, ...other }: Props) => {
  const { isMobile, isLaptop, isMobileM, isMobileL } = useScreenSizes();

  return (
    <FormControl fullWidth={fullWidth} variant={variant}>
      {label && <FormHelperText id="outlined-helper-text">
        <Typography variant={isLaptop ? 'subtitle1' : isMobile ? 'subtitle1' : 'h6'} display="flex">
          {label}
          {required && <Typography
            variant={isLaptop ? 'subtitle1' : isMobile ? 'subtitle1' : 'h6'}
            color="error"
            pl={1}
          >
            *
          </Typography>}
        </Typography>
      </FormHelperText>
      }
      <OutlinedInput
        id="outlined-adornment"
        aria-describedby="outlined-helper-text"
        placeholder={placeholder}
        type={type}
        sx={{
          marginTop: 1,
          height: isMobileL ? 40 : isMobileM ? 40 : isMobile ? 35 : 55,
          ...sx
        }}
        {...other}
      />
    </FormControl>
  )
}
export default RHFOutlinedInput;
