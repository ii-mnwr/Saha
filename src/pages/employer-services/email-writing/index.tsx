/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import Head from 'next/head';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useSettingsContext } from 'src/components/settings';
import { Box, Card, Container, Divider, Typography } from '@mui/material';
import { emailTemplates } from 'src/utils/constData';
import WelcomeEmailTemplateMemo from 'src/components/EmployerServicesCompo/EmailWritingCompo/WelcomeEmailTemplate';
import ContactFormCompo from 'src/components/EmployerServicesCompo/EmailWritingCompo/ContactFormCompo';

EmailWriting.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Employer Services', href: '#' },
      { name: 'Professional Email Writing', href: '#' },
    ]}
    title="Professional Email Writing"
  >
    {page}
  </DashboardLayout>
);

export default function EmailWriting() {
  const { themeStretch } = useSettingsContext();

  const [message, setMessage] = useState<any>(
    emailTemplates?.length > 0 ? emailTemplates[0] : null
  );

  console.log('message', message);

  return (
    <>
      <Head>
        <title>Professional Email Writing</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ padding: 3 }}>
          {/* <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography
              sx={{
                fontWeight: 700,
                fontFamily: 'Work Sans,sans-serif',
                color: '#086BFF',
                fontSize: 20,
              }}
            >
              Professional Email Writing
            </Typography>
            <Button variant="contained" onClick={handleOpenModal}>
              Email
            </Button>
          </Box>
          <Divider sx={{ my: 2 }} /> */}
          <Typography
            sx={{
              fontFamily: 'Work Sans,sans-serif',
              color: '#85B6FF',
              fontSize: 20,
              fontWeight: 700,
            }}
            textAlign="center"
          >
            Write the perfect Professional Email for any position in seconds.
          </Typography>

          <WelcomeEmailTemplateMemo message={message} />

          {/* <ContactForm /> */}
          <ContactFormCompo />
        </Card>
      </Container>
    </>
  );
}
