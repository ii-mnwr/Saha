// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  aboutUs: path('', '/about-us'),
  home: path('', '/'),
  postJob: path('', '/post-job'),
  jobs: path('', '/jobs'),
  allApplicants: path('', '/manage-job'),
  resumeAlets: path('', '/resume-alert'),
  upgrade: path('', '/upgrade'),
  shortListedResume: path('', '/shortlist'),
  one: path('', '/employee'),
  two: path(ROOTS_DASHBOARD, '/two'),
  three: path(ROOTS_DASHBOARD, '/three'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    four: path(ROOTS_DASHBOARD, '/user/four'),
    five: path(ROOTS_DASHBOARD, '/user/five'),
    six: path(ROOTS_DASHBOARD, '/user/six'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  employee: {
    dashboard: path('', '/dashboard/employer'),
    interviewCentral: path('', '/employer-services/interview-central'),
    GenerateJobDescription: path('', '/employer-services/generate-job-description'),
    sourcingAssistance: path('', '/employer-services/sourcing-assistance'),
    savedJob: path('', '/employer-services/saved-job'),
    createFolders: path('', '/employer-services/create-folders'),
    emailWriting: path('', '/employer-services/email-writing'),
    proposalLetter: path('', '/employer-services/proposal-letters'),
    resumeAlert: path('', '/employer-services/proposal-letters'),
  },
  candidate: {
    dashboard: path('', '/dashboard/candidate'),
    jobs: {
      searchJobs: path('', '/candidate/jobs/search-jobs'),
      recommendedJobs: path('', '/candidate/jobs/recommended-jobs'),
      savedJob: path('', '/candidate/jobs/saved-job'),
      appliedJob: path('', '/candidate/jobs/applied-job'),
      jobAlert: path('', '/candidate/jobs/job-alerts'),
      feedback: path('', '/candidate/feedback/create'),
    },
    services: {
      resumeBuilder: path('', '/candidate/services/resume-builder'),
      certification: path('', '/candidate/services/certification'),
      getPrepared: path('', '/candidate/services/get-prepared'),
      postResume: path('', '/candidate/services/networking_oppurtunities'),
    },
    updatesOnMyProfile: path('', '/candidate/updatesonmyprofile'),
    quiz: path('', '/candidate/quiz'),
  },
  superadmin: {
    user: path('/super-admin', '/all-applicants'),
    dahsboard: path('/super-admin', '/dashboard'),
    companies: path('/super-admin', '/companies'),
    quiz: path('/super-admin', '/quiz'),
    quiz_rule: path('/super-admin', '/rule'),
    article: path('/super-admin', '/article'),
    post_job: path('/super-admin', '/post-job'),
    create_company: path('/super-admin', '/create-company'),
    feedbacks: path('/super-admin', '/feedbacks'),
  },
};
