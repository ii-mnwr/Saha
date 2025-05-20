import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useSettingsContext } from 'src/components/settings';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Grid,
  Typography,
  Paper,
  MenuItem,
  Pagination,
} from '@mui/material';
import FormProvider from 'src/components/hook-form/FormProvider';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import JobCard from 'src/components/saved-job/SavedJobCard';
import ClearIcon from '@mui/icons-material/Clear';
import DataNotFound from 'src/components/DataNotFound';
import { useMutation, useQuery } from 'react-query';
import axiosInstance from 'src/utils/axios';
import RHFTextFieldLabelMoves from 'src/components/hook-form/RHFTextFieldLabelMoves';
import RHFSelectLabelsMoves from 'src/components/hook-form/RHFSelectLabelMoves';

type FormValuesProps = {};

SavedJob.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Employer Services', href: '#' },
      { name: 'Saved Jobs Posts', href: '#' },
    ]}
    title="Saved Jobs Posts"
  >
    {page}
  </DashboardLayout>
);

type searchParamstype = { title: ''; category: ''; qualification: '' };

const getSavedJobs = async (pagenumber: number, searchParams: searchParamstype) => {
  const response = await axiosInstance.post('/jobs/list', {
    limit: 9,
    page: pagenumber,
    keywords: searchParams.title,
    qualification: searchParams.qualification,
    category: searchParams.category,
    sort: 'id:desc',
    status: 'Draft',
  });
  return response.data;
};

const updateJobs = async (cardid: number, status: string) => {
  const response = await axiosInstance.post('/jobs/update', {
    id: cardid,
    status,
  });
  return response.data;
};

export default function SavedJob() {
  const { themeStretch } = useSettingsContext();

  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useState<any>({
    title: '',
    category: '',
    qualification: '',
  });

  const { data, refetch } = useQuery(['savedJobs', page, searchParams], () =>
    getSavedJobs(page, searchParams)
  );

  const mutation = useMutation(
    async ({ cardid, status }: { cardid: number; status: string }) => {
      await updateJobs(cardid, status);
    },
    {
      mutationKey: 'updateJobsMutation',
      onSuccess: () => {
        refetch();
      },
    }
  );

  useEffect(() => {
    setPage(1);
  }, [searchParams]);

  const schema = Yup.object().shape({});

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { title: '', category: '', qualification: '' },
  });

  const onSubmit = () => {};

  const title = useWatch<any>({ control: methods.control, name: 'title' });
  const category = useWatch<any>({ control: methods.control, name: 'category' });
  const qualification = useWatch<any>({ control: methods.control, name: 'qualification' });

  useEffect(() => {
    setSearchParams({ title, category, qualification });
  }, [title, category, qualification]);

  const resetform = () => {
    methods.reset({
      title: '',
    });
    setSearchParams({
      category: '',
      qualification: '',
    });
  };

  return (
    <>
      <Head>
        <title>Saved Jobs Posts</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ padding: 3 }}>
          <CardHeader
            sx={{
              p: 0,
              fontWeight: 700,
              fontFamily: 'Work Sans,sans-serif',
              color: '#086BFF',
              fontSize: 20,
              mb: 3,
            }}
            title="Saved Job Lists"
          />
          <Card
            sx={{ p: 1, border: '3px solid #086BFF4D', boxShadow: '0px 4px 9px 0px #00000040' }}
          >
            <Typography
              ml={2}
              sx={{
                color: '#85B6FF',
                fontWeight: 700,
                fontSize: 20,
                fontFamily: 'Work Sans,sans-serif',
              }}
            >
              Search Company
            </Typography>
            <FormProvider methods={methods}>
              <Paper
                component="form"
                onSubmit={methods.handleSubmit(onSubmit)}
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  width: 'auto',
                  borderRadius: '20px',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: { xs: 1, md: 1 },
                }}
              >
                <RHFTextFieldLabelMoves name="title" formlabel="Title" fullWidth size="small" />

                <RHFSelectLabelsMoves
                  name="category"
                  formlabel="Category"
                  fullWidth
                  sx={{ minWidth: 120, border: 'none' }}
                  size="small"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Bachelor">Bachelor</MenuItem>
                  <MenuItem value="Master">Master</MenuItem>
                  <MenuItem value="PhD">PhD</MenuItem>
                </RHFSelectLabelsMoves>

                <RHFSelectLabelsMoves
                  name="qualification"
                  formlabel="Qualification"
                  fullWidth
                  sx={{ minWidth: 120, border: 'none' }}
                  size="small"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="High School">High School</MenuItem>
                  <MenuItem value="Diploma">Diploma</MenuItem>
                  <MenuItem value="Bachelors">Bachelors</MenuItem>
                  <MenuItem value="Masters">Masters</MenuItem>
                  <MenuItem value="PHD">PHD</MenuItem>
                </RHFSelectLabelsMoves>

                <Button
                  onClick={resetform}
                  sx={{ p: '10px', borderRadius: '20px' }}
                  aria-label="clear"
                >
                  <ClearIcon />
                </Button>
              </Paper>
            </FormProvider>
          </Card>
          <Grid
            container
            spacing={3}
            sx={{
              marginTop: 2,
            }}
          >
            {data?.data?.length === 0 ? (
              <Grid item xs={11}>
                <DataNotFound />
              </Grid>
            ) : (
              data?.data?.map((item: any) => (
                <Grid item xs={12} xl={4} key={item.id}>
                  <JobCard jobitem={item} mutation={mutation} />
                </Grid>
              ))
            )}
          </Grid>
          {data?.data?.length > 0 && (
            <Box style={{ paddingTop: '15px', display: 'flex', justifyContent: 'center' }}>
              <Pagination
                shape="circular"
                count={Math.ceil((data?.pagination?.count || 0) / 9)}
                page={page}
                onChange={(event: React.ChangeEvent<unknown> | null, newPage: number) => {
                  setPage(newPage);
                }}
              />
            </Box>
          )}
        </Card>
      </Container>
    </>
  );
}
