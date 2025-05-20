import React from 'react';
import Head from 'next/head';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useSettingsContext } from 'src/components/settings';
import { Box, CardMedia, Container, Typography } from '@mui/material';

PostJob.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Quiz', href: '#' },
    ]}
    title="Quiz"
  >
    {page}
  </DashboardLayout>
);

export default function PostJob() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>All Applicants</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box sx={{ position: 'relative', display: 'inline-block', width: '100%', height: '100%' }}>
          {/* Image */}
          <CardMedia
            component="img"
            image="/assets/quiz_img.jpeg"
            alt="Placeholder image"
            sx={{
              width: '100%',
              backgroundPosition: 'center',
              backgroundSize: 'contain',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#2D3D6366', // The color overlay with transparency
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              backgroundImage: `url('/assets/quiz_curve.png')`,
              backgroundRepeat: 'no-repeat',

              backgroundSize: 'cover',
              // height: '25%',
              paddingY: { xs: 3, md: 5, xl: 8 },
            }}
          >
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -25%)',
                  color: '#85B6FF',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: { xs: 2, md: 3 },
                }}
              >
                <Box
                  component="img"
                  src="/assets/talent.svg"
                  alt="talent"
                  sx={{
                    backgroundSize: 'contain',
                    width: { xs: '15%', xl: '20%' },
                    height: 'auto',
                  }}
                />
                <Typography
                  fontSize={{ xs: 12, md: 16, lg: 20 }}
                  fontWeight={900}
                  fontFamily="system-ui,sans-serif"
                  textTransform="uppercase"
                >
                  talent reach
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
