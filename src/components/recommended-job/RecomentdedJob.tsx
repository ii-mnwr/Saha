import React from 'react';
import { Card, CardContent, Typography, Chip, Avatar, Box } from '@mui/material';
import { BookmarkIconBold, LocationIcon } from 'src/theme/overrides/CustomIcons';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { LoadingButton } from '@mui/lab';
import usePostRequest from 'src/hooks/usePost';
import { useSnackbar } from 'src/components/snackbar';
import { fDate, fDateTime } from 'src/utils/formatTime';
import useCopyToClipboard from 'src/hooks/useCopyToClipboard';
import { HOST_URL } from 'src/config-global';
import ApplyJob from '../applyJob';

const RecommendedJob = ({ item, setRefresh }: any) => {
  const { copy } = useCopyToClipboard();
  const applyJob = usePostRequest();
  const { enqueueSnackbar } = useSnackbar();

  const handleApplyNow = () => {
    const url = '/jobs/apply';

    applyJob.mutate(
      [
        url,
        {
          job_id: item?.id,
          company_id: item?.company_id,
        },
      ],
      {
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
      }
    );
  };

  const saveJob = usePostRequest();

  const handleSaveJob = (job: any) => {
    const url = job?.savedJob?.length > 0 ? '/jobs/unsave' : '/jobs/save';

    saveJob.mutate(
      [
        url,
        {
          job_id: job?.id,
        },
      ],
      {
        onSuccess: (response: any) => {
          // Handle success
          enqueueSnackbar(response?.message || 'Saved successfully', {
            variant: 'success',
          });
          setRefresh((flag: boolean) => !flag);
        },
        onError: (error: any) => {
          // Handle error
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      }
    );
  };

  return (
    <Card
      sx={{
        maxWidth: 450,
        minHeight: 350,
        borderRadius: 1,
        border: '1px solid #6D88C24D',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: { xs: 'column' },
        width: '100%',
      }}
    >
      <LoadingButton
        sx={{ position: 'absolute', top: 2, right: 0, m: 3, cursor: 'pointer' }}
        loading={saveJob.isLoading}
        onClick={(e) => {
          e.stopPropagation();
          handleSaveJob(item);
        }}
      >
        {item?.savedJob?.length > 0 ? <BookmarkIcon /> : <BookmarkIconBold />}
      </LoadingButton>
      <Box
        sx={{
          bgcolor: '#F134F71F',
          borderRadius: '0 10px 10px 0',
          paddingY: 0.5,
          paddingX: 2,
          color: '#F117FA',
          fontWeight: 400,
          fontSize: 11,
          width: 'fit-content',
          fontFamily: 'Work Sans,sans-serif',
          position: 'absolute',
          top: 2,
          left: 0,
          mt: 3,
        }}
      >
        {item?.job_type}
      </Box>
      {/* <Box display="flex" flexDirection="column" gap={2} marginTop={2}>
        <LoadingButton
          sx={{ position: 'absolute', top: 2, right: 0, m: 3, cursor: 'pointer' }}
          loading={saveJob.isLoading}
          onClick={() => handleSaveJob(item)}
        >
          {item?.savedJob?.length > 0 ? <BookmarkIcon /> : <BookmarkIconBold />}
        </LoadingButton>
        <Box
          sx={{
            bgcolor: '#F7756426',
            borderRadius: '0 10px 10px 0',
            paddingY: 0.5,
            paddingX: 2,
            color: '#FF0808FC',
            fontWeight: 400,
            fontSize: 11,
            width: 'fit-content',
            fontFamily: 'Work Sans,sans-serif',
          }}
        >
          Freelancer
        </Box>
        <Box
          sx={{
            bgcolor: '#F134F71F',
            borderRadius: '0 10px 10px 0',
            paddingY: 0.5,
            paddingX: 2,
            color: '#F117FA',
            fontWeight: 400,
            fontSize: 11,
            width: 'fit-content',
            fontFamily: 'Work Sans,sans-serif',
          }}
        >
          Internship
        </Box>
      </Box> */}

      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
      <Chip label="Freelancer" variant="outlined" color="primary" />
      <Chip label="Full Time" color="secondary" />
      <Chip label="Internship" variant="outlined" />
    </Box> */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          my: 2,
          alignItems: 'center',
          gap: 2,
          width: '100%',
        }}
      >
        {/* Replace with actual logo */}
        <Avatar
          variant="square"
          sx={{ width: 100, height: 100, borderRadius: 1, border: '1px solid #6D88C24D' }}
          alt={item?.company?.name}
          src={`${HOST_URL}${item?.company?.profile_image_path}`}
        />
        <Typography color="#086BFF" fontFamily="Inter,sans-serif" fontWeight={600} fontSize={16}>
          {item?.company?.name}
        </Typography>
        <Typography
          color="#000"
          fontFamily="Inter,sans-serif"
          fontWeight={600}
          textAlign="center"
          fontSize={16}
        >
          {item?.title}
        </Typography>
        <Typography
          color="#000"
          fontFamily="Inter,sans-serif"
          fontWeight={600}
          textAlign="center"
          fontSize={16}
        >
          Posted date: {fDate(item?.postedAt)}
        </Typography>
        <Typography
          color="#000"
          fontFamily="Inter,sans-serif"
          fontWeight={600}
          textAlign="center"
          fontSize={16}
        >
          Salary: {item?.salary_min} - {item?.salary_max}
        </Typography>
        <Typography
          color="#000"
          fontFamily="Inter,sans-serif"
          fontWeight={600}
          textAlign="center"
          fontSize={16}
        >
          Last date: {fDate(item?.application_deadline)}
        </Typography>
        <Typography
          color="#000"
          fontFamily="Inter,sans-serif"
          fontWeight={600}
          textAlign="center"
          fontSize={16}
        >
          Application Type:{' '}
          {item?.application_type == 'company_site' ? 'Company site' : 'Easy apply'}
        </Typography>

        <Box display="flex" flexDirection="row" gap={1} alignItems="center" justifyContent="center">
          <LocationIcon />
          <Typography color="#000" fontFamily="Inter,sans-serif" fontWeight={300} fontSize={13}>
            {item?.location}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 1, md: 0 },
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <LoadingButton
          sx={{
            paddingX: 3,
            paddingY: 1,
            fontWeight: 400,
            fontFamily: 'Work Sans,sans-serif',
            fontSize: 14,
          }}
          variant="outlined"
          loading={applyJob?.isLoading}
          onClick={(e) => {
            e.stopPropagation();
            copy(
              `${window.location.origin}/candidate/jobs/recommended-jobs/job-details/${item?.id}`
            );
            enqueueSnackbar('Copied');
          }}
        >
          Link
        </LoadingButton>
        <ApplyJob job={item} setRefresh={setRefresh} />
        {/*  <LoadingButton
          sx={{
            paddingX: 3,
            paddingY: 1,
            color: '#FFF',
            fontWeight: 400,
            fontFamily: 'Work Sans,sans-serif',
            fontSize: 14,
            background: '#086BFF',
          }}
          variant="contained"
          loading={applyJob?.isLoading}
          onClick={(e) => {
            e.stopPropagation();
            if (item?.application_type == 'company_site') {
              window.open(item?.job_url, '_blank', 'noopener,noreferrer');
            } else {
              handleApplyNow();
            }
          }}
          disabled={item?.application?.length > 0}
        >
          {item?.application?.length > 0 ? 'Applied' : 'Apply Now'}
        </LoadingButton> */}
      </Box>
      {/* <Box
        display="flex"
        alignItems={{ xs: 'center', sm: 'unset' }}
        justifyContent="center"
        marginBottom={{ xs: 1, sm: 0 }}
      >
        <Box
          sx={{
            bgcolor: '#85B6FF5E',
            borderRadius: 3,
            paddingY: 0.5,
            paddingX: 2,
            color: '#086BFF',
            fontWeight: 400,
            fontSize: 11,
            fontFamily: 'Work Sans,sans-serif',
            height: 'fit-content',
            marginTop: 2,
            width: 'fit-content',
            marginRight: 1,
          }}
        >
          
        </Box>
      </Box> */}
    </Card>
  );
};

export default RecommendedJob;
