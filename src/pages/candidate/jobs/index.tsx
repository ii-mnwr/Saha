import React, { useState } from 'react';
import Head from 'next/head';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useSettingsContext } from 'src/components/settings';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import FormProvider from 'src/components/hook-form/FormProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { countries } from 'src/assets/data';
import ProfileCard from 'src/components/all-applicants/applicantCard';
import SearchIcon from '@mui/icons-material/Search';
import SvgColor from 'src/components/svg-color';
import { DialogAnimate } from 'src/components/animate';

type FormValuesProps = {};

CreateFolders.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function CreateFolders() {
  const { themeStretch } = useSettingsContext();
  const [openCreateFolderMdoal, setOpenCreateFolderModal] = useState(false);

  const handleOpenModal = () => setOpenCreateFolderModal(true);
  const handleCloseModal = () => setOpenCreateFolderModal(false);
  const handleCreate = () => {};

  const defaultValues = {};

  const schema = Yup.object().shape({});

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = () => {};

  return (
    <>
      <Head>
        <title>Create folders</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box p={3}>
          <Typography variant="h4">Create folders</Typography>
        </Box>
        <Card sx={{ padding: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">Create folders</Typography>
            <Button variant="contained" onClick={handleOpenModal}>
              Create folder
            </Button>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <Grid item xs={2}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  <img src="/assets/folder.svg" alt="" style={{ cursor: 'pointer' }} />
                  <Typography variant="body1">XXX</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
        {openCreateFolderMdoal && (
          <DialogAnimate open={openCreateFolderMdoal} onClose={handleCloseModal}>
            <form noValidate autoComplete="off" onSubmit={handleCreate}>
              <div style={{ margin: '20px' }}>
                <TextField
                  required
                  id="folder-name"
                  label="Name Of Folder"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '20px' }}
                  fullWidth
                >
                  Create
                </Button>
              </div>
            </form>
          </DialogAnimate>
        )}
      </Container>
    </>
  );
}
