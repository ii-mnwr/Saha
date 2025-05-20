import { Box } from '@mui/material';
import React from 'react';
import AboutUs from 'src/components/commonComponents/AboutUS';
import Footer from 'src/layouts/dashboard/footer/Footer';
import Layout from 'src/layouts/layout';

const About_Us = () => {
  return (
    <Box>
      <Box mt={{ xs: 8, md: 8.75 }}>
        <AboutUs />
        <Footer />
      </Box>
    </Box>
  );
};

About_Us.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;
export default About_Us;
