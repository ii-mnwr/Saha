import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Chip,
  Tooltip,
  Dialog,
  TextField,
  Pagination,
} from '@mui/material';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import Image from 'src/components/image/Image';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { CheckCircle, Close, Delete, RemoveRedEye } from '@mui/icons-material';
import Head from 'next/head';
import { useSettingsContext } from 'src/components/settings';
import { useRouter } from 'next/router';
import { useJobs } from 'src/hooks/useJobs';
import DataNotFound from 'src/components/DataNotFound';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import usePostRequest from 'src/hooks/usePost';
import { useSnackbar } from 'src/components/snackbar';
import CancelIcon from '@mui/icons-material/Cancel';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { LocationIcon } from 'src/theme/overrides/CustomIcons';
import { useQuery } from 'react-query';
import axiosInstance from 'src/utils/axios';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TABLE_HEAD = [
  { id: 'title', label: 'Title' },
  { id: 'application', label: 'Applications' },
  { id: 'allApplicant', label: 'Applicant Matching Criteria' },
  { id: 'status', label: 'Status' },
  { id: 'action', label: 'Action' },
];

ManageJob.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Manage Job', href: '#' },
    ]}
    title="Manage Job"
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

export default function ManageJob({ isClosed = false }: any) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(-1);
  const [comment, setComment] = useState('');

  const { themeStretch } = useSettingsContext();

  // const { getAllResumeAlerts } = useJobs({
  //   limit: 10,
  //   page: 1,
  //   sort: 'id:desc',
  // });

  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    sort: 'id:desc',
  });

  const sourcingAssistanceUsePost = usePostRequest();

  const updateJob = (data: any) => {
    const url = '/jobs/update';

    sourcingAssistanceUsePost.mutate(
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
          refetch();
          setOpen(false);
          setComment('');
          setId(-1);
        },
        onError: (error: any) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      }
    );
  };

  const onSubmit = (folderName: any) => {
    if (folderName === '') return;
    const url = '/folders/create';

    sourcingAssistanceUsePost.mutate(
      [
        url,
        {
          name: folderName,
        },
      ],
      {
        onSuccess: (response: any) => {
          // Handle success
          enqueueSnackbar(response?.message || 'Created successfully', {
            variant: 'success',
          });
        },
        onError: (error: any) => {
          // Handle error
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      }
    );
  };

  const { data: jobData, refetch } = useQuery(['job', filter], () =>
    fetchJobs({
      ...filter,
      status: isClosed ? 'Closed' : 'Open',
    })
  );

  return (
    <>
      <Head>
        <title>Manage job</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {/* <Box p={3}>
          <Typography variant="h3">Manage job</Typography>
        </Box> */}
        <Card sx={{ mb: 3 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
            <Typography variant="h5">Job List</Typography>
            <Box>
              {/* <Button sx={{ mr: 2 }} onClick={() => router.push('/all-applicants')}>
                All Applicants
              </Button> */}
              {/* <Button variant="contained">Edit Profile</Button> */}
            </Box>
          </Box>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Scrollbar>
              <Table sx={{ minWidth: 720 }}>
                <TableHeadCustom headLabel={TABLE_HEAD} />

                <TableBody>
                  {jobData?.data?.map((row: any) => (
                    <TableRow
                      sx={{
                        backgroundColor: row?.status === 'Open' ? 'white' : 'ButtonFace',
                      }}
                    >
                      <TableCell
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          flexDirection: 'column',
                          justifyContent: 'flex-start',
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              color: '#000',
                              fontWeight: 600,
                              fontSize: 16,
                              fontFamily: 'Inter,sans-serif',
                              // '::first-letter': {
                              textTransform: 'capitalize',
                              cursor: 'pointer',
                              // },
                            }}
                            onClick={() => {
                              router.push(`/job-details/${row?.id}`);
                            }}
                          >
                            {row?.title}
                          </Typography>
                          <Box display="flex" flexDirection="row" gap={1} alignItems="center">
                            <LocationIcon height={16} width={13} />
                            <Typography
                              variant="caption"
                              sx={{
                                // '::first-letter': {
                                textTransform: 'capitalize',
                                // },
                              }}
                            >
                              {row?.location}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          sx={{
                            color: 'rgb(70, 144, 255)',
                            backgroundColor: 'rgba(70, 144, 255, 0.2)',
                            borderRadius: '22px',
                            p: '10px',
                          }}
                        >
                          <Typography
                            sx={{
                              color: 'rgb(70, 144, 255)',
                              cursor: 'pointer',
                              fontWeight: 600,
                              fontFamily: 'Inter,sans-serif',
                              ':hover': {
                                textDecoration: 'underline',
                              },
                            }}
                            onClick={() => router.push(`/all-applicants?job_id=${row?.id}`)}
                          >
                            All,
                          </Typography>
                          <Typography
                            sx={{
                              ml: 1,
                              cursor: 'pointer',
                              fontWeight: 600,
                              fontFamily: 'Inter,sans-serif',
                              color: 'rgb(70, 144, 255)',
                              ':hover': {
                                textDecoration: 'underline',
                              },
                            }}
                            onClick={() =>
                              router.push(`/all-applicants?status=New&job_id=${row?.id}`)
                            }
                          >
                            New ({row?._count?.new || 0})
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{row?._count?.application} applicant</TableCell>
                      <TableCell>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          sx={{
                            color: 'rgb(70, 144, 255)',
                            backgroundColor: 'rgba(70, 144, 255, 0.2)',
                            borderRadius: '22px',
                            p: '10px',
                          }}
                        >
                          <Typography
                            sx={{
                              color: 'rgb(70, 144, 255)',
                              fontWeight: 600,
                              fontFamily: 'Inter,sans-serif',
                            }}
                          >
                            {row?.status === 'Open' ? 'Active' : row?.status}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Tooltip title="Create folder">
                            <IconButton color="primary" onClick={() => onSubmit(row?.title)}>
                              <CreateNewFolderIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip
                            title={row?.status === 'Draft' ? 'Unarchive Job' : 'Archive job'}
                          >
                            <IconButton
                              color="primary"
                              onClick={() =>
                                updateJob({
                                  id: row?.id,
                                  status: row?.status === 'Draft' ? 'Open' : 'Draft',
                                })
                              }
                            >
                              {row?.status === 'Draft' ? <UnarchiveIcon /> : <ArchiveIcon />}
                            </IconButton>
                          </Tooltip>

                          <Tooltip
                            title={row?.status !== 'Closed' ? 'Closed Job' : 'Open Job'}
                            onClick={() =>
                              updateJob({
                                id: row?.id,
                                status: row?.status !== 'Closed' ? 'Closed' : 'Open',
                              })
                            }
                          >
                            <IconButton color="primary">
                              {row?.status !== 'Closed' ? <CancelIcon /> : <CheckCircleIcon />}
                            </IconButton>
                          </Tooltip>

                          <Tooltip
                            title="Edit job"
                            onClick={() => {
                              router.push(`/edit-job/${row?.id}`);
                            }}
                          >
                            <IconButton color="primary">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Add note">
                            <IconButton
                              color="primary"
                              onClick={() => {
                                setOpen(true);
                                setId(row?.id);
                                if (row?.notes !== '') {
                                  setComment(row?.notes);
                                }
                              }}
                            >
                              <AddCommentIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableNoData
                    path="/assets/manage_job.jpeg"
                    isNotFound={jobData?.data?.length === 0}
                  />
                </TableBody>
              </Table>
              <Box display="flex" width="100%" justifyContent="center" my={2}>
                <Pagination
                  shape="circular"
                  count={Math.ceil((jobData?.pagination?.count || 0) / 10)}
                  onChange={(e: any, page: number) => {
                    setFilter((data) => ({
                      ...data,
                      page,
                    }));
                  }}
                />
              </Box>
            </Scrollbar>
          </TableContainer>
        </Card>
      </Container>
      {open && (
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
            setComment('');
            setId(-1);
          }}
        >
          {/* <form noValidate autoComplete="off" onSubmit={handleCreate}> */}
          <Box
            sx={{
              padding: 2,
            }}
          >
            <TextField
              required
              fullWidth
              margin="normal"
              id="folder-name"
              variant="outlined"
              label="Add comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <Button
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              style={{ marginTop: '20px' }}
              onClick={() => {
                // if (comment === '') {
                //   enqueueSnackbar('Please add comment', { variant: 'error' });
                //   return;
                // }
                updateJob({
                  id,
                  notes: comment,
                });
              }}
            >
              Create
            </Button>
          </Box>
          {/* </form> */}
        </Dialog>
      )}
    </>
  );
}
