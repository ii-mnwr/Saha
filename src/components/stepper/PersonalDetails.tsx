import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { RHFSelect, RHFTagsInput, RHFTextField } from '../hook-form';

const PersonalDetails = () => {
  return (
    <Paper
      sx={{
        p: 3,
        my: 0,
        minHeight: 120,
        width: '100%',
      }}
    >
      {/* <RHFTextField
        name="cv_title"
        formlabel="CV Title :"
        placeholder="Enter CV Title here"
        bgColor="#fff"
        border="outline"
        fontWeight={500}
        required
      /> */}
      <Typography
        sx={{
          color: '#162144',
          fontWeight: 600,
          fontFamily: 'Work Sans,sans-serif',
          fontSize: 24,
          py: 1,
        }}
      >
        Personal Information
      </Typography>
      <Grid container spacing={2} width="100%">
        <Grid item xs={12} md={6}>
          <RHFTextField
            name="first_name"
            formlabel="First Name :"
            placeholder="Enter Your First Name"
            bgColor="#fff"
            border="outline"
            fontWeight={500}
            required
            
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField
            name="last_name"
            formlabel="Last Name :"
            placeholder="Enter Your Last Name"
            bgColor="#fff"
            border="outline"
            fontWeight={500}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField
            name="email"
            formlabel="Email Address :"
            placeholder="Enter Your Email Address"
            bgColor="#fff"
            border="outline"
            fontWeight={500}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField
            type="number"
            name="phone"
            formlabel="Phone :"
            placeholder="+971 (234) 3423124"
            bgColor="#fff"
            border="outline"
            fontWeight={500}
            required
          />
        </Grid>

        {/*  <Grid item xs={12} md={6}>
          <RHFTextField
            name="date_of_birth"
            formlabel="Date of birth :"
            placeholder="yyyy/mm/dd"
            bgColor="#fff"
            border="outline"
            fontWeight={500}
            type="date"
            required
          />
        </Grid> */}
        <Grid item xs={12}>
          <RHFTagsInput
            name="skills"
            formlabel="Skills"
            bgColor="#fff"
            border="outline"
            required
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <RHFTextField
            name="linkedin_url"
            formlabel="Linkedin URL :"
            placeholder="https://www.linkedin.com/"
            bgColor="#fff"
            border="outline"
            fontWeight={500}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <RHFTextField
            name="address"
            formlabel="Complete Address :"
            placeholder="Ex. abc, town , near hospital"
            bgColor="#fff"
            border="outline"
            fontWeight={500}
          />
        </Grid>
        <Grid item xs={12}>
          <RHFTextField
            name="personal_summary"
            formlabel="Personal Summary :"
            placeholder="Enter Your Personal Summary"
            bgColor="#fff"
            border="outline"
            fontWeight={500}
            multiline
            minRows={2}
            required
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PersonalDetails;
