import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Dialog, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RHFSelect } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import usePostRequest from 'src/hooks/usePost';
import * as Yup from 'yup';
import { useSnackbar } from 'src/components/snackbar';
import axiosInstance from 'src/utils/axios';
import { useQuery } from 'react-query';

const fetchQuizById = async (data: any) => {
  const response = await axiosInstance.post('plans/list', data);
  return response?.data;
};

const FormSchema = Yup.object().shape({
  candidate_id: Yup.string().required('Candidate Id is required'),
  plan_id: Yup.string().required('Plan Id is required'),
});

const SubscribeUser = ({ openModel, onClose, candidateId }: any) => {
  const createQuiz = usePostRequest();
  const { data, isSuccess } = useQuery(['getPlansData', candidateId], () =>
    fetchQuizById({ limit: 10, page: 1, sort: 'id:desc' })
  );

  const { enqueueSnackbar } = useSnackbar();
  const defaultValues = {
    candidate_id: null,
    plan_id: null,
  };

  const methods = useForm<any>({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  useEffect(() => {
    setValue('candidate_id', candidateId);
  }, [candidateId]);

  const { reset, control, handleSubmit, setValue } = methods;

  const onSubmit = (data: any) => {
    createQuiz.mutate([`subscriptions/admin/create`, data], {
      onSuccess: (response: any) => {
        enqueueSnackbar(response?.message || 'Update user subscription', {
          variant: 'success',
        });
        onClose();
      },
      onError: (error: any) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
  };

  return (
    <Dialog open={openModel} fullWidth onClose={onClose} maxWidth="sm">
      <DialogTitle id="customized-dialog-title">Subscribed user</DialogTitle>
      <DialogContent dividers>
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFSelect
              placeholder="Select Plan"
              name="plan_id"
              sx={{
                '& select': {
                  background: '#fff !important',
                  color: '#000',
                  fontWeight: 600,
                  fontFamily: 'Work Sans,sans-serif',
                },
              }}
            >
              <MenuItem disabled value="">
                None
              </MenuItem>
              {data?.data
                ?.filter((item: any) => item?.name !== 'Basic')
                ?.map((item: any) => (
                  <MenuItem value={item?.id} key={item?.name}>
                    {item?.name}
                  </MenuItem>
                ))}
            </RHFSelect>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button type="submit" variant="contained">
                submit
              </Button>
            </Box>
          </FormProvider>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SubscribeUser;
