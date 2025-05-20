import { Button, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { RHFCheckbox, RHFTextField } from '../hook-form';
import RHFEditor from '../hook-form/RHFEditor';
import { color } from 'framer-motion';

const ExperienceDetails = ({ experienceDetailsArr, expWatch }: any) => {
  console.log('exp', expWatch);
  console.log(experienceDetailsArr.fields?.map((item: any) => item?.present));
  return (
    <Paper
      sx={{
        p: 3,
        my: 3,
        minHeight: 120,
      }}
    >
      <Grid container spacing={2}>
        {experienceDetailsArr?.fields?.map((item: any, index: number) => {
          return (
            <>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Typography
                  sx={{
                    color: '#162144',
                    fontWeight: 600,
                    fontFamily: 'Work Sans,sans-serif',
                    fontSize: 24,
                    pb: 1,
                  }}
                >
                  Experience {index > 0 && index + 1}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name={`experience_details[${index}].position`}
                  formlabel="Job Title :"
                  placeholder="Enter Your Job Tiitle"
                  bgColor="#fff"
                  border="outline"
                  fontWeight={500}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name={`experience_details[${index}].company`}
                  formlabel="Company Name :"
                  placeholder="Enter Company Name"
                  bgColor="#fff"
                  border="outline"
                  fontWeight={500}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name={`experience_details[${index}].startDate`}
                  formlabel="joining Date :"
                  placeholder="dd/mm/yyyy"
                  bgColor="#fff"
                  border="outline"
                  fontWeight={500}
                  type="date"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField
                  name={`experience_details[${index}].endDate`}
                  formlabel="End Date :"
                  placeholder="dd/mm/yyyy"
                  bgColor="#fff"
                  border="outline"
                  fontWeight={500}
                  type="date"
                  required
                  disabled={expWatch[index]?.present}
                />
              </Grid>
                <Grid item xs={12} lg={12}>
                <RHFEditor
                  simple
                  name={`experience_details[${index}].description`}
                  placeholder="Write description."
                  id={`experience_details${index}`}
                  displayEditor
                  sx={{
                  backgroundColor: '#fff', // Set the background color to white
                  '& .ql-editor': {
                    backgroundColor: '#fff', // Ensure the text box background is also white
                  },
                  }}
                />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <RHFCheckbox
                  label="Present"
                  name={`experience_details[${index}].present`}
                  sx={{
                  '& .MuiCheckbox-root': {
                    color: 'transparent', // Change the default color
                  },
                  '& .MuiCheckbox-root.Mui-checked': {
                    color: '#0a2239', // Change the color when checked
                  },
                  }}
                />
                </Grid>
            </>
          );
        })}
      </Grid>

      <Button
        variant="contained"
        sx={{
          bgcolor: '#0A2239',
          color: '#fff',
        }}
        onClick={() => {
          experienceDetailsArr.append({
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            description: '',
          });
        }}
      >
        Add +
      </Button>
    </Paper>
  );
};

export default ExperienceDetails;
