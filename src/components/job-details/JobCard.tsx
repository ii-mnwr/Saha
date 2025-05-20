import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Avatar, Divider, List, ListItem, ListItemText, Stack } from '@mui/material';
import Image from 'next/image';
import { HOST_URL } from 'src/config-global';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import usePostRequest from 'src/hooks/usePost';
import { useSnackbar } from 'src/components/snackbar';
import Markdown from '../markdown/Markdown';

const JobDesCard = ({ job, refetch }: { job: any; refetch?: any }) => {
  const { enqueueSnackbar } = useSnackbar();
  const updateJobPost = usePostRequest();
  const updateJob = (data: any) => {
    const url = '/jobs/update';
    updateJobPost.mutate(
      [
        url,
        {
          ...data,
        },
      ],
      {
        onSuccess: (response: any) => {
          enqueueSnackbar(response?.message || 'Draft saved successfully', {
            variant: 'success',
          });
          if (refetch) refetch();
        },
        onError: (error: any) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      }
    );
  };

  return (
    <Card sx={{ boxShadow: 'none' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Avatar
              variant="square"
              alt={job?.title}
              src={`${HOST_URL}${job?.company?.profile_image_path}`}
              sx={{
                width: 110,
                height: 80,
                borderRadius: 1,
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', pl: 2 }}>
              <Typography variant="h4" color="#086BFF" component="div">
                {job?.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {job?.vacancy} {job?.vacancy > 1 ? 'vacancies' : 'vacancy'}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box
              onClick={() => {
                updateJob({ id: job?.id, status: job?.status === 'Draft' ? 'Open' : 'Draft' });
              }}
              sx={{
                cursor: 'pointer',
              }}
            >
              {job?.status === 'Draft' ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          // justifyContent="space-between"
          gap={2}
          flexWrap="wrap"
          sx={{ color: 'gray', fontSize: '14px', mt: 2 }}
        >
          <Typography>
            <strong>Experience:</strong> {job?.experience}
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ borderColor: '#AEAEAE' }} />
          <Typography>
            <strong>Employee Type:</strong> {job?.job_type}
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ borderColor: '#AEAEAE' }} />
          <Typography>
            <strong>Position:</strong> {job?.title}
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ borderColor: '#AEAEAE' }} />
          <Typography>
            <strong>Salary Offered:</strong> {job?.salary_min} - {job?.salary_max}
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ borderColor: '#AEAEAE' }} />
          <Typography>
            <strong>Location:</strong> {job?.location}
          </Typography>
        </Box>
      </CardContent>

      <Card sx={{ maxWidth: '100%', boxShadow: '2px 2px 4px 0px #6D88C2', borderRadius: 2, m: 2 }}>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            Job Description:
          </Typography>
          <Markdown>{job?.description}</Markdown>
        </CardContent>
      </Card>
    </Card>
  );
};

export default JobDesCard;
