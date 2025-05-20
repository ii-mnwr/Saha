import Image from 'next/image';
import React, { useRef } from 'react';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { Box, Container, Grid} from '@mui/material';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import CustomBreadcrumbs from 'src/components/custom-components/CustomBreadcrumbs';
import { Hero } from 'src/components/candidate/Hero';
import { RecentAppliedJobs } from 'src/components/candidate/RecentAppliedJobs';
import { Profile } from 'src/components/candidate/Profile';
import Head from 'next/head';
import { ProfileAnalytics } from 'src/components/candidate/ProfileAnalytics';
import CandidateQuiz from 'src/components/candidate/CandidateQuiz';
import { RecentlyUpdatedJobs } from 'src/components/home1/RecentlyUpdatedJobs';
import ThemeColorPresets from 'src/components/settings/ThemeColorPresets';
import TalentReachBulletinCard from 'src/components/candidate/TalentReachBulletin';
import { DashboardRecentAppliedJobs } from 'src/components/candidate/DashboardRecentAppliedJobs';


const CandidateDashboard = () => {
  // const cardSubdetails = [
  //   {
  //     icon: <PlaceOutlinedIcon htmlColor="#086BFF" />,
  //     label: 'USA',
  //   },
  //   {
  //     icon: <WatchLaterOutlinedIcon htmlColor="#086BFF" />,
  //     label: 'Full Time',
  //   },
  //   {
  //     icon: (
  //       <Image
  //         src="/assets/emp_dashboard_icon/moneyIcon.png"
  //         alt="money icon"
  //         width={20}
  //         height={20}
  //       />
  //     ),
  //     label: '$20 - $30 /Per Hour',
  //   },
  // ];

  const quizRef = useRef(null);

  const executeScroll = () => {
    if (quizRef) quizRef.current.scrollIntoView();
    
  };

  return (
    <>
      <Head>
        <title>Candidate dashboard</title>
      </Head>
      <Container 
        sx={{
          bgcolor: '#f0f0f0', 
          paddingX: 8,
          borderRadius: 2,
          paddingY: 3,
        }} 
        maxWidth={false} 
        disableGutters>

        <Hero />
        <ProfileAnalytics />
        <Box
          // sx={{
          //   backgroundColor: '#FFFFFF',
          //   paddingX: 4,
          //   paddingY: 3,
          //   marginTop: 2,
          //   borderRadius: 2,
          //   boxShadow: 4,
          // }}
        >
            {/* <Box ref={quizRef}>
              <CandidateQuiz />
            </Box> */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <CandidateQuiz />
              </Grid>
              <Grid item xs={12} md={4}>
                <DashboardRecentAppliedJobs />
              </Grid>
              <Grid item xs={12} md={4}>
                <TalentReachBulletinCard isCandidateDash executeScroll={executeScroll} />
              </Grid>
          </Grid>
          </Box>
        {/* <Profile /> */}
      </Container>
    </>
  );
};

export default CandidateDashboard;

CandidateDashboard.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Dashboard', href: '#' },
    ]}
  >
    {page}
  </DashboardLayout>
);
