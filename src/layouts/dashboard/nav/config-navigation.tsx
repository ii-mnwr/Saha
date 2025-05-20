// routes
import { useAuthContext } from 'src/auth/useAuthContext';
import { PATH_AUTH, PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------
const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  jobs: icon('ic_jobs'),
  candidate_services: icon('ic_candidate_services'),
  employee_services: icon('ic_employees_services'),
  update_profile: icon('ic_update_profile'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard1'),
  doc: icon('ic_document'),
  alert: icon('ic_alert-circle'),
  feedback: icon('ic_feedback'),
  upgrade: icon('ic_upgrade'),
  post_job: icon('ic_post_job'),
  shortlist: icon('ic_shortlist'),
  manage_job: icon('ic_manage_job'),
  quiz: icon('ic_quiz'),
  rules: icon('ic_rules'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    // subheader: 'general v4.3.0',
    items: [
      {
        title: 'Employer Services',
        path: PATH_DASHBOARD.employee.createFolders,
        icon: ICONS.employee_services,
        children: [
          { title: 'Create Folders', path: PATH_DASHBOARD.employee.createFolders },

          { title: 'Professional Email Writing', path: PATH_DASHBOARD.employee.emailWriting },
          {
            title: 'Generate Job Description',
            path: PATH_DASHBOARD.employee.GenerateJobDescription,
          },
          { title: 'Sourcing Assistance', path: PATH_DASHBOARD.employee.sourcingAssistance },
          { title: 'Interview Central', path: PATH_DASHBOARD.employee.interviewCentral },
          // { title: 'Request References', path: '  ' },
          { title: 'Proposal Letters', path: PATH_DASHBOARD.employee.proposalLetter },
          { title: 'Archive Jobs', path: PATH_DASHBOARD.employee.savedJob },
        ],
      },
      { title: 'Post a New Job', path: PATH_DASHBOARD.postJob, icon: ICONS.post_job },
      // { title: 'Jobs', path: PATH_DASHBOARD.jobs, icon: ICONS.jobs },
      {
        title: 'ShortListed Resume',
        path: PATH_DASHBOARD.shortListedResume,
        icon: ICONS.shortlist,
      },
      { title: 'Manage Jobs', path: PATH_DASHBOARD.allApplicants, icon: ICONS.manage_job },
      { title: 'Resume Alert', path: PATH_DASHBOARD.resumeAlets, icon: ICONS.alert },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     {
  //       title: 'user',
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'Four', path: PATH_DASHBOARD.user.four },
  //         { title: 'Five', path: PATH_DASHBOARD.user.five },
  //         { title: 'Six', path: PATH_DASHBOARD.user.six },
  //       ],
  //     },
  //   ],
  // },
];

const candidateNavbar = [
  {
    items: [
      {
        title: 'Jobs',
        path: PATH_DASHBOARD.candidate.jobs.searchJobs,
        icon: ICONS.jobs,
        children: [
          { title: 'Search Jobs', path: PATH_DASHBOARD.candidate.jobs.searchJobs },
          { title: 'Recommended Jobs', path: PATH_DASHBOARD.candidate.jobs.recommendedJobs },
          { title: 'Saved Jobs', path: PATH_DASHBOARD.candidate.jobs.savedJob },
          { title: 'Applied Jobs', path: PATH_DASHBOARD.candidate.jobs.appliedJob },
          { title: 'Job Alerts', path: PATH_DASHBOARD.candidate.jobs.jobAlert },
        ],
      },
      {
        title: 'Candidates Services',
        path: PATH_DASHBOARD.candidate.services.resumeBuilder,
        icon: ICONS.candidate_services,
        children: [
          { title: 'CV/ Resume Builder', path: PATH_DASHBOARD.candidate.services.resumeBuilder },
          // { title: 'Professional Profile Builder', path: '  ' },
          { title: 'Networking Oppurtunities', path: PATH_DASHBOARD.candidate.services.postResume },
          // { title: 'Job Assistance', path: '  ' },
          { title: 'Get Prepared', path: PATH_DASHBOARD.candidate.services.getPrepared },

          {
            title: 'Learning & Certification',
            path: PATH_DASHBOARD.candidate.services.certification,
          },
        ],
      },
      {
        title: 'Profile Analytics',
        path: PATH_DASHBOARD.candidate.updatesOnMyProfile,
        icon: ICONS.update_profile,
      },
      /*  {
        title: 'Quiz',
        path: PATH_DASHBOARD.candidate.quiz,
        icon: ICONS.quiz,
      }, */
      {
        title: 'Feedback',
        path: PATH_DASHBOARD.candidate.jobs.feedback,
        icon: ICONS.feedback,
      },
      { title: 'Upgrade', path: PATH_DASHBOARD.upgrade, icon: ICONS.upgrade },
    ],
  },
];

const candidateNavbar2 = [
  {
    items: [
      {
        title: 'Jobs',
        path: PATH_DASHBOARD.candidate.jobs.searchJobs,
        icon: ICONS.jobs,
        children: [
          { title: 'Search Jobs', path: PATH_DASHBOARD.candidate.jobs.searchJobs },
          { title: 'Recommended Jobs', path: PATH_DASHBOARD.candidate.jobs.recommendedJobs },
          { title: 'Saved Jobs', path: PATH_DASHBOARD.candidate.jobs.savedJob },
          { title: 'Applied Jobs', path: PATH_DASHBOARD.candidate.jobs.appliedJob },
          { title: 'Job Alerts', path: PATH_DASHBOARD.candidate.jobs.jobAlert },
        ],
      },
      {
        title: 'Candidates Services',
        path: PATH_DASHBOARD.candidate.services.resumeBuilder,
        icon: ICONS.candidate_services,
        children: [
          { title: 'CV/ Resume Builder', path: PATH_DASHBOARD.candidate.services.resumeBuilder },
          // { title: 'Professional Profile Builder', path: '  ' },
          { title: 'Networking Oppurtunities', path: PATH_DASHBOARD.candidate.services.postResume },
          // { title: 'Job Assistance', path: '  ' },
          { title: 'Get Prepared', path: PATH_DASHBOARD.candidate.services.getPrepared },

          {
            title: 'Learning & Certification',
            path: PATH_DASHBOARD.candidate.services.certification,
          },
        ],
      },
      {
        title: 'Profile Analytics',
        path: PATH_DASHBOARD.candidate.updatesOnMyProfile,
        icon: ICONS.update_profile,
      },
      /*  {
        title: 'Quiz',
        path: PATH_DASHBOARD.candidate.quiz,
        icon: ICONS.quiz,
      }, */
      // {
      //   title: 'Feedback',
      //   path: PATH_DASHBOARD.candidate.jobs.feedback,
      //   icon: ICONS.feedback,
      // },
      { title: 'Upgrade', path: PATH_DASHBOARD.upgrade, icon: ICONS.upgrade },
    ],
  },
];

const superAdminNavbar = [
  {
    items: [
      { title: 'Dashboard', path: PATH_DASHBOARD.superadmin.dahsboard, icon: ICONS.dashboard },
      {
        title: 'Users',
        path: PATH_DASHBOARD.superadmin.user,
        icon: ICONS.user,
      },
      {
        title: 'Companies',
        path: PATH_DASHBOARD.superadmin.companies,
        icon: ICONS.ecommerce,
      },
      {
        title: 'Article',
        path: PATH_DASHBOARD.superadmin.article,
        icon: ICONS.doc,
      },
      {
        title: 'Quiz',
        path: PATH_DASHBOARD.superadmin.quiz,
        icon: ICONS.quiz,
      },
      {
        title: 'Rules for quiz',
        path: PATH_DASHBOARD.superadmin.quiz_rule,
        icon: ICONS.rules,
      },
      {
        title: 'Post a job',
        path: PATH_DASHBOARD.superadmin.post_job,
        icon: ICONS.jobs,
      },
      {
        title: 'Create Company',
        path: PATH_DASHBOARD.superadmin.create_company,
        icon: ICONS.user,
      },
      { title: 'Jobs', path: PATH_DASHBOARD.jobs, icon: ICONS.jobs },
      { title: 'Feedbacks', path: PATH_DASHBOARD.superadmin.feedbacks, icon: ICONS.feedback },
    ],
  },
];

const NavItems = () => {
  const { user } = useAuthContext();
  return [
    {
      items: [
        { title: 'Home', path: PATH_DASHBOARD.home },
        {
          title: 'Search',
          path:
            // eslint-disable-next-line no-nested-ternary
            user?.role_id === 3
              ? PATH_DASHBOARD.candidate.jobs.searchJobs
              : user?.role_id === 2
                ? '/all-applicants'
                : PATH_AUTH.login,
        },
        { title: 'Service', path: PATH_AUTH.login },
        { title: 'About', path: PATH_DASHBOARD.aboutUs },
      ],
    },
  ];
};

export { navConfig, candidateNavbar, NavItems, superAdminNavbar, candidateNavbar2 };
