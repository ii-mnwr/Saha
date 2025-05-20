import React from 'react';
import Head from 'next/head';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useSettingsContext } from 'src/components/settings';
import { Box, Card, Container, Divider, Grid, Pagination, Typography } from '@mui/material';
import TestimonialCard from 'src/components/feedbackCard/FeedbackCard';
import { useRouter } from 'next/router';
import { useGetAllFeedbacks } from 'src/hooks/useFeedback';
import DataNotFound from 'src/components/DataNotFound';
import SkeletonHorizontalItem from 'src/components/skeleton/SkeletonHorizontalItem';

Feedback.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Feedback', href: '#' },
    ]}
    title="Feedback"
  >
    {page}
  </DashboardLayout>
);

export default function Feedback({ isAdmin = false }: any) {
  const route = useRouter();

  const { themeStretch } = useSettingsContext();

  const { getAllFeedback, page, setPage, isLoading } = useGetAllFeedbacks();

  return (
    <>
      <Head>
        <title>Feedback</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ padding: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography
              sx={{
                fontWeight: 700,
                fontFamily: 'Work Sans,sans-serif',
                color: '#086BFF',
                fontSize: 20,
              }}
            >
              Review
            </Typography>
            {!isAdmin && (
              <Box onClick={() => route.push('/candidate/feedback/create')}>
                <img alt="" src="/assets/FEEDBACK.svg" style={{ cursor: 'pointer' }} />
              </Box>
            )}
          </Box>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            {getAllFeedback?.data?.length === 0 && !isLoading && (
              <Grid item xs={11}>
                <DataNotFound />
              </Grid>
            )}{' '}
            {isLoading
              ? [...Array(12)]?.map((index: number) => (
                  <Grid item xs={12}>
                    <SkeletonHorizontalItem key={index} />
                  </Grid>
                ))
              : getAllFeedback?.data?.map((item: any) => (
                  <Grid item xs={12}>
                    <TestimonialCard item={item} />
                  </Grid>
                ))}
          </Grid>
          <Box display="flex" justifyContent="center" mt={2}>
            {getAllFeedback?.data?.length > 0 && (
              <Pagination
                shape="circular"
                count={Math.ceil((getAllFeedback?.pagination?.count || 0) / 10)}
                page={page}
                onChange={(event: React.ChangeEvent<unknown> | null, newPage: number) => {
                  setPage(newPage);
                }}
              />
            )}
          </Box>
        </Card>
      </Container>
    </>
  );
}
