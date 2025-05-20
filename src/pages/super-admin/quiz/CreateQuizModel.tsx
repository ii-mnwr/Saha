import { yupResolver } from '@hookform/resolvers/yup';
import {
  Backdrop,
  Badge,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import usePostRequest from 'src/hooks/usePost';
import * as Yup from 'yup';
import { useSnackbar } from 'src/components/snackbar';
import axiosInstance from 'src/utils/axios';
import { useQuery } from 'react-query';
import { RHFUpload } from 'src/components/hook-form/RHFUpload';
import { Backend_Base_URL } from 'src/config-global';
import CloseIcon from '@mui/icons-material/Close';

const fetchQuizById = async (data: any) => {
  const response = await axiosInstance.post('quizzes/find-by-id', data);
  return response?.data;
};

const uploadImage = async (data: any) => {
  const response = await axiosInstance.post('quizzes/upload-image', data);
  return response?.data;
};

const FormSchema = Yup.object().shape({
  title: Yup.string().required('Name is required'),
  // description: Yup.string().required('Description is required'),
  questions: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required('Question is required'),
      options: Yup.array().of(
        Yup.object().shape({
          value: Yup.string().required('Option is required'),
          isValue: Yup.string().required('Option type is required'),
        })
      ),
    })
  ),
  correct_options: Yup.array().of(Yup.string().required('Answer is Required')),
});

