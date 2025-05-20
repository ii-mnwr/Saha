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
import CourseSelectionUI from 'src/components/couse-selection/CourseSelectionUI';
import { CertifcateIcon } from 'src/theme/overrides/CustomIcons';
import { useGetCurrentPlan } from 'src/hooks/useSubscription';
import GeneralUpgrade from 'src/components/UpgradePlan/GeneralUpgrade';

type FormValuesProps = {};

CreateFolders.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Candidates Services', href: '#' },
      { name: 'Learning and Certification', href: '#' },
    ]}
    title="Learning and Certification"
  >
    {page}
  </DashboardLayout>
);

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

  const { getCurrentPlan } = useGetCurrentPlan();

  const { data: currentPlan, isLoading } = getCurrentPlan || {};

  console.log('currentPlancurrentPlan', currentPlan);

  if (isLoading) {
    return <Typography textAlign="center" />;
  }

  return (
    <>
      <Head>
        <title>Learning and Certification</title>
      </Head>
      <Container maxWidth={false} disableGutters>
        {currentPlan?.data?.Plan?.features?.learningAndCertifications ? (
          <Card>
            <Divider/>
            <CourseSelectionUI />
          </Card>
        ) : (
          <GeneralUpgrade title="Upgrade your plan and explore new lerning skills and their certifications" />
        )}
      </Container>
    </>
  );
}
