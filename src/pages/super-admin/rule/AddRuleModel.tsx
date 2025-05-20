import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import FormProvider from 'src/components/hook-form/FormProvider';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RHFTextField } from 'src/components/hook-form';
import RHFEditor from 'src/components/hook-form/RHFEditor';
import usePostRequest from 'src/hooks/usePost';
import { useSnackbar } from 'src/components/snackbar';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AddRuleModel({
  open,
  onClose,
  quizDataRefetch,
  id,
  editData,
  isEdit,
}: any) {
  const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    rule: Yup.string().required('Rule is required'),
  });

  const defaultValues = {
    title: '',
    rule: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    getValues,
    reset,
    formState: { isSubmitting, errors },
  } = methods;
  const applyJob = usePostRequest();
  const { enqueueSnackbar } = useSnackbar();
  const values = getValues();

  const onSubmit = async (data: any) => {
    applyJob.mutate(
      [
        isEdit ? `quizzes/rules/update/${id}` : 'quizzes/rules/create',
        {
          ...data,
        },
      ],
      {
        onSuccess: (response: any) => {
          // Handle success
          enqueueSnackbar(response?.message || 'Rule created successfully', {
            variant: 'success',
          });
          quizDataRefetch();
          onClose();
          reset(defaultValues);
        },
        onError: (error: any) => {
          // Handle error
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      }
    );
  };

  React.useEffect(() => {
    if (id && isEdit && editData) {
      reset(editData);
    }
  }, [reset, id, editData, isEdit]);

  return (
    <BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Add Rule
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField name="title" formlabel="Title" size="small" placeholder="Enter Title" />
          <RHFEditor simple displayEditor name="rule" placeholder="Write Rules..." id="rules" />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              pt: 1,
            }}
          >
            <LoadingButton variant="contained" loading={applyJob.isLoading} type="submit">
              {isEdit ? 'Update' : 'Create'}
            </LoadingButton>
          </Box>
        </FormProvider>
      </DialogContent>
    </BootstrapDialog>
  );
}
