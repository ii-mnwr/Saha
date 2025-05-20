/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Dialog,
  TextField,
  Stack,
  Pagination,
  TablePagination,
} from '@mui/material';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import Head from 'next/head';
import { useSettingsContext } from 'src/components/settings';
import usePostRequest from 'src/hooks/usePost';
import { useSnackbar } from 'src/components/snackbar';
import { useQuery } from 'react-query';
import axiosInstance from 'src/utils/axios';
import { fDate } from 'src/utils/formatTime';
import { LoadingButton } from '@mui/lab';
import { saveAs } from 'file-saver';
import { HOST_URL } from 'src/config-global';
import { useRouter } from 'next/router';
import SubscribeUser from './SubscribeUser';

const fetchCandidates = async (data: any) => {
  const response = await axiosInstance.post('candidates/list', data);
  return response?.data;
};

const TABLE_HEAD = [
  { id: 'UUI', label: 'ID' },
  { id: 'user_name', label: 'User name' },
  { id: 'createdAt', label: 'Created At' },
  { id: 'phone_number', label: 'Phone no' },
  { id: 'email', label: 'Email' },
  { id: 'subscription', label: 'Subscription' },
  { id: 'resume', label: 'Resume' },
];

ManageJob.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Users', href: '#' },
    ]}
    title="Users"
  >
    {page}
  </DashboardLayout>
);

export default function ManageJob() {
  const route = useRouter();
  const [openModel, setOpenMdoal] = useState(false);
  const [subId, setSubId] = useState(-1);
  const [subIndex, setSubIndex] = useState(-1);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(-1);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<any>({
    search: '',
    nationality: '',
    type_of_employment: '',
    gender: '',
    notice_period: '',
    language: '',
    sort: 'id:desc',
    title: '',
    location: '',
    experience: '',
    education: '',
    age: '',
    licence: '',
    limit: 25,
    page: 0,
  });

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log('newPage', newPage);
    setFilters({ ...filters, page: newPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilters({ ...filters, limit: event.target.value, page: 1 });
  };

  const { themeStretch } = useSettingsContext();

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
        },
        onError: (error: any) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      }
    );
  };

  const updateStatus = usePostRequest();

  const updateCompanyStatus = (status: boolean, id: number) => {
    const url = `users/update/${id}`;

    updateStatus.mutate(
      [
        url,
        {
          blocked: status,
        },
      ],
      {
        onSuccess: (response: any) => {
          enqueueSnackbar(response?.message || `User ${status} successfully`, {
            variant: 'success',
          });
          setId(-1);
          setIsLoading(false);
          refetch();
        },
        onError: (error: any) => {
          enqueueSnackbar(error.message, { variant: 'error' });
          setId(-1);
          setIsLoading(false);
        },
      }
    );
  };

  const { data, error, refetch } = useQuery(['candidateData', filters], () =>
    fetchCandidates({ ...filters, page: filters?.page + 1 })
  );

  console.log('datadatadata', data);

  return (
    <>
      <Head>
        <title>Manage job</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ mb: 3 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
            <Typography variant="h5">All applicants</Typography>
            <Box />
          </Box>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Scrollbar>
              <Table sx={{ minWidth: 720 }}>
                <TableHeadCustom headLabel={TABLE_HEAD} />

                <TableBody>
                  {data?.data?.map((row: any, index: number) => (
                    <>
                      <TableRow>
                        <TableCell>{row?.user?.UUI}</TableCell>
                        <TableCell
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            route.push(`/candidate-details/${row?.id}`);
                          }}
                        >
                          <Box>
                            <Typography
                              sx={{
                                color: '#000',
                                fontWeight: 600,
                                fontSize: 16,
                                fontFamily: 'Inter,sans-serif',
                              }}
                            >
                              {row?.user_name}
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell>{fDate(row?.createdAt)}</TableCell>
                        <TableCell>{row?.phone_number}</TableCell>
                        <TableCell>{row?.email}</TableCell>
                        <TableCell>
                          <Button
                            variant="text"
                            onClick={() => {
                              setSubId(row?.id);
                              setOpenMdoal(true);
                              setSubIndex(index);
                            }}
                          >
                            subscribe
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Stack spacing={1} direction="row">
                            <Button
                              variant="contained"
                              onClick={() => {
                                saveAs(
                                  `${HOST_URL}${row?.resume}`,
                                  `${row?.user_name} - ${row?.user?.UUI}`
                                );
                              }}
                            >
                              Download
                            </Button>
                            <LoadingButton
                              variant="contained"
                              onClick={() => {
                                setIsLoading(true);
                                setId(row?.user?.id);
                                updateCompanyStatus(!row?.user?.blocked, row?.user?.id);
                              }}
                              loading={isLoading && id === row?.user?.id}
                            >
                              {row?.user?.blocked ? 'Active' : 'Deactive'}
                            </LoadingButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                      {index === subIndex && row?.id === subId && (
                        <SubscribeUser
                          openModel={openModel}
                          onClose={() => setOpenMdoal(false)}
                          candidateId={row?.id}
                        />
                      )}
                    </>
                  ))}
                  <TableNoData isNotFound={data?.data?.data?.length === 0} />
                </TableBody>
              </Table>
            </Scrollbar>
            {data?.pagination?.count > 0 && (
              <TablePagination
                component="div"
                rowsPerPageOptions={[25, 50, 100]}
                count={data?.pagination?.count || 0}
                page={filters.page}
                onPageChange={handleChangePage}
                rowsPerPage={filters.limit}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </TableContainer>
        </Card>
      </Container>
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
    </>
  );
}
