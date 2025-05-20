import React from 'react';
import Head from 'next/head';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useSettingsContext } from 'src/components/settings';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  Pagination,
  Typography,
} from '@mui/material';
import FormProvider from 'src/components/hook-form/FormProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { countries } from 'src/assets/data';
import ProfileCard from 'src/components/all-applicants/applicantCard';
import CustomBreadcrumbs from 'src/components/custom-components/CustomBreadcrumbs';
import { useApplicants } from 'src/hooks/useApplicants';
import DataNotFound from 'src/components/DataNotFound';

ShortListResume.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'ShortListed Resume', href: '#' },
    ]}
    title="ShortListed Resume"
  >
    {page}
  </DashboardLayout>
);

export default function ShortListResume() {
  const { themeStretch } = useSettingsContext();

  const { getAllApplicants: shorlistedApplicants, setFilter } = useApplicants({
    status: 'Shortlisted',
    limit: 10,
    page: 1,
    search: '',
    sort: 'id:desc',
  });

  console.log('shorlistedApplicants', shorlistedApplicants);

  return (
    <>
      <Head>
        <title>Shortlisted resume</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ padding: 3 }}>
          <CardHeader
            sx={{
              p: 0,

              fontWeight: 700,
              fontFamily: 'Work Sans,sans-serif',
              color: '#086BFF',
              fontSize: 20,
            }}
            title="ShortListed Candidates"
          />
          <Divider sx={{ my: 2 }} />
          {shorlistedApplicants?.data?.data?.length !== 0 && (
            <Typography
              fontWeight={700}
              fontFamily="Work Sans,sans-serif"
              color="#000"
              fontSize={{ xs: 18, md: 20 }}
              mb={2}
            >
              Updated New Candidates
            </Typography>
          )}

          {shorlistedApplicants?.isLoading === false &&
          (shorlistedApplicants?.data?.data?.length === 0 ||
            shorlistedApplicants?.data === undefined) ? (
            <DataNotFound />
          ) : (
            <>
              {' '}
              <Grid container spacing={3}>
                {shorlistedApplicants?.data?.data?.slice(0, 2)?.map((item: any, i: number) => {
                  const data = {
                    img: item?.candidate?.profile_image_path,
                    designation: item?.candidate?.designation,
                    name: item?.candidate?.first_name
                      ? `${item?.candidate?.first_name} ${item?.candidate?.last_name}`
                      : '',
                    job_type: item?.job_type,
                    // location: item?.candidate?.address?.city,
                    id: item?.candidate?.id,
                    job_id: item?.job_id,
                    createdAt: item?.createdAt,
                    user_name: item?.candidate?.user_name,
                    updatedAt: item?.updatedAt,
                    appliedAt: item?.appliedAt,
                    applicationId: item?.id,
                    location: item?.job?.location,
                    title: item?.job?.title,
                  };
                  console.log('data', item);
                  return (
                    <Grid item xs={12} xl={6}>
                      <ProfileCard
                        item={data}
                        id={item?.candidate?.id}
                        refetch={shorlistedApplicants?.refetch}
                      />
                    </Grid>
                  );
                })}
              </Grid>
              <Divider sx={{ my: 3 }} />
              <Typography
                fontWeight={700}
                fontFamily="Work Sans,sans-serif"
                color="#85B6FF"
                fontSize={{ xs: 18, md: 20 }}
                mb={2}
              >
                All Shortlisted Candidates
              </Typography>
              <Grid container spacing={3}>
                {shorlistedApplicants?.data?.data?.map((item: any, i: number) => {
                  const data = {
                    img: item?.candidate?.profile_image_path,
                    designation: item?.candidate?.designation,
                    name: item?.candidate?.first_name
                      ? `${item?.candidate?.first_name} ${item?.candidate?.last_name}`
                      : '',
                    job_type: item?.job_type,
                    createdAt: item?.createdAt,
                    // location: item?.candidate?.address?.city,
                    user_name: item?.candidate?.user_name,
                    updatedAt: item?.updatedAt,
                    appliedAt: item?.appliedAt,
                    applicationId: item?.id,
                    location: item?.job?.location,
                    title: item?.job?.title,
                  };
                  return (
                    <Grid item xs={12} xl={6}>
                      <ProfileCard
                        item={data}
                        id={item?.candidate?.id}
                        refetch={shorlistedApplicants?.refetch}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}
          <Box display="flex" width="100%" justifyContent="center" my={2}>
            <Pagination
              shape="circular"
              count={Math.ceil((shorlistedApplicants?.data?.pagination?.count || 0) / 10)}
              onChange={(e: any, page: number) => {
                setFilter((data) => ({
                  ...data,
                  page,
                }));
              }}
            />
          </Box>
        </Card>
      </Container>
    </>
  );
}
