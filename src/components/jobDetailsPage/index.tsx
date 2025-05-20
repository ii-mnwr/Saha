/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react';
import Head from 'next/head';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useSettingsContext } from 'src/components/settings';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Typography,
  Avatar,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';
import JobCard from 'src/components/saved-job/CandidateSavedJob';
import JobOverviewCard from 'src/components/jobOverviewCard/JobOverviewCard';
import SkillsCard from 'src/components/jobOverviewCard/SkillCard';
import CompanyOverviewCard from 'src/components/jobOverviewCard/CompanyOverviewCard';
import JobDescriptionCard from 'src/components/jobOverviewCard/JobDescriptionCard';
import {
  BookmarkIconBold,
  LocationIcon,
  RuppesIcon,
  TimeIcon,
} from 'src/theme/overrides/CustomIcons';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LinkIcon from '@mui/icons-material/Link';
import { GetStaticPaths, GetStaticProps } from 'next';
import axiosInstance from 'src/utils/axios';
import { useQuery } from 'react-query';
import { fDate, fToNow } from 'src/utils/formatTime';
import usePostRequest from 'src/hooks/usePost';
import { useSnackbar } from 'src/components/snackbar';
import DataNotFound from 'src/components/DataNotFound';
import SkeletonHorizontalItem from 'src/components/skeleton/SkeletonHorizontalItem';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
import { HOST_URL } from 'src/config-global';
import useCopyToClipboard from 'src/hooks/useCopyToClipboard';
import { useAuthContext } from 'src/auth/useAuthContext';
import ApplyJob from '../applyJob';

type FormValuesProps = {};

const fetchJobById = async (data: any) => {
  const response = await axiosInstance.post('jobs/find-by-id', data);
  return response?.data;
};

const fetchJobsList = async (filter: any) => {
  const response = await axiosInstance.post('/jobs/list', filter);
  return response?.data;
};

