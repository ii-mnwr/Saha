import React from 'react';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import ChangePassword from './change-password';

Settings.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Settings', href: '#' },
    ]}
    title="Settings"
  >
    {page}
  </DashboardLayout>
);

export default function Settings() { 
  return <ChangePassword settings />
};

