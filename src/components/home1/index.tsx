import React from 'react';
import { AboutPage } from 'src/components/commonComponents/AboutUS';
import { Box } from '@mui/material';
import CompanyHelped from 'src/components/commonComponents/CompanyHelped';
import Header from 'src/layouts/layout/header/Header';
import Footer from 'src/layouts/dashboard/footer';
import { useAuthContext } from 'src/auth/useAuthContext';
import UserHeader from 'src/layouts/dashboard/header/Header';
import { ServiceDepartment } from './ServiceDepartment';
import { RecentlyUpdatedJobs } from './RecentlyUpdatedJobs';
import { Testimonials } from './Testimonials';
import { Achivements } from './Achivements';
import { FindCareer } from './FindCareer';

const Home1 = () => {
  const { user } = useAuthContext();

  <>
    {user ? <UserHeader /> : <Header isOffset />}
    <Box>
      <FindCareer />
      <ServiceDepartment />
      <Box
        sx={{
          background: '#6D88C24D',
          paddingY: 8,
          display: 'flex',
          flexDirection: 'column',
        }}
        gap={4}
      >
        <Box paddingX={{ xs: 2, md: 8 }}>
          <AboutPage />
        </Box>
        <CompanyHelped />
      </Box>
      <RecentlyUpdatedJobs />
      <Testimonials />
      <Achivements />
      <Footer />
    </Box>
  </>;
};

export default Home1;