export default function JobDetailsPage({ id }: any) {
  const { user } = useAuthContext();
  const [jobId, setId] = useState(-1);
  const { copy } = useCopyToClipboard();
  const route = useRouter();
  const { themeStretch } = useSettingsContext();

  const { data, refetch } = useQuery(['fetchJobDataByID', id], () =>
    fetchJobById({ id: Number(id) })
  );
  console.log('🚀 ~ JobDetailsPage ~ data:', data);

  const [filter, setFilter] = useState({
    limit: 3,
    page: 1,
    keywords: '',
    company_name: '',
    location: '',
    education: '',
    postedAt: '',
    job_type: '',
    category: '',
    application_type: '',
    sort: 'id:desc',
    status: 'Open',
  });

  const {
    data: jobsList,
    isLoading,
    error,
    refetch: saveRefetch,
  } = useQuery(['savedJobsList', filter], () => fetchJobsList({ ...filter }));

  const applyJob = usePostRequest();

  const { enqueueSnackbar } = useSnackbar();

  const handleApplyNow = (data: any) => {
    const url = '/jobs/apply';

    applyJob.mutate(
      [
        url,
        {
          ...data,
        },
      ],
      {
        onSuccess: (response: any) => {
          refetch();
          // Handle success
          enqueueSnackbar(response?.message || 'Applied job successfully', {
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

  const handleSubscribe = (data: any) => {
    console.log('🚀 ~ handleSubscribe ~ data:', data);
    const url = '/companies/subscribe';

    applyJob.mutate(
      [
        url,
        {
          ...data,
        },
      ],
      {
        onSuccess: (response: any) => {
          // Handle success
          refetch();
          enqueueSnackbar(response?.message || 'Subscribed successfully', {
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

  const handleUnsubscribe = (data: any) => {
    const url = '/companies/unsubscribe';

    applyJob.mutate(
      [
        url,
        {
          ...data,
        },
      ],
      {
        onSuccess: (response: any) => {
          // Handle success
          refetch();
          enqueueSnackbar(response?.message || 'UnSubscribed successfully', {
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

  const saveJob = usePostRequest();

  const handleSaveJob = (job_id: any, save: boolean) => {
    const url = save ? '/jobs/unsave' : '/jobs/save';

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
          saveRefetch();
          refetch();
          setId(-1);
          enqueueSnackbar(response?.message || 'Saved successfully', {
            variant: 'success',
          });
          // setRefresh(false);
        },
        onError: (error: any) => {
          setId(-1);
          // Handle error
          saveRefetch();
          enqueueSnackbar(error.message, { variant: 'error' });
          // setRefresh(false);
        },
      }
    );
  };

  const CustomStyledButton = ({ children, ...props }) => (
    <Button
      variant="contained"
      sx={{
        border: '1px solid #086BFF',
        background: '#6CA5F757',
        boxShadow: '0px 4px 10px 0px #0000001A',
        py: 0,
        px: 3,
        color: '#086BFF',
        fontFamily: 'Work Sans,sans-serif',
        fontWeight: 600,
        fontSize: 14,
        ':hover': {
          background: '#6CA5F757',
        },
        ':active': {
          background: '#6CA5F757',
        },
        ':focus': {
          background: '#6CA5F757',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );

  return (
    <>
      <Head>
        <title>Job details</title>
      </Head>
      <Container maxWidth={false} disableGutters>
        <Card sx={{ padding: 3, background: '#F3F7FF' }}>
          {user?.role_id !== 2 && (
            <>
              <Box display="flex" justifyContent="flex-end">
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      border: '1px solid #086BFF',
                      background: '#6CA5F757',
                      boxShadow: '0px 4px 10px 0px #0000001A',
                      py: 0,
                      px: 3,
                      color: '#086BFF',
                      fontFamily: 'Work Sans,sans-serif',
                      fontWeight: 600,
                      fontSize: 14,
                      ':hover': {
                        background: '#6CA5F757',
                      },
                      ':active': {
                        background: '#6CA5F757',
                      },
                      ':focus': {
                        background: '#6CA5F757',
                      },
                    }}
                    onClick={() => {
                      data?.data?.company?.is_subscribed
                        ? handleUnsubscribe({
                            company_id: data?.data?.company?.id,
                          })
                        : handleSubscribe({
                            company_id: data?.data?.company?.id,
                          });
                    }}
                  >
                    {data?.data?.company?.is_subscribed ? 'Unsubscribe' : 'subscribe'}
                  </Button>
                  <ApplyJob job={data?.data} CustomButton={CustomStyledButton} />
                  {/* <Button
                variant="contained"
                sx={{
                  border: '1px solid #086BFF',
                  background: '#6CA5F757',
                  boxShadow: '0px 4px 10px 0px #0000001A',
                  py: 0,
                  px: 3,
                  color: '#086BFF',
                  fontFamily: 'Work Sans,sans-serif',
                  fontWeight: 600,
                  fontSize: 14,
                  ':hover': {
                    background: '#6CA5F757',
                  },
                  ':active': {
                    background: '#6CA5F757',
                  },
                  ':focus': {
                    background: '#6CA5F757',
                  },
                }}
                disabled={data?.data?.application?.length > 0}
                onClick={() => {
                  handleApplyNow({
                    job_id: data?.data?.id,
                    company_id: data?.data?.company?.id,
                  });
                }}
              >
                {data?.data?.application?.length > 0 ? 'Applied' : ' Apply Job'}
              </Button> */}
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
            </>
          )}

          <Grid item xs={12}>
            <Box
              sx={{
                border: '1px solid #6D88C24D',
                paddingX: 4,
                paddingY: 2,
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                alignItems: 'center',
                borderRadius: 1,
                bgcolor: 'white',
                position: 'relative',
              }}
            >
              <Avatar
                variant="square"
                sx={{
                  width: 140,
                  height: 100,
                  borderRadius: 1,
                  border: '1px solid #6D88C24D',
                }}
                alt={data?.data?.company?.name}
                src={`${HOST_URL}${data?.data?.company?.profile_image_path}`}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'flex-start',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#086BFF',
                      fontSize: 24,
                      fontWeight: 600,
                      fontFamily: 'Inter,sans-serif',
                    }}
                  >
                    {data?.data?.title}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#000000',
                        fontSize: 16,
                        fontWeight: 600,
                        fontFamily: 'Inter,sans-serif',
                      }}
                    >
                      {data?.data?.company?.name}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                        alignItems: 'center',
                        marginTop: 1,
                      }}
                    >
                      <TimeIcon />
                      <Typography
                        sx={{
                          fontWeight: 300,
                          fontSize: 13,
                          fontFamily: 'Work Sans,sans-serif',
                          color: '#000000',
                        }}
                      >
                        {fToNow(data?.data?.postedAt)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 2,
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                        alignItems: 'center',
                        marginTop: 1,
                      }}
                    >
                      <LocationIcon />
                      <Typography
                        sx={{
                          fontWeight: 300,
                          fontSize: 13,
                          fontFamily: 'Work Sans,sans-serif',
                          color: '#000000',
                        }}
                      >
                        Location:{' '}
                        <span
                          style={{
                            fontWeight: 500,
                          }}
                        >
                          {data?.data?.location}
                        </span>
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                        alignItems: 'center',
                        marginTop: 1,
                      }}
                    >
                      <RuppesIcon />
                      <Typography
                        sx={{
                          fontWeight: 300,
                          fontSize: 13,
                          fontFamily: 'Work Sans,sans-serif',
                          color: '#000000',
                        }}
                      >
                        Salary :{' '}
                        <span
                          style={{
                            fontWeight: 500,
                          }}
                        >
                          {data?.data?.salary_min} - {data?.data?.salary_max}
                        </span>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                {/* <IconButton
                  sx={{
                    ':hover': {
                      background: 'none',
                    },
                    ':active': {
                      background: 'none',
                    },
                    ':focus': {
                      background: 'none',
                    },
                  }}
                >
                  <BookmarkBorderIcon />
                </IconButton> */}
              </Box>
              {user?.role_id !== 2 && (
                <LoadingButton
                  sx={{ cursor: 'pointer', minWidth: 24, position: 'absolute', top: 10, right: 20 }}
                  loading={data?.data?.id === jobId && saveJob.isLoading}
                  onClick={(e) => {
                    e.stopPropagation();
                    setId(data?.data?.id);
                    // setRefresh(true);
                    data?.data?.savedJob?.length
                      ? handleSaveJob(data?.data?.id, true)
                      : handleSaveJob(data?.data?.id, false);
                  }}
                >
                  {data?.data?.savedJob?.length > 0 ? <BookmarkIcon /> : <BookmarkIconBold />}
                </LoadingButton>
              )}
            </Box>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <JobOverviewCard
                    jobDetails={{
                      publishedOn: fToNow(data?.data?.postedAt),
                      vacancy: data?.data?.vacancy,
                      experience: data?.data?.experience,
                      jobType: data?.data?.job_type,
                      location: data?.data?.location,
                      category: data?.data?.category ? data?.data?.category : '-',
                      gender: 'Both',
                      applicationDue: fDate(data?.data?.application_deadline),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SkillsCard data={data?.data} />
                </Grid>
                <Grid item xs={12}>
                  <CompanyOverviewCard
                    companyDetails={{
                      company_category: data?.data?.company?.company_category
                        ? data?.data?.company?.company_category
                        : '-',
                      est_since:
                        data?.data?.company?.est_since !== 'null' && data?.data?.company?.est_since
                          ? data?.data?.company?.est_since
                          : '-',
                      team_size:
                        data?.data?.company?.team_size !== 'null' && data?.data?.company?.team_size
                          ? data?.data?.company?.team_size
                          : '-',
                      location: data?.data?.company?.location,
                      contact_number:
                        data?.data?.company?.contact_number !== 'null' &&
                        data?.data?.company?.contact_number
                          ? data?.data?.company?.contact_number
                          : '-',
                      email:
                        data?.data?.company?.email !== 'null' && data?.data?.company?.email
                          ? data?.data?.company?.email
                          : '',
                      data: data?.data,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <JobDescriptionCard
                item={{
                  description: data?.data?.description,
                  responsibilities: data?.data?.responsibilities,
                  experience: data?.data?.experience,
                }}
              />
            </Grid>
          </Grid>
          <Typography variant="h5" sx={{ my: 2 }}>
            Related Jobs
          </Typography>
          <Stack spacing={2}>
            {jobsList?.data?.length === 0 && !isLoading && (
              <Grid item xs={11}>
                <DataNotFound />
              </Grid>
            )}
            {isLoading
              ? [...Array(3)]?.map((index: number) => (
                  <Grid item xs={12}>
                    <SkeletonHorizontalItem key={index} />
                  </Grid>
                ))
              : jobsList?.data?.map((item: any) => (
                  <Grid
                    item
                    xs={12}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      route.push(`/candidate/jobs/applied-job/job-details/${item?.id}`);
                    }}
                  >
                    <Card
                      sx={{
                        display: 'flex',
                        alignItems: { xs: 'center', md: 'flex-start' },
                        flexDirection: { xs: 'column', md: 'row' },
                        padding: 2,
                        border: '1px solid #6D88C24D',
                        gap: 1.5,
                      }}
                    >
                      <Avatar
                        alt={`${item?.company?.name}`}
                        variant="square"
                        src={`${HOST_URL}${item?.company?.profile_image_path}`} // Replace with your image path
                        sx={{
                          width: 120,
                          height: 120,
                          borderRadius: 1,
                          border: '1px solid #6D88C24D',
                        }}
                      />
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems={{ xs: 'center', md: 'flex-start' }}
                        gap={1}
                        width="100%"
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column-reverse', sm: 'row' },
                            justifyContent: 'space-between',
                            width: '100%',
                            gap: { xs: 1.4, md: 0 },
                            alignItems: { xs: 'center', sm: 'baseline' },
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 0.5,
                            }}
                          >
                            <Typography
                              fontWeight={600}
                              fontFamily="Inter,sans-serif"
                              fontSize={20}
                              color="#000"
                              lineHeight={1}
                              textTransform="capitalize"
                            >
                              {`${item?.company?.name || ''}`}
                            </Typography>
                            <Typography
                              fontWeight={600}
                              fontFamily="Inter,sans-serif"
                              fontSize={18}
                              color="#086BFF"
                            >
                              {item?.title}
                            </Typography>
                          </Box>
                          {user?.role_id !== 2 && (
                            <Box>
                              <LoadingButton
                                sx={{ cursor: 'pointer', minWidth: 24 }}
                                loading={item?.id === jobId && saveJob.isLoading}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setId(item?.id);
                                  // setRefresh(true);
                                  item?.savedJob?.length
                                    ? handleSaveJob(item?.id, true)
                                    : handleSaveJob(item?.id, false);
                                }}
                              >
                                {item?.savedJob?.length > 0 ? (
                                  <BookmarkIcon />
                                ) : (
                                  <BookmarkIconBold />
                                )}
                              </LoadingButton>
                              <Tooltip title="Generate Link">
                                <IconButton
                                  color="secondary"
                                  size="large"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    copy(
                                      `${window.location.origin}/candidate/jobs/applied-job/job-details/${item?.id}`
                                    );
                                    enqueueSnackbar('Copied');
                                  }}
                                >
                                  <LinkIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          )}
                        </Box>

                        <Grid container spacing={1}>
                          <Grid item xs={12} md={4}>
                            <Typography
                              sx={{
                                fontWeight: 300,
                                fontSize: 13,
                                fontFamily: 'Work Sans,sans-serif',
                              }}
                              color="#000"
                            >
                              Status: {item?.status}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Typography
                              sx={{
                                fontWeight: 300,
                                fontSize: 13,
                                fontFamily: 'Work Sans,sans-serif',
                              }}
                              color="#000"
                            >
                              Application:{' '}
                              {item?.application_type === 'company_site'
                                ? 'Company Site'
                                : 'Easy Apply'}
                            </Typography>
                          </Grid>
                          {item?.location && (
                            <Grid item xs={12} md={4}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationIcon />
                                <Typography
                                  fontWeight={300}
                                  fontFamily="Work Sans,sans-serif"
                                  fontSize={13}
                                  color="#000000"
                                >
                                  {item?.location}
                                </Typography>
                              </Box>
                            </Grid>
                          )}
                          <Grid item xs={12} md={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <TimeIcon />
                              <Typography
                                fontWeight={300}
                                fontFamily="Work Sans,sans-serif"
                                fontSize={13}
                                color="#000000"
                              >
                                {item?.job_type}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                              <TimeIcon />
                              <Typography
                                sx={{
                                  fontWeight: 300,
                                  fontSize: 13,
                                  fontFamily: 'Work Sans,sans-serif',
                                }}
                                color="#000"
                              >
                                Posted {fToNow(item?.updatedAt)}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Card>
                  </Grid>
                ))}
          </Stack>
        </Card>
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  return { props: { id: params?.slug } };
};
