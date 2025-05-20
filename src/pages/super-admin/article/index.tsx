import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import Head from 'next/head';
import { useSettingsContext } from 'src/components/settings';
import Iconify from 'src/components/iconify/Iconify';
import usePostRequest from 'src/hooks/usePost';
import { useSnackbar } from 'src/components/snackbar';
import { useRouter } from 'next/router';
import axiosInstance from 'src/utils/axios';
import Editor from 'src/components/editor/Editor';
import { useQuery } from 'react-query';

const fetchSetting = async (data: any) => {
  const response = await axiosInstance.post('settings/find-by-key', data);
  return response?.data;
};

QuizRules.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Article', href: '#' },
    ]}
    title="Article"
  >
    {page}
  </DashboardLayout>
);

export default function QuizRules() {
  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();

  const {
    data: settingsData,
    isLoading,
    error,
    refetch,
  } = useQuery(['quizDataById'], () =>
    fetchSetting({
      key: 'Article',
    })
  );
  const postReq = usePostRequest();
  const [data, setData] = useState({ key: 'Article', value: '' });

  const handleCreateRule = () => {
    const url = `settings/create`;

    postReq.mutate([url, { ...data, key: 'Article' }], {
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
  return (
    <>
      <Head>
        <title>Article</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ mb: 3, p: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" pb={2}>
            <Typography variant="h5">Article</Typography>
          </Box>
          <Stack spacing={2}>
            <Editor
              simple
              isPicture={false}
              onChange={(val) => {
                if (val === '<p><br></p>') {
                  setData({
                    ...data,
                    value: '',
                  });
                } else {
                  setData({
                    ...data,
                    value: val,
                  });
                }
              }}
              value={data?.value}
              placeholder="Write at-least 200-300 words about your company."
              displayEditor
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                sx={{
                  width: 150,
                }}
                onClick={() => {
                  handleCreateRule();
                }}
                disabled={Object.values(data).some((val) => val === '')}
              >
                Create
              </Button>
            </Box>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
