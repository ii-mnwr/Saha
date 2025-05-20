import { Button, Grid, Paper, Typography, Box} from '@mui/material';
import React from 'react';
import { RHFTextField } from '../hook-form';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';

const EducationDetails = ({ educationDetailsArr }: any) => (
    <Paper
      sx={{
        p: 3,
        my: 3,
        minHeight: 120,
      }}
    >
      <Grid container spacing={2}>
        {educationDetailsArr?.fields?.map((item: any, index: number) => (
          <>
            <Grid item xs={12}>
              <Typography
                sx={{
                  color: '#162144',
                  fontWeight: 600,
                  fontFamily: 'Work Sans,sans-serif',
                  fontSize: 24,
                  pb: 1,
                }}
              >
                Education {index > 0 && index + 1}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <RHFTextField
                name={`education_details[${index}].degree`}
                formlabel="Degree"
                placeholder="BE/ B.Tech"
                bgColor="#fff"
                border="outline"
                fontWeight={500}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField
                name={`education_details[${index}].institute`}
                formlabel="Institute"
                placeholder="University Name"
                bgColor="#fff"
                border="outline"
                fontWeight={500}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField
                name={`education_details[${index}].yearOfPassing`}
                formlabel="Year of Passing"
                placeholder="eg. 2022"
                bgColor="#fff"
                border="outline"
                fontWeight={500}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField
                name={`education_details[${index}].cgpa`}
                formlabel="CGPA / Percentages"
                placeholder="Out of 4, Out of 10"
                bgColor="#fff"
                border="outline"
                fontWeight={500}
              />
            </Grid>
          </>
        ))}
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <Button
          variant="contained"
          sx={{
            color: '#fff',
            backgroundColor: '#0A2239',
          }}
          onClick={() => {
            educationDetailsArr.append({
              cgpa: '',
              title: '',
              degree: '',
              institute: '',
              yearOfPassing: '',
            });
          }}
        >
          Add +
        </Button>
        <IconButton
          sx={{
            ':hover': {
              background: 'outline',
            },
            ':active': {
              background: 'outline',
            },
            ':focus': {
              background: 'outline',
            },
          }}
          onClick={() => {
            educationDetailsArr.remove({
              cgpa: '',
              title: '',
              degree: '',
              institute: '',
              yearOfPassing: '',
            });
          }}
        >
          <DeleteOutlineIcon
            sx={{
              fill: 'red',
            }}
          />
        </IconButton>
      </Box>
    </Paper>
  );

export default EducationDetails;
