/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import Head from 'next/head';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useSettingsContext } from 'src/components/settings';
import { Button, Card, CardHeader, Container, Divider, Grid, MenuItem } from '@mui/material';
import FormProvider from 'src/components/hook-form/FormProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { RHFCheckbox, RHFSelect, RHFTextField } from 'src/components/hook-form';
import usePostRequest from 'src/hooks/usePost';
import { useSnackbar } from 'src/components/snackbar';
import moment from 'moment';
import { jobSalary, typesOfJobs } from 'src/assets/data/jobData';
import { useRouter } from 'next/router';
import RHFEditor from 'src/components/hook-form/RHFEditor';
import RHFTagsInput from 'src/components/hook-form/RHFTagsInput';
import axiosInstance from 'src/utils/axios';
import { useQuery } from 'react-query';
import JobForm from 'src/components/JobForm';

type FormValuesProps = {};

PostJob.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      { name: 'Home', href: '#' },
      { name: 'Post a Job', href: '#' },
    ]}
    title="Post New Job"
  >
    {page}
  </DashboardLayout>
);

const fetchCompanies = async () => {
  const response = await axiosInstance.post('/companies/list');
  return response?.data;
};

export default function PostJob() {
  const { push } = useRouter();
  const { themeStretch } = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    title: '',
    description: '',
    job_type: '',
    salary_min: '',
    salary_max: '',
    specification: [],
    experience: '',
    qualification: '',
    location: '',
    application_deadline: '',
    status: '',
    makeCompanyNameConfidential: false,
    application_type: '',
    job_url: '',
  };

  const postJob = usePostRequest<FormValuesProps>();

  const { data: companies } = useQuery(['fetchCompanies'], () => fetchCompanies());

  const onSubmit = (data: any) => {
    const url = '/jobs/create';
    const correct_options = data?.questions?.map((item: any) => ({
      q_id: item?.id,
      answer: item?.answer,
    }));
    const questions = data?.questions?.map((item: any) => ({
      id: item?.id,
      options: item?.options,
      required: item?.required,
      type: item?.type,
      question: item?.question,
    }));
    postJob.mutate(
      [
        url,
        {
          title: data?.title,
          description: data?.jobDescription,
          job_type: data?.job_type,
          salary_min: data?.offeredSalary?.split(' ')?.[0],
          salary_max: data?.offeredSalary?.split(' ')?.[2],
          specification: data?.specification?.toString(),
          experience: data?.experience,
          qualification: data?.qualification,
          location: data?.location,
          application_deadline: data?.application_deadline
            ? moment(data?.application_deadline).toISOString()
            : '',
          vacancy: data.vacancy,
          status: 'Open',
          application_type: data?.application_type,
          job_url: data?.job_url,
          questions,
          correct_options,
          company_id: data?.company_id,
        },
      ],
      {
        onSuccess: (response: any) => {
          enqueueSnackbar(response?.message || 'Job posted successfully', {
            variant: 'success',
          });
          push('/jobs');
          postJob?.reset();
        },
        onError: (error: any) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      }
    );
  };

  const DraftClick = (draftData: any) => {
    // const draftData: any = getValues();
    const url = '/jobs/draft';
    const correct_options = draftData?.questions?.map((item: any) => ({
      q_id: item?.id,
      answer: item?.answer,
    }));
    const questions = draftData?.questions?.map((item: any) => ({
      id: item?.id,
      options: item?.options,
      required: item?.required,
      type: item?.type,
      question: item?.question,
    }));

    postJob.mutate(
      [
        url,
        {
          title: draftData?.title,
          description: draftData?.jobDescription,
          job_type: draftData?.job_type,
          salary_min: draftData?.offeredSalary.split(' ')?.[0],
          salary_max: draftData?.offeredSalary.split(' ')?.[2],
          specification: draftData?.specification?.split(','),
          experience: draftData?.experience,
          qualification: draftData?.qualification,
          location: draftData?.location,
          application_deadline: draftData?.application_deadline
            ? moment(draftData?.application_deadline).toISOString()
            : '',
          vacancy: Number(draftData?.vacancy),
          status: 'Draft',
          application_type: draftData?.application_type,
          job_url: draftData?.job_url,
          correct_options,
          questions,
        },
      ],
      {
        onSuccess: (response: any) => {
          enqueueSnackbar(response?.message || 'Draft saved successfully', {
            variant: 'success',
          });
          push('/jobs');
          postJob?.reset();
        },
        onError: (error: any) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      }
    );
  };

  // useEffect(() => {
  //   if (postJob?.isSuccess) {
  //     push('/manage-job');
  //     postJob?.reset();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [postJob]);

  return (
    <>
      <Head>
        <title>Post a job</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ padding: 3 }}>
          <JobForm
            onSubmit={onSubmit}
            onSaveDraft={DraftClick}
            defaultValues={defaultValues}
            companies={companies}
            role="super_admin" // Pass the role to JobForm
          />
        </Card>
      </Container>
    </>
  );
}
