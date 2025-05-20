import React, { useCallback, useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useSettingsContext } from 'src/components/settings';
import { Box, Button, Card, Container, Divider, Grid, IconButton, Typography } from '@mui/material';
import FormProvider from 'src/components/hook-form/FormProvider';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { RHFCheckbox, RHFSelect, RHFTextField } from 'src/components/hook-form';
import usePostRequest from 'src/hooks/usePost';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useQuery } from 'react-query';
import axiosInstance from 'src/utils/axios';
import { useSnackbar } from 'src/components/snackbar';
import { FormatDate } from 'src/utils/formatTime';
import { Backend_Base_URL } from 'src/config-global';
import moment from 'moment';
import RHFTagsInput from 'src/components/hook-form/RHFTagsInput';
import RHFEditor from 'src/components/hook-form/RHFEditor';
import { RHFUploadAvatar } from 'src/components/hook-form/RHFUpload';
import { CustomFile } from 'src/components/upload/types';
import axios from 'src/utils/axios';
import { useDispatch } from 'react-redux';
import { AuthContext } from 'src/auth/JwtContext';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useRouter } from 'next/router';

interface ExperienceDetail {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}
interface EdcationDetail {
  cgpa: string;
  title: string;
  degree: string;
  institute: string;
  yearOfPassing: string;
}

type FormValuesProps = {
  id: number;
  email?: string;
  user_name: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  date_of_birth: string;
  profile_image_path: CustomFile | string | null;
  gender: string;
  address: string;
  resume: string;
  date_applied: string;
  experience_details: ExperienceDetail[];
  education_details: EdcationDetail[];
};

const fetchUserById = async (id: any) => {
  const response = await axiosInstance.post('/candidates/find-by-id', {
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
      { name: 'Update Profile', href: '#' },
    ]}
    title="Update Profile"
  >
    {page}
  </DashboardLayout>
);

