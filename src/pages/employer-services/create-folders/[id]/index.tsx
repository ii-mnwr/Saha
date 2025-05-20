import { Box, Card, Container, Divider, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import DataNotFound from 'src/components/DataNotFound';
import { useSettingsContext } from 'src/components/settings';
import { HOST_URL } from 'src/config-global';
import { useGetFolderDetails } from 'src/hooks/useEmployeeServices';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import axiosInstance from 'src/utils/axios';

FolderById.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Employer Services', href: '#' },
      { name: 'Create folder', href: '#' },
    ]}
    title="Create Folder"
  >
    {page}
  </DashboardLayout>
);

export default function FolderById() {
  const { themeStretch } = useSettingsContext();
  const router = useRouter();
  const { id } = router.query;

  console.log('id', id);

  const { getFolderDetails } = useGetFolderDetails(id);

  console.log('getFolderDetails', getFolderDetails);

  const downloadFile = (file: any) => {
    const link = document.createElement('a');
    link.href = file.path; // The file path from the object
    link.download = file.name; // The file name you want to give
    link.target = '_blank'; // Ensures the download opens in a new tab or starts directly
    link.click();
  };
  //   console.log('getFolderDetails', getFolderDetails?.data?.data?.name);

  return (
    <>
      <Head>
        <title>Folder Data</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              backgroundColor: '#79A4FF73',
              paddingY: 2,
              paddingX: 3,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontFamily: 'Work Sans,sans-serif',
                color: '#086BFF',
                fontSize: 20,
              }}
            >
              Folder Details of {getFolderDetails?.data?.data?.name}
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Grid
            container
            spacing={2}
            sx={{
              px: 3,
              py: 2,
            }}
          >
            {(
              // when files of the folder is recieved from Backend data comment in map

              //   getFolderDetails?.data?.data?.files?.map((item: any) => {
              //     console.log('item?.id', item);

              //     return (
              getFolderDetails?.data?.data?.files?.map((item: any) => (
                <Grid item xs={4} md={2}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    sx={{
                      pb: 2,
                    }}
                    onClick={() =>
                      downloadFile({
                        name: item?.name,
                        path: `${HOST_URL}${item?.path}`,
                      })
                    }
                  >
                    <img
                      src="/assets/pdf.svg"
                      alt=""
                      style={{ cursor: 'pointer', maxHeight: '7rem', maxWidth: '7rem' }}
                    />
                    <Typography
                      sx={{
                        color: '#000',
                        fontFamily: 'Work Sans,sans-serif',
                        fontWeight: 700,
                        fontSize: 16,
                        textAlign: 'center',
                        mt: 2,
                      }}
                    >
                      {item?.name}
                    </Typography>
                  </Box>
                </Grid>
              ))
              //     );
              //   }
              //   )
            )}
          </Grid>
        </Card>
      </Container>
    </>
  );
}
