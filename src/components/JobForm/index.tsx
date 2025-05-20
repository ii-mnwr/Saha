// components/JobForm.tsx
import React, { useEffect, useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Box, Button, Grid, MenuItem, Typography } from '@mui/material';
import RHFTextField from 'src/components/hook-form/RHFTextField';
import RHFEditor from 'src/components/hook-form/RHFEditor';
import RHFTagsInput from 'src/components/hook-form/RHFTagsInput';
import { jobSalary, typesOfJobs } from 'src/assets/data/jobData';
import { RHFCheckbox, RHFRadioGroup, RHFSelect } from '../hook-form';
import FormProvider from '../hook-form/FormProvider';
import moment from 'moment';
import { useAuthContext } from 'src/auth/useAuthContext';

type JobFormProps = {
  isEdit?: boolean;
  editData?: any;
  onSubmit: (data: any) => void;
  onSaveDraft: (data: any) => void;
  defaultValues: any;
  companies?: any;
  role: 'super_admin' | 'employer'; // Add the role prop
};

const schema = (role: 'super_admin' | 'employer') =>
  Yup.object().shape({
    title: Yup.string().required('Title is required'),
    job_type: Yup.string().required('Job type is required'),
    experience: Yup.string().required('Experience is required'),
    location: Yup.string().required('Location is required'),
    application_deadline: Yup.string().required('Application deadline is required'),
    qualification: Yup.string().required('Qualification is required'),
    application_type: Yup.string().required('Application type is required'),
    job_url: Yup.lazy((value, context) =>
      context.parent.application_type === 'company_site'
        ? Yup.string().required('Job url is required')
        : Yup.string().notRequired()
    ),
    company_id:
      role === 'super_admin'
        ? Yup.string().required('Company is required')
        : Yup.string().notRequired(),

    questions: Yup.array().of(
      Yup.object().shape({
        id: Yup.number().required('ID is required'),
        type: Yup.string().required('Type is required'),
        required: Yup.boolean().required('required'),
        options: Yup.lazy((value, context) =>
          context.parent.type === 'mcq'
            ? Yup.array()
                .required('Options required')
                .min(2, 'You must provide at least 2 elements')
            : Yup.array().notRequired()
        ),
        question: Yup.string().required('Question is required'),
        answer: Yup.lazy((value, context) =>
          context.parent.type === 'mcq'
            ? Yup.number().required('Answer is required')
            : Yup.number().notRequired()
        ),
      })
    ),
  });

