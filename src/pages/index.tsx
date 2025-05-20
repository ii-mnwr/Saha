/* eslint-disable no-nested-ternary */
import { Box } from '@mui/material';
import Header from 'src/layouts/layout/header';
import CompanyHelped from 'src/components/commonComponents/CompanyHelped';
import Footer from 'src/layouts/dashboard/footer/Footer';
import AboutUs from 'src/components/commonComponents/AboutUS';
import Head from 'next/head';
import { FindCareer } from 'src/components/home1/FindCareer';
import { ServiceDepartment } from 'src/components/home1/ServiceDepartment';
import { RecentlyUpdatedJobs } from 'src/components/home1/RecentlyUpdatedJobs';
import { Testimonials } from 'src/components/home1/Testimonials';
import { Achivements } from 'src/components/home1/Achivements';
import UserHeader from 'src/layouts/dashboard/header/Header';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useState } from 'react';
import Layout from 'src/layouts/layout';

Home.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default function Home() {
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Box>
        <FindCareer />
        <ServiceDepartment />
        <RecentlyUpdatedJobs />
        <Achivements />       
        {/* <Box
          sx={{
            background: '#6D88C24D',
            paddingY: 8,
            display: 'flex',
            flexDirection: 'column',
            }}
            gap={4}
            > */}
        <AboutUs isHomePage />
        {/* <Box paddingX={{ xs: 2, md: 8 }}>
          </Box> */}
        <CompanyHelped />
        {/* </Box> */}
          <Testimonials />
        <Footer />
      </Box>
    </>
  );
}
