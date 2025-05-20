/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Container,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
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
import { useQuery } from 'react-query';
import axiosInstance from 'src/utils/axios';
import moment from 'moment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useApplicants } from 'src/hooks/useApplicants';
import { useSnackbar } from 'src/components/snackbar';
import { useRouter } from 'next/router';

const TABLE_HEAD = [
  { id: 'jobTitle', label: 'Job Title' },
  { id: 'candidates', label: 'Candidate' },
  { id: 'interviewer', label: 'Interviewer' },
  { id: 'scheduledBy', label: 'Scheduled by' },
  { id: 'dateAndTime', label: 'Date & Time' },
  { id: 'status', label: 'Status' },
  { id: 'feedback', label: 'Comments' },
  { id: 'action', label: 'Action' },
];

ResumeAlert.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Employer Services', href: '#' },
      { name: 'Interview Central', href: '#' },
    ]}
    title="Interview Central"
  >
    {page}
  </DashboardLayout>
);
interface Filter {
  limit: number;
  page: number;
  sort: string;
}

const fetchSechdules = async (filter: Filter) => {
  const response = await axiosInstance.post('/employees/schedule/list', filter);
  return response?.data;
};

export default function ResumeAlert() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { themeStretch } = useSettingsContext();
  const [page, setPage] = useState(1);
  const getAllSechdules = useQuery(
    ['interviewCentral', page],
    () =>
      fetchSechdules({
        limit: 10,
        page,
        sort: '',
      }),
    {
      keepPreviousData: true, // optional, keeps previous data while new data is loading
    }
  );

  const { updateApplicationsApiCall, updateApplicationsMutate } = useApplicants();

  // useEffect(() => {
  //   if (updateApplicationsMutate?.isSuccess) {
  //     getAllSechdules.refetch();
  //     updateApplicationsMutate?.reset();
  //     // router.push('/employer-services/proposal-letters?');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [updateApplicationsMutate]);

  return (
    <>
      <Head>
        <title>Interview Central</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ mb: 3 }}>
          <Typography
            sx={{
              p: 3,
              fontWeight: 700,
              fontFamily: 'Work Sans,sans-serif',
              color: '#086BFF',
              fontSize: 20,
            }}
          >
            Interview Central
          </Typography>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Scrollbar>
              <Table sx={{ minWidth: 720 }}>
                <TableHeadCustom headLabel={TABLE_HEAD} />

                <TableBody>
                  {getAllSechdules?.data?.data?.map((row: any, index: number) => (
                    <TableRow>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: 'Work Sans,sans-serif',
                              fontWeight: 500,
                              fontSize: 14,
                              color: '#000000',
                            }}
                          >
                            {row?.job?.title}
                          </Typography>
                          {/* <Typography
                            sx={{
                              fontFamily: 'Work Sans,sans-serif',
                              fontWeight: 300,
                              fontSize: 14,
                              color: '#000000',
                            }}
                          >
                            Job Id: {row?.job?.id}
                          </Typography> */}
                        </Box>
                      </TableCell>

                      <TableCell>
                        {row?.candidate?.first_name} {row?.candidate?.last_name}
                      </TableCell>
                      <TableCell>{row?.interviewer}</TableCell>
                      <TableCell>{row?.employee?.user_name}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                          }}
                        >
                          <Typography variant="body2">
                            {moment(row?.interview_date)?.format('DD/MM/YYYY')}
                          </Typography>
                          <Typography>{row?.time_slot}</Typography>
                          <Typography variant="caption">{row?.location}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{row?.application?.status}</TableCell>
                      <TableCell align="center">{row?.feedback || '-'}</TableCell>
                      <TableCell width="120px">
                        {row?.application?.status?.toLowerCase() !== 'hired' && (
                          <>
                            <Tooltip title="Offer letter">
                              <IconButton
                                color="primary"
                                onClick={() => {
                                  router.push(
                                    `/employer-services/proposal-letters?email=${row?.candidate?.email}&job_id=${row?.job?.id}&application_id=${row?.application?.id}`
                                  );
                                }}
                              >
                                <CheckCircleIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Reject">
                              <IconButton
                                color="primary"
                                onClick={() =>
                                  updateApplicationsApiCall({
                                    id: row?.application_id,
                                    status: 'Rejected_By_Company',
                                  })
                                }
                              >
                                <CancelIcon />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableNoData isNotFound={getAllSechdules?.data?.data?.length === 0} />
                </TableBody>
              </Table>
            </Scrollbar>
            <Box display="flex" width="100%" justifyContent="center" my={2}>
              <Pagination
                shape="circular"
                count={Math.ceil((getAllSechdules?.data?.pagination?.count || 0) / 10)}
                onChange={(e: any, page: number) => {
                  setPage(page);
                }}
              />
            </Box>
          </TableContainer>
        </Card>
      </Container>
    </>
  );
}
