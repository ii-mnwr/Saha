// @mui
import {
  Stack,
  Dialog,
  Button,
  TextField,
  DialogProps,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  FormControlLabel,
  Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { MobileTimePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useApplicants } from 'src/hooks/useApplicants';
import moment from 'moment';
import { useRouter } from 'next/router';
import FormProvider from '../hook-form/FormProvider';
import { RHFRadioGroup, RHFTextField } from '../hook-form';

type FormValuesProps = {
  interviewer: string;
  interview_type: string;
  interview_date: Date | null;
  startTime: string | null;
  endTime: string | null;
  location: string;
  feedback: string;
  comment: string;
};

interface Props extends DialogProps {
  candidateId: string | number;
  open: boolean;
  onClose: VoidFunction;
  jobId: string | number;
}

const FormSchema = Yup.object().shape({
  interviewer: Yup.string()
    .required('Email is required')
    .email('Email must be a valid email address'),
  interview_type: Yup.string().required('Choose at least one option'),
  interview_date: Yup.string().required('Date is required'),
  startTime: Yup.string().required('Start time is required'),
  endTime: Yup.string().required('End time is required'),
});

export default function InterviewSechdule({ candidateId, open, onClose, jobId, ...other }: Props) {
  const router = useRouter();

  const { createSechduleInterviewApiCall, updateApplicationsMutate } = useApplicants();
  const defaultValues = {
    interviewer: '',
    interview_type: '',
    interview_date: null,
    startTime: null,
    endTime: null,
    location: '',
    feedback: '',
    comment: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const { reset, control, handleSubmit } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const { endTime, interview_date, interview_type, interviewer, location, startTime } = data;
    console.log('DATA', data);
    const pyload = {
      candidate_id: candidateId,
      job_id: jobId,
      interview_type,
      location,
      interviewer,
      interview_date: moment(interview_date).format('YYYY-MM-DD'),
      time_slot: `${moment(startTime).format('hh:mm A')} - ${moment(endTime).format('hh:mm A')}`,
    };
    createSechduleInterviewApiCall({ ...pyload });
    // reset();
  };

  useEffect(() => {
    if (updateApplicationsMutate?.isSuccess) {
      router.push('/employer-services/interview-central/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateApplicationsMutate]);

  const [value, setValue] = useState<Date | null>(new Date());
  const [folderId, setFolderId] = useState('');
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={onClose}
      PaperProps={{ style: { backgroundColor: 'white' } }}
      BackdropProps={{
        style: { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
      }}
      {...other}
    >
      <DialogTitle
        sx={{
          paddingX: 3,
          paddingY: 2,
        }}
      >
        Interview Schedule
      </DialogTitle>

      <DialogContent sx={{ overflow: 'unset' }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography fontSize={16} fontWeight={600} fontFamily="Work Sans, sans-serif">
              Interview Type
            </Typography>
            <RHFRadioGroup
              row
              name="interview_type"
              spacing={4}
              options={[
                { value: 'virtual', label: 'Virtual' },
                { value: 'phone', label: 'Phone' },
                { value: 'face-to-face', label: 'Face to Face' },
              ]}
            />
            <RHFTextField
              name="location"
              formlabel="Location"
              size="small"
              placeholder="Enter Location"
            />
            <RHFTextField
              name="interviewer"
              formlabel="Interviewer email"
              size="small"
              placeholder="Enter interviewer email"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <FormControlLabel
                sx={{
                  alignItems: 'flex-start',
                  margin: 0,
                  gap: 1,
                  '& .MuiFormControl-root': {
                    mt: 0,
                  },
                }}
                control={
                  <Controller
                    name="interview_date"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <MobileDatePicker
                        orientation="portrait"
                        value={field.value}
                        onChange={field.onChange}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            {...params}
                            {...field}
                            error={!!error}
                            helperText={error && error?.message}
                            size="small"
                            margin="normal"
                          />
                        )}
                        inputFormat="dd-MM-yyyy"
                      />
                    )}
                  />
                }
                label={
                  <Typography fontSize={16} fontWeight={600} fontFamily="Work Sans, sans-serif">
                    Date
                  </Typography>
                }
                labelPlacement="top"
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <FormControlLabel
                sx={{
                  alignItems: 'flex-start',
                  margin: 0,
                  gap: 1,
                  '& .MuiFormControl-root': {
                    mt: 0,
                  },
                }}
                control={
                  <Controller
                    name="startTime"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <MobileTimePicker
                        orientation="portrait"
                        value={field.value}
                        onChange={field.onChange}
                        renderInput={(params: any) => (
                          <TextField
                            {...params}
                            {...field}
                            error={!!error}
                            helperText={error && error?.message}
                            size="small"
                            fullWidth
                            margin="normal"
                          />
                        )}
                      />
                    )}
                  />
                }
                label={
                  <Typography fontSize={16} fontWeight={600} fontFamily="Work Sans, sans-serif">
                    Start Time
                  </Typography>
                }
                labelPlacement="top"
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <FormControlLabel
                sx={{
                  alignItems: 'flex-start',
                  margin: 0,
                  gap: 1,
                  '& .MuiFormControl-root': {
                    mt: 0,
                  },
                }}
                control={
                  <Controller
                    name="endTime"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <MobileTimePicker
                        orientation="portrait"
                        value={field.value}
                        onChange={field.onChange}
                        renderInput={(params: any) => (
                          <TextField
                            {...params}
                            {...field}
                            size="small"
                            error={!!error}
                            helperText={error && error?.message}
                            fullWidth
                            margin="normal"
                          />
                        )}
                      />
                    )}
                  />
                }
                label={
                  <Typography fontSize={16} fontWeight={600} fontFamily="Work Sans, sans-serif">
                    End Time
                  </Typography>
                }
                labelPlacement="top"
              />
            </LocalizationProvider>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                flexDirection: 'row',
                gap: 1,
              }}
            >
              <Button variant="contained" type="submit">
                Save
              </Button>
              {onClose && (
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => {
                    onClose();
                    setFolderId('');
                  }}
                >
                  Close
                </Button>
              )}
            </Box>
          </Stack>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
