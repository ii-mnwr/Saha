/* eslint-disable @typescript-eslint/no-shadow */
import {
  Box,
  Button,
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
import { GetStaticPaths, GetStaticProps } from 'next';
import VisibilityIcon from '@mui/icons-material/Visibility';

const TABLE_HEAD = [
  { id: 'user_name', label: 'User name' },
  { id: 'email', label: 'Email' },
  { id: 'designation', label: 'Designation' },
  { id: 'action', label: 'Action' },
];

const fetchCandidateByJobId = async (data: any) => {
  const response = await axiosInstance.post('/candidates/getCandidateByJobId', data);
  return response?.data;
};

const NewApplicants = ({ id }: any) => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const { themeStretch } = useSettingsContext();
  const candidateData = useQuery(
    ['subscriptionHistory', id],
    () => fetchCandidateByJobId({ job_id: id, status: 'New', sort: 'id:desc', limit: 10, page }),
    {
      keepPreviousData: true, // optional, keeps previous data while new data is loading
    }
  );

  return (
    <>
      <Head>
        <title>Candidate details</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ padding: 3 }}>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Scrollbar>
              <Table sx={{ minWidth: 720 }}>
                <TableHeadCustom headLabel={TABLE_HEAD} />

                <TableBody>
                  {candidateData?.data?.data?.map((row: any) => (
                    <TableRow>
                      <TableCell>{row?.user_name}</TableCell>
                      <TableCell>{row?.email}</TableCell>
                      <TableCell>{row?.designation ? row?.designation : '-'}</TableCell>
                      <TableCell>
                        <Tooltip title="View profile">
                          <IconButton
                            color="primary"
                            onClick={() => {
                              router.push(`/candidate-details/${row?.id}`);
                            }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableNoData isNotFound={candidateData?.data?.data?.length === 0} />
                </TableBody>
              </Table>
            </Scrollbar>
            <Box display="flex" width="100%" justifyContent="center" my={2}>
              <Pagination
                shape="circular"
                count={Math.ceil((candidateData?.data?.pagination?.count || 0) / 10)}
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
};

NewApplicants.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  return { props: { id: params?.slug } };
};

export default NewApplicants;
