import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';
import RHFTagsInput from 'src/components/hook-form/RHFTagsInput';

type FormValuesProps = {};

const PersonalDetailsResume = ({ setValue }: any) => (
  <Box>
    <Typography
      sx={{
        color: '#162144',
        fontWeight: 600,
        fontFamily: 'Work Sans,sans-serif',
        fontSize: 24,
        py: 1,
        textAlign: 'left',
      }}
    >
      Personal Information
    </Typography>

    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <RHFTextField
          name="first_name"
          formlabel="First Name :"
          placeholder="Enter Your First Name"
          bgColor="#086BFF1F"
          border="transparent"
          fontWeight={500}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <RHFTextField
          name="last_name"
          formlabel="Last Name :"
          placeholder="Enter Your Last Name"
          bgColor="#086BFF1F"
          border="transparent"
          fontWeight={500}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <RHFTextField
          name="email"
          formlabel="Email Address :"
          placeholder="Enter Your Email Address"
          bgColor="#086BFF1F"
          border="transparent"
          fontWeight={500}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <RHFTextField
          name="job_type"
          formlabel="Job type"
          placeholder="Enter your job type"
          bgColor="#086BFF1F"
          border="transparent"
          fontWeight={500}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <RHFTagsInput
          name="specification"
          formlabel="Specification"
          bgColor="#086BFF1F"
          border="transparent"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <RHFSelect
          native
          name="qualification"
          inputProps={{ 'aria-label': 'Without label' }}
          hiddenLabel
          formlabel="Qualification :"
          variant="filled"
          // defaultValue=""
          sx={{
            '& select': {
              background: '#086BFF1F !important',
              color: '#0000005C',
              fontWeight: 500,
              fontFamily: 'Work Sans,sans-serif',
              borderRadius: 1,
            },
          }}
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
      <Grid item xs={12} md={6}>
        <RHFSelect
          native
          name="gender"
          inputProps={{ 'aria-label': 'Without label' }}
          hiddenLabel
          formlabel="Gender :"
          variant="filled"
          // defaultValue=""
          sx={{
            '& select': {
              background: '#086BFF1F !important',
              color: '#0000005C',
              fontWeight: 500,
              fontFamily: 'Work Sans,sans-serif',
              borderRadius: 1,
            },
          }}
        >
          <option disabled value="">
            Male/Female
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </RHFSelect>
      </Grid>

      <Grid item xs={12} md={6}>
        <RHFTextField
          name="date_of_birth"
          formlabel="Date Of Birth:"
          placeholder="Date Of Birth"
          bgColor="#086BFF1F"
          border="transparent"
          fontWeight={500}
          type="date"
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <RHFTagsInput name="skills" formlabel="Skills" bgColor="#086BFF1F" border="transparent" />
      </Grid>
      <Grid item xs={12} md={6}>
        <RHFSelect
          native
          name="marital_status"
          inputProps={{ 'aria-label': 'Without label' }}
          hiddenLabel
          formlabel="Marital Status"
          variant="filled"
          // defaultValue=""
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
            Select Marital Status
          </option>
          <option value="single">Single/unmarried</option>
          <option value="married">Married</option>
          <option value="widowed">Widowed</option>
          <option value="divorced">Divorced</option>
          <option value="seperated">Separated</option>
          <option value="other">Other</option>
        </RHFSelect>
      </Grid>
      <Grid item xs={12}>
        <RHFTextField
          name="address"
          formlabel="Complete Address :"
          placeholder="Ex. abc. town , near xyz"
          bgColor="#086BFF1F"
          border="transparent"
          fontWeight={500}
          required
        />
      </Grid>
    </Grid>
  </Box>
);

export default PersonalDetailsResume;
