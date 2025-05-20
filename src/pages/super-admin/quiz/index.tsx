import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  MenuItem,
  Pagination,
  Paper,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import Head from 'next/head';
import { useSettingsContext } from 'src/components/settings';
import Chart, { useChart } from 'src/components/chart';
import { fNumber } from 'src/utils/formatNumber';
import axiosInstance from 'src/utils/axios';
import { useQuery } from 'react-query';
import CreateQuizModel from './CreateQuizModel';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import { fDate } from 'src/utils/formatTime';
import Iconify from 'src/components/iconify/Iconify';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import usePostRequest from 'src/hooks/usePost';
import { useSnackbar } from 'src/components/snackbar';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useRouter } from 'next/router';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const fetchQuiz = async (data: any) => {
  const response = await axiosInstance.post('quizzes/list', data);
  return response?.data;
};

const TABLE_HEAD = [
  { id: 'title', label: 'Title' },
  // { id: 'description', label: 'Description' },
  { id: 'status', label: 'Status' },
  { id: 'createdAt', label: 'Created At' },
  { id: 'action', label: 'Action' },
];

Quiz.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Quiz', href: '#' },
    ]}
    title="Quiz"
  >
    {page}
  </DashboardLayout>
);

export default function Quiz() {
  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();
  const [openModel, setOpenMdoal] = useState(false);
  const [openViewModel, setOpenViewMdoal] = useState(false);
  const [id, setId] = useState(-1);
  const [isEdit, setIsEdit] = useState(false);
  const [viewIndex, setViewIndex] = useState(-1);
  const [filters, setFilters] = useState<any>({
    sort: 'id:desc',
    limit: 5,
    page: 1,
    status: '',
  });

  const { data, isLoading, error, refetch } = useQuery(['quizDataById', filters], () =>
    fetchQuiz(filters)
  );

  const handleClear = () => {
    setFilters({
      sort: 'id:desc',
      page: 1,
      limit: 9,
    });
  };

  const postReq = usePostRequest();

  const handlePublishQuiz = (id: number) => {
    const url = `quizzes/publish/${id}`;

    postReq.mutate([url, {}], {
      onSuccess: (response: any) => {
        // Handle success
        enqueueSnackbar(response?.message || 'Publish Quiz successfully', {
          variant: 'success',
        });
        refetch();
      },
      onError: (error: any) => {
        // Handle error
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
  };

  const handleQuizStatus = (id: number, status: string) => {
    const url = `quizzes/update/${id}`;

    postReq.mutate([url, { status }], {
      onSuccess: (response: any) => {
        // Handle success
        enqueueSnackbar(response?.message || `Quiz ${status} successfully`, {
          variant: 'success',
        });
        refetch();
      },
      onError: (error: any) => {
        // Handle error
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
  };

  const handleDeleteQuiz = (id: number) => {
    const url = `quizzes/delete/${id}`;

    postReq.mutate([url, {}], {
      onSuccess: (response: any) => {
        // Handle success
        enqueueSnackbar(response?.message || 'Deleted Quiz successfully', {
          variant: 'success',
        });
        refetch();
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
          <Box display="flex" alignItems="center" justifyContent="space-between" pb={2}>
            <Typography variant="h5">Quiz</Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setOpenMdoal(true);
              }}
            >
              Add Quiz
            </Button>
          </Box>
          {/* <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              border: '3px solid #086BFF4D',
              boxShadow: '0px 4px 9px 0px #00000040',
              borderRadius: 1,
              paddingX: 3,
              paddingY: 2,
              marginBottom: 2,
            }}
          >
            <Paper
              component="form"
              sx={{
                display: 'flex',
                alignItems: { xs: 'center', md: 'flex-end' },
                width: 500,
                borderRadius: '20px',
                flexDirection: { xs: 'column', md: 'row' },

                gap: { xs: 1, md: 2 },
              }}
            >
              <Box width="100%" display="flex" flexDirection="column" gap={1}>
                <Typography
                  sx={{
                    fontFamily: 'Work Sans,sans-serif',
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#000',
                  }}
                >
                  Status
                </Typography>
                <Select
                  value={filters?.status}
                  onChange={(e: any) =>
                    setFilters((data: any) => ({
                      ...data,
                      status: e.target.value,
                    }))
                  }
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <span>Status</span>;
                    }
                    return selected;
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Status</em>
                  </MenuItem>
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Draft">Draft</MenuItem>
                  <MenuItem value="Publish">Publish</MenuItem>
                  <MenuItem value="Archived">Archived</MenuItem>
                </Select>
              </Box>

              <IconButton color="error">
                <Iconify icon="eva:trash-2-outline" />
              </IconButton>
            </Paper>
          </Box> */}
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 720 }}>
              <TableHeadCustom headLabel={TABLE_HEAD} />

              <TableBody>
                {data?.data?.map((row: any, index: number) => (
                  <>
                    <TableRow
                      sx={{
                        bgcolor: row?.status == 'Active' ? '#A8CBFFD9' : '',
                        borderRadius: '10px',
                        p: 1,
                      }}
                    >
                      <TableCell>{row?.title}</TableCell>
                      {/* <TableCell>{row?.description}</TableCell> */}
                      <TableCell>
                        {/* <Typography
                        // sx={{
                        //   bgcolor: row?.status == 'Active' ? '#A8CBFFD9' : '',
                        //   borderRadius: '10px',
                        //   p: 1,
                        // }}
                        >
                          {row?.status == 'Archived'
                            ? 'Previous'
                            : row?.status == 'Draft'
                              ? 'Saved'
                              : row?.status}
                        </Typography> */}
                        {row?.status == 'Archived'
                          ? 'Previous'
                          : row?.status == 'Draft'
                            ? 'Saved'
                            : row?.status}
                      </TableCell>
                      <TableCell>{fDate(row?.createdAt)}</TableCell>

                      <TableCell>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 2,
                          }}
                        >
                          <Tooltip title="View Quiz">
                            <IconButton
                              color="primary"
                              onClick={() => {
                                setOpenViewMdoal(true);
                                setIsEdit(true);
                                setId(row?.id);
                                setViewIndex(index);
                              }}
                              edge="end"
                            >
                              <RemoveRedEyeOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                          {row?.status == 'Draft' && (
                            <Tooltip title="Publish Quiz">
                              <IconButton
                                onClick={() => {
                                  handlePublishQuiz(row?.id);
                                }}
                                color="primary"
                                edge="end"
                              >
                                <PublishOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          )}

                          {/* {row?.status != 'Active' && (
                            <Tooltip title="Declare result">
                              <IconButton color="primary" onClick={() => {}} edge="end">
                                <CheckCircleOutlineIcon />
                              </IconButton>
                            </Tooltip>
                          )} */}
                          {row?.status == 'Active' && (
                            <Tooltip title="View Attempts">
                              <IconButton
                                color="primary"
                                onClick={() => {
                                  push(`/super-admin/quiz/${row?.id}`);
                                }}
                                edge="end"
                              >
                                <ChecklistIcon />
                              </IconButton>
                            </Tooltip>
                          )}

                          {row?.status != 'Active' && (
                            <Tooltip title="Delete Quiz">
                              <IconButton
                                color="primary"
                                onClick={() => {
                                  handleDeleteQuiz(row?.id);
                                }}
                                edge="end"
                              >
                                <Iconify icon="eva:trash-2-outline" />
                              </IconButton>
                            </Tooltip>
                          )}
                          {row?.status === 'Active' ? (
                            <Tooltip title="Deactive Quiz">
                              <IconButton
                                color="primary"
                                onClick={() => {
                                  handleQuizStatus(row?.id, 'Deactive');
                                }}
                                edge="end"
                              >
                                <HighlightOffIcon />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Active Quiz">
                              <IconButton
                                color="primary"
                                onClick={() => {
                                  handleQuizStatus(row?.id, 'Active');
                                }}
                                edge="end"
                              >
                                <CheckCircleOutlineIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                    {id === row?.id && viewIndex === index && openViewModel && (
                      <CreateQuizModel
                        openModel={openViewModel}
                        onClose={() => {
                          setOpenViewMdoal(false);
                        }}
                        setOpenMdoal={setOpenViewMdoal}
                        isEdit={isEdit}
                        id={id}
                      />
                    )}
                  </>
                ))}
                <TableNoData isNotFound={data?.pagination?.count === 0} />
              </TableBody>
            </Table>
            {data?.pagination?.count > 0 && (
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
            )}
          </TableContainer>
        </Card>
      </Container>
      {openModel && (
        <CreateQuizModel
          openModel={openModel}
          setOpenMdoal={setOpenMdoal}
          onClose={() => {
            setOpenMdoal(false);
          }}
          refetchQuiz={refetch}
        />
      )}
    </>
  );
}
