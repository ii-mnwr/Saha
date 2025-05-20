/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Head from 'next/head';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useSettingsContext } from 'src/components/settings';
import { Button, Card, Container, Grid, IconButton, InputAdornment } from '@mui/material';
import FormProvider from 'src/components/hook-form/FormProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import Iconify from 'src/components/iconify';
import axios from 'src/utils/axios';

type FormValuesProps = {};

CreateCompany.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      { name: 'Home', href: '#' },
      { name: 'Create Company', href: '#' },
    ]}
    title="Create New Company"
  >
    {page}
  </DashboardLayout>
);

export default function CreateCompany() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfPassword, setShowConfPassword] = useState<boolean>(false);
  const { themeStretch } = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    user_name: '',
    email: '',
    password: '',
    phone_number: '',
    confirm_password: '',
    company_name: '',
    company_location: '',
    designation: '',
    role_id: '',
    afterSubmit: '',
  };

  const schema = Yup.object().shape({
    user_name: Yup.string().required('Username is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
    // role_id: Yup.string().required('Role is required'),
    phone_number: Yup.string().required('Mobile no is required'),
    company_name: Yup.string().required('Company name is required'),
    company_location: Yup.string().required('Company Location is required'),
    designation: Yup.string().required('Designation is required'),
    confirm_password: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset, setError } = methods;

  const onSubmit = async (data: any) => {
    console.log('data');
    const formData = new FormData();
    formData.append('email', data?.email);
    formData.append('phone_number', data?.phone_number);
    formData.append('user_name', data?.user_name);
    formData.append('password', data?.password);
    formData.append('company_name', data?.company_name);
    formData.append('company_location', data?.company_location);
    formData.append('designation', data?.designation);
    formData.append('role_id', '2');
    try {
      await axios.post('/auth/register', formData);

      enqueueSnackbar('company registered successfully', {
        variant: 'success',
      });
      reset();
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error?.message || 'Failed to create', {
        variant: 'error',
      });
      // reset();
    }
  };

  return (
    <>
      <Head>
        <title>Create Company</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ padding: 3 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container gap={1}>
              <Grid item xs={12}>
                <RHFTextField
                  formlabel="User Name:"
                  hiddenLabel
                  name="user_name"
                  placeholder="Enter Your User Name"
                  required
                  bgColor="#086BFF1F"
                  border="transparent"
                />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField
                  formlabel="Email:"
                  hiddenLabel
                  name="email"
                  placeholder="Enter Your Email Address"
                  required
                  bgColor="#086BFF1F"
                  border="transparent"
                />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField
                  formlabel="Password:"
                  hiddenLabel
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Your Password"
                  required
                  bgColor="#086BFF1F"
                  border="transparent"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField
                  formlabel="Confirm Password:"
                  hiddenLabel
                  type={showConfPassword ? 'text' : 'password'}
                  name="confirm_password"
                  placeholder="Re-Enter Your Password"
                  required
                  bgColor="#086BFF1F"
                  border="transparent"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfPassword(!showConfPassword)}
                          edge="end"
                        >
                          <Iconify icon={showConfPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField
                  formlabel="Mobile Number:"
                  hiddenLabel
                  type="number"
                  name="phone_number"
                  placeholder="+91 987654321"
                  required
                  bgColor="#086BFF1F"
                  border="transparent"
                />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField
                  formlabel="Company Name:"
                  hiddenLabel
                  name="company_name"
                  placeholder="Enter Your Company Name "
                  required
                  bgColor="#086BFF1F"
                  border="transparent"
                />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField
                  formlabel="Company Location:"
                  hiddenLabel
                  name="company_location"
                  placeholder="Enter Location"
                  required
                  bgColor="#086BFF1F"
                  border="transparent"
                />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField
                  formlabel="Designation at company:"
                  hiddenLabel
                  name="designation"
                  placeholder="Designation Name"
                  required
                  bgColor="#086BFF1F"
                  border="transparent"
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Submit
            </Button>
          </FormProvider>
        </Card>
      </Container>
    </>
  );
}
