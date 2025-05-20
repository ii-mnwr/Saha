import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  FormControl,
  FormControlLabel,
  Autocomplete,
  TextField,
  Typography,
  Chip,
  Box,
  InputAdornment,
  FormHelperText,
} from '@mui/material';

type Props = {
  name: string;
  formlabel?: string;
  helperText?: string;
  bgColor?: string;
  fontWeight?: number;
  border?: string;
  required?: boolean;
  placeholder?: string;
};

const RHFTagsInput: React.FC<Props> = ({
  name,
  formlabel,
  helperText,
  bgColor,
  fontWeight,
  border,
  required = false,
  placeholder,
  ...other
}) => {
  const { control, setValue, getValues } = useFormContext(); // Access setValue and getValues from form context
  const [inputValue, setInputValue] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const currentTags = getValues(name) || []; // Get current tags from form
      if (!currentTags.includes(inputValue.trim())) {
        const newTags = [...currentTags, inputValue.trim()];
        setValue(name, newTags); // Update the form value with new tags
        setInputValue('');
      }
    }
  };

  const handleDelete = (tagToDelete: string) => {
    const currentTags = getValues(name);
    const newTags = currentTags.filter((tag: string) => tag !== tagToDelete);
    setValue(name, newTags); // Update form value by removing the tag
  };

  const renderLabel = (labelText: string | undefined) => (
    <Typography fontSize={16} fontWeight={fontWeight || 600} fontFamily="Work Sans, sans-serif">
      {labelText} {required && <span style={{ color: 'red' }}> *</span>}
    </Typography>
  );

  return (
    <FormControl
      fullWidth
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
                <Autocomplete
                  multiple
                  freeSolo
                  fullWidth
                  options={[]}
                  value={field.value || []}
                  onChange={(event, newValue) => setValue(name, newValue)}
                  renderTags={(tags, getTagProps) =>
                    (tags || [])?.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        {...getTagProps({ index })}
                        onDelete={() => handleDelete(tag)}
                        size="small"
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)} // Handle only input change
                      placeholder={placeholder && placeholder}
                      onKeyDown={handleKeyDown} // Handle tags creation on Enter
                      fullWidth
                      error={!!error}
                      helperText={error ? error.message : undefined}
                      sx={{
                        '.MuiOutlinedInput-root': {
                          background: bgColor || '#FFF',
                          borderRadius: 1,
                          fontWeight: fontWeight || 600,
                          fontFamily: 'Work Sans, sans-serif',
                          '.MuiOutlinedInput-notchedOutline': {
                            border: border || '1px solid rgba(145, 158, 171, 0.32)',
                          },
                        },
                      }}
                      {...other}
                    />
                  )}
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
            <>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                fullWidth
                value={field.value || []}
                onChange={(event, newValue) => setValue(name, newValue)}
                renderTags={(tags, getTagProps) =>
                  tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      {...getTagProps({ index })}
                      onDelete={() => handleDelete(tag)}
                      size="small"
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} // Handle only input change
                    onKeyDown={handleKeyDown} // Handle tags creation on Enter
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : undefined}
                    sx={{
                      '.MuiOutlinedInput-root': {
                        background: '#FFF',
                        borderRadius: 1,
                      },
                    }}
                    {...other}
                  />
                )}
              />
              {!error && helperText && <FormHelperText>{helperText}</FormHelperText>}
            </>
          )}
        />
      )}
    </FormControl>
  );
};

export default RHFTagsInput;
