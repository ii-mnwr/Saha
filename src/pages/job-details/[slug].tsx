import React, { useState } from 'react';
import Head from 'next/head';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useSettingsContext } from 'src/components/settings';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import JobDesCard from 'src/components/job-details/JobCard';
import JobOverviewCard from 'src/components/job-details/JobOverviewCard';
import { GetStaticPaths, GetStaticProps } from 'next';
import SkeletonHorizontalItem from 'src/components/skeleton/SkeletonHorizontalItem';
import { HOST_URL } from 'src/config-global';
import axiosInstance from 'src/utils/axios';
import { useQuery } from 'react-query';
import DataNotFound from 'src/components/DataNotFound';
import { useRouter } from 'next/router';
import { LocationIcon, TimeIcon } from 'src/theme/overrides/CustomIcons';
import { fToNow } from 'src/utils/formatTime';

const fetchJobsList = async (filter: any) => {
  const response = await axiosInstance.post('/jobs/list', filter);
  return response?.data;
};

const fetchJobById = async (data: any) => {
  const response = await axiosInstance.post('jobs/find-by-id', data);
  return response?.data;
};

JobDetails.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '/dashboard/employer',
      },

      { name: 'Jobs Details', href: '#' },
    ]}
    title="Jobs Details"
  >
    {page}
  </DashboardLayout>
);

export default function JobDetails({ id }: any) {
  const route = useRouter();
  const [filter, setFilter] = useState({
    limit: 3,
    page: 1,
    sort: 'id:desc',
    status: 'Open',
  });
  const { themeStretch } = useSettingsContext();
  const { data, refetch } = useQuery(['fetchJobDataByID', id], () =>
    fetchJobById({ id: Number(id) })
  );
  const {
    data: jobsList,
    isLoading,
    error,
    refetch: saveRefetch,
  } = useQuery(['savedJobsList', filter], () => fetchJobsList({ ...filter }));

  return (
    <>
      <Head>
        <title>Job details</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={2}>
          <Grid item xs={12} xl={8}>
            <Card sx={{ border: '1px solid #6D88C24D' }}>
              <JobDesCard job={data?.data} refetch={refetch} />
              {/* <Card
                sx={{
                  maxWidth: '100%',
                  boxShadow: '2px 2px 4px 0px #6D88C2',
                  borderRadius: 2,
                  m: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ my: 2 }}>
                    SIMILAR JOBS
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
                                  <Grid item xs={12} md={8}>
                                    <Box
                                      display="flex"
                                      flexDirection="row"
                                      alignItems="center"
                                      gap={1}
                                    >
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
                </CardContent>
              </Card> */}
            </Card>
          </Grid>
          <Grid item xs={12} xl={4}>
            <JobOverviewCard job={data?.data} />
          </Grid>
        </Grid>
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
