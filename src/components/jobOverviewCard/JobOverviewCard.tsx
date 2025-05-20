import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const JobOverviewCard = ({ jobDetails }: any) => 
  /* const jobDetails = {
    publishedOn: 'Vacancy',
    vacancy: '01',
    experience: '3 Year(s)',
    jobType: 'Part Time',
    location: 'New York, USA',
    category: 'Design',
    gender: 'Both',
    applicationDue: '05/05/2021',
  }; */

   (
    <Card sx={{ minWidth: 275, boxShadow: '2px 2px 4px 0px #6D88C2', background: '#FEFEFE' }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, fontWeight: 600, fontFamily: 'Work Sans,sans-serif' }}
          color="#000000"
          gutterBottom
        >
          JOB OVERVIEW
        </Typography>
        <Grid container>
          {Object.entries(jobDetails).map(([key, value], index) => (
            <React.Fragment key={index}>
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  sx={{
                    textTransform: 'capitalize',
                    fontWeight: 400,
                    color: '#000000',
                    fontFamily: 'Work Sans,sans-serif',
                  }}
                >
                  {key.split(/(?=[A-Z])/).join(' ')}:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{value}</Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
;

export default JobOverviewCard;
