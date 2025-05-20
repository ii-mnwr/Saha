import React from 'react';
import Head from 'next/head';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useSettingsContext } from 'src/components/settings';
import { Box, Button, Card, CardHeader, Container, Divider, Grid, Typography } from '@mui/material';
import FormProvider from 'src/components/hook-form/FormProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { RHFTextField } from 'src/components/hook-form';

type FormValuesProps = {};

const OPTIONS = [
  { value: 'option 1', label: 'Option 1' },
  { value: 'option 2', label: 'Option 2' },
  { value: 'option 3', label: 'Option 3' },
  { value: 'option 4', label: 'Option 4' },
  { value: 'option 5', label: 'Option 5' },
  { value: 'option 6', label: 'Option 6' },
  { value: 'option 7', label: 'Option 7' },
  { value: 'option 8', label: 'Option 8' },
];

GenerateJobDescription.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Employer Services', href: '#' },
      { name: 'Generate Job Description', href: '#' },
    ]}
    title="Generate Job Description"
  >
    {page}
  </DashboardLayout>
);

export default function GenerateJobDescription() {
  const { themeStretch } = useSettingsContext();

  const defaultValues = {};

  const schema = Yup.object().shape({});

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = () => {};

  return (
    <>
      <Head>
        <title>Generate Job Description</title>
      </Head>
      <Container maxWidth={false} disableGutters>
        <Card
          sx={{
            padding: 3,
          }}
        >
          <CardHeader
            sx={{
              p: 0,
              mb: 3,
              fontWeight: 700,
              fontFamily: 'Work Sans,sans-serif',
              color: '#086BFF',
              fontSize: 20,
            }}
            title="Job Description Generator"
          />
          <Divider sx={{ mb: 3 }} />
          {/* <Typography
            textAlign="center"
            sx={{
              mb: 2,
              color: '#85B6FF',
              fontFamily: 'Work Sans,sans-serif',
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            Create the perfect job description for any position in seconds.
          </Typography> */}
          <Box
            sx={{
              position: 'relative',
              width: '100%', // Set an explicit width
              borderRadius: 2,
              overflow: 'hidden', // Ensure the border radius affects the inner elements
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: { xs: '100%', lg: '60%', xl: '70%' },
                height: '100%',
                backgroundImage: 'url(/assets/generateJobDesImg.png)',
                backgroundSize: { xs: 'contain', lg: 'cover' },
                backgroundPosition: { xs: 'top', lg: 'center' },
                opacity: 0.2,
                zIndex: 1, // Background layer
              }}
            />
            <Box
              sx={{
                position: 'relative',
                paddingX: { lg: 3 },
                paddingY: 4,
                zIndex: 2, // Content layer
              }}
            >
              <Grid
                container
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingX: { xl: 10 },
                }}
              >
                <Grid item xs={12} lg={6}>
                  <Typography
                    sx={{
                      color: '#000',
                      fontFamily: 'Work Sans,sans-serif',
                      fontSize: { xs: 25, md: 35 },
                      fontWeight: 600,
                      lineHeight: 1.2,
                    }}
                  >
                    Generate a job description for any job in less than 60 seconds
                  </Typography>
                  <Typography
                    sx={{
                      mt: 2,
                      color: '#000',
                      fontWeight: 400,
                      fontSize: 16,
                      fontFamily: 'Work Sans,sans-serif',
                    }}
                  >
                    Add the details in the form on this page and generate a job description for any
                    job, unique to your company.
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Container maxWidth="sm">
                    <Card
                      sx={{
                        p: 3,
                        border: '3px solid #086BFF4D',
                        boxShadow: '0px 4px 9px 0px #00000040',
                      }}
                    >
                      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <Grid container gap={1}>
                          <Grid item xs={12}>
                            <RHFTextField
                              formlabel="Job Title"
                              hiddenLabel
                              name="job_title"
                              placeholder="Joyee Len"
                              border="1px solid #086BFF"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <RHFTextField
                              formlabel="Company"
                              hiddenLabel
                              name="company"
                              placeholder="Joyee Len"
                              border="1px solid #086BFF"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <RHFTextField
                              formlabel="Industry"
                              hiddenLabel
                              name="industry"
                              placeholder="Indian"
                              border="1px solid #086BFF"
                            />
                          </Grid>
                        </Grid>
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                          Generate Job Description
                        </Button>
                      </FormProvider>
                    </Card>
                  </Container>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Card>
      </Container>
    </>
  );
}
