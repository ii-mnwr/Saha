import { Box, Grid } from '@mui/material';
import React from 'react';
import { RHFCheckbox, RHFTextField } from 'src/components/hook-form';
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';

type FormValuesProps = {};

const ExperienceResume = ({ expNum, setValue }: any) => (
  <Grid container spacing={1}>
    <Grid item xs={12} md={6}>
      <RHFTextField
        name={`experience_details.${expNum}.position`}
        formlabel="Job Title :"
        placeholder="Enter Your Job Tiitle"
        bgColor="#086BFF1F"
        border="transparent"
        fontWeight={500}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <RHFTextField
        name={`experience_details.${expNum}.company`}
        formlabel="Company Name :"
        placeholder="Enter Company Name"
        bgColor="#086BFF1F"
        border="transparent"
        fontWeight={500}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <RHFTextField
        name={`experience_details.${expNum}.startDate`}
        formlabel="Joining Date:"
        placeholder="Joining Date"
        bgColor="#086BFF1F"
        border="transparent"
        fontWeight={500}
        type="date"
        required
      />
      {/* <RHFDatePicker name={`experience_details.${expNum}.startDate`} formlabel="Joining Date :" /> */}
    </Grid>
    <Grid item xs={12} md={6}>
      <RHFTextField
        name={`experience_details.${expNum}.enddate`}
        formlabel="End Date:"
        placeholder="End Date"
        bgColor="#086BFF1F"
        border="transparent"
        fontWeight={500}
        type="date"
        required
      />
      {/* <RHFDatePicker name={`experience_details.${expNum}.enddate`} formlabel="End Date :" /> */}
    </Grid>
    {/* <Grid item xs={12} md={4} lg={2.5}>
      <RHFCheckbox
        label="Currently Working Here"
        name={`experience_details.${expNum}.currently_working`}
      />
    </Grid> */}
  </Grid>
);

export default ExperienceResume;
