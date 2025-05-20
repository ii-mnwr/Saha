import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import Image from 'src/components/image/Image';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { CheckCircle, Close, Delete, RemoveRedEye } from '@mui/icons-material';
import Head from 'next/head';
import { useSettingsContext } from 'src/components/settings';
import { useJobs } from 'src/hooks/useJobs';
import { fToNow } from 'src/utils/formatTime';
import DataNotFound from 'src/components/DataNotFound';
import CancelIcon from '@mui/icons-material/Cancel';
import ArchiveIcon from '@mui/icons-material/Archive';
import AddCommentIcon from '@mui/icons-material/AddComment';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import usePostRequest from 'src/hooks/usePost';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TABLE_HEAD = [
  { id: 'jobPost', label: 'Job Post' },
  { id: 'newApplicant', label: 'New Applicant' },
  { id: 'allApplicant', label: 'All Applicant' },
  { id: 'jobPostedDate', label: 'Job Posted Date' },
  { id: 'status', label: 'Status' },
  { id: 'action', label: 'Action' },
];

ResumeAlert.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Resume Alert', href: '#' },
    ]}
    title="Resume Alert"
  >
    {page}
  </DashboardLayout>
);

export default function ResumeAlert() {
  const { push } = useRouter();
  const { themeStretch } = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(-1);
  const [comment, setComment] = useState('');

  const { getAllResumeAlerts, setFilter } = useJobs({
    limit: 10,
    page: 1,
    sort: 'id:desc',
  });

  const postReq = usePostRequest();

  const updateJob = (data: any) => {
    const url = '/jobs/update';

    postReq.mutate(
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
          setOpen(false);
          setComment('');
          setId(-1);
          getAllResumeAlerts.refetch();
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

    postReq.mutate(
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

  console.log('getAllResumeAlerts', getAllResumeAlerts);

  return (
    <>
      <Head>
        <title>Resume alert</title>
      </Head>
      <Container maxWidth={false} disableGutters>
        {/* <Box p={3}>
          <Typography variant="h3">Resume Alerts</Typography>
        </Box> */}
        <Card sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ p: 3 }}>
            My Alerts
          </Typography>

          <TableContainer sx={{ overflow: 'unset' }}>
            <Scrollbar>
              <Table sx={{ minWidth: 720 }}>
                <TableHeadCustom headLabel={TABLE_HEAD} />

                <TableBody>
                  {getAllResumeAlerts?.data?.data?.map((row: any) => (
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
                              fontFamily: 'Inter,sans-serif',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              push(`/job-details/${row?.id}`);
                            }}
                          >
                            {row?.title}
                          </Typography>
                          {/* <Typography variant="caption">Infosys pvt ltd </Typography> */}
                        </Box>
                      </TableCell>

                      <TableCell
                        sx={{
                          color: '#086BFF',
                          fontFamily: 'Inter,sans-serif',
                          fontWeight: 600,
                          cursor: row?._count?.application > 0 ? 'pointer' : 'default',
                        }}
                        onClick={() => {
                          if (row?._count?.application > 0) {
                            push(`/new-applicants/${row?.id}`);
                          }
                        }}
                      >
                        {row?._count?.application} New Applicant
                      </TableCell>
                      <TableCell
                        sx={{
                          color: '#101010',
                          fontFamily: 'Inter,sans-serif',
                          fontWeight: 600,
                        }}
                      >
                        {row?._count?.application} applicant
                      </TableCell>
                      <TableCell>{fToNow(row?.postedAt)}</TableCell>
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
                  <TableNoData isNotFound={getAllResumeAlerts?.data?.data?.length === 0} />
                </TableBody>
              </Table>
            </Scrollbar>
            <Box display="flex" width="100%" justifyContent="center" my={2}>
              <Pagination
                shape="circular"
                count={Math.ceil((getAllResumeAlerts?.data?.pagination?.count || 0) / 10)}
                onChange={(e: any, page: number) => {
                  setFilter((data) => ({
                    ...data,
                    page,
                  }));
                }}
              />
            </Box>
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
