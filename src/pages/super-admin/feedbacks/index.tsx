import React from 'react';
import DashboardLayout from 'src/layouts/dashboard';
import Feedback from 'src/pages/candidate/feedback';

const SuperadminFeedback = () => <Feedback isAdmin />;

SuperadminFeedback.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Feedback', href: '#' },
    ]}
    title="Feedback"
  >
    {page}
  </DashboardLayout>
);
export default SuperadminFeedback;