const CreateQuizModel = ({ openModel, onClose, isEdit, id, refetchQuiz }: any) => {
  const [loading, setLoading] = useState(false);
  const { data, isSuccess } = useQuery(['quizDataById', isEdit], () => fetchQuizById({ id }));
  const createQuiz = usePostRequest();
  const { enqueueSnackbar } = useSnackbar();
  const defaultValues = {
    title: '',
    description: '',
    questions: [
      {
        question: '',
        image_path: '',
        options: [
          {
            id: 1,
            isValue: 'text',
            value: '',
          },
          {
            id: 2,
            isValue: 'text',
            value: '',
          },
          {
            id: 3,
            isValue: 'text',
            value: '',
          },
          {
            id: 4,
            isValue: 'text',
            value: '',
          },
        ],
      },
      {
        question: '',
        image_path: '',
        options: [
          {
            id: 1,
            isValue: 'text',
            value: '',
          },
          {
            id: 2,
            isValue: 'text',
            value: '',
          },
          {
            id: 3,
            isValue: 'text',
            value: '',
          },
          {
            id: 4,
            isValue: 'text',
            value: '',
          },
        ],
      },
      {
        question: '',
        image_path: '',
        options: [
          {
            id: 1,
            isValue: 'text',
            value: '',
          },
          {
            id: 2,
            isValue: 'text',
            value: '',
          },
          {
            id: 3,
            isValue: 'text',
            value: '',
          },
          {
            id: 4,
            isValue: 'text',
            value: '',
          },
        ],
      },
      {
        question: '',
        image_path: '',
        options: [
          {
            id: 1,
            isValue: 'text',
            value: '',
          },
          {
            id: 2,
            isValue: 'text',
            value: '',
          },
          {
            id: 3,
            isValue: 'text',
            value: '',
          },
          {
            id: 4,
            isValue: 'text',
            value: '',
          },
        ],
      },
      {
        question: '',
        image_path: '',
        options: [
          {
            id: 1,
            isValue: 'text',
            value: '',
          },
          {
            id: 2,
            isValue: 'text',
            value: '',
          },
          {
            id: 3,
            isValue: 'text',
            value: '',
          },
          {
            id: 4,
            isValue: 'text',
            value: '',
          },
        ],
      },
    ],
    correct_options: [],
  };

  const methods = useForm<any>({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const { reset, control, handleSubmit, setValue } = methods;

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('questions', JSON.stringify(data.questions));
    formData.append('correct_options', JSON.stringify(data.correct_options));

    createQuiz.mutate([`quizzes/create`, formData], {
      onSuccess: (response: any) => {
        enqueueSnackbar(response?.message || 'Create Quiz successfully', {
          variant: 'success',
        });
        refetchQuiz();
        onClose();
      },
      onError: (error: any) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
  };

  const questions = useWatch({
    control,
    name: 'questions',
  });

  const questionArr = useFieldArray({
    control,
    name: 'questions',
  });

  const correctAnswerArr = useFieldArray({
    control,
    name: 'correct_options',
  });

  useEffect(() => {
    if (isSuccess) {
      reset(data?.data);
    }
  }, [isSuccess]);

  const handleDrop = useCallback(
    (acceptedFiles: File[], key: string) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setLoading(true);

        const formData = new FormData();
        formData.append('image', file);
        createQuiz.mutate([`quizzes/upload-image`, formData], {
          onSuccess: (response: any) => {
            console.log(response);
            setValue(key, response?.data?.image_path, { shouldValidate: true });
            setLoading(false);
            enqueueSnackbar(response?.message || 'Uploaded successfully', {
              variant: 'success',
            });
          },
          onError: (error: any) => {
            enqueueSnackbar(error.message, { variant: 'error' });
          },
        });
      }
    },
    [setValue]
  );

  const handleRemoveFile = (key: string, value: string) => {
    createQuiz.mutate(
      [
        `quizzes/delete-image`,
        {
          image_path: value,
        },
      ],
      {
        onSuccess: (response: any) => {
          setValue(key, '');
          enqueueSnackbar(response?.message || 'Deleted successfully', {
            variant: 'success',
          });
        },
        onError: (error: any) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      }
    );
  };

  return (
    <Dialog open={openModel} fullWidth onClose={onClose} maxWidth="lg" fullScreen>
      <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center' }} id="customized-dialog-title">
        {isEdit ? 'View Quiz Questions' : 'Add Quiz Questions'}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Box padding={4}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} style={{ 'pointer-events': isEdit ? 'none' : '' }}>
              <Grid item xs={12}>
                <RHFTextField name="title" formlabel="Title" />
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <RHFTextField name="description" formlabel="Description" />
              </Grid> */}
              {/*  {questionArr?.fields?.length < 5 && (
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">Add</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      questionArr.append({
                        question: '',
                        image_path: '',
                        options: [
                          {
                            id: 1,
                            isValue: 'text',
                            value: '',
                          },
                          {
                            id: 2,
                            isValue: 'text',
                            value: '',
                          },
                          {
                            id: 3,
                            isValue: 'text',
                            value: '',
                          },
                          {
                            id: 4,
                            isValue: 'text',
                            value: '',
                          },
                        ],
                      });
                    }}
                  >
                    Add Question
                  </Button>
                </Box>
              </Grid>
            )} */}
              {questionArr?.fields?.map((item: any, index) => (
                <Grid item xs={12} style={{ 'pointer-events': isEdit ? 'none' : '' }}>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ border: '1px solid black', p: 2, borderRadius: '10px' }}>
                    <RHFTextField
                      name={`questions[${index}].question`}
                      formlabel={`Question ${index + 1}`}
                      placeholder="Enter Question"
                    />
                    <RHFUpload
                      name={`questions[${index}].image_path`}
                      maxSize={3145728}
                      sx={{ mb: 1 }}
                      file={
                        questions[index]?.image_path !== ''
                          ? `${Backend_Base_URL}${questions[index]?.image_path}`
                          : null
                      }
                      onDrop={(acceptedFiles: File[]) => {
                        handleDrop(acceptedFiles, `questions[${index}].image_path`);
                      }}
                      onDelete={() => {
                        handleRemoveFile(
                          `questions[${index}].image_path`,
                          questions[index].image_path
                        );
                      }}
                    />
                    <Grid container spacing={1}>
                      {item?.options?.map((option: any, optionIndex: number) => (
                        <Grid item xs={12} md={6}>
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <RHFSelect
                                placeholder="Select Option Type"
                                name={`questions[${index}].options[${optionIndex}].isValue`}
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
                                <MenuItem value={'text'} key="text">
                                  text
                                </MenuItem>
                                <MenuItem value={'image'} key="image">
                                  image
                                </MenuItem>
                              </RHFSelect>
                            </Grid>
                            <Grid item xs={12}>
                              <Badge
                                badgeContent={optionIndex + 1}
                                color="secondary"
                                sx={{ width: '100%' }}
                              >
                                {questions?.[index]?.options[optionIndex]?.isValue === 'text' ? (
                                  <RHFTextField
                                    name={`questions[${index}].options[${optionIndex}].value`}
                                    defaultValue={option}
                                    placeholder={`Enter Option ${optionIndex + 1}`}
                                  />
                                ) : (
                                  <RHFUpload
                                    name={`questions[${index}].options[${optionIndex}].value`}
                                    maxSize={3145728}
                                    file={
                                      questions[index]?.options[optionIndex]?.value !== ''
                                        ? `${Backend_Base_URL}${questions[index]?.options[optionIndex].value}`
                                        : null
                                    }
                                    onDrop={(acceptedFiles: File[]) => {
                                      handleDrop(
                                        acceptedFiles,
                                        `questions[${index}].options[${optionIndex}].value`
                                      );
                                    }}
                                    onDelete={() => {
                                      handleRemoveFile(
                                        `questions[${index}].options[${optionIndex}].value`,
                                        questions[index].options[optionIndex].value
                                      );
                                    }}
                                  />
                                )}
                              </Badge>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                    <Grid item xs={12}>
                      <RHFSelect
                        name={`correct_options[${index}]`}
                        formlabel="Answer"
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

                        {questions[index]?.options?.map((option: any, optionIndex: number) => {
                          return (
                            <MenuItem value={option?.id} key={option?.id}>
                              {option?.id}
                            </MenuItem>
                          );
                        })}
                      </RHFSelect>
                    </Grid>
                  </Box>
                </Grid>
              ))}
            </Grid>
            {!isEdit && (
              <Box display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={{ marginTop: '20px' }}
                >
                  Create
                </Button>
              </Box>
            )}
          </FormProvider>
        </Box>
      </DialogContent>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>
  );
};

export default CreateQuizModel;
