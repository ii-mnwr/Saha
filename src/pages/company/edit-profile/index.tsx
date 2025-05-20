import React, { useCallback, useEffect, useState } from 'react';
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
  MenuItem,
  Typography,
} from '@mui/material';
import FormProvider from 'src/components/hook-form/FormProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { countries } from 'src/assets/data';
import usePostRequest from 'src/hooks/usePost';
import axiosInstance from 'src/utils/axios';
import { useSnackbar } from 'src/components/snackbar';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useQuery } from 'react-query';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import Editor from 'src/components/editor/Editor';
import RHFEditor from 'src/components/hook-form/RHFEditor';
import { ViewIcon } from 'src/theme/overrides/CustomIcons';
import UploadAvatar from 'src/components/upload/UploadAvtar';
import { useRouter } from 'next/router';
import { Backend_Base_URL, HOST_URL } from 'src/config-global';
import { RHFUploadAvatar } from 'src/components/hook-form/RHFUpload';
import { LoadingButton } from '@mui/lab';

const category = [
  'Aerospace and Defence',
  'Consulting',
  'Defence',
  'Energy',
  'Finance',
  'Healthcare',
  'Industry',
  'IT and Management',
  'Manufacturing',
  'Logistics',
  'Real Estate',
  'Retail',
];
type FormValuesProps = {};

const fetchCompanyById = async (id: any) => {
  const response = await axiosInstance.post('/companies/find-by-id', {
    id,
  });
  return response?.data;
};

EditProfile.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Dashboard', href: '#' },
    ]}
    title="Company "
  >
    {page}
  </DashboardLayout>
);

