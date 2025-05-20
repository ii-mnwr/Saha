/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-nested-ternary */
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
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { useSettingsContext } from 'src/components/settings';
import { TableHeadCustom, TableNoData } from 'src/components/table';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import axiosInstance from 'src/utils/axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import CancelIcon from '@mui/icons-material/Cancel';
import { useApplicants } from 'src/hooks/useApplicants';
import { useRouter } from 'next/router';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import { HOST_URL } from 'src/config-global';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InterviewSechdule from 'src/components/all-applicants/InterviewSechdule';

const TABLE_HEAD = [
  { id: 'user_name', label: 'User name' },
  { id: 'email', label: 'Email' },
  { id: 'designation', label: 'Designation' },
  { id: 'action', label: 'Action' },
];

const fetchCandidateByApplicationStatus = async (data: any) => {
  const response = await axiosInstance.post('/employees/application-status', data);
  return response?.data;
};

const CandidateListing = ({ data }: any) => {
  console.log('🚀 ~ CandidateListing ~ data:', data);
  const [page, setPage] = useState(1);
  const [openSechduleInterviewModel, setOpenSechduleInterviewModel] = useState(-1);
  const { themeStretch } = useSettingsContext();
  const candidateData = useQuery(
    ['applicationStatus', data],
    () =>
      fetchCandidateByApplicationStatus({
        job_id: Number(data?.[1]),
        status: data?.[0],
        limit: 10,
        page,
      }),
    {
      keepPreviousData: true, // optional, keeps previous data while new data is loading
    }
  );

  console.log('candidateData', candidateData);

  const { updateApplicationsApiCall, updateApplicationsMutate } = useApplicants();

  const router = useRouter();

  const handleDownload = (row: any) => {
    const resumeURL = `${HOST_URL}${row?.resume}`;
    window.open(resumeURL, '_blank');
  };

  useEffect(() => {
    if (updateApplicationsMutate?.isSuccess) {
      candidateData?.refetch();
      updateApplicationsMutate?.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateApplicationsMutate?.isSuccess]);

  return (
    <>
      <Head>
        <title>{data?.[0]} details</title>
      </Head>
      <Container maxWidth={false} disableGutters>
        <Card sx={{ padding: 3 }}>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Scrollbar>
              <Table sx={{ minWidth: 720 }}>
                <TableHeadCustom headLabel={TABLE_HEAD} />

                <TableBody>
                  {candidateData?.data?.data?.map((row: any, i: number) => (
                    <TableRow
                    // style={{ cursor: 'pointer' }}
                    // onClick={() => router.push(`/candidate-details/${row?.id}`)}
                    >
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
                        <Tooltip title="Download resume">
                          <IconButton color="primary" onClick={() => handleDownload(row)}>
                            <DownloadIcon />
                          </IconButton>
                        </Tooltip>
                        {(data?.[0] === 'New' || data?.[0] === 'Shortlisted') && (
                          <Tooltip
                            title={
                              data?.[0] === 'New'
                                ? 'Shortlist'
                                : data?.[0] === 'Shortlisted'
                                  ? 'Schedule interview'
                                  : ''
                            }
                          >
                            <IconButton
                              color="primary"
                              onClick={() => {
                                if (data?.[0] === 'New') {
                                  updateApplicationsApiCall({
                                    id: row?.application?.[0]?.id,
                                    status: 'Shortlisted',
                                  });
                                } else if (data?.[0] === 'Shortlisted') {
                                  setOpenSechduleInterviewModel(i);
                                }
                              }}
                            >
                              <CheckCircleIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        {(data?.[0] !== 'Offer_Letter' || data?.[0] !== ' Hired') && (
                          <Tooltip title="Reject">
                            <IconButton
                              color="primary"
                              onClick={() =>
                                updateApplicationsApiCall({
                                  id: row?.application?.[0]?.id,
                                  status: 'Rejected_By_Company',
                                })
                              }
                            >
                              <CancelIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        {data?.[0] === 'Shortlisted' && i === openSechduleInterviewModel && (
                          <InterviewSechdule
                            candidateId={row?.id}
                            onClose={() => setOpenSechduleInterviewModel(-1)}
                            open={i === openSechduleInterviewModel}
                            jobId={Number(data?.[1])}
                          />
                        )}
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

CandidateListing.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      { name: 'Home', href: '#' },
      { name: `Candidate Listing`, href: '#' },
    ]}
    title="Candidates"
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

  return { props: { data: params?.slug } };
};

export default CandidateListing;
