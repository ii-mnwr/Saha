/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import JobDetailsPage from 'src/components/jobDetailsPage';

JobDetails.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '/dashboard/candidate/',
      },
      { name: 'Applied Jobs', href: '/candidate/jobs/applied-job/' },
      { name: 'Jobs Details', href: '#' },
    ]}
    title="Jobs Details"
  >
    {page}
  </DashboardLayout>
);

export default function JobDetails({ id }: any) {
  return <JobDetailsPage id={id} />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  return { props: { id: params?.slug } };
};
