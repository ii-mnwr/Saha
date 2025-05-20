import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import * as Yup from 'yup';
import { SearchIcon, StreamlineIcon } from 'src/theme/overrides/CustomIcons';
import { useRouter } from 'next/router';
import { countries } from 'src/assets/data';
import { IconButtonAnimate } from '../animate';
import MenuPopover from '../menu-popover/MenuPopover';
import MoreFilters from './MoreFilters';

export const Hero = () => {
  const [filter, setFilter] = useState({
    education: '',
    company_name: '',
    postedAt: '',
    job_type: '',
    application_mode: '',
    remuneration: '',
    application_type: '',
    job_title: '',
    exp: '',
    location: '',
  });
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const router = useRouter();

  const onSubmit = () => {
    setFilter(filter);
    localStorage.setItem('filter', JSON.stringify(filter));
    router.push('/candidate/jobs/search-jobs/');
  };
  return (
    <Box
      sx={{
        position: 'relative',
        paddingX: 3,
        paddingTop: 4,
        paddingBottom: 4,
        zIndex: 0,
      }}
    >
      <Box
        // sx={{
        //   position: 'absolute',
        //   top: 0,
        //   left: 0,
        //   right: 0,
        //   bottom: 0,
        //   backgroundImage: `url('/assets/dashboardBanner2.png')`,
        //   backgroundRepeat: 'no-repeat',
        //   backgroundSize: 'cover',
        //   backgroundPosition: 'bottom',
        //   '&::before': {
        //     content: '""',
        //     position: 'absolute',
        //     top: 0,
        //     left: 0,
        //     right: 0,
        //     bottom: 0,
        //     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Change the color and opacity as needed
        //     zIndex: 1,
        //   },
        // }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* <Typography
          fontSize={50}
          fontWeight={500}
          color="#FFFFFF"
          width={{ xs: '70vw', lg: '25vw' }}
          lineHeight={1.2}
          fontFamily={'Work Sans,sans-serif'}
        >
          Search Job, Reach Career
        </Typography> */}

        <Box
          // sx={{
          //   background: '#fff',
          //   borderRadius: 2,
          //   padding: 1,
          //   display: 'flex',
          //   flexDirection: 'column',
          //   marginTop: 4,
          // }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3,
            }}
          >
            <TextField
              fullWidth
              size="medium"
              placeholder="Key words"
              onChange={(e) => {
                setFilter((data: any) => ({
                  ...data,
                  job_title: e.target.value,
                }));
              }}
              type="text"
              value={filter?.job_title}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <StreamlineIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '.MuiOutlinedInput-root': {
                  backgroundColor: '#FFF',
                  height: 40,
                },
              }}
            />
            <TextField
              fullWidth
              size="medium"
              placeholder="Year of Experience"
              onChange={(e) => {
                setFilter((data: any) => ({
                  ...data,
                  exp: e.target.value,
                }));
              }}
              type="text"
              value={filter?.exp}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <StreamlineIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '.MuiOutlinedInput-root': {
                  backgroundColor: '#FFF',
                  height: 40,
                },
              }}
            />
            <Paper
              component="form"
              sx={{
                height: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '6px',
                width: '100%',
              }}
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
                      height: 40,
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
                    <span> Location</span>
                  </MenuItem>
                  {countries?.map((item, index) => (
                    <MenuItem value={item?.label} key={item?.label}>
                      {item?.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>
            <Button
              variant="contained"
              onClick={() => {
                onSubmit();
              }}
              startIcon={<SearchIcon />}
              sx={{
                background: '#0a2239',
                width: { md: '28%' },
                height: 40,
                ':hover': {
                  background: '#086BFF',
                },
              }}
            >
              Search
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <IconButtonAnimate
              onClick={handleOpenPopover}
              sx={{
                p: 0,
                ':hover': {
                  background: 'none',
                },
                ':active': {
                  background: 'none',
                },
                ':focus': {
                  background: 'none',
                },
                ...(openPopover && {
                  '&:before': {
                    zIndex: 1,
                    content: "''",
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'none',
                    position: 'absolute',

                    // bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                  },
                }),
              }}
            >
              {/* <Typography
                sx={{
                  color: '#000000',
                  fontFamily: 'Work Sans,sans-serif',
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                More Filters
              </Typography> */}
            </IconButtonAnimate>
            {/* <MenuPopover
              open={openPopover}
              onClose={handleClosePopover}
              sx={{ width: 800, p: 0, m: 2 }}
            >
              <MoreFilters
                setFilter={setFilter}
                filter={filter}
                handleClosePopover={handleClosePopover}
                isClear
                onClear={() => {
                  setFilter({
                    application_mode: '',
                    application_type: '',
                    company_name: '',
                    education: '',
                    exp: '',
                    job_title: '',
                    job_type: '',
                    location: '',
                    postedAt: '',
                    remuneration: '',
                  });
                }}
              />
            </MenuPopover> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
