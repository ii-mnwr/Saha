import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Pagination,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { DownloadIcon, LocationIcon, RuppesIcon, TimeIcon } from 'src/theme/overrides/CustomIcons';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useApplicants } from 'src/hooks/useApplicants';
import { useRouter } from 'next/router';
import { HOST_URL } from 'src/config-global';
import MoveFolderModel from '../all-applicants/MoveFolderModel';

interface EmployeesListProps {
  candidates: [];
}

export const EmployeesList: React.FC<EmployeesListProps> = ({ candidates }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(-1);
  const { updateApplicationsApiCall } = useApplicants();
  const route = useRouter();
  const { push } = useRouter();
  return (
    <Box
      sx={{
        background: '#8396D71F',
        borderRadius: 2,
        p: 2,
        width: '100%',
        position: 'relative',
        pb: 8,
      }}
    >
      <Stack direction="column" spacing={2}>
        {candidates?.map((item: any, i: number) => (
          <>
            <Card
              sx={{
                borderRadius: 2,
                cursor: 'pointer',
              }}
              onClick={(event) => {
                push(`/candidate-details/${item?.id}`);
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: 'flex-start',
                  '&.MuiCardContent-root:last-child': {
                    paddingBottom: 0,
                    padding: 2,
                  },
                }}
              >
                <Avatar
                  variant="square"
                  src={`${HOST_URL}${item?.profile_image_path}`}
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: 2,
                  }}
                />
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', md: 'row' }}
                  justifyContent="space-between"
                  alignItems="flex-start"
                  width="100%"
                >
                  <Box display="flex" width="90%" flexDirection="column" gap={1}>
                    <Typography
                      fontFamily="Work Sans,sans-serif"
                      textTransform="capitalize"
                      fontWeight={400}
                      fontSize={18}
                      lineHeight={1}
                      mt={1}
                    >
                      {item?.first_name === null && item?.last_name === null
                        ? item?.user_name
                        : `${item?.first_name} ${item?.last_name}`}
                    </Typography>
                    <Typography fontFamily="Work Sans,sans-serif" fontWeight={600} fontSize={18}>
                      {item?.designation}
                    </Typography>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                      {item?.address?.address1 && (
                        <Box display="flex" flexDirection="row" gap={1} alignItems="center">
                          <LocationIcon />
                          <Typography
                            fontSize={12}
                            fontFamily="Work Sans,sans-serif"
                            fontWeight={300}
                            color="#000000"
                          >
                            {item?.address?.address1}
                          </Typography>
                        </Box>
                      )}
                      {item?.type_of_employment && (
                        <Box display="flex" flexDirection="row" gap={1} alignItems="center">
                          <TimeIcon />
                          <Typography
                            fontSize={12}
                            fontFamily="Work Sans,sans-serif"
                            fontWeight={300}
                            color="#000000"
                          >
                            {item?.type_of_employment}
                          </Typography>
                        </Box>
                      )}
                      {(item?.salary_min || item?.salary_max) && (
                        <Box display="flex" flexDirection="row" gap={1} alignItems="center">
                          <RuppesIcon />
                          <Typography
                            fontSize={12}
                            fontFamily="Work Sans,sans-serif"
                            fontWeight={300}
                            color="#000000"
                          >
                            {`$${item?.salary_min} - ${item?.salary_max}`}
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                    <Typography
                      fontWeight={300}
                      width="100%"
                      fontFamily="Work Sans,sans-serif"
                      color="#000000"
                      fontSize={16}
                    >
                      {item?.bio}
                    </Typography>
                  </Box>
                  <Box display="flex" flexDirection="row" gap={1} alignItems="center">
                    {/* <DownloadIcon /> */}
                    {/*  <Tooltip title="Chat">
                      <IconButton
                        sx={{
                          marginTop: 0.5,
                          // border: '2px solid #086BFF',
                          borderRadius: '50%',
                          padding: 0,
                          ':hover': {
                            background: 'transparent',
                          },
                        }}
                        onClick={(event) => {
                          event.stopPropagation();
                          route.push(`/dashboard/chat/${item?.user_name}`);
                        }}
                      >
                        <ChatBubbleIcon sx={{ color: '#086BFF', width: 30, height: 30 }} />
                      </IconButton>
                    </Tooltip> */}
                    <Tooltip title="Move to folder">
                      <IconButton
                        sx={{
                          // border: '2px solid #086BFF',
                          borderRadius: '50%',
                          padding: 0,
                          ':hover': {
                            background: 'transparent',
                          },
                        }}
                        onClick={(event) => {
                          event.stopPropagation();
                          setOpen(true);
                          setIndex(i);
                        }}
                      >
                        <DriveFileMoveIcon sx={{ color: '#086BFF', width: 30, height: 30 }} />
                      </IconButton>
                    </Tooltip>
                    {/* <Tooltip title="Shortlist candidate">
                      <IconButton
                        sx={{
                          // border: '2px solid #086BFF',
                          // borderRadius: '50%',
                          padding: 0,
                          ':hover': {
                            background: 'transparent',
                          },
                        }}
                        onClick={(event) => {
                          event.stopPropagation();
                          updateApplicationsApiCall({ id: item?.id, status: 'Shortlisted' });
                        }}
                      >
                        <CheckCircleIcon sx={{ color: '#086BFF' }} />
                      </IconButton>
                    </Tooltip> */}
                  </Box>
                </Box>
              </CardContent>
            </Card>
            {open && i === index && (
              <MoveFolderModel candidateId={item?.id} onClose={() => setOpen(false)} open={open} />
            )}
          </>
        ))}
      </Stack>
    </Box>
  );
};
