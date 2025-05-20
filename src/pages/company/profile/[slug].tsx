import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import React from 'react';
import { useQuery } from 'react-query';
import { useAuthContext } from 'src/auth/useAuthContext';
import Markdown from 'src/components/markdown/Markdown';
import { useSettingsContext } from 'src/components/settings';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import axiosInstance from 'src/utils/axios';
import CreateIcon from '@mui/icons-material/Create';
import { useRouter } from 'next/router';
import { HOST_URL } from 'src/config-global';
import { GetStaticPaths, GetStaticProps } from 'next';

Profile.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Company Details', href: '#' },
    ]}
    title="Company Details"
  >
    {page}
  </DashboardLayout>
);

const fetchCompanyById = async (id: any) => {
  console.log('id', id);
  const response = await axiosInstance.post('/companies/find-by-id', {
    id,
  });
  return response?.data;
};

export default function Profile({ id }: any) {
  console.log('id', id);
  const { themeStretch } = useSettingsContext();
  const { user } = useAuthContext();
  const router = useRouter();

  const {
    data: userData,
    isLoading,
    error,
    refetch,
  } = useQuery(
    ['FetchCompanyData', user, id],
    () => id && fetchCompanyById(id ? Number(id) : user?.employee_id)
  );
  console.log('data', userData?.data, typeof id);
  return (
    <>
      <Head>
        <title>Details Of Company</title>
      </Head>
      <Container maxWidth={false} disableGutters>
        <Grid container>
          <Grid item xs={12}>
            <Card
              sx={{
                boxShadow: 'none',
                background: '#F3F7FF',
              }}
            >
              {user?.role_id === 2 ? (
                <CardHeader
                  title="Details Of Company"
                  sx={{
                    color: '#086BFF',
                    fontFamily: 'Work Sans,sans-serif',
                    fontSize: 20,
                    fontWeight: 700,
                    paddingY: 1.5,
                    paddingX: 4,
                    bgcolor: '#79A4FF73',
                    cursor: 'pointer',
                  }}
                  action={
                    <Tooltip title="Edit profile">
                      <CreateIcon />
                    </Tooltip>
                  }
                  onClick={() => router.push('/company/edit-profile')}
                />
              ) : (
                <CardHeader
                  title="Details Of Company"
                  sx={{
                    color: '#086BFF',
                    fontFamily: 'Work Sans,sans-serif',
                    fontSize: 20,
                    fontWeight: 700,
                    paddingY: 1.5,
                    paddingX: 4,
                    bgcolor: '#79A4FF73',
                    cursor: 'pointer',
                  }}
                />
              )}

              <CardContent>
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontWeight: 600,
                    fontFamily: 'Inter,sans-serif',
                    color: '#000000',
                    mb: 2,
                  }}
                  variant="h3"
                >
                  COMPANY PROFILE
                </Typography>
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontWeight: 600,
                    fontFamily: 'Inter,sans-serif',
                    fontSize: 20,
                    color: '#000000',
                    mb: 2,
                  }}
                  variant="h4"
                >
                  {userData?.data?.name}
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Card
                      sx={{
                        boxShadow: '2px 2px 4px 0px #6D88C2',
                        background: '#FEFEFE',
                      }}
                    >
                      <CardHeader
                        title="COMPANY OVERVIEW"
                        sx={{
                          fontSize: 20,
                          fontWeight: 600,
                          fontFamily: 'Work Sans,sans-serif',
                          color: '#000000',
                        }}
                      />
                      <CardContent>
                        <Stack spacing={1}>
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography
                              sx={{
                                color: '#000000',
                                fontWeight: 400,
                                fontSize: 18,
                                fontFamily: 'Work Sans,sans-serif',
                              }}
                            >
                              Categories:
                            </Typography>
                            <Typography
                              sx={{
                                color: '#000000',
                                fontWeight: 400,
                                fontSize: 18,
                                fontFamily: 'Work Sans,sans-serif',
                              }}
                            >
                              Application
                            </Typography>
                          </Box>
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography
                              sx={{
                                color: '#000000',
                                fontWeight: 400,
                                fontSize: 18,
                                fontFamily: 'Work Sans,sans-serif',
                              }}
                            >
                              Established:
                            </Typography>
                            <Typography
                              sx={{
                                color: '#000000',
                                fontWeight: 400,
                                fontSize: 18,
                                fontFamily: 'Work Sans,sans-serif',
                              }}
                            >
                              {userData?.data?.est_since && userData?.data?.est_since !== 'null'
                                ? userData?.data?.est_since
                                : '-'}
                            </Typography>
                          </Box>
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography
                              sx={{
                                color: '#000000',
                                fontWeight: 400,
                                fontSize: 18,
                                fontFamily: 'Work Sans,sans-serif',
                              }}
                            >
                              Employees:
                            </Typography>
                            <Typography
                              sx={{
                                color: '#000000',
                                fontWeight: 400,
                                fontSize: 18,
                                fontFamily: 'Work Sans,sans-serif',
                              }}
                            >
                              {userData?.data?.team_size && userData?.data?.team_size !== 'null'
                                ? userData?.data?.team_size
                                : '-'}
                            </Typography>
                          </Box>
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography
                              sx={{
                                color: '#000000',
                                fontWeight: 400,
                                fontSize: 18,
                                fontFamily: 'Work Sans,sans-serif',
                              }}
                            >
                              Location:
                            </Typography>
                            <Typography
                              sx={{
                                color: '#000000',
                                fontWeight: 400,
                                fontSize: 18,
                                fontFamily: 'Work Sans,sans-serif',
                              }}
                            >
                              {userData?.data?.location && userData?.data?.location !== 'null'
                                ? userData?.data?.location
                                : '-'}
                            </Typography>
                          </Box>
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography
                              sx={{
                                color: '#000000',
                                fontWeight: 400,
                                fontSize: 18,
                                fontFamily: 'Work Sans,sans-serif',
                              }}
                            >
                              Phone Number:
                            </Typography>
                            <Typography
                              sx={{
                                color: '#000000',
                                fontWeight: 400,
                                fontSize: 18,
                                fontFamily: 'Work Sans,sans-serif',
                              }}
                            >
                              {userData?.data?.contact_number &&
                              userData?.data?.contact_number !== 'null'
                                ? userData?.data?.contact_number
                                : '-'}
                            </Typography>
                          </Box>
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography
                              sx={{
                                color: '#000000',
                                fontWeight: 400,
                                fontSize: 18,
                                fontFamily: 'Work Sans,sans-serif',
                              }}
                            >
                              Email:
                            </Typography>
                            <Typography
                              sx={{
                                color: '#000000',
                                fontWeight: 400,
                                fontSize: 18,
                                fontFamily: 'Work Sans,sans-serif',
                              }}
                            >
                              {userData?.data?.email && userData?.data?.email !== 'null'
                                ? userData?.data?.email
                                : '-'}
                            </Typography>
                          </Box>
                          {/* <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography
                              sx={{
                                color: '#000000',
                                fontWeight: 400,
                                fontSize: 18,
                                fontFamily: 'Work Sans,sans-serif',
                              }}
                            >
                              Socials:
                            </Typography>
                            <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                              <Box component="a" href={userData?.data?.social_links?.facebook_url}>
                                <FacebookIcon />
                              </Box>
                              <Box component="a" href={userData?.data?.social_links?.linkedin_url}>
                                <LinkedinIcon />
                              </Box>
                              <InstagramIcon />
                            </Box>
                          </Box> */}
                        </Stack>
                        {userData?.data?.website && userData?.data?.website !== 'null' && (
                          <Box
                            sx={{
                              textAlign: 'center',
                              mt: 2,
                            }}
                          >
                            <Typography
                              component="a"
                              href={userData?.data?.website}
                              sx={{
                                background: '#85B6FF45',
                                color: '#086BFF',
                                fontWeight: 400,
                                fontFamily: 'Work Sans,sans-serif',
                                fontSize: 14,
                                width: 'fit-content',
                                textAlign: 'center',
                                paddingY: 1,
                                paddingX: 2,
                                borderRadius: 1,
                              }}
                            >
                              {userData?.data?.website}
                            </Typography>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <img
                      src={`${HOST_URL}${userData?.data?.profile_image_path}`}
                      alt="profile"
                      style={{
                        borderRadius: 10,
                      }}
                      height="100%"
                      width="100%"
                    />
                  </Grid>
                  {userData?.data?.about_company !== 'null' && userData?.data?.about_company && (
                    <Grid item xs={12}>
                      <Card
                        sx={{
                          boxShadow: '2px 2px 4px 0px #6D88C2',
                          background: '#FEFEFE',
                          paddingY: 2,
                          paddingX: 4,
                        }}
                      >
                        <Markdown children={userData?.data?.about_company} />
                      </Card>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
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
