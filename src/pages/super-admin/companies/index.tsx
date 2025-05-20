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
  Tooltip,
  Dialog,
  TextField,
  Pagination,
} from '@mui/material';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import Head from 'next/head';
import { useSettingsContext } from 'src/components/settings';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import usePostRequest from 'src/hooks/usePost';
import { useSnackbar } from 'src/components/snackbar';
import { useQuery } from 'react-query';
import axiosInstance from 'src/utils/axios';
import { fDate } from 'src/utils/formatTime';
import { useRouter } from 'next/router';
import VisibilityIcon from '@mui/icons-material/Visibility';

const fetchCompanies = async (data: any) => {
  const response = await axiosInstance.post('employees/get-companies', data);
  return response?.data;
};

const TABLE_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'location', label: 'Location' },
  { id: 'status', label: 'Status' },
  { id: 'createdAt', label: 'Created At' },
  { id: 'phone_number', label: 'Phone no' },
  { id: 'email', label: 'Email' },
  { id: 'action', label: 'Action' },
];

GetCompanies.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Companies List', href: '#' },
    ]}
    title="Company Listing"
  >
    {page}
  </DashboardLayout>
);

export default function GetCompanies() {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(-1);
  const [comment, setComment] = useState('');
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
    limit: 10,
    page: 1,
  });

  const { themeStretch } = useSettingsContext();

  const updateStatus = usePostRequest();

  const updateCompanyStatus = (data: any, id: number) => {
    const url = `/companies/${id}/status`;

    updateStatus.mutate(
      [
        url,
        {
          ...data,
        },
      ],
      {
        onSuccess: (response: any) => {
          enqueueSnackbar(response?.message || 'Company status shanged successfully', {
            variant: 'success',
          });
        },
        onError: (error: any) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      }
    );
  };

  const { data, isLoading, error, refetch } = useQuery(
    ['companiesData', filters, updateStatus.isSuccess],
    () => fetchCompanies(filters)
  );

  console.log('datadatadata', data);

  return (
    <>
      <Head>
        <title>Company Listing</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ mb: 3 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
            <Typography variant="h5">Company Listing</Typography>
          </Box>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Scrollbar>
              <Table sx={{ minWidth: 720 }}>
                <TableHeadCustom headLabel={TABLE_HEAD} />

                <TableBody>
                  {data?.data?.map((row: any) => (
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
                              // cursor: 'pointer',
                            }}
                          >
                            {row?.company?.name}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>{row?.company?.location}</TableCell>
                      <TableCell>{row?.company?.status}</TableCell>
                      <TableCell>{fDate(row?.company?.createdAt)}</TableCell>
                      <TableCell>{row?.phone_number}</TableCell>
                      <TableCell>{row?.email}</TableCell>
                      <TableCell>
                        <Box width="150px">
                          <Tooltip title="View profile">
                            <IconButton
                              color="primary"
                              onClick={() => {
                                push(`/company/profile/${row?.id}`);
                              }}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          {/* {!row?.is_verified && ( */}
                          <Tooltip title="Approved">
                            <IconButton
                              color="primary"
                              onClick={() => {
                                updateCompanyStatus({ status: 'Approved' }, row?.id);
                              }}
                            >
                              <CheckCircleIcon />
                            </IconButton>
                          </Tooltip>
                          {/* )} */}
                          <Tooltip title="Reject">
                            <IconButton
                              color="primary"
                              onClick={() => {
                                updateCompanyStatus({ status: 'Rejected' }, row?.id);
                              }}
                            >
                              <CancelIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableNoData isNotFound={data?.pagination?.count === 0} />
                </TableBody>
              </Table>
              {data?.pagination?.count > 0 && (
                <Box sx={{ paddingY: 2, display: 'flex', justifyContent: 'center' }}>
                  <Pagination
                    shape="circular"
                    count={Math.ceil((data?.pagination?.count || 0) / 10)}
                    page={filters.page}
                    onChange={(event: React.ChangeEvent<unknown> | null, newPage: number) => {
                      setFilters({ ...filters, page: newPage });
                    }}
                  />
                </Box>
              )}
            </Scrollbar>
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
            onClick={() => {}}
          >
            Create
          </Button>
        </Box>
        {/* </form> */}
      </Dialog>
    </>
  );
}
