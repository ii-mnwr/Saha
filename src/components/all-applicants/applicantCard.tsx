import React, { useEffect, useState } from 'react';
import { Card, Typography, Avatar, IconButton, Box, Tooltip } from '@mui/material';
import {
  CheckedIcon,
  CrossIcon,
  DeleteIcon,
  DownloadIcon,
  EyeIcon,
  LocationIcon,
  TimeIcon,
} from 'src/theme/overrides/CustomIcons';
import { useApplicants } from 'src/hooks/useApplicants';
import { useRouter } from 'next/router';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import ChatIcon from '@mui/icons-material/Chat';
import CancelIcon from '@mui/icons-material/Cancel';
import { HOST_URL } from 'src/config-global';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { fTimestamp, fToNow } from 'src/utils/formatTime';
import MoveFolderModel from './MoveFolderModel';
import InterviewSechdule from './InterviewSechdule';

const ProfileCard = ({ item, id, refetch }: any) => {
  console.log('itemitemitem', item);
  const [open, setOpen] = useState(false);
  const [openSechduleInterviewModel, setOpenSechduleInterviewModel] = useState(false);
  const router = useRouter();
  const { push } = useRouter();
  // This component assumes you have the profile information as props or state
  const profile = {
    name: 'Janathon Ronan',
    role: 'Product Designer',
    country: 'USA',
    workType: 'Full Time',
  };

  const { updateApplicationsApiCall, updateApplicationsMutate } = useApplicants();

  useEffect(() => {
    if (updateApplicationsMutate?.isSuccess) {
      if (refetch) refetch();
      updateApplicationsMutate?.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateApplicationsMutate]);

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          alignItems: { xs: 'center', md: 'flex-start' },
          flexDirection: { xs: 'column', md: 'row' },
          padding: 2,
          border: '1px solid #6D88C24D',
          gap: 1.5,
        }}
      >
        <Avatar
          alt={`${item?.name}`}
          variant="square"
          src={`${HOST_URL}${item?.img}`} // Replace with your image path
          sx={{ width: 120, height: 130, borderRadius: 1, border: '1px solid #6D88C24D' }}
        />
        <Box
          display="flex"
          flexDirection="column"
          alignItems={{ xs: 'center', md: 'flex-start' }}
          gap={1}
          width="100%"
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column-reverse', sm: 'row' },
              justifyContent: 'flex-end',
              width: '100%',
              gap: { xs: 1.4, md: 0 },
              alignItems: { xs: 'center', sm: 'baseline' },
            }}
          >
            <Box display="flex" flexDirection="row" gap={1}>
              <Tooltip title={item?.isApplicants ? 'Shortlist candidate' : 'Schedule Interview'}>
                <IconButton
                  sx={{
                    width: 30,
                    height: 30,
                    padding: 0,
                    ':hover': {
                      background: 'transparent',
                    },
                  }}
                  onClick={() => {
                    if (item?.isApplicants) {
                      updateApplicationsApiCall({ id: item?.applicationId, status: 'Shortlisted' });
                    } else {
                      setOpenSechduleInterviewModel(true);
                    }
                  }}
                >
                  {item?.isApplicants ? (
                    <CheckCircleIcon sx={{ color: '#086BFF' }} />
                  ) : (
                    <ScheduleSendIcon sx={{ color: '#086BFF' }} />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Move to folder">
                <IconButton
                  sx={{
                    borderRadius: '50%',
                    width: 30,
                    height: 30,
                    padding: 0,
                    ':hover': {
                      background: 'transparent',
                    },
                  }}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <DriveFileMoveIcon sx={{ color: '#086BFF' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Chat with user">
                <IconButton
                  sx={{
                    borderRadius: '50%',
                    width: 30,
                    height: 30,
                    padding: 0,
                    ':hover': {
                      background: 'transparent',
                    },
                  }}
                  onClick={() => {
                    router.push(`/dashboard/chat/?user=${item?.user_name}`);
                  }}
                >
                  <ChatIcon sx={{ color: '#086BFF' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Reject application">
                <IconButton
                  sx={{
                    borderRadius: '50%',
                    width: 30,
                    height: 30,
                    padding: 0,
                    ':hover': {
                      background: 'transparent',
                    },
                  }}
                  onClick={() =>
                    updateApplicationsApiCall({
                      id: item?.applicationId,
                      status: 'Rejected_By_Company',
                    })
                  }
                >
                  <CancelIcon sx={{ color: '#086BFF' }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography
              fontWeight={600}
              fontFamily="Inter,sans-serif"
              fontSize={16}
              color="#000"
              lineHeight={1}
              textTransform="capitalize"
            >
              {`${item?.name || item?.user_name || ''}`}
            </Typography>
            <Tooltip title={item?.designation}>
              <Typography
                fontWeight={600}
                fontFamily="Inter,sans-serif"
                fontSize={14}
                color="#086BFF"
                whiteSpace="nowrap"
              >
                {item?.designation}
              </Typography>
            </Tooltip>
            {item?.location && (
              <Box display="flex" alignItems="center" gap={1}>
                <LocationIcon />
                <Tooltip title={item?.location}>
                  <Typography
                    fontWeight={600}
                    fontFamily="Inter,sans-serif"
                    fontSize={14}
                    color="#086BFF"
                    whiteSpace="nowrap"
                  >
                    {item?.location}
                  </Typography>
                </Tooltip>
              </Box>
            )}
            {item?.title && (
              <Box display="flex" alignItems="center" gap={1}>
                <Tooltip title={item?.title}>
                  <Typography
                    fontWeight={600}
                    fontFamily="Inter,sans-serif"
                    fontSize={14}
                    color="#086BFF"
                    whiteSpace="nowrap"
                  >
                    Applied position: {item?.title}
                  </Typography>
                </Tooltip>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, md: 2 },
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: { md: '60%' },
                gap: { xs: 2, md: 0 },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TimeIcon />
                <Typography
                  fontWeight={300}
                  fontFamily="Work Sans,sans-serif"
                  fontSize={13}
                  color="#000000"
                >
                  {fToNow(item?.appliedAt)}
                </Typography>
              </Box>
            </Box>
            <Tooltip title="Candidate details">
              <Box sx={{ cursor: 'pointer' }} onClick={() => push(`candidate-details/${id}`)}>
                <DownloadIcon />
              </Box>
            </Tooltip>
          </Box>
        </Box>
      </Card>
      {open && id === item?.id && (
        <MoveFolderModel candidateId={item?.id} onClose={() => setOpen(false)} open={open} />
      )}
      {openSechduleInterviewModel && id === item?.id && (
        <InterviewSechdule
          candidateId={item?.id}
          onClose={() => setOpenSechduleInterviewModel(false)}
          open={openSechduleInterviewModel}
          jobId={item?.job_id}
        />
      )}
    </>
  );
};

export default ProfileCard;
