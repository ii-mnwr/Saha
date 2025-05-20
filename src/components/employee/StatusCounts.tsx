/* eslint-disable no-nested-ternary */
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { useQuery } from 'react-query';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';
import Image from '../image';

const fetchStatusCounts = async () => {
  const response = await axiosInstance.post('/applications/status-count');
  return response?.data;
};

const steps = [
  { label: 'Pre screening', value: 'New' },
  { label: 'Shortlisted Candidates', value: 'Shortlisted' },
  { label: 'Interview', value: 'Interview_Scheduled' },
  // { label: 'Final Round of Interview', value: 'FinalRoundOfInterview' },
  { label: 'Offer Letter', value: 'Offer_Letter' },
  { label: 'Hired', value: 'Hired' },
  { label: 'Rejected', value: 'Rejected' },
];

const data = [
  {
    id: 1,
    title: 'job1',
    statistics: {
      New: 23,
      PreScreening: 25,
      ShortlistedCandidates: 15,
      InitialRoundOfInterview: 10,
      FinalRoundOfInterview: 5,
      OfferLetter: 0,
      HiredOrRejected: 8,
    },
  },
];

const StatusCounts = () => {
  const route = useRouter();
  const { data: statusCounts, isLoading } = useQuery(['StatusCount'], () => fetchStatusCounts());
  const mediumScreen = useMediaQuery('(min-width:1200px) and (max-width:1300px)');
  const smallScreen = useMediaQuery('(max-width:600px)');
  console.log('statusCounts', statusCounts);
  return statusCounts?.data?.map((item: any) => (
    <Box
      sx={{
        paddingX: 2,
        paddingY: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography variant="h6">
        Job title:{' '}
        <span
          style={{
            fontWeight: 500,
          }}
        >
          {item?.title}
        </span>
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {steps?.map((step, index) => (
          <Grid
            item
            xs={12}
            md={4}
            lg={4}
            xl={2.35}
            key={index}
            sx={{
              marginX: -2,
              position: 'relative',
              cursor: 'pointer',
            }}
            onClick={() => {
              // if (item.statistics[step.value] > 0) {
              route.push(`/${step.value}/${item?.job_id}`);
              // }
            }}
          >
            <Image
              src={`/assets/img_${index + 1}.png`}
              sx={{
                objectFit: 'contain',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '60%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                // textAlign: 'center',
                zIndex: 1, // Ensure it stays above the image
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  color: '#000',
                  fontSize: smallScreen ? 20 : mediumScreen ? 12 : 14,
                  lineHeight: 1,
                  fontWeight: mediumScreen ? 500 : 'bold',
                  fontFamily: 'Work Sans,sans-serif',
                  wordBreak: 'break-word',
                }}
              >
                {step.label}
              </Typography>
              <Typography fontSize={16}>
                {step.value === 'Rejected'
                  ? item.statistics.Rejected_By_Company + item.statistics.Rejected_By_Candidate
                  : item.statistics[step.value] || 0}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  ));
};

export default StatusCounts;
