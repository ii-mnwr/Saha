import { Card, Container } from '@mui/material';
import Head from 'next/head';
import { useSettingsContext } from 'src/components/settings';
import UserComponent from 'src/components/users';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';

const SearchResume = () => {
  const { themeStretch } = useSettingsContext();
  return (
    <>
      <Head>
        <title>Candidate Listing</title>
      </Head>

      <UserComponent />
    </>
  );
};

SearchResume.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: 'dashboard/employer/',
      },
      { name: 'Candidates Listing', href: '#' },
    ]}
    title="Search Resume"
  >
    {page}
  </DashboardLayout>
);
export default SearchResume;
