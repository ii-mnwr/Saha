import { Box, Grid } from '@mui/material';
import React from 'react';
import { RHFTextField } from 'src/components/hook-form';

const EducationResume = ({ register, setValue }: any) => (
  <Grid container spacing={1}>
    <Grid item xs={12} md={6}>
      <RHFTextField
        name="education_details.0.title"
        formlabel="Title"
        placeholder="Ex.computer Engineering"
        bgColor="#086BFF1F"
        border="transparent"
        fontWeight={500}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <RHFTextField
        name="education_details.0.degree"
        formlabel="Degree"
        placeholder="BE/ B.Tech"
        bgColor="#086BFF1F"
        border="transparent"
        fontWeight={500}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <RHFTextField
        name="education_details.0.institute"
        formlabel="Institute"
        placeholder="University Name"
        bgColor="#086BFF1F"
        border="transparent"
        fontWeight={500}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <RHFTextField
        name="education_details.0.yearOfPassing"
        formlabel="Year of Passing"
        placeholder="ex. 2022"
        bgColor="#086BFF1F"
        border="transparent"
        fontWeight={500}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <RHFTextField
        name="education_details.0.cgpa"
        formlabel="CGPA / Percentages"
        placeholder="8.9/10"
        bgColor="#086BFF1F"
        border="transparent"
        fontWeight={500}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <RHFTextField
        name="marital_status"
        formlabel="Marital Status"
        placeholder="ex. Unmarried"
        bgColor="#086BFF1F"
        border="transparent"
        fontWeight={500}
      />
    </Grid>
  </Grid>
);

export default EducationResume;
