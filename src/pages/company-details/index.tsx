import React, { useState } from 'react';
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
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import FormProvider from 'src/components/hook-form/FormProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { countries } from 'src/assets/data';
import ProfileCard from 'src/components/all-applicants/applicantCard';
import SearchIcon from '@mui/icons-material/Search';
import SvgColor from 'src/components/svg-color';
import { DialogAnimate } from 'src/components/animate';
import JobCard from 'src/components/saved-job/CandidateSavedJob';
import SkillsCard from 'src/components/jobOverviewCard/SkillCard';
import JobDescriptionCard from 'src/components/jobOverviewCard/JobDescriptionCard';
import JobDesCard from 'src/components/job-details/JobCard';
import JobOverviewCard from 'src/components/job-details/JobOverviewCard';
import CompanyDetails from 'src/components/company-detail/CompanyDetails';
import CompanyOverviewCard from 'src/components/company-detail/CompanyOverview';

type FormValuesProps = {};

JobDetails.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function JobDetails() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>Company details</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ padding: 3 }}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h5" textAlign="center" textTransform="capitalize" color="#086BFF">
              COMPANY DETAILS
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Grid container>
            <Grid item xs={8}>
              <CompanyDetails />
            </Grid>
            <Grid item xs={4} pl={2}>
              <CompanyOverviewCard />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
