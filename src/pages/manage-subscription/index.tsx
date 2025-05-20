import {
  Box,
  Button,
  Card,
  Container,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import moment from 'moment';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { useSettingsContext } from 'src/components/settings';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import usePostRequest from 'src/hooks/usePost';
import { useGetCurrentPlan } from 'src/hooks/useSubscription';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import axiosInstance from 'src/utils/axios';
import { useSnackbar } from 'src/components/snackbar';

const TABLE_HEAD = [
  { id: 'name', label: 'Plan Name' },
  { id: 'billing_cycle', label: 'Billing Cycle' },
  { id: 'status', label: 'Status' },
  { id: 'start_date', label: 'Start Date' },
  { id: 'end_date', label: 'End Date' },
];

const fetchSubscriptionHistory = async () => {
  const response = await axiosInstance.post('/subscriptions/history');
  return response?.data;
};

const ManageSubscription = () => {
  const { enqueueSnackbar } = useSnackbar();
  const postReq = usePostRequest();
  const { getCurrentPlan } = useGetCurrentPlan();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { themeStretch } = useSettingsContext();
  const getAllSubscriptionHis = useQuery(
    ['subscriptionHistory', page],
    () => fetchSubscriptionHistory(),
    {
      keepPreviousData: true, // optional, keeps previous data while new data is loading
    }
  );

  const handleCancelSubscription = () => {
    postReq.mutate(['/subscriptions/cancel', {}], {
      onSuccess: (response: any) => {
        // Handle success
        enqueueSnackbar(response?.message || 'Subscription is not active', {
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
        <title>Job details</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ padding: 3 }}>
          <Box
            sx={{
              pb: 2,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 1,
              flexDirection: 'row',
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                router.push('/upgrade');
              }}
            >
              Upgrade Plan
            </Button>
            {getCurrentPlan?.data?.data?.status !== 'canceled' ||
              (getCurrentPlan?.data?.data?.Plan?.name === 'Basic' && (
                <Button variant="contained" onClick={handleCancelSubscription}>
                  Cancel
                </Button>
              ))}
          </Box>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Scrollbar>
              <Table sx={{ minWidth: 720 }}>
                <TableHeadCustom headLabel={TABLE_HEAD} />

                <TableBody>
                  {getAllSubscriptionHis?.data?.data?.map((row: any) => (
                    <TableRow>
                      <TableCell>{row?.Plan?.name}</TableCell>
                      <TableCell>{row?.Plan?.billing_cycle}</TableCell>
                      <TableCell>{row?.status}</TableCell>
                      <TableCell>{moment(row?.start_date)?.format('DD-MM-YYYY')}</TableCell>
                      <TableCell>{moment(row?.end_date)?.format('DD-MM-YYYY')}</TableCell>
                    </TableRow>
                  ))}
                  <TableNoData
                    isSubscription
                    isNotFound={getAllSubscriptionHis?.data?.data?.length === 0}
                    title="Upgrade your plan"
                  />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
        </Card>
      </Container>
    </>
  );
};

ManageSubscription.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default ManageSubscription;
