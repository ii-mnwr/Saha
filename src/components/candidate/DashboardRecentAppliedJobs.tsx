import { useEffect, useState } from 'react';
import { 
  Box, 
  Card, 
  Typography, 
  Grid, 
  Button, 
  Avatar, 
  Skeleton,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import { useAppliedJob } from 'src/hooks/useJobs';
import { HOST_URL } from 'src/config-global';
import { LocationIcon, TimeIcon } from 'src/theme/overrides/CustomIcons';
import Iconify from 'src/components/iconify';
import useCopyToClipboard from 'src/hooks/useCopyToClipboard';
import { useSnackbar } from 'src/components/snackbar';
import usePostRequest from 'src/hooks/usePost';
import { fToNow } from 'src/utils/formatTime';
import { cardDimensions } from 'src/theme/cardDimensions';


export const DashboardRecentAppliedJobs = () => {
  const router = useRouter();
  const { copy } = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  // Use the same custom hook that works in the AppliedJobs page
  const { getAllAppliedJobs, isLoading, setRefresh } = useAppliedJob({
    limit: 5, // Fetch a few more than we show
    page: 1,
    sort: 'id:desc', // Sort by newest first
  });

  const saveJob = usePostRequest();

  const handleSaveJob = (job_id: number, save: boolean) => {
    const url = save ? "/jobs/unsave" : "/jobs/save";

    saveJob.mutate(
      [
        url,
        {
          job_id,
        },
      ],
      {
        onSuccess: (response) => {
          enqueueSnackbar(response?.message || "Saved successfully", {
            variant: "success",
          });
          setRefresh(false);
        },
        onError: (error) => {
          enqueueSnackbar(error.message, { variant: "error" });
          setRefresh(false);
        },
      },
    );
  };

  const handleCopyLink = (jobId: number) => {
    copy(`${window.location.origin}/candidate/jobs/applied-job/job-details/${jobId}`);
    enqueueSnackbar("Link copied to clipboard");
  };

  const navigateToJobDetails = (jobId: number) => {
    router.push(`/candidate/jobs/applied-job/job-details/${jobId}`);
  };

  const navigateToAppliedJobs = () => {
    router.push('/candidate/jobs/applied-job');
  };

  return (
    <Card sx={{ 
      p: isMobile ? cardDimensions.padding.mobile : cardDimensions.padding.desktop,
      borderRadius: 2,
      height: isMobile ? cardDimensions.height.mobile : cardDimensions.height.desktop,
      minHeight: isMobile ? cardDimensions.height.mobile : undefined,
      mt: 2,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <Stack 
        direction="row" 
        alignItems="center" 
        justifyContent="center"
        mb={2}
      >
        <Typography variant={isMobile ? 'subtitle1' : 'h6'} fontWeight={600}>
          Recently Applied Jobs
        </Typography>
      </Stack>
      
      <Box 
        sx={{ 
          flex: 1, 
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#ccc',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#bbb', 
          },
          maxHeight: isMobile ? 'none' : '250px',
        }}
      >
        {isLoading ? (
          // Show skeleton loaders while loading
          [...Array(3)].map((_, index) => (
            <Box key={index} mb={2} pb={2} sx={{ borderBottom: '1px solid #f0f0f0' }}>
              <Grid container spacing={2}>
                <Grid item xs={isMobile ? 3 : 2}>
                  <Skeleton variant="rectangular" width={40} height={40} />
                </Grid>
                <Grid item xs={isMobile ? 9 : 7}>
                  <Skeleton variant="text" width={isMobile ? '90%' : '80%'} />
                  <Skeleton variant="text" width={isMobile ? '70%' : '60%'} />
                  <Skeleton variant="text" width={isMobile ? '50%' : '40%'} />
                </Grid>
                {!isMobile && (
                  <Grid item xs={3} sx={{ textAlign: 'right' }}>
                    <Skeleton variant="circular" width={24} height={24} sx={{ display: 'inline-block', mx: 0.5 }} />
                    <Skeleton variant="circular" width={24} height={24} sx={{ display: 'inline-block', mx: 0.5 }} />
                  </Grid>
                )}
              </Grid>
            </Box>
          ))
        ) : getAllAppliedJobs?.data?.length > 0 ? (
          getAllAppliedJobs.data.slice(0, 3).map((job: {
            id: number;
            title: string;
            company?: {
              name: string;
              profile_image_path?: string;
            };
            location?: string;
            job_type?: string;
            updatedAt: string | Date;
            savedJob?: Array<any>;
          }) => (
            <Box 
              key={job.id} 
              mb={2} 
              pb={2} 
              sx={{ 
                borderBottom: '1px solid #f0f0f0',
                cursor: 'pointer',
                '&:hover': { bgcolor: '#f8f9fa' },
                borderRadius: 1,
                p: 1
              }}
              onClick={() => navigateToJobDetails(job.id)}
            >
              <Grid container alignItems="center" spacing={isMobile ? 1 : 2}>
                <Grid item xs={isMobile ? 3 : 2}>
                  <Avatar
                    variant="square"
                    src={`${HOST_URL}${job?.company?.profile_image_path}`}
                    alt={job?.company?.name}
                    sx={{ width: 40, height: 40 }}
                  />
                </Grid>
                <Grid item xs={isMobile ? 9 : 7}>
                  <Typography fontWeight={600} noWrap>{job.title}</Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {job?.company?.name}
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 1, 
                    mt: 0.5,
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: isMobile ? 'flex-start' : 'center'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationIcon sx={{ fontSize: 14, color: "#888" }} />
                      <Typography variant="caption" color="text.secondary">
                        {job?.location || "Location"}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <TimeIcon sx={{ fontSize: 14, color: "#888" }} />
                      <Typography variant="caption" color="text.secondary">
                        {job?.job_type || "Full-time"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                {!isMobile && (
                  <Grid item xs={3} sx={{ textAlign: 'right' }}>
                    <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                      {fToNow(job?.updatedAt)}
                    </Typography>
                    <Box>
                      <LoadingButton
                        size="small"
                        loading={saveJob.isLoading}
                        variant="text"
                        sx={{ minWidth: 'auto', p: 0.5 }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          setRefresh(true);
                          job?.savedJob?.length
                            ? handleSaveJob(job.id, true)
                            : handleSaveJob(job.id, false);
                        }}
                      >
                        <Iconify
                          icon={job?.savedJob?.length ? "mdi:bookmark" : "mdi:bookmark-outline"}
                          sx={{ fontSize: 20, color: job?.savedJob?.length ? "#f8c146" : "#666" }}
                        />
                      </LoadingButton>
                      <LoadingButton
                        size="small"
                        variant="text"
                        sx={{ minWidth: 'auto', p: 0.5 }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          handleCopyLink(job.id);
                        }}
                      >
                        <Iconify icon="mdi:link" sx={{ fontSize: 20, color: "#666" }} />
                      </LoadingButton>
                    </Box>
                  </Grid>
                )}
              </Grid>
              {isMobile && (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mt: 1,
                  pl: '52px' // Align with the content above (avatar width + padding)
                }}>
                  <Typography variant="caption" color="text.secondary">
                    {fToNow(job?.updatedAt)}
                  </Typography>
                  <Box>
                    <LoadingButton
                      size="small"
                      loading={saveJob.isLoading}
                      variant="text"
                      sx={{ minWidth: 'auto', p: 0.5 }}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        setRefresh(true);
                        job?.savedJob?.length
                          ? handleSaveJob(job.id, true)
                          : handleSaveJob(job.id, false);
                      }}
                    >
                      <Iconify
                        icon={job?.savedJob?.length ? "mdi:bookmark" : "mdi:bookmark-outline"}
                        sx={{ fontSize: 20, color: job?.savedJob?.length ? "#f8c146" : "#666" }}
                      />
                    </LoadingButton>
                    <LoadingButton
                      size="small"
                      variant="text"
                      sx={{ minWidth: 'auto', p: 0.5 }}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        handleCopyLink(job.id);
                      }}
                    >
                      <Iconify icon="mdi:link" sx={{ fontSize: 20, color: "#666" }} />
                    </LoadingButton>
                  </Box>
                </Box>
              )}
            </Box>
          ))
        ) : (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: isMobile ? '200px' : '100%',
            p: 2
          }}>
            <Typography variant="body1" color="text.secondary" textAlign="center">
              No recently applied jobs found
            </Typography>
          </Box>
        )}
      </Box>
      
      <Button 
        fullWidth 
        variant="contained"
        sx={{ 
          mt: 2, 
          bgcolor: "#0A2239", 
          "&:hover": { bgcolor: "#2e3b55" },
          py: isMobile ? 1 : undefined
        }}
        onClick={navigateToAppliedJobs}
        endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        size={isMobile ? 'small' : 'medium'}
      >
        View All Applied Jobs
      </Button>
    </Card>
  );
};