export default function EditProfile() {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { user, initialize } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  const updateCandidateDetails = usePostRequest<any>();

  const [resumeFile, setResumeFile] = useState<any>('');
  const [refresh, setRefresh] = useState(false);

  const { data: userData, refetch } = useQuery(
    ['userFetchById', user, refresh],
    () => user?.candidate_id && fetchUserById(user?.candidate_id)
  );

  useEffect(() => {
    if (userData) {
      const date = new Date(userData?.data?.date_of_birth);
      const data: any = {
        email: userData?.data?.email,
        user_name: userData?.data?.user_name,
        first_name: userData?.data?.first_name,
        last_name: userData?.data?.last_name,
        phone_number: userData?.data?.phone_number,
        date_of_birth: FormatDate(date),
        gender: userData?.data?.gender,
        profile_image_path: userData?.data?.profile_image_path
          ? `${Backend_Base_URL}${userData?.data?.profile_image_path}`
          : null,
        address: userData?.data?.address?.address1?.toString(),
        bio: userData?.data?.bio?.toString(),
        skills: userData?.data?.skills?.split(','),
        designation: userData?.data?.designation?.toString(),
        marital_status: userData?.data?.marital_status,
        facebook_url: userData?.data?.social_links?.facebook_url,
        linkedin_url: userData?.data?.social_links?.linkedin_url,
        languages: userData?.data?.languages?.split(','),
        total_experience: userData?.data?.total_experience,
        experience_details: userData?.data?.experience_details
          ? userData?.data?.experience_details
          : [
              {
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                description: '',
              },
            ],
        education_details: userData?.data?.education_details
          ? userData?.data?.education_details
          : [
              {
                cgpa: '',
                title: '',
                degree: '',
                institute: '',
                yearOfPassing: '',
              },
            ],
        resume: userData?.data?.resume,
        // date_applied: '',
        // experience: null,
        // education: null,
        // views: 0,
        // follower: 0,
        // following: 0,
        // profile_link: null,
        // createdAt: '2024-03-29T17:27:44.122Z',
        // updatedAt: '2024-03-29T17:27:44.122Z',
      };
      setResumeFile(userData?.data?.resume);
      reset(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const defaultValues: FormValuesProps | any = {
    // id: -1,
    email: '',
    user_name: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    date_of_birth: '',
    profile_image_path: null,
    gender: '',
    address: '',
    experience_details: [
      {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ],
    education_details: [
      {
        cgpa: '',
        title: '',
        degree: '',
        institute: '',
        yearOfPassing: '',
      },
    ],
    bio: '',
    skills: [],
    designation: '',
    languages: [],
    facebook_url: '',
    linkedin_url: '',
    profile_link: '',
    marital_status: '',
    total_experience: '',
    profileImage: '',
    resume: '',
    // views: 0,
    // follower: 0,
    // following: 0,
    // resume: '',
    // date_applied: '',
    // createdAt: '2024-03-29T17:27:44.122Z',
    // updatedAt: '2024-03-29T17:27:44.122Z',
  };

  const schemaEditProfile = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    email: Yup.string().required('Email is required'),
    phone_number: Yup.string().required('Phone number is required'),
    gender: Yup.string().required('Gender is required'),
    last_name: Yup.string().required('Last name is required'),
    date_of_birth: Yup.date().required('Date of Birth is required'),
    skills: Yup.array().min(1, 'At least one skill is required').required('Skills is required'),
    total_experience: Yup.string().required('Total Experience is required'),
    resume: Yup.string().required('Resume is Required'),
    education_details: Yup.array().of(
      Yup.object().shape({
        cgpa: Yup.string().required('CGPA is required'),
        institute: Yup.string().required('University name is required'),
        degree: Yup.string().required('Degree is required'),
        yearOfPassing: Yup.string().required('Year of Passing is required'),
        title: Yup.string().required('Title is required'),
      })
    ),
    // experience_details: Yup.array().of(
    //   Yup.object().shape({
    //     //position: Yup.string().required('Position is required'),
    //     //company: Yup.string().required('Company name is required'),
    //     // startDate: Yup.string().required('Start Date is required'),
    //   })
    // ),
    marital_status: Yup.string().required('Marital Status is required'),
    address: Yup.mixed().required('Address is required'),
    designation: Yup.mixed().required('Designation is required'),
  });

  const methodsEditProfile = useForm<FormValuesProps>({
    resolver: yupResolver(schemaEditProfile),
    defaultValues,
  });

  const { reset, setValue, handleSubmit, control, watch } = methodsEditProfile;

  const experienceDetailsArr = useFieldArray({
    control,
    name: 'experience_details',
  });

  const educationDetailsArr = useFieldArray({
    control,
    name: 'education_details',
  });

  const onSubmitEditProfile = (data: any) => {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      date_of_birth,
      gender,
      address,
      total_experience,
      skills,
      facebook_url,
      linkedin_url,
      profile_image_path,
      bio,
      designation,
      marital_status,
      languages,
      resume,
    } = data || {};

    const formData = new FormData();
    const date = moment(date_of_birth, 'DD/MM/YYYY').toISOString();

    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('email', email);
    formData.append('phone_number', phone_number);
    formData.append('date_of_birth', date);
    formData.append('gender', gender);
    formData.append('bio', bio);
    formData.append('experience_details', JSON.stringify(data?.experience_details));
    formData.append('designation', designation);
    formData.append('marital_status', marital_status);
    formData.append('total_experience', total_experience);
    // console.log('data', educationDetailsArr);
    formData.append('education_details', JSON.stringify(data?.education_details));
    formData.append('skills', skills?.toString());
    formData.append('address', JSON.stringify({ address1: address }));
    formData.append('languages', languages?.toString());

    formData.append(
      'profileImage',
      typeof profile_image_path === 'string' && profile_image_path?.includes(Backend_Base_URL)
        ? profile_image_path?.replace(Backend_Base_URL, '')
        : profile_image_path
    );
    formData.append('resume', resumeFile ?? resume);
    // if ((profile_image_path !== null || profile_image_path !== 'null') && profile === null) {
    //   formData.append('profileImage', profile_image_path);
    // } else {
    // }

    formData.append('social_links', JSON.stringify({ facebook_url, linkedin_url }));

    const url = '/candidates/update';

    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    updateCandidateDetails.mutate([url, formData, config], {
      onSuccess: (response: any) => {
        // Handle success
        enqueueSnackbar(response?.message || 'Reset password email sent successfully', {
          variant: 'success',
        });
        reset();
        refetch();
        setRefresh(true);
        initialize();

        push('/candidate/profile');
      },
      onError: (error: any) => {
        // Handle error
        enqueueSnackbar(error.message, { variant: 'error' });
        setRefresh(true);
      },
    });
  };

  const handleDropAvatar = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('profile_image_path', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setValue('resume', file.name);
    setResumeFile(file);
  };

  const expWatch = watch('experience_details');

  return (
    <>
      <Head>
        <title>Update Profile</title>
      </Head>
      <Container maxWidth={false} disableGutters>  
        <Card sx={{ padding: 3, bgcolor: '#f0f0f0' }}>
          <Box display="flex" flexDirection="row" alignItems="center" gap={1} mb={2}>
            {/* <img
              alt="profile_logo"
              src="/assets/profile_img.png"
              style={{
                width: 50,
                height: 50,
              }}
            /> */}
            {/* <Typography
              sx={{
                color: '#086BFF',
                fontFamily: 'Work Sans,sans-serif',
                fontSize: 20,
                fontWeight: 700,
              }}
            > */}
              {/* Update Profile
            </Typography>
            {/* <Button
              variant="contained"
              onClick={() => {
                route.push('/candidate/profile');
              }}
            > */}
              {/* View profile
            </Button> */} 
          </Box>

          {/* <Divider sx={{ mb: 3 }} /> */}
          <FormProvider methods={methodsEditProfile} onSubmit={handleSubmit(onSubmitEditProfile)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" flexDirection="row" gap={2} marginY={1} alignItems="center">
                  <RHFUploadAvatar name="profile_image_path" />
                  <Box display="flex" flexDirection="column" alignItems="flex-start">
                    <Typography
                      fontFamily="Work Sans,sans-serif"
                      fontSize={28}
                      fontWeight={800}
                      color="#000"
                      textTransform="capitalize"
                    >
                      {userData?.data?.first_name} {userData?.data?.last_name}
                    </Typography>
                    <Typography
                      fontFamily="Work Sans,sans-serif"
                      fontSize={16}
                      fontWeight={500}
                      color="#000"
                    >
                      {userData?.data?.designation}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6}>
                <RHFTextField
                  formlabel="First name"
                  required
                  hiddenLabel
                  name="first_name"
                  placeholder="Enter First Name"
                  bgColor="#fff"
                  border= "outline"

                  // sx={{ bgcolor: 'rgba(8,107,255, 12%)' }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <RHFTextField
                  formlabel="Last name"
                  hiddenLabel
                  name="last_name"
                  placeholder="Enter Last Name"
                  required
                  bgColor="#fff"
                  border="outline"
                  // sx={{ bgcolor: 'rgba(8,107,255, 12%)' }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <RHFTextField
                  formlabel="Email Address"
                  required
                  hiddenLabel
                  name="email"
                  placeholder="GeorgeWell@gmail.com"
                  bgColor="#fff"
                  border="outline"
                  height="48px"

                  // sx={{ bgcolor: 'rgba(8,107,255, 12%)' }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <RHFTextField
                  formlabel="Contact Number"
                  required
                  hiddenLabel
                  name="phone_number"
                  placeholder="+971 (234) 3423124"
                  bgColor="#fff"
                  border="outline"

                  // sx={{ bgcolor: 'rgba(8,107,255, 12%)' }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <RHFTextField
                  formlabel="Date of birth"
                  required
                  hiddenLabel
                  type="date"
                  name="date_of_birth"
                  placeholder="21/11/1990"
                  bgColor="#fff"
                  border="outline"

                  // sx={{ bgcolor: 'rgba(8,107,255, 12%)' }}
                />
                {/* <RHFDatePicker
                  name="date_of_birth"
                  formlabel={'Date Of Birth :'}
                  required
                  variant="filled"
                /> */}
              </Grid>
              <Grid item xs={12} lg={6}>
                <Box width="100%" display="flex" flexDirection="column" gap={1}>
                  {/* <Typography
                    sx={{
                      fontFamily: 'Work Sans,sans-serif',
                      fontSize: 16,
                      fontWeight: 600,
                      color: '#000',
                    }}
                  >
                    Gender
                  </Typography> */}
                  {/* <RHFSelect
                    required
                    native
                    name="gender"
                    formlabel="Gender"
                    placeholder="Gender"
                    defaultValue=""
                    sx={{
                      '& select': {
                        background: '#fff !important',
                        color: '#000',
                        fontWeight: 600,
                        fontFamily: 'Work Sans,sans-serif',
                      },
                    }}
                  >
                    <option disabled value="">
                      Male/Female
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </RHFSelect> */}

                  <RHFSelect
                    native
                    name="gender"
                    inputProps={{ 'aria-label': 'Without label' }}
                    hiddenLabel
                    formlabel="Gender :"
                    variant="filled"
                    // defaultValue=""
                    sx={{
                      '& select': {
                        background: '#fff !important',
                        fontWeight: 600,
                        fontFamily: 'Work Sans,sans-serif',
                        borderRadius: 1,
                      },
                    }}
                  >
                    <option disabled value="">
                      Male/Female
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </RHFSelect>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6}>
                <RHFTextField
                  formlabel="Location"
                  hiddenLabel
                  name="address"
                  placeholder="Dubai"
                  required
                  bgColor="#fff"
                  border="outline"
                  // sx={{ bgcolor: 'rgba(8,107,255, 12%)' }}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <Box width="100%" display="flex" flexDirection="column" gap={1}>
                  <RHFSelect
                    native
                    name="marital_status"
                    inputProps={{ 'aria-label': 'Without label' }}
                    hiddenLabel
                    formlabel="Marital Status"
                    variant="filled"
                    // defaultValue=""
                    sx={{
                      '& select': {
                        background: '#fff !important',
                        fontWeight: 600,
                        fontFamily: 'Work Sans,sans-serif',
                        borderRadius: 1,
                      },
                    }}
                  >
                    <option disabled value="">
                      Select Marital Status
                    </option>
                    <option value="single">Single/unmarried</option>
                    <option value="married">Married</option>
                    <option value="widowed">Widowed</option>
                    <option value="divorced">Divorced</option>
                    <option value="seperated">Separated</option>
                    <option value="other">Other</option>
                  </RHFSelect>
                </Box>
              </Grid>

              <Grid item xs={12} lg={6}>
                <RHFTextField
                  formlabel="Facebook URL"
                  // required
                  hiddenLabel
                  name="facebook_url"
                  placeholder="https://www.facebook.com/"
                  bgColor="#fff"
                  border="outline"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <RHFTextField
                  formlabel="Linkedin URL"
                  hiddenLabel
                  // required
                  name="linkedin_url"
                  placeholder="https://www.linkedin.com/"
                  bgColor="#fff"
                  border="outline"
                />
              </Grid>
              <Grid item xs={12}>
                {/* <Typography
                  sx={{
                    fontWeight: 600,
                    fontFamily: 'Work Sans,sans-serif',
                    color: '#162144',
                    pb: 1,
                    fontSize: 16,
                  }}
                >
                  Total Experience
                </Typography> */}
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={6}>
                    <Box width="100%" display="flex" flexDirection="column" gap={1}>
                      <RHFSelect
                        native
                        name="total_experience"
                        inputProps={{ 'aria-label': 'Without label' }}
                        hiddenLabel
                        formlabel="Total Experience:"
                        variant="filled"
                        // defaultValue=""
                        sx={{
                          '& select': {
                            background: '#fff !important',
                            fontWeight: 600,
                            fontFamily: 'Work Sans,sans-serif',
                            borderRadius: 1,
                          },
                        }}
                      >
                        <option disabled value="">
                          Select your experience
                        </option>
                        {Array(30)
                          .fill('_')
                          .map((item, i) => (
                            <option value={i}>{i + 1} years</option>
                          ))}
                      </RHFSelect>
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <RHFTagsInput
                      name="languages"
                      formlabel="Languages Known:"
                      bgColor="#fff"
                      border="outline"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} lg={12}>
                <RHFTextField
                  formlabel="Resume Headline"
                  required
                  hiddenLabel
                  name="bio"
                  multiline
                  minRows={4}
                  placeholder="Create your resume headline"
                  bgColor="#fff"
                  border="outline"
                  // sx={{ bgcolor: 'rgba(8,107,255, 12%)' }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <RHFTagsInput
                  name="skills"
                  formlabel="Skills"
                  bgColor="#fff"
                  border="outline"
                  required
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <RHFTextField
                  formlabel="Designation"
                  required
                  hiddenLabel
                  name="designation"
                  placeholder="Ex. Web developer"
                  bgColor="#fff"
                  border="outline"
                  // sx={{ bgcolor: 'rgba(8,107,255, 12%)' }}
                />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField
                  bgColor="#fff"
                  border="outline"
                  formlabel="Update Your Resume:"
                  hiddenLabel
                  name="resume"
                  placeholder="File in .pdf or .doc"
                  required
                  InputProps={{
                    endAdornment: (
                      <Button variant="contained" component="label" sx={{ minWidth: 120, bgcolor: "#0a2239", color: "#fff"}}>
                        Choose File
                        <input
                          type="file"
                          accept=".pdf,.doc"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                      </Button>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 2,
              }}
            >
              <Typography variant="h5">Experience Details</Typography>
              <Button
                sx={{bgcolor: "#0a2239", color: "#fff"}}
                variant="contained"
                onClick={() => {
                  experienceDetailsArr.append({
                    company: '',
                    position: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                  });
                }}
              >
                Add
              </Button>
            </Box>
            {experienceDetailsArr?.fields?.map((item, index) => {
              const isCurrentlyWorking = watch(`experience_details[${index}].currently_working`);
              return (
                <Grid container spacing={1} mt={1}>
                  <Grid item xs={12}>
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="h6">Employment {index > 0 && index + 1}</Typography>
                      <IconButton
                        sx={{
                          ':hover': {
                            background: 'outline',
                          },
                          ':active': {
                            background: 'outline',
                          },
                          ':focus': {
                            background: 'outline',
                          },
                        }}
                        onClick={() => {
                          experienceDetailsArr.remove(index);
                        }}
                      >
                        <DeleteOutlineIcon
                          sx={{
                            fill: 'red',
                          }}
                        />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <RHFTextField
                      formlabel="Company"
                      hiddenLabel
                      name={`experience_details[${index}].company`}
                      placeholder="Enter company name:"
                      bgColor="#fff"
                      border="outline"
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <RHFTextField
                      formlabel="Position"
                      hiddenLabel
                      name={`experience_details[${index}].position`}
                      placeholder="Enter Position:"
                      bgColor="#fff"
                      border="outline"
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <RHFTextField
                      formlabel="Start Date"
                      hiddenLabel
                      type="date"
                      name={`experience_details[${index}].startDate`}
                      placeholder="DD/MM/YYYY"
                      bgColor="#fff"
                      border="outline"
                      // sx={{ bgcolor: 'rgba(8,107,255, 12%)' }}
                    />

                    {/* <RHFDatePicker
                      name={`experience_details[${index}].startDate`}
                      formlabel="Start Date"
                      required
                      variant="filled"
                    /> */}
                  </Grid>
                  {!isCurrentlyWorking ? (
                    <Grid item xs={12} md={6}>
                      <RHFTextField
                        name={`experience_details[${index}].endDate`}
                        formlabel="End Date:"
                        placeholder="End Date"
                        bgColor="#fff"
                        border="outline"
                        fontWeight={500}
                        type="date"
                        disabled={expWatch?.[index]?.currently_working}
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={12} md={6} />
                  )}

                  <Grid item xs={12} md={6} display="flex" justifyContent="flex-start">
                    <RHFCheckbox
                      name={`experience_details[${index}].currently_working`}
                      label="Currently Working Here"
                    />
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <RHFEditor
                      simple
                      name={`experience_details[${index}].description`}
                      placeholder="Write description."
                      id={`experience_details${index}`}
                      displayEditor
                      sx={{
                        backgroundColor: '#fff', // Set the background color to white
                        '& .ql-editor': {
                          backgroundColor: '#fff', // Ensure the text box background is also white
                        },
                        }}
                    />
                  </Grid>
                </Grid>
              );
            })}

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 2,
              }}
            >
              <Typography variant="h5">Education Details</Typography>
              <Button
                variant="contained"
                sx={{bgcolor: "#0a2239", color: "#fff"}}
                onClick={() => {
                  educationDetailsArr.append({
                    cgpa: '',
                    title: '',
                    degree: '',
                    institute: '',
                    yearOfPassing: '',
                  });
                }}
              >
                Add
              </Button>
            </Box>
            {educationDetailsArr?.fields?.map((item, index) => (
              <>
                <Grid container spacing={1} mt={1}>
                  <Grid item xs={12}>
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="h6">Education {index > 0 && index + 1}</Typography>
                      <IconButton
                        sx={{
                          ':hover': {
                            background: 'outline',
                          },
                          ':active': {
                            background: 'outline',
                          },
                          ':focus': {
                            background: 'outline',
                          },
                        }}
                        onClick={() => {
                          educationDetailsArr.remove(index);
                        }}
                      >
                        <DeleteOutlineIcon
                          sx={{
                            fill: 'red',
                          }}
                        />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <RHFTextField
                      required
                      formlabel="Title"
                      hiddenLabel
                      name={`education_details[${index}].title`}
                      placeholder="Ex.computer Engineering"
                      bgColor="#fff"
                      border="outline"
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Box width="100%" display="flex" flexDirection="column" gap={1}>
                      {/* <Typography
                    sx={{
                      fontFamily: 'Work Sans,sans-serif',
                      fontSize: 16,
                      fontWeight: 600,
                      color: '#000',
                    }}
                  >
                    Marital Status
                  </Typography>
                  <RHFSelect
                    native
                    name="marital_status"
                    placeholder="marital status"
                    required
                    sx={{
                      '& select': {
                        background: '#fff !important',
                        color: '#000',
                        fontWeight: 600,
                        fontFamily: 'Work Sans,sans-serif',
                      },
                    }}
                  > */}

                      <RHFSelect
                        native
                        name={`education_details[${index}].degree`}
                        inputProps={{ 'aria-label': 'Without label' }}
                        hiddenLabel
                        formlabel="Degree"
                        variant="filled"
                        sx={{
                          '& select': {
                            background: '#fff !important',
                            fontWeight: 600,
                            fontFamily: 'Work Sans,sans-serif',
                            borderRadius: 1,
                          },
                        }}
                      >
                        <option disabled value="">
                          Select Degree
                        </option>
                        <option value="High School">High School</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Bachelors">Bachelors</option>
                        <option value="Masters">Masters</option>
                        <option value="PHD">PHD</option>
                        <option value="Other">Other</option>
                      </RHFSelect>
                    </Box>
                  </Grid>
                  {/* <Grid item xs={12} lg={6}>
                    <RHFTextField
                      required
                      formlabel="Degree"
                      hiddenLabel
                      name={`education_details[${index}].degree`}
                      placeholder="BE/ B.Tech"
                      bgColor="#fff"
                      border="outline"
                    />
                  </Grid> */}
                  <Grid item xs={12} lg={6}>
                    <RHFTextField
                      required
                      formlabel="Institute"
                      hiddenLabel
                      name={`education_details[${index}].institute`}
                      placeholder="University Name"
                      bgColor="#fff"
                      border="outline"
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <RHFTextField
                      required
                      formlabel="Year of passing"
                      hiddenLabel
                      name={`education_details[${index}].yearOfPassing`}
                      placeholder="ex. 2022"
                      bgColor="#fff"
                      border="outline"
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <RHFTextField
                      required
                      formlabel="CGPA / Percentages"
                      hiddenLabel
                      name={`education_details[${index}].cgpa`}
                      placeholder="Ex. 7.87"
                      bgColor="#fff"
                      border="outline"
                    />
                  </Grid>
                </Grid>
              </>
            ))}

            <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor: "#0a2239", color: "#fff"}}>
              Submit Now
            </Button>
          </FormProvider>
        </Card>
      </Container>
    </>
  );
}
