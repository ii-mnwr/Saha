// @mui
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Dialog,
  Button,
  DialogProps,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Grid,
  Typography,
  Box,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useFieldArray, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import FormProvider from '../hook-form/FormProvider';
import { RHFRadioGroup, RHFTextField } from '../hook-form';
import { useEffect } from 'react';
import axiosInstance from 'src/utils/axios';
import { useQuery } from 'react-query';
// @types

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  open: boolean;
  onClose: VoidFunction;
  job: any;
  handleApplyNow: any;
}

const fetchQuestions = async (id: number) => {
  const response = await axiosInstance.post('/jobs/get-job-assessment', { job_id: id });
  return response?.data;
};

export default function JobModel({ open, onClose, job, handleApplyNow, ...other }: Props) {
  const { data: questionsByJobID, isLoading } = useQuery(['fetchQuestionsByJobID', job?.id], () =>
    fetchQuestions(job?.id)
  );
  const { push } = useRouter();
  const FormSchema = Yup.object().shape({
    job_id: Yup.number().required('Job ID is required'),
    company_id: Yup.number().required('Company ID is required'),
    answers: Yup.array().of(
      Yup.lazy((value) => {
        const question = questionsByJobID?.data?.questions?.find((q) => q.id === value.q_id);
        if (question?.required) {
          return Yup.object().shape({
            q_id: Yup.number().required('Question ID is required'),
            ans_id: Yup.string().required('Answer is required'),
          });
        }
        return Yup.object().shape({
          q_id: Yup.number().required('Question ID is required'),
          ans_id: Yup.string(),
        });
      })
    ),
  });
  const defaultValues = {
    job_id: job?.id,
    company_id: job?.company_id,
    answers: questionsByJobID?.data?.questions?.map((question: any) => ({
      q_id: question.id,
      ans_id: '',
    })),
  };

  const methods = useForm<any>({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const { reset, control, handleSubmit, setValue, getValues, watch } = methods;
  const onSubmit = (data: any) => {
    handleApplyNow(data);
    onClose();
    console.log('values', data);
  };

  useEffect(() => {
    if (questionsByJobID) {
      reset({
        job_id: job?.id,
        company_id: job?.company_id,
        answers: questionsByJobID?.data?.questions?.map((question: any) => ({
          q_id: question.id,
          ans_id: '',
        })),
      });
    }
  }, [questionsByJobID, job]);

  const { fields } = useFieldArray({
    control,
    name: 'answers',
  });

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={onClose}
      PaperProps={{ style: { backgroundColor: 'white', position: 'relative' } }} // Make dialog relative
      BackdropProps={{
        style: { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
      }}
      {...other}
    >
      <DialogTitle> Apply Job </DialogTitle>

      <Backdrop
        open={isLoading} // Ensures Backdrop is displayed when loading
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.modal + 1, // Ensures Backdrop is on top
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <DialogContent sx={{ overflow: 'unset' }}>
        {!isLoading && (
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {fields.map((field: any, index) => {
                const question = questionsByJobID?.data?.questions?.find(
                  (q: any) => q.id === field?.q_id
                );
                console.log('question', question);
                return (
                  <Grid item xs={12} key={field.id}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="body1" fontWeight={600}>
                          {index + 1}. {question?.question}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        {question?.type === 'free' ? (
                          <RHFTextField
                            name={`answers.${index}.ans_id`}
                            placeholder="Please write your answer here"
                          />
                        ) : (
                          <RHFRadioGroup
                            name={`answers.${index}.ans_id`}
                            options={question?.options?.map((option: any) => ({
                              value: option.id.toString(),
                              label: option.value,
                            }))}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                py: 2,
              }}
            >
              {onClose && (
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={(event) => {
                    event.stopPropagation();
                    onClose();
                  }}
                >
                  Discard
                </Button>
              )}
              <Button variant="contained" color="inherit" type="submit">
                Save
              </Button>
            </Box>
          </FormProvider>
        )}
      </DialogContent>
    </Dialog>
  );
}
