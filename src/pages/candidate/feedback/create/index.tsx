import React, { useState } from 'react';
import Head from 'next/head';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useSettingsContext } from 'src/components/settings';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import TestimonialCard from 'src/components/feedbackCard/FeedbackCard';
import { useRouter } from 'next/router';
import usePostRequest from 'src/hooks/usePost';
import { useSnackbar } from 'src/components/snackbar';
import { LoadingButton } from '@mui/lab';
import { RHFTextField } from 'src/components/hook-form';
import { useGetAllFeedbacks } from 'src/hooks/useFeedback';

Feedback.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Feedback', href: '#' },
    ]}
    title="Write Feedback"
  >
    {page}
  </DashboardLayout>
);

export default function Feedback() {
  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [usability, setUsability] = useState(0);
  const [service, setService] = useState(0);
  const [recommendation, setRecommendation] = useState(0);

  // console.log('review', rating, usability, service, title, review);

  const route = useRouter();

  const { themeStretch } = useSettingsContext();

  const createFeedback = usePostRequest();

  const handleFeedback = () => {
    const url = '/feedbacks/create';

    createFeedback.mutate(
      [
        url,
        {
          user_rating: rating,
          system_rating: usability,
          system_service: service,
          recommend_others: recommendation,
          comment: review,
          title: title,
        },
      ],
      {
        onSuccess: (response: any) => {
          // Handle success
          enqueueSnackbar(response?.message || 'Saved successfully', {
            variant: 'success',
          });
        },
        onError: (error: any) => {
          // Handle error
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      }
    );
  };

  const { isFeedbackSent } = useGetAllFeedbacks();

  return (
    <>
      <Head>
        <title>Create Feedback</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card
          sx={{
            boxShadow: '2px 2px 4px 0px #6D88C2',
            background: '#FEFEFE',
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              color: '#086BFF',
              fontFamily: 'Work Sans,sans-serif',
              fontSize: 20,
              fontWeight: 700,
              paddingY: 1.5,
              paddingX: 4,
              bgcolor: '#79A4FF73',
            }}
          >
            {/* <Typography variant="h6" gutterBottom sx={{ paddingTop: 2 }}>
              Feedback Creation Form
            </Typography> */}
            {/* <Box sx={{ cursor: 'pointer' }} onClick={() => route.back()}>
              <img alt="" src="/assets/home.svg" />
            </Box> */}
          </Box>
          {/* <Divider sx={{ my: 2 }} /> */}
          <CardContent
            sx={{
              textAlign: 'center',
              // margin: '0 1rem',
              backgroundImage: `url(/assets/feedbackBGImage.png)`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              minHeight: '550px',
            }}
          >
            {isFeedbackSent?.data?.isSent === true ? (
              <Typography sx={{ mt: 5 }} variant="h3" color="#fff">
                Thank you for your feedback
              </Typography>
            ) : (
              <Container
                maxWidth="md"
                sx={{
                  py: 5,
                  bgcolor: 'background.paper',
                  border: '1px solid #ccc',
                  borderRadius: 2,
                }}
              >
                <Box
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  gap={1}
                  sx={{ flexDirection: 'column' }}
                >
                  <Typography fontSize={16} fontWeight={600} fontFamily="Work Sans, sans-serif">
                    Title <span style={{ color: 'red' }}> *</span>
                  </Typography>

                  <TextField
                    fullWidth
                    multiline
                    placeholder="Write Feedback Title Here"
                    value={title}
                    variant="outlined"
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{
                      mb: 3,
                      '.MuiOutlinedInput-root': {
                        background: '#086BFF1F',
                        borderRadius: 1,
                        fontWeight: 400,
                        fontFamily: 'Work Sans,sans-serif',
                        '.MuiOutlinedInput-notchedOutline': {
                          border: 'transparent',
                        },
                      },
                    }}
                  />
                </Box>

                {/* <TextField
                fullWidth
                label="Title"
                sx={{ mb: 2 }}
                value={title}
                variant="outlined"
                onChange={(e) => setTitle(e.target.value)}
              /> */}

                <Box
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  sx={{ mb: 3, paddingRight: 20 }}
                  //  sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 5 }}
                >
                  <Typography component="legend" fontSize={16} fontWeight={700}>
                    System Service Experience:
                  </Typography>
                  <Rating
                    name="simple-controlled"
                    value={service}
                    onChange={(event, newValue: any) => {
                      setService(newValue);
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  sx={{ mb: 3, paddingRight: 20 }}
                >
                  <Typography component="legend" fontSize={16} fontWeight={700}>
                    Overall User Rating:
                  </Typography>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue: any) => {
                      setRating(newValue);
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  sx={{ mb: 3, paddingRight: 20 }}
                >
                  <Typography component="legend" fontSize={16} fontWeight={700}>
                    System User Friendly:
                  </Typography>
                  <Rating
                    name="simple-controlled"
                    value={usability}
                    onChange={(event, newValue: any) => {
                      setUsability(newValue);
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  sx={{ mb: 3, paddingRight: 20 }}
                >
                  <Typography component="legend" fontSize={16} fontWeight={700}>
                    Likely to Recommend others:
                  </Typography>
                  <Rating
                    name="simple-controlled"
                    value={recommendation}
                    onChange={(event, newValue: any) => {
                      setRecommendation(newValue);
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  gap={1}
                  sx={{ flexDirection: 'column' }}
                >
                  <Typography fontSize={16} fontWeight={600} fontFamily="Work Sans, sans-serif">
                    Review <span style={{ color: 'red' }}> *</span>
                  </Typography>
                  <TextField
                    rows={4}
                    fullWidth
                    multiline
                    placeholder="Write Your Review Here"
                    value={review}
                    variant="outlined"
                    onChange={(e) => setReview(e.target.value)}
                    sx={{
                      mb: 2,
                      '.MuiOutlinedInput-root': {
                        background: '#086BFF1F',
                        borderRadius: 1,
                        fontWeight: 400,
                        fontFamily: 'Work Sans,sans-serif',
                        '.MuiOutlinedInput-notchedOutline': {
                          border: 'transparent',
                        },
                      },
                    }}
                  />
                </Box>
                <LoadingButton
                  color="primary"
                  variant="contained"
                  sx={{
                    mt: 3,
                    bgcolor: '#85B6FF',
                    color: '#000000',
                    fontWeight: 500,
                    fontSize: 14,
                    fontFamily: 'Work Sans,sans-serif',
                    ':hover': {
                      bgcolor: '#85B6FF',
                    },
                  }}
                  disabled={
                    review.length <= 0 ||
                    title?.length <= 0 ||
                    isFeedbackSent?.data?.isSent === true
                  }
                  onClick={() => handleFeedback()}
                  loading={createFeedback.isLoading}
                >
                  {isFeedbackSent?.data?.isSent === true ? 'Submitted' : 'Submit Now'}
                </LoadingButton>
              </Container>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
