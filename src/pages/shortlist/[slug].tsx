import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import EducationListing from 'src/components/EducationListing';
import ExperienceListing from 'src/components/experience-listing';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { CalenderIcon, EyeIcon, LocationIcon } from 'src/theme/overrides/CustomIcons';
import axiosInstance from 'src/utils/axios';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DataNotFound from 'src/components/DataNotFound';
import { fDate } from 'src/utils/formatTime';

interface CandidateProps {
  id?: string; // Define the type according to your data structure
}

const fetchUserById = async (id: any) => {
  const response = await axiosInstance.post('/candidates/find-by-id', {
    id,
  });
  return response?.data;
};

const CandidateDetails: React.FC<CandidateProps> = ({ id }: any) => {
  const { themeStretch } = useSettingsContext();
  const { push } = useRouter();
  const { data: userData } = useQuery(['candidateViewData', id], () => id && fetchUserById(id));
  return (
    <>
      <Head>
        <title>Profile Details</title>
      </Head>
      <Container maxWidth={false} disableGutters>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card
              sx={{
                boxShadow: '2px 2px 4px 0px #6D88C2',
                background: '#FEFEFE',
              }}
            >
              <CardHeader
                title="Candidate"
                sx={{
                  color: '#086BFF',
                  fontFamily: 'Work Sans,sans-serif',
                  fontSize: 20,
                  fontWeight: 700,
                  paddingY: 1.5,
                  paddingX: 4,
                  bgcolor: '#79A4FF73',
                }}
              />
              {/* 
              {Object.keys(userData?.data).length !== 0 ? (
                <CardContent>
                  <DataNotFound />
                </CardContent>
              ) : ( */}
              <CardContent>
                <Box display="flex" flexDirection="column" gap={0}>
                  <Box
                    display="flex"
                    flexDirection={{ xs: 'column', md: 'row' }}
                    gap={{ xs: 2, md: 0 }}
                    justifyContent="space-between"
                  >
                    <Box
                      display="flex"
                      flexDirection={{ xs: 'column', md: 'row' }}
                      gap={2}
                      alignItems={{ xs: 'center', md: 'flex-start' }}
                    >
                      <Avatar
                        sx={{
                          width: 100,
                          height: 100,
                        }}
                        src={`http://localhost:5005/${userData?.data?.profile_image_path}`}
                      />
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems={{ xs: 'center', md: 'flex-start' }}
                      >
                        <Typography
                          fontFamily="Work Sans,sans-serif"
                          fontSize={28}
                          fontWeight={800}
                          color="#162144"
                        >
                          {userData?.data?.first_name} {userData?.data?.last_name}
                        </Typography>
                        <Typography
                          fontFamily="Work Sans,sans-serif"
                          fontSize={16}
                          fontWeight={500}
                          color="#000"
                        >
                          iOS Expert
                        </Typography>
                        <Typography
                          fontFamily="Work Sans,sans-serif"
                          fontSize={16}
                          fontWeight={500}
                          color="#000"
                        >
                          ID: {id}
                        </Typography>
                        <Box
                          display="flex"
                          flexDirection={{ xs: 'column', md: 'row' }}
                          gap={{ xs: 1, md: 2 }}
                        >
                          <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                            <LocationIcon fill="#A3A3A3" />
                            <Typography
                              sx={{
                                color: '#0000005C',
                                fontWeight: 500,
                                fontSize: 16,
                                fontFamily: 'Work Sans,sans-serif',
                              }}
                            >
                              {userData?.data?.address?.city}
                            </Typography>
                          </Box>
                          <Divider
                            orientation="vertical"
                            variant="fullWidth"
                            flexItem
                            sx={{
                              borderColor: '#AEAEAE',
                            }}
                          />
                          <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                            <CalenderIcon />
                            <Typography
                              sx={{
                                color: '#0000005C',
                                fontWeight: 500,
                                fontSize: 16,
                                fontFamily: 'Work Sans,sans-serif',
                              }}
                            >
                              {fDate(userData?.data?.date_applied)}
                            </Typography>
                          </Box>
                          <Divider
                            orientation="vertical"
                            variant="fullWidth"
                            flexItem
                            sx={{
                              borderColor: '#AEAEAE',
                            }}
                          />
                          <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                            <EyeIcon height={20} width={20} fill="#A3A3A3" />
                            <Typography
                              sx={{
                                color: '#0000005C',
                                fontWeight: 500,
                                fontSize: 16,
                                fontFamily: 'Work Sans,sans-serif',
                              }}
                            >
                              990 Views
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        flexDirection: 'column',
                      }}
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          height: 36,
                          width: 36,
                          minWidth: 36,
                          borderRadius: '50%',
                          border: '1.8px solid #086BFF',
                        }}
                        onClick={() => push('/shortlist')}
                      >
                        <ArrowBackRoundedIcon
                          sx={{
                            fill: '#086BFF',
                          }}
                        />
                      </Button>
                      <Box
                        component="img"
                        src="/assets/candidate_view.png"
                        alt="candidate_view"
                        sx={{
                          objectFit: 'cover',
                          width: 100,
                          height: 100,
                        }}
                      />
                    </Box>
                  </Box>
                  <Divider
                    sx={{
                      borderColor: '#C7D1E8',
                      marginBottom: 2,
                    }}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      gap: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#162144',
                        fontFamily: 'Work Sans,sans-serif',
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                    >
                      Current Stage :-
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 1,
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#000000',
                          fontFamily: 'Work Sans,sans-serif',
                          fontWeight: 400,
                          fontSize: 13,
                          paddingX: 2,
                          paddingY: 1,
                          lineHeight: 1,
                          border: '1px solid #086BFF',
                          borderRadius: 1,
                        }}
                      >
                        In-Review
                      </Typography>
                      <Typography
                        sx={{
                          color: '#000000',
                          fontFamily: 'Work Sans,sans-serif',
                          fontWeight: 400,
                          fontSize: 13,
                          paddingX: 2,
                          paddingY: 1,
                          lineHeight: 1,
                          border: '1px solid #086BFF',
                          borderRadius: 1,
                        }}
                      >
                        Short-Listed
                      </Typography>
                      <Typography
                        sx={{
                          color: '#000000',
                          fontFamily: 'Work Sans,sans-serif',
                          fontWeight: 400,
                          fontSize: 13,
                          paddingX: 2,
                          paddingY: 1,
                          lineHeight: 1,
                          border: '1px solid #086BFF',
                          borderRadius: 1,
                        }}
                      >
                        Interview
                      </Typography>
                      <Typography
                        sx={{
                          color: '#000000',
                          fontFamily: 'Work Sans,sans-serif',
                          fontWeight: 400,
                          fontSize: 13,
                          paddingX: 2,
                          paddingY: 1,
                          lineHeight: 1,
                          border: '1px solid #086BFF',
                          borderRadius: 1,
                        }}
                      >
                        Hired/ Declined
                      </Typography>
                    </Box>
                  </Box>
                  <Divider
                    sx={{
                      borderColor: '#C7D1E8',
                      marginTop: 2,
                    }}
                  />
                </Box>
                <Grid
                  container
                  sx={{
                    marginTop: 2,
                  }}
                  spacing={2}
                >
                  <Grid item xs={12} xl={7}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Card
                          sx={{
                            boxShadow: 'none',
                            background: '#FEFEFE',
                          }}
                        >
                          <CardContent>
                            <Grid container spacing={1}>
                              <Grid item xs={12} md={3}>
                                <Typography
                                  sx={{
                                    color: '#162144',
                                    fontWeight: 600,
                                    fontFamily: 'Work Sans,sans-serif',
                                    fontSize: 16,
                                  }}
                                >
                                  Email:
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Typography
                                  sx={{
                                    color: '#000000C2',
                                    fontWeight: 500,
                                    fontFamily: 'Work Sans,sans-serif',
                                    fontSize: 16,
                                  }}
                                >
                                  {userData?.data?.email}
                                </Typography>
                              </Grid>
                              <Grid item xs={3} />
                              <Grid item xs={12} md={3}>
                                <Typography
                                  sx={{
                                    color: '#162144',
                                    fontWeight: 600,
                                    fontFamily: 'Work Sans,sans-serif',
                                    fontSize: 16,
                                  }}
                                >
                                  Company :
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Typography
                                  sx={{
                                    color: '#000000C2',
                                    fontWeight: 500,
                                    fontFamily: 'Work Sans,sans-serif',
                                    fontSize: 16,
                                  }}
                                >
                                  jonathonRonan@gmail.com
                                </Typography>
                              </Grid>
                              <Grid item xs={3} />
                              <Grid item xs={12} md={3}>
                                <Typography
                                  sx={{
                                    color: '#162144',
                                    fontWeight: 600,
                                    fontFamily: 'Work Sans,sans-serif',
                                    fontSize: 16,
                                  }}
                                >
                                  Birth Date :
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Typography
                                  sx={{
                                    color: '#000000C2',
                                    fontWeight: 500,
                                    fontFamily: 'Work Sans,sans-serif',
                                    fontSize: 16,
                                  }}
                                >{`${new Date(userData?.data?.date_of_birth).getDate()}.${
                                  new Date(userData?.data?.date_of_birth).getMonth() + 1
                                }.${new Date(
                                  userData?.data?.date_of_birth
                                ).getFullYear()}`}</Typography>
                              </Grid>
                              <Grid item xs={3} />
                              <Grid item xs={12} md={3}>
                                <Typography
                                  sx={{
                                    color: '#162144',
                                    fontWeight: 600,
                                    fontFamily: 'Work Sans,sans-serif',
                                    fontSize: 16,
                                  }}
                                >
                                  Address :
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Typography
                                  sx={{
                                    color: '#000000C2',
                                    fontWeight: 500,
                                    fontFamily: 'Work Sans,sans-serif',
                                    fontSize: 16,
                                  }}
                                >
                                  {userData?.data?.address?.address1}
                                </Typography>
                              </Grid>
                              <Grid item xs={3} />
                              <Grid item xs={3}>
                                <Typography
                                  sx={{
                                    color: '#162144',
                                    fontWeight: 600,
                                    fontFamily: 'Work Sans,sans-serif',
                                    fontSize: 16,
                                  }}
                                >
                                  Phone :
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Typography
                                  sx={{
                                    color: '#000000C2',
                                    fontWeight: 500,
                                    fontFamily: 'Work Sans,sans-serif',
                                    fontSize: 16,
                                  }}
                                >
                                  {userData?.data?.phone_number}
                                </Typography>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12}>
                        <ExperienceListing data={userData?.data?.experience_details} />
                      </Grid>
                      <Grid item xs={12}>
                        <EducationListing data={userData?.data?.education_details} />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} xl={5}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Card
                          sx={{
                            boxShadow: '2px 2px 4px 0px #6D88C2',
                            background: '#FEFEFE',
                            border: '4px solid #086BFF66',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            padding: 2,
                            flexDirection: 'column',
                            gap: 2,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 16,
                              fontWeight: 600,
                              paddingY: 0,
                              paddingX: 3,
                              fontFamily: 'Work Sans,sans-serif',
                              color: '#086BFF',
                            }}
                          >
                            Details
                          </Typography>
                          <Grid container spacing={1}>
                            <Grid item xs={12} md={6}>
                              <Typography
                                sx={{
                                  color: '#162144',
                                  fontWeight: 600,
                                  fontFamily: 'Work Sans,sans-serif',
                                  fontSize: 16,
                                }}
                              >
                                Location :
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Typography
                                sx={{
                                  color: '#000000C2',
                                  fontWeight: 500,
                                  fontFamily: 'Work Sans,sans-serif',
                                  fontSize: 16,
                                }}
                              >
                                {userData?.data?.address?.city}
                              </Typography>
                            </Grid>

                            <Grid item xs={12} md={6}>
                              <Typography
                                sx={{
                                  color: '#162144',
                                  fontWeight: 600,
                                  fontFamily: 'Work Sans,sans-serif',
                                  fontSize: 16,
                                }}
                              >
                                Designation :
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Typography
                                sx={{
                                  color: '#000000C2',
                                  fontWeight: 500,
                                  fontFamily: 'Work Sans,sans-serif',
                                  fontSize: 16,
                                }}
                              >
                                {userData?.data?.designation}
                              </Typography>
                            </Grid>

                            <Grid item xs={12} md={6}>
                              <Typography
                                sx={{
                                  color: '#162144',
                                  fontWeight: 600,
                                  fontFamily: 'Work Sans,sans-serif',
                                  fontSize: 16,
                                }}
                              >
                                Date of Applied :
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Typography
                                sx={{
                                  color: '#000000C2',
                                  fontWeight: 500,
                                  fontFamily: 'Work Sans,sans-serif',
                                  fontSize: 16,
                                }}
                              >
                                {fDate(userData?.data?.date_applied)}
                              </Typography>
                            </Grid>

                            <Grid item xs={12} md={6}>
                              <Typography
                                sx={{
                                  color: '#162144',
                                  fontWeight: 600,
                                  fontFamily: 'Work Sans,sans-serif',
                                  fontSize: 16,
                                }}
                              >
                                Experience :
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Typography
                                sx={{
                                  color: '#000000C2',
                                  fontWeight: 500,
                                  fontFamily: 'Work Sans,sans-serif',
                                  fontSize: 16,
                                }}
                              >
                                6 Years
                              </Typography>
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                      <Grid item xs={12}>
                        <Card
                          sx={{
                            boxShadow: '2px 2px 4px 0px #6D88C2',
                            background: '#FEFEFE',
                            border: '4px solid #086BFF66',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            padding: 2,
                            flexDirection: 'column',
                            gap: 2,
                          }}
                        >
                          <Button
                            variant="contained"
                            sx={{
                              borderRadius: 1,
                              background: '#086BFF',
                              fontSize: 16,
                              fontWeight: 600,
                              paddingY: 0,
                              paddingX: 3,
                              fontFamily: 'Work Sans,sans-serif',
                            }}
                          >
                            + Follow
                          </Button>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <Box
                              sx={{
                                paddingY: 2,
                                paddingX: 3,
                                textAlign: 'center',
                                boxShadow: '0px 4px 4px 0px #00000040',
                              }}
                            >
                              <Typography
                                sx={{
                                  fontFamily: 'Work Sans,sans-serif',
                                  fontWeight: 500,
                                  fontSize: 20,
                                  color: '#000000C2',
                                }}
                              >
                                Follower
                              </Typography>
                              <Typography
                                sx={{
                                  fontFamily: 'Work Sans,sans-serif',
                                  fontWeight: 500,
                                  fontSize: 20,
                                  color: '#000000C2',
                                }}
                              >
                                {userData?.data?.follower}
                              </Typography>
                            </Box>
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <Box
                              sx={{
                                paddingY: 2,
                                paddingX: 3,
                                textAlign: 'center',
                                boxShadow: '0px 4px 4px 0px #00000040',
                              }}
                            >
                              <Typography
                                sx={{
                                  fontFamily: 'Work Sans,sans-serif',
                                  fontWeight: 500,
                                  fontSize: 20,
                                  color: '#000000C2',
                                }}
                              >
                                Following
                              </Typography>
                              <Typography
                                sx={{
                                  fontFamily: 'Work Sans,sans-serif',
                                  fontWeight: 500,
                                  fontSize: 20,
                                  color: '#000000C2',
                                }}
                              >
                                {userData?.data?.following}
                              </Typography>
                            </Box>
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
              {/* // )}  */}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

CandidateDetails.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Candidate Detail', href: '#' },
    ]}
    title="Candidate Detail"
  >
    {page}
  </DashboardLayout>
);

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});
export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  return { props: { id: params?.slug } };
};

export default CandidateDetails;
