/* eslint-disable no-useless-escape */
import { description } from 'src/_mock/assets';

export const careerArr = [
  'Development & IT',
  'Design & Creative',
  'Digital Marketing',
  'Finance & Account',
  'Music & video',
  'Engineering',
];

export const companyLogo = [
  '/assets/companyLogo/logo_1.png',
  // '/assets/companyLogo/logo_2.png',
  '/assets/companyLogo/logo_3.png',
  '/assets/companyLogo/logo_4.png',
  '/assets/companyLogo/logo_5.png',
];

export const recentJob = [
  {
    img: '/assets/img1.png',
    jobTitle: 'WebSite Design For Customer Shop',
    postName: 'Angular Development',
    place: 'USA',
    value: '$200',
  },
  {
    img: '/assets/img2.png',
    jobTitle: 'UI/UX for Cryptography Exchange',
    postName: 'Web Development',
    place: 'UK',
    value: '$250',
  },
  {
    img: '/assets/img3.png',
    jobTitle: 'Build A Coaching Website Product Store images',
    postName: 'SEO Analyst',
    place: 'USA',
    value: '$300',
  },
];

export const ourServiceArr = [
  {
    icon: '/assets/ourServiceIcons/people.svg',
    title: 'People management',
  },
  {
    icon: '/assets/ourServiceIcons/job_search.svg',
    title: 'Easy hire and job search',
  },
  {
    icon: '/assets/ourServiceIcons/training.svg',
    title: 'Personal Development and training',
  },
];

export const userInfo = [
  {
    image: '/assets/user photos/user_1.png',
    description:
      'Working with TalentsReach transformed our recruitment process. Their expertise and support made all the difference in finding the right candidates for our team.',
    name: 'Rashid Sharafudheen',
    position: 'Operations and Administrative Manager',
    company: 'Delight International Security Services',
    rating: 5,
  },
  // {
  //   image: '/assets/user photos/user_1.png',
  //   description:
  //     'Talentsreach.com is a game-changer in the recruitment industry. The platform is intuitive, efficient, and connects employers with top-tier candidates seamlessly. Its user-friendly interface made posting jobs and managing applications a breeze. Talentsreach truly stands out for its commitment to qualify talent acquisition and exceptional customer service. I highly recommend it to anyone looking to build a strong skilled team or seeking the right career opportunity.',
  //   name: 'Rashid Sharafudheen',
  //   position: 'Operations and Administrative Manager',
  //   company: 'Delight International Security Services',
  //   rating: 5,
  // },
  {
    image: '/assets/user photos/user_2.png',
    name: 'Fouad Thabit',
    position: 'Managing Director',
    company: '-',
    description:
      'Talentsreach.com has been explicitly serving the recruitment needs of my organization in managing and hunting the required manpower.',
    rating: 4.5,
  },
  {
    image: '/assets/user photos/user_3.png',
    name: 'Ahmed Saleh',
    position: 'Operations Manager',
    company: 'Premium Powder Coating',
    description:
      'Talentsreach.com helped me in upskilling for my career advancement landing to a perfect job.',
    rating: 4.5,
  },
];

export const cardArr = [
  { icon: '/assets/emp.svg', val: '9200+', text: 'Registered Candidates' },
  { icon: '/assets/projectss.svg', val: '8070+', text: 'Projects Added' },
  { icon: '/assets/com-projects.svg', val: '9198', text: 'Completed Projects' },
  { icon: '/assets/registered-compnies.svg', val: '657', text: 'Registered Companies' },
];

export const contactUsSocial = [
  // { path: '/assets/social_Icons/Twitter.png' },
  { path: '/assets/social_Icons/Ig.png', url: 'https://www.instagram.com' },
  { path: '/assets/social_Icons/FB.png', url: 'https://www.facebook.com' },
];

export const headerMenu = [
  {
    icon: '/assets/userIcons/user-group.png',
    title: 'Login',
    link: '/login',
  },
  {
    icon: '/assets/userIcons/user-add.png',
    title: 'Sign Up',
    link: '/sign-up',
  },
];

export const dashboardCandidates = [
  {
    c_img: '/assets/candidates/candidate1.png',
    c_name: 'Esther Witting',
    c_position: 'Software Engineer',
    c_details:
      "I'm Esther, a passionate and innovative Software Engineer with a knack for turning complex problems into elegant solutions.",
  },
  {
    c_img: '/assets/candidates/candidate2.png',
    c_name: 'Flora Rath',
    c_position: 'Junior Ul Designer',
    c_details:
      "Hello, I'm Flora, a young and enthusiastic Junior Ul Designer with a passion for creativity and innovation.",
  },
  {
    c_img: '/assets/candidates/candidate3.png',
    c_name: 'Floyd Wiegand',
    c_position: 'Technical Support Engineer',
    c_details:
      "Hello, I'm Flora, a young and enthusiastic Junior Ul Designer with a passion for creativity and innovation.",
  },
  {
    c_img: '/assets/candidates/candidate1.png',
    c_name: 'Whitney Conroy',
    c_position: 'Product Designer',
    c_details:
      "Hey there, I'm Whitney, a versatile and imaginative Product Designer. My passion lies in crafting meaningful and user-centered experiences.",
  },
];

