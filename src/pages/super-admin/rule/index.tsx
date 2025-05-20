import React, { useEffect, useState } from 'react';
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
  TablePagination,
  TableRow,
  Tooltip,
} from '@mui/material';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import Head from 'next/head';
import { useSettingsContext } from 'src/components/settings';
import usePostRequest from 'src/hooks/usePost';
import { useSnackbar } from 'src/components/snackbar';
import { useRouter } from 'next/router';
import axiosInstance from 'src/utils/axios';
import { useQuery } from 'react-query';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import DeletIcon from '@mui/icons-material/Delete';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import EditIcon from '@mui/icons-material/Edit';
import AddRuleModel from './AddRuleModel';

const fetchSetting = async (data: any) => {
  const response = await axiosInstance.post('settings/find-by-key', data);
  return response?.data;
};

const fetchQuizRules = async (data: any) => {
  const response = await axiosInstance.post('quizzes/rules/list', data);
  return response?.data;
};

QuizRules.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Quiz Rule', href: '#' },
    ]}
    title="Quiz Rule"
  >
    {page}
  </DashboardLayout>
);

const TABLE_HEAD = [
  { id: 'title', label: 'Title' },
  { id: 'status', label: 'Status' },
  { id: '', label: 'Action' },
];

export default function QuizRules() {
  const { push } = useRouter();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(-1);
  const [edit, setEdit] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();

  const {
    data: settingsData,
    isLoading,
    error,
    refetch,
  } = useQuery(['quizDataById'], () =>
    fetchSetting({
      key: 'Quiz_Rules',
    })
  );

  const [filters, setFilters] = useState<any>({
    sort: 'id:desc',
    limit: 25,
    page: 0,
  });
  const { data: quizRulesList, refetch: quizDataRefetch } = useQuery(['quizRules', filters], () =>
    fetchQuizRules({ ...filters, page: 1 })
  );
  const postReq = usePostRequest();
  const [data, setData] = useState({ key: 'Quiz_Rules', value: '' });

  const handleCreateRule = () => {
    const url = `settings/create`;

    postReq.mutate([url, { ...data, key: 'Quiz_Rules' }], {
      onSuccess: (response: any) => {
        // Handle success
        enqueueSnackbar(response?.message || 'Publish Quiz successfully', {
          variant: 'success',
        });
      },
      onError: (error: any) => {
        // Handle error
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
  };

  useEffect(() => {
    setData({
      key: settingsData?.data?.key,
      value: settingsData?.data?.value,
    });
  }, [settingsData]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setFilters({ ...filters, page: newPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilters({ ...filters, limit: event.target.value, page: 1 });
  };

  const onDelete = (id: any) => {
    postReq.mutate([`quizzes/rules/delete/${id}`, {}], {
      onSuccess: (response: any) => {
        // Handle success
        enqueueSnackbar(response?.message || 'Rule deleted successfully', {
          variant: 'success',
        });
        quizDataRefetch();
      },
      onError: (error: any) => {
        // Handle error
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
  };

  const onStatusChange = (id: any, status: boolean) => {
    postReq.mutate([`quizzes/rules/update/${id}`, { is_active: !status }], {
      onSuccess: (response: any) => {
        // Handle success
        enqueueSnackbar(response?.message || 'Rule status updated successfully', {
          variant: 'success',
        });
        quizDataRefetch();
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
        <title>Quiz Rule</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ mb: 3, p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                setOpen(true);
              }}
            >
              Add Rule
            </Button>
          </Box>
          <TableContainer sx={{ overflow: 'unset', mt: 1 }}>
            <Scrollbar>
              <Table sx={{ minWidth: 720 }}>
                <TableHeadCustom headLabel={TABLE_HEAD} />

                <TableBody>
                  {quizRulesList?.data?.map((row: any, index: number) => (
                    <>
                      <TableRow>
                        <TableCell>{row?.title}</TableCell>
                        <TableCell>{row?.is_active ? 'Active' : 'Deactive'}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <Tooltip title="Delete">
                              <IconButton
                                onClick={() => {
                                  onDelete(row?.id);
                                }}
                              >
                                <DeletIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={row?.is_active ? 'Deactive' : 'Active'}>
                              <IconButton
                                onClick={() => {
                                  onStatusChange(row?.id, row?.is_active);
                                }}
                              >
                                {row?.is_active ? (
                                  <ToggleOnIcon color="success" />
                                ) : (
                                  <ToggleOffIcon />
                                )}
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton
                                onClick={() => {
                                  setId(row?.id);
                                  setEdit(true);
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                      {id === row?.id && edit && row && (
                        <AddRuleModel
                          open={edit}
                          onClose={() => {
                            setEdit(false);
                            setId(-1);
                          }}
                          isEdit
                          id={id}
                          quizDataRefetch={quizDataRefetch}
                          editData={row}
                        />
                      )}
                    </>
                  ))}
                  <TableNoData isNotFound={quizRulesList?.data?.length === 0} />
                </TableBody>
              </Table>
            </Scrollbar>
            {quizRulesList?.pagination?.count > 0 && (
              <TablePagination
                component="div"
                rowsPerPageOptions={[25, 50, 100]}
                count={quizRulesList?.pagination?.count || 0}
                page={filters.page}
                onPageChange={handleChangePage}
                rowsPerPage={filters.limit}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </TableContainer>
        </Card>
      </Container>
      {open && (
        <AddRuleModel
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          quizDataRefetch={quizDataRefetch}
        />
      )}
    </>
  );
}
