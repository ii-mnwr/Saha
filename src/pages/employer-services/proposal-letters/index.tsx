import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Container,
  Divider,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Editor from 'src/components/editor/Editor';
import { useEmployeeServices, useSendJobOffer } from 'src/hooks/useEmployeeServices';
import { useSnackbar } from 'src/components/snackbar';

import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { CopyIcon, DraftIcon, SendIcon } from 'src/theme/overrides/CustomIcons';
import axiosInstance from 'src/utils/axios';

const initialLetter = ` <div style="white-space: pre-wrap">Dear [Candidate Name],

[Company name] is delighted to offer you the [full-time, part-time, etc.] position of [job title] with an anticipated start date of [start date], contingent upon [background check, drug screening, etc.]. As the [job title], you will be responsible for [brief mention of job responsibilities and expectations].

You will report directly to [manager/supervisor name and title] at [workplace location]. Working hours are from [hours of day, days of week].

The starting salary for this position is [dollar amount] per [hour, year, etc.]. Payment is on a [weekly, biweekly, monthly, etc.] basis by [direct deposit, check, etc.], starting on [date of first pay period]. In addition, you will be eligible to receive [discuss additional compensation potential].[Company name] offers a comprehensive benefits program, which includes [medical insurance, 401(k), paid time off, etc.].

Your employment with [company name] will be on an at-will basis, which means you and the company are free to terminate employment at any time, with or without cause or advance notice. This letter is not a contract indicating employment terms or duration.

Please confirm your acceptance of this offer by signing and returning this letter by [offer expiration date].

Sincerely,
[Your Signature]
[Your Printed Name]
[Your Job Title]

Candidate Signature:
Candidate Printed Name:
Date:
</div>`;

ProposalLetter.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Employer Services', href: '#' },
      { name: 'Proposal Letter', href: '#' },
    ]}
    title="Proposal Letter"
  >
    {page}
  </DashboardLayout>
);

const fetchJobs = async (filter: any) => {
  const tempFilter = {
    ...filter,
  };
  const response = await axiosInstance.post('/jobs/list', tempFilter);
  return response?.data;
};

export default function ProposalLetter() {
  const searchParams = useSearchParams();

  const userEmail = searchParams.get('email') || '';
  const job_id = searchParams.get('job_id') || '';
  const application_id = searchParams.get('application_id') || '';

  const { sendEmailApplication, sendEmail } = useEmployeeServices();

  const { mutate: mutateSendofferletter, isLoading } = useSendJobOffer();

  const [proposalLetterData, setProposalLetterData] = useState({
    subject: '',
    email: userEmail,
    body: initialLetter,
    job_id,
    candidate_id: '',
  });

  useEffect(() => {
    if (userEmail) {
      setProposalLetterData((data) => ({
        ...data,
        email: userEmail,
      }));
    }
  }, [userEmail]);

  useEffect(() => {
    if (job_id) {
      setProposalLetterData((data) => ({
        ...data,
        job_id,
      }));
    }
  }, [job_id]);

  const handleLetterChange = (value: any) => {
    setProposalLetterData((data: any) => ({
      ...data,
      body: value,
    }));
  };

  const { data: jobData } = useQuery(['job'], () =>
    fetchJobs({
      sort: 'id:desc',
      paginate: false,
    })
  );

  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Head>
        <title>Proposal Letter</title>
      </Head>
      <Container maxWidth="xl">
        <Card sx={{ padding: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography
              sx={{
                fontWeight: 700,
                fontFamily: 'Work Sans,sans-serif',
                color: '#086BFF',
                fontSize: 20,
              }}
            >
              Standard job offer letter template
            </Typography>
            {/* <Box
              sx={{
                width: 110,
                height: 40,
              }}
            >
              <DraftIcon />
            </Box> */}
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box />
            <Typography
              sx={{
                fontFamily: 'Work Sans,sans-serif',
                color: '#85B6FF',
                fontSize: 20,
                fontWeight: 700,
                mb: 2,
              }}
              textAlign="center"
            >
              The power of the written word can bridge gaps and build connections.
            </Typography>
            {/* <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box
                sx={{
                  width: 40,
                  height: 40,
                }}
              >
                <SendIcon />
              </Box>
              <Box
                sx={{
                  width: 40,
                  height: 35,
                  paddingBottom: 5,
                }}
              >
                <CopyIcon />
              </Box>
            </Box> */}
          </Box>
          <Select
            fullWidth
            value={proposalLetterData?.job_id || ''}
            onChange={(event) => {
              setProposalLetterData((data) => ({ ...data, job_id: event.target.value }));
            }}
            renderValue={(selected) => {
              console.log('🚀 ~ ProposalLetter ~ selected:', selected);
              if (!jobData) {
                // Display loading state
                return <em>Loading jobs...</em>;
              }
              if (!selected) {
                // Default placeholder when no job is selected
                return <em>Select job</em>;
              }
              const selectedJob = jobData.data.find((item: any) => item.id == selected);
              return selectedJob ? selectedJob.title : <em>Select job</em>;
            }}
          >
            <MenuItem value="" disabled>
              <em>Select job</em>
            </MenuItem>
            {jobData?.data?.map((item: any) => (
              <MenuItem key={item.id} value={item.id}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
          <Box
            component="form"
            sx={{
              textAlign: 'center',
            }}
          >
            <TextField
              fullWidth
              label="Email-To"
              margin="normal"
              variant="outlined"
              value={proposalLetterData?.email}
              onChange={(e) =>
                setProposalLetterData((msg: any) => ({
                  ...msg,
                  email: e.target.value,
                }))
              }
            />
            <TextField
              fullWidth
              label="Subject"
              margin="normal"
              variant="outlined"
              onChange={(e) =>
                setProposalLetterData((msg: any) => ({
                  ...msg,
                  subject: e.target.value,
                }))
              }
              sx={{ mb: 3 }}
            />
            <Editor
              simple
              value={proposalLetterData?.body}
              id="proposal-letter"
              isTollbar={false}
              placeholder="Proposal-letter"
              onChange={(value: any) => handleLetterChange(value)}
              // style={{ backgroundColor: '#B2CAF5' }}
              sx={{ flexGrow: 1 }}
              displayEditor={false}
            />

            <LoadingButton
              variant="contained"
              color="primary"
              sx={{ my: 2, py: 1, px: 4, fontWeight: 600, fontSize: 18 }}
              loading={isLoading}
              onClick={() => {
                mutateSendofferletter(
                  {
                    job_id: Number(job_id),
                    application_id: Number(application_id),
                    email: proposalLetterData?.email,
                    // subject: proposalLetterData?.subject,
                    template: proposalLetterData?.body,
                  },
                  {
                    onSuccess: (response) => {
                      enqueueSnackbar(response?.message || 'Email Sent successfully', {
                        variant: 'success',
                      });
                    },
                    onError: (error: any) => {
                      enqueueSnackbar(error?.message || 'failed to send', {
                        variant: 'error',
                      });
                    },
                  }
                );
                // sendEmailApplication({
                //   email: proposalLetterData?.email,
                //   subject: proposalLetterData?.subject,
                //   body: proposalLetterData?.body,
                // });
              }}
            >
              Submit
            </LoadingButton>
          </Box>
        </Card>
      </Container>
    </>
  );
}
