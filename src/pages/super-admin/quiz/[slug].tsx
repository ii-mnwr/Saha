import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Iconify from 'src/components/iconify/Iconify';
import { useSettingsContext } from 'src/components/settings';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import axiosInstance from 'src/utils/axios';
import { fDate, fDateTime } from 'src/utils/formatTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useSnackbar } from 'src/components/snackbar';
import usePostRequest from 'src/hooks/usePost';
import dayjs from 'dayjs';

const fetchQuizById = async (id: number, data: any) => {
  const response = await axiosInstance.post(`quizzes/attempts/${id}`, data);
  return response?.data;
};

const TABLE_HEAD = [
  { id: 'user_name', label: 'User name' },
  { id: 'email', label: 'Email' },
  { id: 'score', label: 'Score' },
  { id: 'quiz_start_time', label: 'Quiz start time' },
  { id: 'quiz_end_time', label: 'Quiz end time' },
  { id: 'time_taken', label: 'Time taken (in ms)' },
  { id: 'action', label: 'Action' },
];

const QuizFindById: React.FC<any> = (props) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();
  const [filters, setFilters] = useState<any>({
    sort: 'id:desc',
    limit: 5,
    page: 1,
    status: '',
  });
  const { data, isLoading, error, refetch } = useQuery(['quizDataById', [filters, props.id]], () =>
    fetchQuizById(Number(props?.id), filters)
  );
  const postReq = usePostRequest();

  const handleDeclareResultQuiz = (id: number, data: any) => {
    const url = `quizzes/update/${id}`;

    postReq.mutate([url, { ...data }], {
      onSuccess: (response: any) => {
        // Handle success
        enqueueSnackbar(response?.message || 'Declare Quiz Winner successfully', {
          variant: 'success',
        });
        router.back();
      },
      onError: (error: any) => {
        // Handle error
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
  };

  function downloadFile(buffer: any) {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quiz_attempt.xlsx'; // Replace with your desired file name and extension
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }

  const handleDownloadQuiz = (id: number) => {
    const url = `quizzes/download-attempts/${id}`;

    postReq.mutate([url, { ...data }], {
      onSuccess: (response: any) => {
        console.log('res', response);
        downloadFile(response);
        // Handle success
        enqueueSnackbar(response?.message || 'Download successfully', {
          variant: 'success',
        });
      },
      onError: (error: any) => {
        // Handle error
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
  };

  return (
    <>
      <Head>
        <title>Quiz</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ mb: 3, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* <Typography variant="h5" sx={{ mb: 2 }}>
              Quiz Attempts
            </Typography> */}
            <Tooltip title="Download">
              <Button
                color="primary"
                onClick={() => {
                  handleDownloadQuiz(props?.id);
                }}
                sx={{ mb: 2 }}
                edge="end"
                startIcon={<DownloadOutlinedIcon />}
              >
                Download Quiz Data
              </Button>
            </Tooltip>
          </Box>

          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 720 }}>
              <TableHeadCustom headLabel={TABLE_HEAD} />

              <TableBody>
                {data?.data?.map((row: any, index: number) => (
                  <TableRow>
                    <TableCell>{row?.candidate?.user_name}</TableCell>
                    <TableCell>{row?.candidate?.email}</TableCell>
                    <TableCell>{row?.score}</TableCell>
                    <TableCell>{fDateTime(row?.quiz_start_time)}</TableCell>
                    <TableCell>{fDateTime(row?.quiz_end_time)}</TableCell>
                    <TableCell>
                      {row?.quiz_end_time
                        ? `${dayjs(row?.quiz_end_time)?.diff(dayjs(row?.quiz_start_time))} ms (${dayjs(row?.quiz_end_time)?.diff(dayjs(row?.quiz_start_time)) / 1000}  sec)`
                        : '-'}
                    </TableCell>

                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 2,
                        }}
                      >
                        <Tooltip title="Declare result">
                          <IconButton
                            color="primary"
                            onClick={() => {
                              handleDeclareResultQuiz(row?.quiz_id, {
                                status: 'Archived',
                                winner_id: row?.candidate_id,
                              });
                            }}
                            edge="end"
                          >
                            <CheckCircleOutlineIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                <TableNoData isNotFound={data?.count === 0} />
              </TableBody>
            </Table>
            {/* {data?.pagination?.count > 0 && (
                <Box sx={{ paddingY: 2, display: 'flex', justifyContent: 'center' }}>
                  <Pagination
                    shape="circular"
                    count={Math.ceil((data?.pagination?.count || 0) / 9)}
                    page={filters.page}
                    onChange={(event: React.ChangeEvent<unknown> | null, newPage: number) => {
                      setFilters({ ...filters, page: newPage });
                    }}
                  />
                </Box>
              )} */}
          </TableContainer>
        </Card>
      </Container>
    </>
  );
};

QuizFindById.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Quiz Attempts', href: '#' },
    ]}
    title="Quiz Attempts"
  >
    {page}
  </DashboardLayout>
);

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  console.log('params', params);
  return { props: { id: params?.slug } };
};

export default QuizFindById;