export const candidateFilterInput = [
  {
    label: 'Job Title',
    placeholder: 'Enter Job Title',
  },
  {
    label: 'Location',
    placeholder: 'Enter Location',
  },
  {
    label: 'Years Of Experience',
    placeholder: 'Enter Years Of Experience',
  },
  {
    label: 'Type of Employment',
    placeholder: 'Enter Type of Employment',
  },
  {
    label: 'Nationality',
    placeholder: 'Enter Nationality',
  },
  {
    label: 'Education',
    placeholder: 'Enter Education',
  },
  {
    label: 'Gender',
    placeholder: 'Enter Gender',
  },
  {
    label: 'Age Group',
    placeholder: 'Enter Age Group',
  },
  {
    label: 'Licence',
    placeholder: 'Enter Licence',
  },
  {
    label: 'Notice Period',
    placeholder: 'Enter Notice Period',
  },
  {
    label: 'Current/Post Employer',
    placeholder: 'Enter Current/Post Employer',
  },
  {
    label: 'Language',
    placeholder: 'Enter Language',
  },
];

export const emailTemplates = [
  {
    email: '',
    subject: '',
    title: 'Welcome email template',
    id: 1,
    type: 'welcome_email',
    description:
      'A welcome email is an opportunity to nurture newly formed relationships with your first- time subscribers. It will serve as an introduction to your brand and let your readers know what you are all about. ',
    message: `<div style="white-space: pre-wrap">
    Welcome to [brand name]. We are happy to have you join our community.
    
    [Brand name] goal is to create [add goal and/or mission of your brand].
    
    We promise to only send you emails [add how many times per week you will be sending an email].
    
    All our emails will offer valuable information to help you along your journey and we may occasionally recommend a product that we believe in.
    
    We hope you enjoy your time with us and, in the meantime, feel free to check our [educational resources of your brand]
    
    From,
    [Company/Employer name]
    </div>`,
  },
  {
    email: '',
    subject: '',
    title: 'Cover letter email template',
    id: 2,
    type: 'cover_letter',
    description:
      'You can use the following cover letter professional email template and adjust it to your needs.',
    message: `<div style="white-space: pre-wrap">
    Dear [name],
    
    When I saw that you were looking for [position], I became excited. For a long time, I have been following your company’s success with [their expertise].

    I am reaching out to express my interest to work with your team. I am confident that my experience in [relevant experience] makes me a good fit for this position.
    
    In my previous position as [job title] for [company], I [explain your previous job responsibilities]. Some of my strongest sides are [list your qualities] and I am eager to apply this to help you with [business need].
    
    Please find my resume attached with further details on my qualifications. Thank you for taking the time to read my application.

    I look forward to hearing from you soon.
    
    From,
    [Your name]
    </div>`,
  },
  {
    email: '',
    subject: '',
    title: 'Verification email template (also known as double opt-in email)',
    id: 3,
    type: 'verification_email',
    description:
      'As such, the goal is to briefly greet the new sign-up and lead them to the call-to-action (CTA) button as soon as possible.',
    message: `<div style="white-space: pre-wrap">
    Hey [name],

    Thank you for signing up to my weekly newsletter. Before we get started, you‘ll have to confirm your email address.
    
    Click on the button below to verify your email address and you‘re officially one of us!
    
    [CTA button]
    </div>`,
  },
  {
    email: '',
    subject: '',
    title: 'Sales email template',
    id: 4,
    type: 'sales_email',
    description:
      'A sales email’s goal is to capture the attention of the person you are trying to form a relationship with, land a sales meeting, jump on a phone call or agree on a next step.',
    message: `<div style="white-space: pre-wrap">
    Hey [name],

    I hope this email finds you well. Let me start by saying that I am a big fan of your work and it has inspired me to push myself beyond what I thought were my limits!
    
    I am reaching out because [reason].
    
    After taking a good look at [target company] I realise that you could improve in [improvement area]. I have helped many others improve in the same area and I‘d be more than happy to talk with you about it!
    
    Would you be available for a quick call to discuss how our [product/service] could help you?
    
    Regards,
    
    [Name]
    </div>`,
  },
  {
    email: '',
    subject: '',
    title: 'Follow-up email template for sales emails',
    id: 5,
    type: 'follow_up_email',
    description:
      'On many occasions, the first sales email you send out will get ignored, unnoticed or forgotten.In this case, a follow-up email is the best thing you can do to open the door to a conversation and form a relationship with a prospect or lead.',
    message: `<div style="white-space: pre-wrap">
    Dear [name],

    You are probably very busy, I totally understand that!
    
    I‘m writing to follow up on my latest email. I still haven‘t heard back from you and was wondering if you have had the time to consider my proposal.
    
    It would be great to hear back from you. So, please let me know when you find some time.
    
    Regards,
    
    [Your name]
    </div>`,
  },
  {
    email: '',
    subject: '',
    title: 'Confirmation email template',
    id: 6,
    type: 'confirmational_email',
    description:
      'A confirmation email acts as an assurance to your customer that their order is being processed. It is sent right after you receive a customer‘s order to let them know that everything worked like a charm.',
    message: `<div style="white-space: pre-wrap">
    Hi [name],

    Thanks for shopping with us. We‘ve received your order and we are already getting started on it.
    
    Once everything is ready to ship and confirmed, we will let you know. You will receive tracking information and other details within the next email.
    
    To show our appreciation you will receive Free Shipping on your next order. All you have to do is enter Promo Code [enter promo code] at your next checkout!
    
    See you soon!
    </div>`,
  },
  {
    email: '',
    subject: '',
    title: 'Meeting invitation email template (business)',
    id: 7,
    type: 'meeting_invitation',
    description:
      'You can send out a meeting invitation email to share pertinent details with potential attendees. Include a location, date, time and meeting notes to make sure that everybody knows where to be and when and what they need to do to prepare (if anything)',
    message: `<div style="white-space: pre-wrap">
    Hey [name]!

    In order to discuss [meeting‘s purpose] and to [other meeting objectives], a meeting has been scheduled.
    
    I am looking forward to seeing you at [location], at [time] on [date].
    
    Below you will find the agenda for our meeting:
    
    [Meeting agenda]
    
    If you cannot confirm your attendance or you have any uncertainties, please let me know.
    
    Have a nice day!
    </div>`,
  },
  {
    email: '',
    subject: '',
    title: 'Sample introduction email template (personal)',
    id: 8,
    type: 'introduction_email',
    description:
      'An introduction email is a good way to explain your purpose of emailing and give a short overview of who you are and why you’re reaching out. A good email will be personalised, concise, get straight to the point and include a CTA or potential next step.',
    message: `<div style="white-space: pre-wrap">
    Hi [name],

    [Common friend’s name] recently handed me your business card as we were discussing [topic].
    
    So here I am, writing this email to introduce myself and explain why I am reaching out.
    
    [A short intro on yourself]
    
    [Your value proposition]
    
    Let me know if you’d like to connect.
    
    Regards,
    [Your name]
    </div>`,
  },
  {
    email: '',
    subject: '',
    title: 'Professional reference letter template',
    id: 9,
    type: 'reference_letter',
    description:
      ' A reference letter is used to endorse a person‘s skills. It’s usually needed to get a much-desired job or apply for an academic course. They’‘re mostly written by previous employers or academic tutors depending on your situation.',
    message: `<div style="white-space: pre-wrap">
    Dear [name],

    I am writing to recommend [recommended person]. [he/she] was working/studying with us here at [organisation name] as a [position] for [period of time].
    
    I am [your position] of [organisation name] and [recommended person] worked with me on [projects].
    
    During [his/hers] time here, [he/she] proved to have [skills/knowledge/ability]. I have always valued [qualities] amongst my [team/students] and [recommended person] never failed to deliver that.
    
    I am sure that you would also find [recommended person] easy to work with.
    
    If you have any questions please don‘t hesitate to contact me.
    
    Kind regards,
    
    [Your name]
    </div>`,
  },
  {
    email: '',
    subject: '',
    title: 'Thank you email template',
    id: 10,
    type: 'thankyou_email',
    description:
      'Send a post-interview thank you email to express your appreciation for their time. This might improve your chances of landing the job.',
    message: `<div style="white-space: pre-wrap">
    Dear [name],

    Thank you for taking the time to meet me today. I found our conversation really interesting.
    
    I enjoyed learning about this opportunity and I am confident that my skills and experience will allow me to succeed in [job position] at your company.
    
    I am looking forward to hearing back from you about the next steps. Please let me know if you have any questions.
    
    Thank you again and I hope to hear back from you soon.
    
    Regards,
    
    [Your name]
    </div>`,
  },
];