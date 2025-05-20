import React, { useState } from 'react';
import { Card, Typography, Container } from '@mui/material';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { Hero } from 'src/components/employee/Hero';
import Head from 'next/head';
import { useSettingsContext } from 'src/components/settings';
import RatingChart from 'src/components/employee/RatingChart';
import StatusCounts from 'src/components/employee/StatusCounts';

const EmployeeDashboard = () => {
  const { themeStretch } = useSettingsContext();

  const [filters, setFilters] = useState<any>({
    search: '',
    nationality: '',
    type_of_employment: '',
    gender: '',
    notice_period: '',
    language: '',
    sort: 'id:desc',
    title: '',
    location: '',
    experience: '',
    education: '',
    age: '',
    licence: '',
    limit: 5,
    page: 1,
  });

  const handleFilteration = (e: any) => {
    setFilters((filter: any) => ({
      ...filter,
      page: 1,
      [e.name]: e.value,
    }));
  };

  const resetFilter = () => {
    setFilters({
      search: '',
      nationality: '',
      type_of_employment: '',
      gender: '',
      notice_period: '',
      language: '',
      sort: 'id:desc',
      title: '',
      location: '',
      experience: '',
      education: '',
      age: '',
      licence: '',
      limit: 10,
      page: 1,
    });
  };

  return (
    <>
      <Head>
        <title>Employer dashboard</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card
          sx={{
            background: '#F6F6F6',
            boxShadow: '0px 4px 4px 0px #00000040',
            borderRadius: 2,
          }}
        >
          <Hero
            handleFilteration={handleFilteration}
            filter={filters}
            setFilters={setFilters}
            resetFilter={resetFilter}
          />

          <Typography variant="h5" sx={{ padding: '16px 0 5px 50px' }}>
            Rating Chart:
          </Typography>
          <RatingChart />
          <StatusCounts />
        </Card>
      </Container>
    </>
  );
};

export default EmployeeDashboard;

EmployeeDashboard.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Dashboard', href: '#' },
    ]}
  >
    {page}
  </DashboardLayout>
);
