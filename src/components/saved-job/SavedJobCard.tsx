import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Avatar,
  Box,
  Divider,
  LinearProgress,
} from '@mui/material';
import { LocationIcon, RuppesIcon, TimeIcon } from 'src/theme/overrides/CustomIcons';
import { fToNow } from 'src/utils/formatTime';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { HOST_URL } from 'src/config-global';
import { useRouter } from 'next/router';

const JobCard = ({ jobitem, mutation }: any) => {
  console.log('jobitem', jobitem);
  const route = useRouter();
  const [progress, setProgress] = React.useState(50);
  return (
    <Card
      sx={{
        minWidth: { md: 275 },
        border: '1px solid #6D88C24D',
        paddingX: 1,
        paddingY: 2,
        height: '100%',
      }}
    >
      <CardContent
        sx={{
          padding: 2,
        }}
      >
        <Box
          onClick={() =>
            mutation.mutate({
              cardid: jobitem.id,
              status: jobitem?.status === 'Draft' ? 'Open' : 'Draft',
            })
          }
          sx={{
            position: 'absolute',
            top: 10,
            right: '15px',
            cursor: 'pointer',
          }}
        >
          <BookmarkIcon />
        </Box>
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'center' }} spacing={1}>
          <Avatar
            variant="square"
            alt={jobitem?.title}
            src={`${HOST_URL}${jobitem?.company?.profile_image_path}`}
            sx={{
              bgcolor: '#FFFFFF',
              border: '1px solid #6D88C24D',
              borderRadius: 1,
              width: 100,
              height: 100,
            }}
          />
          <Stack direction="column" spacing={1}>
            <Typography
              sx={{
                color: '#086BFF',
                fontFamily: 'Inter, sans-serif',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                width: '100%',
              }}
              // noWrap
              onClick={() => {
                route.push(`/job-details/${jobitem?.id}`);
              }}
            >
              {jobitem.title}
            </Typography>
            <Box display="flex" flexDirection="row" gap={1}>
              <TimeIcon />
              <Typography
                sx={{
                  color: '#000000',
                  fontFamily: 'Work Sans, sans-serif',
                  fontSize: 13,
                  fontWeight: 300,
                }}
              >
                {fToNow(jobitem?.updatedAt)}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="row" gap={1}>
              <LocationIcon />
              <Typography
                sx={{
                  color: '#000000',
                  fontFamily: 'Work Sans, sans-serif',
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                {jobitem.location}
              </Typography>
            </Box>
            {jobitem.salary_min && jobitem.salary_max && (
              <Box display="flex" flexDirection="row" gap={1}>
                <RuppesIcon />
                <Typography
                  sx={{
                    color: '#000000',
                    fontFamily: 'Work Sans, sans-serif',
                    fontSize: 13,
                    fontWeight: 400,
                  }}
                >
                  <b>
                    ₹{jobitem.salary_min} - ₹{jobitem.salary_max}
                  </b>
                </Typography>
              </Box>
            )}
          </Stack>
        </Stack>
        <Box paddingY={1}>
          <Divider
            variant="middle"
            sx={{
              borderColor: '#086BFF',
            }}
          />
          <Typography
            sx={{
              color: '#101010',
              fontFamily: 'Work Sans, sans-serif',
              fontSize: 14,
              fontWeight: 500,
              paddingY: 1,
              textAlign: 'center',
            }}
          >
            Status: Draft
          </Typography>
          <Divider
            variant="middle"
            sx={{
              borderColor: '#086BFF',
            }}
          />
        </Box>
        <Box display="flex" flexDirection="row" gap={1} flexWrap="wrap">
          <Chip
            label={jobitem.job_type}
            variant="outlined"
            sx={{
              bgcolor: '#85B6FF45',
              borderRadius: 1,
              color: '#086BFF',
              fontWeight: 400,
              fontFamily: 'Work Sans,sans-serif',
              fontSize: 11,
              border: 'transparent',
              padding: 1,
            }}
          />
        </Box>
        <Stack direction="row" justifyContent="space-between" sx={{ my: 1 }}>
          <Typography
            sx={{
              color: '#101010',
              fontFamily: 'Inter,sans-serif',
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {jobitem?._count?.new} New Applicant
          </Typography>
          <Typography
            sx={{
              color: '#FF3F3394',
              fontFamily: 'Inter,sans-serif',
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {jobitem?._count?.auto_rejected || 0} Auto Rejected
          </Typography>
        </Stack>
        <LinearProgress variant="determinate" value={progress} />
        <Typography
          sx={{
            mt: 2,
            color: '#85B6FF',
            fontWeight: 600,
            fontFamily: 'Inter,sans-serif',
            fontSize: 16,
          }}
        >
          {jobitem?._count?.application} Applicants{' '}
          <span
            style={{
              color: '#D9D9D9',
            }}
          >
            Of {jobitem?.vacancy} vacancy
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default JobCard;
