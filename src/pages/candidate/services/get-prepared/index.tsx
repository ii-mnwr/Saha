import React, { useState } from 'react';
import Head from 'next/head';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useSettingsContext } from 'src/components/settings';
import { Box, Card, Container, Divider, Typography, Grid, TextField, Button } from '@mui/material';
import { useGetCurrentPlan } from 'src/hooks/useSubscription';
import GeneralUpgrade from 'src/components/UpgradePlan/GeneralUpgrade';

JobDetails.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Candidates Services', href: '#' },
      { name: 'Get Prepared', href: '#' },
    ]}
    title="Get Prepared"
  >
    {page}
  </DashboardLayout>
);

export default function JobDetails() {
  const { themeStretch } = useSettingsContext();

  const { getCurrentPlan } = useGetCurrentPlan();

  const { data: currentPlan, isLoading } = getCurrentPlan || {};

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    timeSlot: '',
    email: '',
    preferredDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  if (isLoading) {
    return <Typography textAlign="center" />;
  }

  return (
    <>
      <Head>
        <title>Get Prepared</title>
      </Head>
      <Container maxWidth={false} disableGutters sx={{bgcolor: '#f0f0f0', paddingX: 8, paddingY: 4, borderRadius: 2}}>
        {currentPlan?.data?.Plan?.features?.getPrepared ? (
          <>
            {/* Subtitle */}
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Archivo,sans-serif',
                fontSize: 18,
                fontWeight: 500,
                color: '#333',
                mb: 4,
              }}
            >
              Our experts can help you be fully ready for your next job
            </Typography>

            {/* Form and Image Section */}
            <Grid container spacing={4}>
              {/* Form Section */}
              <Grid item xs={12} md={6}>
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      sx={{
                        fontFamily: 'Archivo,sans-serif',
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#333',
                        mb: 1,
                      }}
                    >
                      Full name*
                    </Typography>
                    <TextField
                      fullWidth
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{
                        '.MuiOutlinedInput-root': {
                          backgroundColor: '#FFF',
                          borderRadius: 1,
                          height: 48,
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography
                      sx={{
                        fontFamily: 'Archivo,sans-serif',
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#333',
                        mb: 1,
                      }}
                    >
                      Contact Number*
                    </Typography>
                    <TextField
                      fullWidth
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{
                        '.MuiOutlinedInput-root': {
                          backgroundColor: '#FFF',
                          borderRadius: 1,
                          height: 48,
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography
                      sx={{
                        fontFamily: 'Archivo,sans-serif',
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#333',
                        mb: 1,
                      }}
                    >
                      Select a time slot
                    </Typography>
                    <TextField
                      fullWidth
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{
                        '.MuiOutlinedInput-root': {
                          backgroundColor: '#FFF',
                          borderRadius: 1,
                          height: 48,
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography
                      sx={{
                        fontFamily: 'Archivo,sans-serif',
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#333',
                        mb: 1,
                      }}
                    >
                      Email*
                    </Typography>
                    <TextField
                      fullWidth
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{
                        '.MuiOutlinedInput-root': {
                          backgroundColor: '#FFF',
                          borderRadius: 1,
                          height: 48,
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography
                      sx={{
                        fontFamily: 'Archivo,sans-serif',
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#333',
                        mb: 1,
                      }}
                    >
                      Preferred Date*
                    </Typography>
                    <TextField
                      fullWidth
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      variant="outlined"
                      type="date"
                      sx={{
                        '.MuiOutlinedInput-root': {
                          backgroundColor: '#FFF',
                          borderRadius: 1,
                          height: 48,
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        bgcolor: '#0A2647',
                        color: 'white',
                        px: 3,
                        py: 1,
                        borderRadius: 1,
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          bgcolor: '#144272',
                        },
                      }}
                    >
                      Submit now
                    </Button>
                  </Box>
                </Box>
              </Grid>

              {/* Image Section */}
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src="/assets/get-prepared.jpg"
                  alt="Get Prepared"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    // boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  }}
                />
              </Grid>
            </Grid>
          </>
        ) : (
          <GeneralUpgrade title="Upgrade your profile and get higher quality preparation tips and experts help" />
        )}
      </Container>
    </>
  );
}
