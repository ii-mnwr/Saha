import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useSettingsContext } from 'src/components/settings';
import {
  Box,
  Card,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Table,
  Pagination,
} from '@mui/material';
import { useQuery } from 'react-query';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import { LocationIcon } from 'src/theme/overrides/CustomIcons';
import CancelIcon from '@mui/icons-material/Cancel';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { useSnackbar } from 'src/components/snackbar';
import usePostRequest from 'src/hooks/usePost';
import EditIcon from '@mui/icons-material/Edit';

const TABLE_HEAD = [
  { id: 'title', label: 'Title' },
  // { id: 'application', label: 'Applications' },
  // { id: 'allApplicant', label: 'Applicant Matching Criteria' },
  { id: 'status', label: 'Status' },
  { id: 'action', label: 'Action' },
];

const fetchJobs = async (filter: any) => {
  const tempFilter = {
    ...filter,
  };
  const response = await axiosInstance.post('/jobs/list', tempFilter);
  return response?.data;
};

Jobs.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Jobs', href: '#' },
    ]}
    title="Jobs"
  >
    {page}
  </DashboardLayout>
);

export default function Jobs() {
  const { enqueueSnackbar } = useSnackbar();

  const route = useRouter();
  const { themeStretch } = useSettingsContext();

  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    sort: 'id:desc',
    status: 'Open',
  });

  const { data: jobData } = useQuery(['job', filter], () => fetchJobs(filter));
  console.log("🚀 ~ Jobs ~ jobData:", jobData?.data)

  useEffect(() => {
    const data = localStorage.getItem('filter');
    if (data !== null) {
      const obj = JSON.parse(data);
      console.log('obj', obj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          jobData.refetch();
        },
        onError: (error: any) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      }
    );
  };

  console.log('jobs', jobData);
  return (
    <>
      <Head>
        <title>Search Jobs</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ padding: 3 }}>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Scrollbar>
              <Table sx={{ minWidth: 720 }}>
                <TableHeadCustom headLabel={TABLE_HEAD} />

                <TableBody>
                  {jobData?.data?.map((row: any) => (
                    <TableRow>
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
                              route.push(`/job-details/${row?.id}`);
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

                      {/* <TableCell>
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
                            onClick={() => route.push('/all-applicants')}
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
                            onClick={() => route.push('/all-applicants')}
                          >
                            New
                          </Typography>
                        </Box>
                      </TableCell> */}
                      {/* <TableCell>{row?._count?.application} applicant</TableCell> */}
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
                          {/* <Tooltip
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
                            title="Close job"
                            onClick={() =>
                              updateJob({
                                id: row?.id,
                                status: 'Closed',
                              })
                            }
                          >
                            <IconButton color="primary">
                              <CancelIcon />
                            </IconButton>
                          </Tooltip> */}
                          <Tooltip
                            title="Edit job"
                            onClick={() => {
                              route.push(`/edit-job/${row?.id}`);
                            }}
                          >
                            <IconButton color="primary">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableNoData
                    path="/assets/manage_job.jpeg"
                    isNotFound={jobData?.data?.data?.length === 0}
                  />
                </TableBody>
              </Table>
            </Scrollbar>
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
          </TableContainer>
        </Card>
      </Container>
    </>
  );
}
