import { Button } from '@mui/material';
import { useState } from 'react';
import usePostRequest from 'src/hooks/usePost';
import { useSnackbar } from 'src/components/snackbar';
import { LoadingButton } from '@mui/lab';
import JobModel from './JobModel';

interface Props {
  job: any;
  setRefresh?: any;
  CustomButton?: React.ElementType; // Allow custom button component
}

const ApplyJob = ({ job, setRefresh, CustomButton }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const applyJob = usePostRequest();
  const [open, setOpen] = useState(false);
  const handleApplyNow = (data: any) => {
    const url = '/jobs/apply';

    applyJob.mutate([url, data], {
      onSuccess: (response: any) => {
        // Handle success
        enqueueSnackbar(response?.message || 'Reset password email sent successfully', {
          variant: 'success',
        });
        setRefresh((flag: boolean) => !flag);
      },
      onError: (error: any) => {
        // Handle error
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
  };

  const handleButtonClick = (data: any) => {
    if (job.application_type === 'easy_to_apply' && job?.questions?.lentgh > 0) {
      setOpen(true);
    } else if (job.application_type === 'company_site' && job.job_url) {
      window.open(job.job_url, '_blank', 'noopener,noreferrer');
    } else {
      handleApplyNow(data);
    }
  };

  const ButtonComponent = CustomButton || Button;
  return (
    <>
      <LoadingButton
        variant="contained"
        sx={{
          paddingX: 3,
          paddingY: 1,
          color: '#FFF',
          fontWeight: 400,
          fontFamily: 'Work Sans,sans-serif',
          fontSize: 14,
          background: '#086BFF',
        }}
        disabled={job?.application?.length > 0}
        loading={applyJob?.isLoading}
        onClick={(event: any) => {
          event.stopPropagation();
          handleButtonClick({ job_id: job?.id, company_id: job?.company_id, answers: [] });
        }}
      >
        {job?.application?.length > 0 ? 'Applied' : 'Apply Now'}
      </LoadingButton>
      {open && (
        <JobModel
          open={open}
          onClose={() => setOpen(false)}
          job={job}
          handleApplyNow={handleApplyNow}
        />
      )}
    </>
  );
};

export default ApplyJob;
