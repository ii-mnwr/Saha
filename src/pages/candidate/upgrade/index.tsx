import React, { useState } from 'react';
import Head from 'next/head';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { Card, Container } from '@mui/material';
import PricingPlan from 'src/components/upgread-plans/UpgradePlans';
import { useSettingsContext } from 'src/components/settings';

CreateFolders.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Upgrade', href: '#' },
    ]}
  >
    {page}
  </DashboardLayout>
);

export default function CreateFolders() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>Pricing Plan</title>
      </Head>
      <Container maxWidth={false} disableGutters ={themeStretch} sx={{ position: 'relative' }}>
        <Card>
          <img src="/assets/upgradePlan.png" alt="" />
          <PricingPlan />
        </Card>
      </Container>
    </>
  );
}
