import React from 'react';
import { Controller, Control } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import Select, { SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface Option {
  value: string | number;
  label: string;
}

interface CustomSelectProps extends SelectProps {
  control: Control<any>;
  name: string;
  options: Option[];
  label: string;
  defaultValue?: string | number;
  placeHolder: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  control,
  name,
  options,
  label,
  placeHolder,
  defaultValue = '',
  ...other
}) => (
  <FormControl sx={{ m: 1, minWidth: 170 }}>
    <Controller
      name={name}
      control={control}
      displayEmpty
      autoWidth
      defaultValue={defaultValue}
      render={({ field }) => (
        <Select {...field} displayEmpty inputProps={{ 'aria-label': label }} {...other}>
          <MenuItem value="">
            <em>{placeHolder}</em>
          </MenuItem>
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  </FormControl>
);

export default CustomSelect;
