import { Box, Card, Container, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { ourServiceArr } from 'src/utils/constData';

const OurServices = () => (
  <Box paddingX={{ xs: 2, md: 8 }}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      gap={1}
    >
      <Typography fontFamily="Work Sans,sans-serif" fontSize="2em" fontWeight={600} color="#000">
        Activities Include
      </Typography>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: { xs: '0.6em', md: '1em' },
          fontFamily: 'Work Sans, sans-serif',
          textAlign: 'center',
          color: '#000',
        }}
      >
        Every single one of our jobs has some kind of flexibility option.
      </Typography>
    </Box>
    <Box paddingX={{ xs: 4, md: 10, xl: 37 }}>
      <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 3, md: 4 }} marginTop={1}>
        {ourServiceArr.map((serviceItem, index) => (
          <Grid item key={index} xs={12} sm={6} lg={4} height={110}>
            <Paper
              elevation={3}
              sx={{
                background: '#FFFFFF',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                borderRadius: 2,
                paddingX: 1,
              }}
            >
              <img
                src={serviceItem?.icon}
                alt={serviceItem?.title}
                style={{ width: 60, height: 60 }}
              />
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '1.1em',
                  fontFamily: 'Work Sans, sans-serif',
                  textAlign: 'center',
                }}
                color="#000000"
              >
                {serviceItem?.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Box>
);

export default OurServices;
