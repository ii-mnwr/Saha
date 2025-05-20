/* eslint-disable no-nested-ternary */
//

import { useRouter } from 'next/router';
import { m } from 'framer-motion';
import { Container, Typography } from '@mui/material';
import { MotionContainer, varBounce } from '../components/animate';
import { ForbiddenIllustration } from '../assets/illustrations';
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  children: React.ReactNode;
};

const rolePaths: { [key: string]: string[] } = {
  employee: [
    '/dashboard/employer',
    '/employer-services/interview-central',
    '/employer-services/generate-job-description',
    '/employer-services/sourcing-assistance',
    '/employer-services/saved-job',
    '/employer-services/create-folders',
    `/employer-services/create-folders/[id]`,
    '/employer-services/email-writing',
    '/employer-services/proposal-letters',
    '/employer-services/resume-alert',
    '/candidate-details/[slug]',
    '/',
    '/about-us',
    '/login',
    '/sign-up',
    '/dashboard',
    '/post-job',
    `/edit-job/[slug]`,
    '/shortlist',
    '/manage-job',
    '/resume-alert',
    '/change-password',
    '/settings',
    `/company/profile/[slug]`,
    '/company/edit-profile',
    '/dashboard/chat/[conversationKey]',
    '/dashboard/chat/new',
    '/dashboard/chat',
    '/contact-us',
    '/dashboard',
    '/all-applicants',
    `/new-applicants/[slug]`,
    '/search-resume',
    `/[...slug]`,
    `/job-details/[slug]`,
    '/jobs',
  ], // Add all paths for employee
  candidate: [
    '/dashboard/candidate',
    '/candidate/jobs/search-jobs',
    '/candidate/jobs/recommended-jobs',
    '/candidate/jobs/saved-job',
    '/candidate/jobs/applied-job',
    '/candidate/jobs/job-alerts',
    `/candidate/jobs/applied-job/job-details/[slug]`,
    `/candidate/jobs/search-jobs/job-details/[slug]`,
    `/candidate/jobs/saved-job/job-details/[slug]`,
    `/candidate/jobs/recommended-jobs/job-details/[slug]`,
    // '/candidate/feedback',
    '/candidate/services/resume-builder',
    `/candidate/services/resume-builder/[slug]`,
    '/candidate/services/certification',
    '/candidate/services/get-prepared',
    '/candidate/services/post-resume',
    '/candidate/updatesonmyprofile',
    '/upgrade',
    '/',
    '/candidate/profile',
    '/candidate/edit-profile',
    '/change-password',
    '/settings',
    '/about-us',
    '/login',
    '/dashboard/chat/[conversationKey]',
    '/dashboard/chat/new',
    '/dashboard/chat',
    '/sign-up',
    '/contact-us',
    '/dashboard',
    '/candidate/feedback/create',
    '/candidate/quiz',
    '/manage-subscription',
  ], // Add all paths for candidate,
  superAdmin: [
    '/super-admin/all-applicants',
    '/super-admin/companies',
    '/super-admin/login',
    '/super-admin/dashboard',
    '/super-admin/quiz',
    `/super-admin/quiz/[slug]`,
    `/super-admin/rule`,
    `/super-admin/article`,
    `/super-admin/post-job`,
    `/super-admin/create-company`,
    `/candidate-details/[slug]`,
    `/company/profile/[slug]`,
    `/edit-job/[slug]`,
    '/jobs',
    '/dashboard/chat/[conversationKey]',
    '/dashboard/chat/new',
    '/dashboard/chat',
    '/job-details/[slug]',
    '/super-admin/feedbacks',
    '/job'
  ],
};

export default function RoleBasedGuard({ children }: RoleBasedGuardProp) {
  const { user } = useAuthContext();
  const router = useRouter();
  console.log('route', router.pathname);

  const currentRole = user?.role_id;
  const currentPath = router.pathname;

  // Get allowed paths for the current role
  const allowedPaths =
    rolePaths[currentRole === 2 ? 'employee' : currentRole === 3 ? 'candidate' : 'superAdmin'] ||
    [];

  // Use filter to check if the current path is allowed for the current role
  const isAllowed = allowedPaths.filter((path) => path === currentPath).length > 0;

  if (!isAllowed) {
    return (
      <Container component={MotionContainer} sx={{ textAlign: 'center' }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Permission Denied
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to access this page
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>
      </Container>
    );
  }

  return <> {children} </>;
}