const JobForm: React.FC<JobFormProps> = ({
  isEdit,
  editData,
  onSubmit,
  onSaveDraft,
  defaultValues,
  role,
  companies,
}) => {
  const methods = useForm({
    resolver: yupResolver(schema(role)),
    defaultValues,
  });

  const { handleSubmit, watch, control, reset, getValues } = methods;
  const values = getValues();
  console.log('values', values);
  const applicationType = watch('application_type');
  const is_questions = watch('Is_questions');
  const questionsArr = useFieldArray({
    control,
    name: 'questions',
  });
  const watchQuestion = watch('questions');
  const { user } = useAuthContext();

  useEffect(() => {
    if (isEdit) {
      const specification = editData?.specification?.split(',');
      const application_deadline = moment(editData?.application_deadline).format('YYYY-MM-DD');
      const offeredSalary = `${editData?.salary_min} to ${editData?.salary_max}`;
      const Is_questions = editData?.questions?.length > 0;
      const company_id = editData?.company_id;
      const questions = editData?.questions?.map((item: any) => ({
        id: item?.id,
        options: item?.options,
        required: item?.required,
        type: item?.type,
        question: item?.question,
        answer: editData?.correct_options?.find((ans: any) => ans.q_id === item?.id)?.answer,
      }));
      reset({
        ...editData,
        specification,
        application_deadline,
        offeredSalary,
        Is_questions,
        jobDescription: editData?.description,
        questions,
        company_id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, editData]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container gap={1}>
        {role === 'super_admin' && (
          <Grid item xs={12}>
            <RHFSelect
              native
              formlabel="Select company"
              name="company_id"
              hiddenLabel
              bgColor="#086BFF1F"
              fontWeight={500}
              border="transparent"
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <option disabled value="">
                Select company
              </option>
              {companies?.data?.map((item: any) => <option value={item?.id}>{item?.name}</option>)}
            </RHFSelect>
          </Grid>
        )}
        <Grid item xs={12}>
          <RHFTextField
            required
            formlabel="Job title"
            hiddenLabel
            name="title"
            placeholder="Enter job title here"
            bgColor="#086BFF1F"
            fontWeight={500}
            border="transparent"
          />
        </Grid>
        <Grid item xs={12}>
          <RHFEditor
            simple
            displayEditor
            name="jobDescription"
            placeholder="Short Description"
            id="jobDescription"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} lg={6}>
          <RHFSelect
            native
            formlabel="Job Type"
            name="job_type"
            hiddenLabel
            bgColor="#086BFF1F"
            fontWeight={500}
            border="transparent"
          >
            <option disabled value="">
              Select Job Type
            </option>
            {typesOfJobs?.map((jobs: any) => (
              <option key={jobs?.value} value={jobs?.value}>
                {jobs?.label}
              </option>
            ))}
          </RHFSelect>
        </Grid>
        <Grid item xs={12} lg={6}>
          <RHFSelect
            native
            formlabel="Remuneration(Salary)"
            name="offeredSalary"
            hiddenLabel
            bgColor="#086BFF1F"
            fontWeight={500}
            border="transparent"
          >
            <option disabled value="">
              Offered Salary
            </option>
            {jobSalary.map((data) => (
              <option key={data.label} value={data.label}>
                {data.label}
              </option>
            ))}
          </RHFSelect>
        </Grid>
        {/* Conditionally render Select Company field for Super Admin */}

        <Grid item xs={12} lg={6}>
          <RHFTextField
            required
            formlabel="Location"
            hiddenLabel
            name="location"
            placeholder="eg: India"
            bgColor="#086BFF1F"
            fontWeight={500}
            border="transparent"
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <RHFSelect
            native
            formlabel="Experience"
            name="experience"
            hiddenLabel
            bgColor="#086BFF1F !important"
            fontWeight={600}
            border="transparent"
          >
            <option disabled value="">
              Select Experience
            </option>
            <option value="1 to 5 years">1 to 5 years</option>
            <option value="6 to 10 years">6 to 10 years</option>
            <option value="11 to 15 years">11 to 15 years</option>
            <option value="16 to 20 years">16 to 20 years</option>
            <option value="21 to 25 years">21 to 25 years</option>
            <option value="26 to 30 years">26 to 30 years</option>
            <option value="30+ years">30+ years</option>
          </RHFSelect>
        </Grid>
        <Grid item xs={12} lg={6}>
          <RHFSelect
            native
            formlabel="Qualification"
            name="qualification"
            hiddenLabel
            bgColor="#086BFF1F !important"
            fontWeight={600}
            border="transparent"
          >
            <option disabled value="">
              Qualification
            </option>
            <option value="High School">High School</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
            <option value="PHD">PHD</option>
          </RHFSelect>
        </Grid>
        <Grid item xs={12} lg={6}>
          <RHFTagsInput
            name="specification"
            formlabel="Specification"
            bgColor="#086BFF1F"
            border="transparent"
            placeholder="eg: B.com, B.E."
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <RHFTextField
            required
            hiddenLabel
            type="date"
            name="application_deadline"
            fontWeight={500}
            bgColor="#086BFF1F"
            border="transparent"
            formlabel="Application Deadline Date"
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <RHFTextField
            required
            hiddenLabel
            type="text"
            name="vacancy"
            fontWeight={500}
            bgColor="#086BFF1F"
            border="transparent"
            placeholder="Write here vacancy"
            formlabel="Number of Vacancy"
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <RHFSelect
            native
            formlabel="Application Type"
            name="application_type"
            hiddenLabel
            bgColor="#086BFF1F !important"
            fontWeight={600}
            border="transparent"
          >
            <option disabled value="">
              Select Application Type
            </option>
            <option value="easy_to_apply">Easy to Apply</option>
            <option value="company_site">Company Site</option>
          </RHFSelect>
        </Grid>
        {applicationType === 'company_site' && (
          <Grid item xs={12} lg={6}>
            <RHFTextField
              required
              hiddenLabel
              type="text"
              name="job_url"
              fontWeight={500}
              bgColor="#086BFF1F"
              border="transparent"
              placeholder="Write your job url here"
              formlabel="Job url"
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <RHFCheckbox name="is_confidential" label="Make the company name confidential" />
        </Grid>
        <Grid item xs={12}>
          <RHFCheckbox name="Is_questions" label="Want to add questions" />
        </Grid>
        {is_questions && (
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography variant="h6">Add Question</Typography>
              <Button
                variant="contained"
                onClick={() => {
                  questionsArr.append({
                    id: questionsArr?.fields?.length + 1,
                    question: '',
                    options: [],
                    type: '',
                    required: null,
                  });
                }}
              >
                Add
              </Button>
            </Box>
            <Grid container spacing={2}>
              {questionsArr?.fields?.map((question, index) => {
                return (
                  <Grid item xs={12}>
                    <RHFTextField
                      required
                      formlabel={`Question ${index + 1}`}
                      hiddenLabel
                      name={`questions[${index}].question`}
                      placeholder="Write your question here..."
                      bgColor="#086BFF1F"
                      border="transparent"
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 2,
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <RHFSelect
                        native
                        name={`questions[${index}].type`}
                        inputProps={{ 'aria-label': 'Without label' }}
                        hiddenLabel
                        formlabel="Question Type"
                        variant="filled"
                        sx={{
                          '& select': {
                            background: '#086BFF1F !important',
                            fontWeight: 600,
                            fontFamily: 'Work Sans,sans-serif',
                            borderRadius: 1,
                          },
                        }}
                      >
                        <option disabled value="">
                          Select Type
                        </option>
                        <option value="free">Free field</option>
                        <option value="mcq">MCQ</option>
                      </RHFSelect>
                      <Box width={{ xs: '100%', md: '50%' }}>
                        <Typography variant="h6">Required</Typography>
                        <RHFRadioGroup
                          row
                          name={`questions[${index}].required`}
                          options={[
                            { label: 'Yes', value: true },
                            { label: 'No', value: false },
                          ]}
                        />
                      </Box>
                    </Box>

                    {watchQuestion[index]?.type === 'mcq' && (
                      <OptionsComponent index={index} control={control} watch={watch} />
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        )}
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        {!isEdit ? 'Submit' : 'Update'}
      </Button>
      {!isEdit && (
        <Button
          onClick={() => {
            const data = methods.getValues();
            onSaveDraft(data);
          }}
          variant="contained"
          sx={{ mt: 2, ml: 2 }}
        >
          Draft
        </Button>
      )}
    </FormProvider>
  );
};

const OptionsComponent = ({ index, control, watch }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions[${index}].options`,
  });
  const watchOptions = watch(`questions[${index}].options`);
  console.log('fields', fields);
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">Options</Typography>
        <Button
          variant="contained"
          onClick={() => {
            append({
              id: fields.length + 1,
              value: '',
            });
          }}
        >
          Add
        </Button>
      </Box>
      <Grid container spacing={1}>
        {fields?.map((option, optionIndex) => (
          <Grid item xs={12} lg={6}>
            <RHFTextField
              required
              formlabel={`Option ${optionIndex + 1}`}
              hiddenLabel
              name={`questions[${index}].options[${optionIndex}].value`}
              placeholder="Write option here..."
              bgColor="#086BFF1F"
              border="transparent"
            />
          </Grid>
        ))}
      </Grid>
      <RHFSelect
        name={`questions[${index}].answer`}
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

        {watchOptions.map((option: any) => (
          <MenuItem value={option?.id} key={option?.id}>
            {option?.value}
          </MenuItem>
        ))}
      </RHFSelect>
    </Box>
  );
};

export default JobForm;
