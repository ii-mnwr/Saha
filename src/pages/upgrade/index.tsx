import Head from 'next/head';
import React from 'react';
import UpgradeComponent from 'src/components/upgrade';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';

Upgrade.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function Upgrade() {
  return (
    <>
      {' '}
      <Head>
        <title>Upgrade Plan</title>
      </Head>
      <UpgradeComponent />
    </>
  );
}
