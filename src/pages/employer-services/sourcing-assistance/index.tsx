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
import { LoadingButton } from '@mui/lab';
import { position } from 'stylis';
import { useEmployeeServices } from 'src/hooks/useEmployeeServices';

type FormValuesProps = {};

SourcingAssistance.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Employer Services', href: '#' },
      { name: 'Sourcing Assistance', href: '#' },
    ]}
    title="Sourcing Assistance"
  >
    {page}
  </DashboardLayout>
);

export default function SourcingAssistance() {
  const { sourcingAssistanceUsePost, callSourcingAssistanceApi } = useEmployeeServices();
  const { themeStretch } = useSettingsContext();

  const defaultValues = {
    positionName: '',
    companyName: '',
    nationality: '',
    jobLocation: '',
    salary: '',
    responsibilities: '',
    otherDetails: '',
  };

  const schema = Yup.object().shape({
    positionName: Yup.string().required('Position is required'),
    companyName: Yup.string().required('Company name is required'),
  });

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

  const onSubmit = (data: any) => {
    console.log('SourcingAssistance', data);
    callSourcingAssistanceApi(data);
  };

  return (
    <>
      <Head>
        <title>Sourcing Assistance</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card
          sx={{
            padding: 3,
          }}
        >
          <CardHeader
            sx={{
              p: 0,
              fontWeight: 700,
              fontFamily: 'Work Sans,sans-serif',
              color: '#086BFF',
              fontSize: 20,
              mb: 1,
            }}
            title="Sourcing Assistance"
          />
          <Divider sx={{ mb: 3 }} />
          <Container maxWidth="xl">
            <Typography
              sx={{
                textAlign: 'center',
                fontFamily: 'Work Sans,sans-serif',
                fontSize: 20,
                fontWeight: 700,
                color: '#85B6FF',
              }}
            >
              Fill This Form For better Communication and Hiring
            </Typography>
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
                  width: '100%',
                  height: '70%',
                  backgroundImage: 'url(/assets/sourcingAssistance.png)',
                  backgroundSize: { xs: 'contain', lg: 'contain' },
                  backgroundPosition: { xs: 'top', lg: 'center' },
                  backgroundRepeat: 'no-repeat',
                  opacity: 0.6,
                  zIndex: 1, // Background layer
                }}
              />
              <Box
                sx={{
                  position: 'relative',
                  paddingX: { lg: 3 },
                  zIndex: 2, // Content layer
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Card sx={{ p: 3, bgcolor: 'rgba(218, 219, 219, 0.87)', mt: 2, maxWidth: 500 }}>
                  <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container gap={1}>
                      <Grid item xs={12}>
                        <RHFTextField
                          hiddenLabel
                          name="positionName"
                          formlabel="Position Name"
                          placeholder="Sr. Developer"
                          // sx={{ bgcolor: 'rgba(8,107,255, 12%)' }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <RHFTextField
                          hiddenLabel
                          name="companyName"
                          placeholder="Talents reach"
                          formlabel="Company name"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <RHFTextField
                          formlabel="Nationality"
                          hiddenLabel
                          name="nationality"
                          placeholder="Indian"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <RHFTextField
                          formlabel="Job Location"
                          hiddenLabel
                          name="jobLocation"
                          placeholder="London"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <RHFTextField
                          formlabel="Salary"
                          hiddenLabel
                          name="salary"
                          placeholder="$100k to $200k"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <RHFTextField
                          formlabel="Main Tasks / Responsibilities"
                          hiddenLabel
                          name="responsibilities"
                          placeholder="Manager"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <RHFTextField
                          formlabel="Other Details"
                          hiddenLabel
                          name="otherDetails"
                          placeholder="Other..."
                        />
                      </Grid>
                    </Grid>
                    <LoadingButton
                      fullWidth
                      type="submit"
                      variant="contained"
                      loading={sourcingAssistanceUsePost?.isLoading}
                      sx={{
                        mt: 2,
                        bgcolor: '#6D88C2',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: 20,
                        fontFamily: 'Outfit,sans-serif',
                        py: 2,
                        borderRadius: 3,
                      }}
                    >
                      Submit
                    </LoadingButton>
                  </FormProvider>
                </Card>
              </Box>
            </Box>
          </Container>
        </Card>
      </Container>
    </>
  );
}
