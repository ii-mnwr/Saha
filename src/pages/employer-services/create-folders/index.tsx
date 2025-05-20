import React, { useState } from 'react';
import Head from 'next/head';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useSettingsContext } from 'src/components/settings';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Typography,
  TextField,
  Dialog,
  Pagination,
  IconButton,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import usePostRequest from 'src/hooks/usePost';
import { useSnackbar } from 'src/components/snackbar';
import { useGetAllFolders } from 'src/hooks/useEmployeeServices';
import DataNotFound from 'src/components/DataNotFound';
import { useRouter } from 'next/router';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation, useQueryClient } from 'react-query';
import axiosInstance from 'src/utils/axios';

type FormValuesProps = {};

CreateFolders.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Employer Services', href: '#' },
      { name: 'Create folder', href: '#' },
    ]}
    title="Create Folder"
  >
    {page}
  </DashboardLayout>
);

export default function CreateFolders() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { getAllApplicants, filters, setFilters } = useGetAllFolders();

  // console.log('getAllApplicants', getAllApplicants);

  const { themeStretch } = useSettingsContext();

  const [folderName, setFolderName] = useState('');

  const [openCreateFolderMdoal, setOpenCreateFolderModal] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [editedName, setEditedName] = useState('');
  // console.log('openCreateFolderMdoal', openCreateFolderMdoal);

  const handleOpenModal = () => setOpenCreateFolderModal(true);

  const handleCloseModal = () => setOpenCreateFolderModal(false);

  const defaultValues = {};

  const schema = Yup.object().shape({});

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const sourcingAssistanceUsePost = usePostRequest();

  const onSubmit = () => {
    if (folderName === '') return;
    const url = '/folders/create';

    sourcingAssistanceUsePost.mutate(
      [
        url,
        {
          name: folderName,
        },
      ],
      {
        onSuccess: (response: any) => {
          // Handle success
          enqueueSnackbar(response?.message || 'Created successfully', {
            variant: 'success',
          });
          getAllApplicants?.refetch();
          setOpenCreateFolderModal(false);
        },
        onError: (error: any) => {
          // Handle error
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      }
    );
  };

  const queryClient = useQueryClient();

  const deleteFolderMutation = useMutation({
    mutationFn: (folderId: number) => axiosInstance.post('/folders/delete', { id: folderId }),
    onSuccess: () => {
      queryClient.invalidateQueries('foldersLists');
      enqueueSnackbar('Folder deleted successfully.', { variant: 'success' });
    },
    onError: (error: any) => {
      // Handle error (e.g., show error message)
      console.error('Delete failed:', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    },
  });

  // Update mutation
  const updateFolderMutation = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      axiosInstance.post('/folders/update', { id, name }),
    onSuccess: () => {
      queryClient.invalidateQueries('foldersLists');
      setEditingId(null);
      setEditedName('');
      enqueueSnackbar('Folder updated successfully.', { variant: 'success' });
    },
    onError: (error: any) => {
      console.error('Update failed:', error);
      setEditingId(null);
      setEditedName('');
      enqueueSnackbar(error.message, { variant: 'error' });
    },
  });

  return (
    <>
      <Head>
        <title>Create folders</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              backgroundColor: '#79A4FF73',
              paddingY: 2,
              paddingX: 3,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontFamily: 'Work Sans,sans-serif',
                color: '#086BFF',
                fontSize: 20,
              }}
            >
              Create a New Folder
            </Typography>
            <Button variant="contained" onClick={handleOpenModal}>
              Create folder
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Grid
            container
            spacing={1}
            sx={{
              px: 4,
              pb: 2,
            }}
          >
            {getAllApplicants?.data?.data?.map((item: any) => (
              <Grid item xs={4} md={2} key={item?.id}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  sx={{
                    py: 1,
                    position: 'relative',
                    '&:hover': {
                      '& .close-button': {
                        display: 'block',
                      },
                    },
                  }}
                  // Only enable navigation when not editing
                  onClick={
                    editingId === item.id
                      ? undefined
                      : () => router.push(`${router.pathname}/${item?.id}`)
                  }
                >
                  <IconButton
                    className="close-button"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      display: 'none', // Hidden by default
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFolderMutation.mutate(item.id);
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </IconButton>

                  <img
                    src="/assets/folder.svg"
                    alt=""
                    style={{ cursor: 'pointer', height: 100, width: 100 }}
                  />

                  {editingId === item.id ? (
                    <input
                      // autoFocus
                      value={editedName}
                      style={{
                        width: '80%',
                        textAlign: 'center',
                        fontFamily: 'Work Sans, sans-serif',
                        fontWeight: 700,
                        fontSize: 16,
                        border: 'none',
                        outline: 'none',
                        background: 'transparent',
                      }}
                      onChange={(e) => setEditedName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const newName = editedName.trim();
                          if (newName && newName !== item.name) {
                            updateFolderMutation.mutate({
                              id: item.id,
                              name: newName,
                            });
                          }
                        }
                        if (e.key === 'Escape') {
                          setEditingId(null);
                          setEditedName('');
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                      onBlur={() => {
                        const newName = editedName.trim();
                        if (newName && newName !== item.name) {
                          updateFolderMutation.mutate({
                            id: item.id,
                            name: newName,
                          });
                        }
                      }}
                    />
                  ) : (
                    <Typography
                      sx={{
                        color: '#000',
                        fontFamily: 'Work Sans,sans-serif',
                        fontWeight: 700,
                        fontSize: 16,
                        textAlign: 'center',
                        cursor: 'pointer',
                      }}
                      onClick={(e) => e.stopPropagation()}
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        setEditingId(item.id);
                        setEditedName(item.name);
                      }}
                    >
                      {item?.name}
                    </Typography>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box display="flex" width="100%" justifyContent="center" my={2}>
            <Pagination
              shape="circular"
              count={Math.ceil((getAllApplicants?.data?.pagination?.count || 0) / 10)}
              onChange={(e: any, page: number) => {
                setFilters((data) => ({
                  ...data,
                  page,
                }));
              }}
            />
          </Box>
        </Card>
      </Container>
      {openCreateFolderMdoal && (
        <Dialog open={openCreateFolderMdoal} onClose={handleCloseModal}>
          {/* <form noValidate autoComplete="off" onSubmit={handleCreate}> */}
          <div style={{ margin: '20px' }}>
            <TextField
              required
              fullWidth
              margin="normal"
              id="folder-name"
              variant="outlined"
              label="Name Of Folder"
              onChange={(e) => setFolderName(e.target.value)}
            />
            <Button
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              style={{ marginTop: '20px' }}
              onClick={() => onSubmit()}
            >
              Create
            </Button>
          </div>
          {/* </form> */}
        </Dialog>
      )}
    </>
  );
}
