import { useEffect, useMemo, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Step, Paper, Button, Stepper, StepLabel, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PersonalDetails from './PersonalDetails';
import EducationDetails from './EducationDetails';
import ExperienceDetails from './ExperienceDetails';
import FormProvider from '../hook-form/FormProvider';

// ----------------------------------------------------------------------
const steps = ['Personal Information', 'Education', 'Experience'];

export default function HorizontalLinearStepper({ setData }: any) {
  const [activeStep, setActiveStep] = useState(0);
  console.log('active step', activeStep);
  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepSkipped = (step: number) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const personalDetailsSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().required('Email is required').email('Enter valid email'),
    phone: Yup.string().required('Phone is required'),
    // date_of_birth: Yup.string().required('Date of birth is required'),
    personal_summary: Yup.string().required('Personal summary is required'),
    linkedin_url: Yup.string().required('Linkedin URL is required').url('Enter valid URL'),
    // skills: Yup.array().min(1, 'At least one skill is required').required('Skills is required'),
    // Add more fields as necessary
  });

  const educationDetailsSchema = Yup.object().shape({
    education_details: Yup.array().of(
      Yup.object().shape({
        degree: Yup.string().required('Degree is required'),
        yearOfPassing: Yup.string().required('Year of passing is required'),
        institute: Yup.string().required('Institute is required'),
      })
    ),
    // Add more fields as necessary
  });

  const experienceDetailsSchema = Yup.object().shape({
    job_title: Yup.string().required('Job title is required'),
    joining_date: Yup.date().required('Joining date is required'),
    end_date: Yup.date().required('End date is required'),
    // Add more fields as necessary
  });

  const defaultValues = {
    education_details: [
      {
        cgpa: '',
        degree: '',
        institute: '',
        yearOfPassing: '',
      },
    ],
    experience_details: [
      {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        present: true,
      },
    ],
  };

  const validationSchema = [personalDetailsSchema, educationDetailsSchema, experienceDetailsSchema];

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema[activeStep]), // Use the schema for the current step
  });

  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { errors },
  } = methods;

  const experienceDetailsArr = useFieldArray({
    control,
    name: 'experience_details',
  });

  const educationDetailsArr = useFieldArray({
    control,
    name: 'education_details',
  });

  const expWatch = watch('experience_details');

  const onSubmit = (data: any) => {
    console.log('active', activeStep);
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      // Handle final form submission
      console.log('Final data', data);
    }
  };

  // const watchAllFields = watch();

  useEffect(() => {
    const updateData = () => {
      const watchAllFields = watch();
      setData(watchAllFields);
    };

    updateData();

    const intervalId = setInterval(updateData, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Stepper activeStep={activeStep} connector={<ChevronRightIcon />}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel
                  {...labelProps}
                  sx={{
                    '& .MuiStepLabel-label': {
                      color: activeStep === index ? '#ffbb00' : 'inherit',
                    },
                    '& .MuiStepIcon-root': {
                      color: activeStep === index ? '#ffbb00' : 'inherit',
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Paper
              sx={{
                p: 3,
                my: 3,
                minHeight: 120,
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
              }}
            >
              <Typography sx={{ my: 1 }}>All steps completed - you&apos;re finished</Typography>
            </Paper>

            <Box sx={{ display: 'flex' }}>
              <Box sx={{ flexGrow: 1 }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            {activeStep === 0 && <PersonalDetails />}
            {activeStep === 1 && <EducationDetails educationDetailsArr={educationDetailsArr} />}
            {activeStep === 2 && (
              <ExperienceDetails experienceDetailsArr={experienceDetailsArr} expWatch={expWatch} />
            )}
            <Box sx={{ display: 'flex' }}>
              <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1, bgcolor: 'lightgray', '&:hover': { bgcolor: 'gray' } }}
              >
              Back
              </Button>
              <Box sx={{ flexGrow: 1 }} />
              <Button
              variant="contained"
              type="submit"
              sx={{ bgcolor: '#0a2239', '&:hover': { bgcolor: '#0A2239' } }}
              >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </FormProvider>
  );
}
