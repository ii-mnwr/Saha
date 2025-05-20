import React, { useState } from 'react';
import Head from 'next/head';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useSettingsContext } from 'src/components/settings';
import { Box, Card, Container, Divider, Grid, Typography } from '@mui/material';
import JobCard from 'src/components/saved-job/job-details/JobCard';

JobDetails.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function JobDetails() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>Job Details</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box p={3}>
          <Typography variant="h4">Job Details</Typography>
        </Box>
        <Card sx={{ padding: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">Job Details</Typography>
            {/* <Button variant="contained" onClick={handleOpenModal}>
              Create folder
            </Button> */}
          </Box>
          <Divider sx={{ my: 2 }} />
          <Card>
            <JobCard />
          </Card>
        </Card>
      </Container>
    </>
  );
}
