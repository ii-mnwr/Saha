import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { typesOfJobs } from 'src/assets/data/jobData';
import { useAppliedJob } from 'src/hooks/useJobs';
import usePostRequest from 'src/hooks/usePost';
import {
  BookmarkIconBold,
  CurrencyIcon,
  LocationIcon,
  NextButton,
  TimeIcon,
} from 'src/theme/overrides/CustomIcons';
import { fToNow } from 'src/utils/formatTime';
import { useSnackbar } from 'src/components/snackbar';
import axiosInstance from 'src/utils/axios';
import { useQuery } from 'react-query';
import DataNotFound from '../DataNotFound';
import { SkeletonProductItem } from '../skeleton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { copy } from 'stylis';
import useCopyToClipboard from 'src/hooks/useCopyToClipboard';

export const RecentAppliedJobs = () => {
  const matches = useMediaQuery('(max-width:1200px)');
  const { copy } = useCopyToClipboard();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { getAllAppliedJobs, isLoading } = useAppliedJob({
    limit: 3,
    page: 1,
    sort: 'id:desc',
  });

  const saveJob = usePostRequest();

  const handleSaveJob = (job_id: any) => {
    const url = '/jobs/save';

    saveJob.mutate(
      [
        url,
        {
          job_id,
        },
      ],
      {
        onSuccess: (response: any) => {
          // Handle success
          enqueueSnackbar(response?.message || 'Saved successfully', {
            variant: 'success',
          });
        },
        onError: (error: any) => {
          // Handle error
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      }
    );
  };

  return (
    <Box
      paddingX={4}
      paddingY={3}
      marginTop={2}
      sx={{
        background: '#F5F8FF7D',
        borderRadius: 2,
        boxShadow: 4,
      }}
    >
      <Typography color="#086BFF" fontFamily="Work Sans,sans-serif" fontSize={24} fontWeight={600}>
        Recently Applied
      </Typography>
      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 2, xl: 3 }} marginTop={1}>
        {getAllAppliedJobs?.data?.length === 0 && !isLoading && (
          <Grid item xs={11}>
            <DataNotFound
              title="No jobs have been applied recently"
              subTitle="Apply for the jobs from the “Search jobs” session"
              path="/assets/recentlyApplied.jpeg"
            />
          </Grid>
        )}
        {isLoading
          ? [...Array(12)]?.map((index: number) => (
              <Grid item xs={12} sm={6} lg={6} xl={4} borderRadius={1}>
                <SkeletonProductItem key={index} />
              </Grid>
            ))
          : getAllAppliedJobs?.data?.map((item: any, index: any) => (
              <Grid item xs={12} sm={matches ? 6 : 4} borderRadius={1}>
                <Card
                  sx={{
                    maxWidth: 600,
                    boxShadow: '4px 4px 4px 0px #85B6FF ,2px 2px 8px 0px #85B6FF inset',
                    padding: 3,
                    borderRadius: 1,
                    height: '100%',
                  }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      gap: 1,
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      '&.MuiCardContent-root:last-child': {
                        padding: 0,
                      },
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="start"
                      width="100%"
                    >
                      <Box
                        component="img"
                        src={`http://3.26.216.54:3001/${item?.company?.profile_image_path}`}
                        alt={item?.company?.name}
                        sx={{
                          borderRadius: 3,
                          width: 120,
                          height: 100,
                          boxShadow: '0px 4px 4px 0px #00000040',
                        }}
                      />
                      <Box sx={{ display: 'flex' }}>
                        <LoadingButton
                          sx={{ cursor: 'pointer' }}
                          loading={saveJob.isLoading}
                          onClick={() => handleSaveJob(item?.id)}
                        >
                          {item?.savedJob?.length > 0 ? <BookmarkIcon /> : <BookmarkIconBold />}
                        </LoadingButton>
                        <Button
                          sx={{
                            paddingX: 1,
                            paddingY: 1,
                            color: '#086BFF',
                            fontWeight: 400,
                            fontFamily: 'Work Sans,sans-serif',
                            fontSize: 14,
                            background: '#85B6FF45',
                          }}
                          variant="contained"
                          onClick={(e) => {
                            e.stopPropagation();
                            copy(
                              `${window.location.origin}/candidate/jobs/applied-job/job-details/${item?.id}`
                            );
                            enqueueSnackbar('Copied');
                          }}
                        >
                          Link
                        </Button>
                      </Box>
                    </Box>
                    <Typography fontWeight={600} fontSize={18} fontFamily="Inter,sans-serif">
                      {item?.title}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" width="100%">
                      <Box display="flex" gap={1} alignItems="center">
                        <LocationIcon fill="#979797B0" />
                        <Typography
                          fontWeight={500}
                          fontSize={13}
                          fontFamily="Work Sans,sans-serif"
                          color="#000"
                        >
                          {item?.location}
                        </Typography>
                      </Box>
                      <Box display="flex" gap={1} alignItems="center">
                        <TimeIcon fill="#979797B0" />
                        <Typography
                          fontWeight={300}
                          fontSize={13}
                          fontFamily="Work Sans,sans-serif"
                          color="#000"
                        >
                          {fToNow(item?.updatedAt)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box display="flex" gap={1} alignItems="center">
                      <CurrencyIcon />
                      <Typography
                        fontWeight={500}
                        fontSize={13}
                        fontFamily="Work Sans,sans-serif"
                        color="#000"
                      >
                        {item?.salary_min} - {item?.salary_max} per month
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={{ xs: 1, lg: 2 }} flexWrap="wrap">
                      <Chip
                        label={item?.job_type}
                        /* sx={{
                          color: '#086BFF',
                          background: typesOfJobs.find((item1) => item1?.value === item?.job_type)
                            ?.bgColor,
                        }} */
                      />
                      {/* <Chip
                    label="Freelancer"
                    sx={{
                      background: '#F7756426',
                      color: '#FF0808FC',
                    }}
                  />
                  <Chip
                    label="Internship"
                    sx={{
                      color: '#F117FA',
                      background: '#F134F71F',
                    }}
                  /> */}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>
      {getAllAppliedJobs?.data?.length > 0 && (
        <Box display="flex" justifyContent="flex-end" mt={1}>
          <IconButton onClick={() => router.push('/candidate/jobs/applied-job/')}>
            <NextButton />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
