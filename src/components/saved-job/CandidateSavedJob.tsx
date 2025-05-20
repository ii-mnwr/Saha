/* eslint-disable eqeqeq */
import React from 'react';
import { Card, Chip, Typography, Box, IconButton, Avatar, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { RuppesIcon, TimeIcon } from 'src/theme/overrides/CustomIcons';
import BookmarkIcon from '@mui/icons-material/Bookmark';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
import { fDate, fDateTime, fToNow } from 'src/utils/formatTime';
import { LoadingButton } from '@mui/lab';
import usePostRequest from 'src/hooks/usePost';
import { useSnackbar } from 'src/components/snackbar';
import { HOST_URL } from 'src/config-global';
import ApplyJob from '../applyJob';

const JobCard = ({
  item,
  handleSaveJob,
  setRefreshApi,
}: {
  item: any;
  handleSaveJob: any;
  setRefreshApi: any;
}) => {
  const applyJob = usePostRequest();
  const { enqueueSnackbar } = useSnackbar();

  const handleApplyNow = () => {
    const url = '/jobs/apply';

    applyJob.mutate(
      [
        url,
        {
          job_id: item?.id,
          company_id: item?.company_id,
        },
      ],
      {
        onSuccess: (response: any) => {
          // Handle success
          enqueueSnackbar(response?.message || 'Reset password email sent successfully', {
            variant: 'success',
          });
          if (setRefreshApi) setRefreshApi((flag: boolean) => !flag);
        },
        onError: (error: any) => {
          // Handle error
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      }
    );
  };
  console.log('itemmmmmm', item);
  return (
    <Card
      // sx={{
      //   display: 'flex',
      //   alignItems: 'center',
      //   justifyContent: 'space-between',
      //   p: 2,
      //   borderRadius: '10px',
      //   boxShadow: 3,
      // }}
      sx={{ p: 3, border: '1px solid #6D88C24D' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          justifyContent: { md: 'space-between' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            width: '100%',
            gap: 3,
          }}
        >
          {/* Assuming you have the logo as a React component */}
          <Avatar
            variant="square"
            sx={{
              width: 110,
              height: 80,
              borderRadius: 1,
            }}
            alt={item?.company?.name}
            src={`${HOST_URL}${item?.company?.profile_image_path}`}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Box display="flex" flexDirection={{ xs: 'column' }}>
              <Typography
                sx={{
                  color: '#086BFF',
                  fontWeight: 600,
                  fontSize: 20,
                  fontFamily: 'Inter,sans-serif',
                }}
              >
                {item?.title}
              </Typography>
              <Typography
                sx={{
                  color: '#000',
                  fontWeight: 600,
                  fontSize: 18,
                  fontFamily: 'Inter,sans-serif',
                }}
              >
                {item?.company?.name}
              </Typography>
            </Box>

            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                  <TimeIcon />
                  <Typography
                    sx={{
                      fontWeight: 300,
                      fontSize: 13,
                      fontFamily: 'Work Sans,sans-serif',
                      lineHeight: 1,
                    }}
                    color="#000"
                    width="200px"
                  >
                    Posted {fToNow(item?.updatedAt)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  sx={{
                    fontWeight: 300,
                    fontFamily: 'Work Sans,sans-serif',
                    fontSize: 13,
                    color: '#000',
                  }}
                >
                  Location: <b>{item?.location}</b>
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                  <TimeIcon />
                  <Typography
                    sx={{
                      fontWeight: 300,
                      fontFamily: 'Work Sans,sans-serif',
                      fontSize: 13,
                      color: '#000',
                    }}
                  >
                    Deadline: <b>{fDate(item?.application_deadline)}</b>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  sx={{
                    fontWeight: 300,
                    fontFamily: 'Work Sans,sans-serif',
                    fontSize: 13,
                    color: '#000',
                  }}
                >
                  Aplication type:
                  <b>{item?.application_type === 'company_site' ? 'Company Site' : 'Easy Apply'}</b>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box display="flex" justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
          <Box>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleSaveJob(item);
              }}
            >
              <BookmarkIcon color="primary" />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          // paddingX: { md: 4 },
          pt: 1,
          gap: { xs: 2, md: 0 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="center" gap={1}>
            <Chip
              label={item?.job_type}
              sx={{
                background: '#85B6FF45',
                border: 'transparent',
                fontSize: 11,
                fontWeight: 400,
                fontFamily: 'Work Sans,sans-serif',
                color: '#086BFF',
                paddingX: 1,
              }}
              variant="outlined"
            />
          </Box>
          <Box display="flex" ml={2} gap={1} alignItems="center">
            <RuppesIcon />
            <Typography
              sx={{
                color: '#000',
                fontFamily: 'Work Sans,sans-serif',
                fontSize: 13,
                fontWeight: 300,
                // ml: 2,
              }}
            >
              <b>
                {item?.salary_min} - {item?.salary_max}
              </b>
            </Typography>
          </Box>
        </Box>
        <Box onClick={(e) => e.stopPropagation()}>
          <ApplyJob job={item} setRefresh={setRefreshApi} />
        </Box>
        {/* <LoadingButton
          sx={{
            paddingX: 3,
            paddingY: 1,
            color: '#FFF',
            fontWeight: 400,
            fontFamily: 'Work Sans,sans-serif',
            fontSize: 14,
            background: '#086BFF',
          }}
          variant="contained"
          loading={applyJob?.isLoading}
          disabled={item?.application?.length > 0}
          onClick={() => {
            if (item?.application_type == 'company_site') {
              window.open(item?.job_url, '_blank', 'noopener,noreferrer');
            } else {
              handleApplyNow();
            }
          }}
        >
          {item?.application?.length > 0 ? 'Applied' : 'Apply Now'}
        </LoadingButton> */}
      </Box>
    </Card>
  );
};

export default JobCard;
