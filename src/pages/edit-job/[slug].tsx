/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import Head from 'next/head';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useSettingsContext } from 'src/components/settings';
import { Card, Container } from '@mui/material';
import usePostRequest from 'src/hooks/usePost';
import { useSnackbar } from 'src/components/snackbar';
import moment from 'moment';
import { useRouter } from 'next/router';
import JobForm from 'src/components/JobForm';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useQuery } from 'react-query';
import axiosInstance from 'src/utils/axios';
import { useAuthContext } from 'src/auth/useAuthContext';

type FormValuesProps = {};

EditJob.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      { name: 'Home', href: '#' },
      { name: 'Edit Job', href: '#' },
    ]}
    title="Edit Job"
  >
    {page}
  </DashboardLayout>
);

const fetchJobById = async (data: any) => {
  const response = await axiosInstance.post('jobs/find-by-id', data);
  return response?.data;
};

const fetchCompanies = async () => {
  const response = await axiosInstance.post('/companies/list');
  return response?.data;
};

export default function EditJob({ id }: any) {
  const { data: companies } = useQuery(['fetchCompanies'], () => fetchCompanies());
  const { push } = useRouter();
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();

  const { data, refetch } = useQuery(['fetchJobDataByID', id], () =>
    fetchJobById({ id: Number(id) })
  );

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

  const onSubmit = (data: any) => {
    const url = '/jobs/update';
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

    const updatedData = {
      id: Number(id),
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
      is_confidential: data?.is_confidential,
      // is_questions: data?.Is_questions,
      questions: questions,
      correct_options: correct_options,
    };

    postJob.mutate(
      [
        url,
        user?.role_id === 1 ? { ...updatedData, company_id: data?.company_id } : { ...updatedData },
      ],
      {
        onSuccess: (response: any) => {
          enqueueSnackbar(response?.message || 'Job posted successfully', {
            variant: 'success',
          });
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
          specification: draftData?.specification?.toString(),
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
          is_confidential: draftData?.is_confidential,
          questions,
          correct_options,
        },
      ],
      {
        onSuccess: (response: any) => {
          enqueueSnackbar(response?.message || 'Draft saved successfully', {
            variant: 'success',
          });
        },
        onError: (error: any) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      }
    );
  };

  useEffect(() => {
    if (postJob?.isSuccess) {
      push('/jobs');
      postJob?.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postJob]);

  return (
    <>
      <Head>
        <title>Post a job</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ padding: 3 }}>
          <JobForm
            isEdit
            editData={data?.data}
            onSubmit={onSubmit}
            onSaveDraft={DraftClick}
            defaultValues={defaultValues}
            companies={companies}
            role={user?.role_id === 1 ? 'super_admin' : 'employer'} // Pass the role to JobForm
          />
        </Card>
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});
export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  return { props: { id: params?.slug } };
};