export default function EditProfile() {
  const { push } = useRouter();
  const [avatarUrl, setAvatarUrl] = useState<File | string | null>(null);
  const [profile, setProfile] = useState<File | string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const { user, initialize } = useAuthContext();

  const { themeStretch } = useSettingsContext();

  const defaultValues = {
    name: '',
    email: '',
    contact_number: '',
    alternative_number: '',
    est_since: '',
    team_size: '',
    company_registered_name: '',
    website: '',
    address: '',
    location: '',
    company_category: '',
    about_company: '',
    social_links: {
      facebook_url: '',
      linkedin_url: '',
    },
    profile_image_path: null,
    allow_in_search_and_listing: '',
  };

  const schema = Yup.object().shape({});

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const updateCandidateDetails = usePostRequest<any>();

  console.log('user', user);
  const {
    data: userData,
    isLoading,
    error,
    refetch,
  } = useQuery(
    ['fetchCompanyById', user],
    () => user?.employee_id && fetchCompanyById(user?.employee_id)
  );

  console.log('userData', getValues());

  useEffect(() => {
    if (userData) {
      reset({
        ...userData?.data,
        address: userData?.data?.address?.address1?.toString(),
        profile_image_path: userData?.data?.profile_image_path
          ? `${HOST_URL}${userData?.data?.profile_image_path}`
          : null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const onSubmit = (data: any) => {
    const {
      name,
      email,
      contact_number,
      alternative_number,
      est_since,
      team_size,
      company_registered_name,
      website,
      address,
      location,
      company_category,
      about_company,
      social_links,
      profile_image_path,
      allow_in_search_and_listing,
    } = data || {};
    console.log('🚀 ~ onSubmit ~ company_category:', company_category);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('contact_number', contact_number);
    formData.append('address', JSON.stringify({ address1: address }));
    formData.append('est_since', est_since);
    formData.append('company_category', company_category);
    formData.append('team_size', team_size);
    formData.append('company_registered_name', company_registered_name);
    formData.append('alternative_number', alternative_number);
    formData.append('website', website);
    formData.append('social_links', JSON.stringify(social_links));
    formData.append('about_company', about_company);
    formData.append(
      'profileImage',
      typeof profile_image_path === 'string' && profile_image_path?.includes(Backend_Base_URL)
        ? profile_image_path?.replace(Backend_Base_URL, '')
        : profile_image_path
    );

    // formData.append('allow_in_search_and_listing', allow_in_search_and_listing);
    // formData.append('social_links[0]', { facebook_url: facebook });
    // formData.append('social_links[1]', { linkedin_url: linkedIn });

    const url = '/companies/update';

    updateCandidateDetails.mutate([url, formData], {
      onSuccess: (response: any) => {
        console.log('response', response);
        // Handle success
        enqueueSnackbar(response?.message || 'Reset password email sent successfully', {
          variant: 'success',
        });
        push(`/company/profile/${user?.employee_id}`);
        initialize();
      },
      // eslint-disable-next-line @typescript-eslint/no-shadow
      onError: (error: any) => {
        // Handle error
        console.log('error', error);
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
  };

  const handleDropAvatar = useCallback((acceptedFiles: File[]) => {
    const newFile = acceptedFiles[0];
    setProfile(newFile);
    if (newFile) {
      setAvatarUrl(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      );
    }
  }, []);

  return (
    <>
      <Head>
        <title>Edit company profile</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={4}
            py={2}
            sx={{
              background: '#79A4FF73',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Work Sans,sans-serif',
                fontWeight: 700,
                fontSize: 20,
                color: '#086BFF',
              }}
            >
              Edit Profile Details
            </Typography>
            <Button
              startIcon={<ViewIcon />}
              variant="contained"
              sx={{
                background: '#086BFF',
                color: '#FFF',
                fontWeight: 400,
                fontSize: 14,
                fontFamily: 'Work Sans,sans-serif',
                ':hover': {
                  background: '#086BFF',
                },
              }}
              onClick={() => {
                push(`/company/profile/${user?.employee_id}`);
              }}
            >
              View profile
            </Button>
          </Box>

          <Box sx={{ padding: 3 }}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      padding: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <RHFUploadAvatar name="profile_image_path" />
                    <Typography
                      sx={{
                        color: '#000000',
                        fontWeight: 600,
                        fontFamily: 'Inter,sans-serif',
                        fontSize: 16,
                      }}
                    >
                      Max file size is 1MB, Minimum dimension: 330x300 And Suitable files are .jpg &
                      .png
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ mb: 3 }} variant="fullWidth" />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <RHFTextField
                    formlabel="Full name"
                    hiddenLabel
                    name="name"
                    placeholder="Enter Full Name"
                    // sx={{ bgcolor: 'rgba(8,107,255, 12%)' }}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <RHFTextField
                    formlabel="Email Address"
                    hiddenLabel
                    name="email"
                    placeholder="info@talentsreach.com"
                    // sx={{ bgcolor: 'rgba(8,107,255, 12%)' }}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <RHFTextField
                    formlabel="Contact Number"
                    hiddenLabel
                    name="contact_number"
                    placeholder="+44 7655 897987"
                    // sx={{ bgcolor: 'rgba(8,107,255, 12%)' }}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <RHFTextField
                    formlabel="Alternative Number"
                    hiddenLabel
                    name="alternative_number"
                    placeholder="https://abc.com"
                    // sx={{ bgcolor: 'rgba(8,107,255, 12%)' }}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <RHFTextField
                    formlabel="Est. Since"
                    hiddenLabel
                    name="est_since"
                    placeholder="1986"
                    // sx={{ bgcolor: 'rgba(8,107,255, 12%)' }}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <RHFTextField
                    formlabel="Team Size"
                    hiddenLabel
                    name="team_size"
                    placeholder="75"
                    // sx={{ bgcolor: 'rgba(8,107,255, 12%)' }}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <RHFTextField
                    formlabel="Company Registered Name"
                    hiddenLabel
                    name="company_registered_name"
                    placeholder="Name Of Company"
                    // sx={{ bgcolor: 'rgba(8,107,255, 12%)' }}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <RHFTextField
                    formlabel="Website"
                    hiddenLabel
                    name="website"
                    placeholder="www.talentsreach.com"
                    // sx={{ bgcolor: 'rgba(8,107,255, 12%)' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField
                    formlabel="Complete Address"
                    hiddenLabel
                    name="address"
                    placeholder="Ex. abc, town , near hospital"
                    // sx={{ bgcolor: 'rgba(8,107,255, 12%)' }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} mt={0.2}>
                <Grid item xs={12}>
                  <Box width="100%" display="flex" flexDirection="column" gap={1}>
                    <Typography
                      sx={{
                        fontFamily: 'Work Sans,sans-serif',
                        fontSize: 16,
                        fontWeight: 600,
                        color: '#000',
                      }}
                    >
                      Company Category
                    </Typography>
                    <RHFSelect native hiddenLabel name="company_category">
                      <option value="" />
                      {category.map((val) => (
                        <option key={val} value={val}>
                          {val}
                        </option>
                      ))}
                    </RHFSelect>
                  </Box>
                </Grid>
                {/* <Grid item xs={12} lg={6}>
                  <Box width="100%" display="flex" flexDirection="column" gap={1}>
                    <Typography
                      sx={{
                        fontFamily: 'Work Sans,sans-serif',
                        fontSize: 16,
                        fontWeight: 600,
                        color: '#000',
                      }}
                    >
                      Allow in Search & Listing
                    </Typography>
                    <RHFSelect
                      name="allow_in_search_and_listing"
                      placeholder="allow_in_search_and_listing"
                      sx={{
                        '& select': {
                          background: '#fff !important',
                          color: '#000',
                          fontWeight: 600,
                          fontFamily: 'Work Sans,sans-serif',
                        },
                      }}
                    >
                      <MenuItem disabled value="">
                        None
                      </MenuItem>
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </RHFSelect>
                  </Box>
                </Grid> */}
                <Grid item xs={12}>
                  <Box width="100%" display="flex" flexDirection="column" gap={1}>
                    <Typography
                      sx={{
                        fontFamily: 'Work Sans,sans-serif',
                        fontSize: 16,
                        fontWeight: 600,
                        color: '#000',
                      }}
                    >
                      About company
                    </Typography>
                    <RHFEditor
                      name="about_company"
                      placeholder="Write at-least 200-300 words about your company."
                      displayEditor
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <RHFTextField
                    formlabel="Facebook URL"
                    hiddenLabel
                    name="social_links.facebook_url"
                    placeholder="https://www.facebook.com/"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <RHFTextField
                    formlabel="Linkedin URL"
                    hiddenLabel
                    name="social_links.linkedin_url"
                    placeholder="https://www.linkedin.com/"
                  />
                </Grid>
              </Grid>
              <LoadingButton
                loading={updateCandidateDetails?.isLoading}
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
              >
                Submit Now
              </LoadingButton>
            </FormProvider>
          </Box>
        </Card>
      </Container>
    </>
  );
}
