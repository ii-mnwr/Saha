import {
  Box,
  Button,
  FormControl,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LocationIcon, SearchIcon, StreamlineIcon } from 'src/theme/overrides/CustomIcons';
import FormProvider from '../hook-form/FormProvider';
import { RHFSelect } from '../hook-form';
import { countries } from 'src/assets/data';

type FormValuesProps = {};

export const Hero = ({ handleFilteration, filter, resetFilter, setFilters }: any) => {
  const defaultValues = {};
  const schema = Yup.object().shape({});
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { watch } = methods;

  // const location = watch('location');

  // useEffect(() => {
  //   setFilters((filter: any) => ({
  //     ...filter,
  //     page: 1,
  //     nationality: location,
  //   }));
  // }, [location, setFilters]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%', // Set an explicit width
        borderRadius: 2,
        overflow: 'hidden', // Ensure the border radius affects the inner elements
      }}
    >
      {/* Background image box */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/assets/dashboardBanner.jpeg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          opacity: 0.6,
          zIndex: 1,
          aspectRatio: 4 / 3,
        }}
      />

      {/* Content box */}
      <Box
        sx={{
          position: 'relative',
          paddingX: 3,
          paddingY: 8,
          zIndex: 2,
        }}
      >
        <Typography fontSize={40} fontWeight={500} color="#000000" width="40vw" lineHeight={1}>
          Find Your
          <span
            style={{
              fontWeight: 700,
            }}
          >
            Right Candidates
          </span>
          Today
        </Typography>
        <Typography fontWeight={500} fontSize={12} color="#000000" marginTop="5px">
          Thousands of candidates in the computer, engineering and technology sectors are waiting
          for you.
        </Typography>

        {/*  <FormProvider methods={methods}>
          <Box
            sx={{
              background: '#C2D5FEF2',
              borderRadius: 2,
              padding: 2,
              display: 'flex',
              alignItems: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 1,
              marginTop: 4,
              width: '100%',
            }}
          >
            <Box
              component="form"
              sx={{
                padding: '12px 0 12px 15px',
                height: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '6px',
                width: '100%',
              }}
              style={{}}
            >
              <StreamlineIcon />
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search by Keyword"
                inputProps={{ 'aria-label': 'Search by Keyword' }}
                onChange={(e: any) =>
                  handleFilteration({
                    name: 'search',
                    value: e.target.value,
                  })
                }
              />
            </Box>

            <Box
              component="form"
              sx={{
                // padding: '12px 0 12px 15px',
                height: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '6px',
                width: '100%',
              }}
              style={{}}
            >
              <FormControl
                sx={{
                  width: {
                    xs: '100%',
                    md: '100%',
                  },
                }}
              >
                <Select
                  variant="outlined"
                  defaultValue=""
                  displayEmpty
                  onChange={(e: any) =>
                    handleFilteration({
                      name: 'location',
                      value: e.target.value,
                    })
                  }
                  sx={{
                    background: '#fff',
                    boxShadow: 'none',
                    color: '#000000',
                    border: 'none',
                    ':hover': {
                      border: 'none',
                    },
                    '&.MuiOutlinedInput-root': {
                      fontWeight: 600,
                      fontFamily: 'Work Sans,sans-serif',
                      '.MuiOutlinedInput-notchedOutline': {
                        border: '1px solid rgba(145, 158, 171, 0.32)',
                        borderRadius: 0.75,
                        '& fieldset': {
                          border: 'transparent',
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Select Location</em>
                  </MenuItem>
                  {countries?.map((item, index) => (
                    <MenuItem value={item?.label} key={item?.label}>
                      {item?.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{
                background: '#086BFF',
                width: { xs: '100%', md: '46%' },
                ':hover': {
                  background: '#086BFF',
                },
                margin: '0',
                padding: '15px 0',
                height: 'fit-content',
              }}
            >
              Search
            </Button>
          </Box>
        </FormProvider> */}
      </Box>
    </Box>
  );
};
