/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
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
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  TextField,
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
import { SearchIcon } from 'src/theme/overrides/CustomIcons';
import { useQuery } from 'react-query';
import axiosInstance from 'src/utils/axios';
import { useApplicants } from 'src/hooks/useApplicants';
import { useSearchParams } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';

const SearchBar = ({ filter, setFilter, handleClear = () => {} }: any) => (
  <Paper
    component="form"
    sx={{
      p: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 'auto',
      borderRadius: '20px',
      flexDirection: { xs: 'column', md: 'row' },
      gap: { xs: 1, md: 1 },
    }}
  >
    <TextField
      fullWidth
      size="small"
      placeholder="Keyword / Company Name"
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      onChange={(e) =>
        setFilter((data: any) => ({
          ...data,
          search: e.target.value,
        }))
      }
      value={filter?.search}
    />

    <FormControl fullWidth size="small" sx={{ minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label">Experience Level</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        onChange={(e) =>
          setFilter((data: any) => ({
            ...data,
            experience: e.target.value,
          }))
        }
        id="demo-simple-select"
        label="Experience Level"
        value={filter?.experience}
      >
        <MenuItem value="1 to 5 years">1 to 5 years</MenuItem>
        <MenuItem value="6 to 10 years">6 to 10 years</MenuItem>
        <MenuItem value="11 to 15 years">11 to 15 years</MenuItem>
        <MenuItem value="16 to 20 years">16 to 20 years</MenuItem>
        <MenuItem value="21 to 25 years">21 to 25 years</MenuItem>
        <MenuItem value="26 to 30 years">26 to 30 years</MenuItem>
        <MenuItem value="30+ years">30+ years</MenuItem>
      </Select>
    </FormControl>
    <FormControl fullWidth sx={{ minWidth: 120, border: 'none' }} size="small">
      <InputLabel>Qualification</InputLabel>
      <Select
        label="Qualification"
        value={filter?.qualification}
        onChange={(e) =>
          setFilter((data: any) => ({
            ...data,
            qualification: e.target.value,
          }))
        }
      >
        <MenuItem value="High School">High School</MenuItem>
        <MenuItem value="Diploma">Diploma</MenuItem>
        <MenuItem value="Bachelors">Bachelors</MenuItem>
        <MenuItem value="Masters">Masters</MenuItem>
        <MenuItem value="PHD">PHD</MenuItem>
      </Select>
    </FormControl>

    <Button
      sx={{ p: '10px', borderRadius: '20px' }}
      aria-label="search"
      variant="contained"
      onClick={handleClear}
    >
      <CloseIcon />
    </Button>
  </Paper>
);

PostJob.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Applicants', href: '#' },
    ]}
    title="Applicants"
  >
    {page}
  </DashboardLayout>
);

export default function PostJob() {
  const { themeStretch } = useSettingsContext();

  const searchParams = useSearchParams();

  const status = searchParams.get('status') || '';
  const job_id = searchParams.get('job_id') || '';
  console.log('🚀 ~ PostJob ~ job_id:', job_id);

  const { getAllApplicants, setFilter, filter } = useApplicants({
    status: status?.toLocaleLowerCase() === 'all' ? '' : status || '',
    limit: 10,
    page: 1,
    search: '',
    sort: 'id:desc',
    qualification: '',
    experience: '',
    job_id,
  });

  useEffect(() => {
    if (status) setFilter((data: any) => ({ ...data, status }));
  }, [status]);

  const { data: applicantsList, refetch } = getAllApplicants;

  const handleClear = () => {
    setFilter({
      limit: 10,
      page: 1,
      search: '',
      sort: 'id:desc',
      qualification: '',
      experience: '',
      job_id,
      status: status?.toLocaleLowerCase() === 'all' ? '' : status || '',
    });
  };

  return (
    <>
      <Head>
        <title>Applicants</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ padding: 3 }}>
          <CardHeader
            sx={{
              p: 0,
              mb: 3,
              fontWeight: 700,
              fontFamily: 'Work Sans,sans-serif',
              color: '#086BFF',
              fontSize: 20,
            }}
            title="Applicants"
          />
          <Divider sx={{ mb: 3 }} />
          <SearchBar filter={filter} setFilter={setFilter} handleClear={handleClear} />
          <Divider sx={{ my: 3 }} />
          <Grid container spacing={3}>
            {applicantsList?.data?.map((item: any, i: number) => {
              const data = {
                img: item?.candidate?.profile_image_path,
                designation: item?.candidate?.designation,
                name: item?.candidate?.first_name
                  ? `${item?.candidate?.first_name} ${item?.candidate?.last_name}`
                  : '',
                job_type: item?.job_type,
                // location: item?.candidate?.address,
                isApplicants: true,
                id: item?.candidate?.id,
                createdAt: item?.candidate?.createdAt,
                user_name: item?.candidate?.user_name,
                updatedAt: item?.updatedAt,
                appliedAt: item?.appliedAt,
                applicationId: item?.id,
                location: item?.job?.location,
                title: item?.job?.title,
              };
              return (
                <Grid item xs={12} xl={6}>
                  <ProfileCard item={data} id={item?.candidate?.id} refetch={refetch} />
                </Grid>
              );
            })}
          </Grid>
          <Box display="flex" width="100%" justifyContent="center" my={2}>
            <Pagination
              shape="circular"
              count={Math.ceil((applicantsList?.pagination?.count || 0) / 10)}
              onChange={(e: any, page: number) => {
                setFilter((data: any) => ({
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
