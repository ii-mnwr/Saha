import React from 'react';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { fToNow } from 'src/utils/formatTime';
import styled from '@emotion/styled';

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const JobOverviewCard = ({ job }: { job: any }) => {
  console.log('JobOverviewCard');
  return (
    <>
      <Card
        sx={{
          maxWidth: { xs: '100%', xl: 345 },
          borderRadius: 1,
          p: 2,
          boxShadow: '0px 4px 9px 0px #00000040',
          border: '3px solid #086BFF4D',
        }}
      >
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{
            textAlign: 'center',
            color: '#85B6FF',
            fontWeight: 700,
            fontFamily: 'Work Sans,sans-serif',
          }}
        >
          Job Overview
        </Typography>
        <CardMedia
          component="img"
          height="140"
          image="/assets/job-details.png"
          alt="Job Overview"
        />
        <CardContent sx={{ p: 0, m: 2 }}>
          <Grid container spacing={1}>
            <Grid xs={12}>
              <StyledBox>
                <Typography variant="body1" width="50%">Title:</Typography>
                <Typography variant="body1" width="50%">{job?.title}</Typography>
              </StyledBox>
            </Grid>
            <Grid xs={12}>
              <StyledBox>
                <Typography variant="body1" width="50%">Experience:</Typography>
                <Typography variant="body1" width="50%">{job?.experience}</Typography>
              </StyledBox>
            </Grid>
            <Grid xs={12}>
              <StyledBox>
                <Typography variant="body1" width="50%">Location:</Typography>
                <Typography variant="body1" width="50%">
                  {job?.location}
                </Typography>
              </StyledBox>
            </Grid>
            <Grid xs={12}>
              <StyledBox>
                <Typography variant="body1" width="50%">Salary:</Typography>
                <Typography variant="body1" width="50%">
                  {job?.salary_min} - {job?.salary_max}
                </Typography>
              </StyledBox>
            </Grid>
            <Grid xs={12}>
              <StyledBox>
                <Typography variant="body1" width="50%">Qualification:</Typography>
                <Typography variant="body1" width="50%">{job?.qualification}</Typography>
              </StyledBox>
            </Grid>
            <Grid xs={12}>
              <StyledBox>
                <Typography variant="body1" width="50%">Posted:</Typography>
                <Typography variant="body1" width="50%">{fToNow(job?.postedAt)}</Typography>
              </StyledBox>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/*  <Card sx={{ boxShadow: 1, borderRadius: 2, mt: 1 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle1" color="text.secondary">
            JOB LOCATION
          </Typography>
          <Box
            component="img"
            sx={{
              height: '100%',
              width: '100%',
              marginY: 2, // Adjusts vertical spacing
            }}
            alt="Google Maps Logo"
            src="/assets/googleMap.png"
          />
        </CardContent>
      </Card> */}
    </>
  );
};

export default JobOverviewCard;
