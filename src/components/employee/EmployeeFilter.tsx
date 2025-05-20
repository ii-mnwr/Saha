import { Box, Card, FormControl, IconButton, MenuItem, Select, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { DeleteIcon } from 'src/theme/overrides/CustomIcons';
import FormProvider from '../hook-form/FormProvider';
import { RHFSelect, RHFTextField } from '../hook-form';
import { countries } from 'src/assets/data';

type FormValuesProps = {};

export const EmployeeFilter = ({ handleFilteration, filter, resetFilter }: any) => {
  const defaultValues = {
    job_title: '',
    location: '',
    years_of_exp: '',
  };

  const schema = Yup.object().shape({});

  const methods = useForm<FormValuesProps | any>({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { reset, register, watch } = methods;
  return (
    <Card
      sx={{
        padding: 2,
        boxShadow: 6,
        width: '100%',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          marginBottom={2}
          fontWeight={600}
          fontFamily="Work Sans, sans-serif"
          fontSize={18}
        >
          Filters
        </Typography>
        <IconButton
          sx={{
            border: '2px solid #086BFF',
            borderRadius: '50%',
            width: 30,
            height: 30,
            ':hover': {
              background: 'transparent',
            },
          }}
          onClick={() => {
            reset();
            resetFilter();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
      <FormProvider methods={methods}>
        <RHFSelect
          native
          name="title"
          formlabel="Job Title"
          placeholder="Enter Job Title"
          inputProps={{ 'aria-label': 'Without label' }}
          hiddenLabel
          value={filter?.job_title}
          variant="filled"
          defaultValue=""
          sx={{
            '& select': {
              background: '#086BFF1F !important',
              color: '#0000005C',
              fontWeight: 500,
              fontFamily: 'Work Sans,sans-serif',
              borderRadius: 1,
            },
          }}
          onChange={(e) =>
            handleFilteration({
              name: 'job_title',
              value: e.target.value,
            })
          }
        >
          <option disabled value="">
            Select Job Title
          </option>
          <option value="backend_developer">Back End Developer</option>
          <option value="bde">BDE</option>
          <option value="digital_marketing">Digital Marketing</option>
          <option value="fullstack_developer">Full Stack Developer</option>
          <option value="frontend_developer">Front End Developer</option>
        </RHFSelect>
        {/* <RHFTextField
          name="job_title"
          formlabel="Job Title"
          placeholder="Enter Job Title"
          fontWeight={500}
          value={filter?.title}
          onChange={(e) =>
            handleFilteration({
              name: 'title',
              value: e.target.value,
            })
          }
        /> */}
        {/* <RHFTextField
          name="location"
          formlabel="Location"
          placeholder=""
          value={filter?.location}
          onChange={(e) =>
            handleFilteration({
              name: 'location',
              value: e.target.value,
            })
          }
        /> */}
        {/* <Box width="100%" display="flex" flexDirection="column" gap={1}>
          <Typography
            sx={{
              fontFamily: 'Work Sans,sans-serif',
              fontSize: 16,
              fontWeight: 600,
              color: '#000',
            }}
          >
            Location
          </Typography>

          <FormControl
            sx={{
              width: {
                xs: '100%',
                md: '100%',
              },
            }}
          >
            <Select
              variant="outlined"
              name="location"
              // {...register('location')}
              defaultValue=""
              displayEmpty
              onChange={(e) =>
                handleFilteration({
                  name: 'location',
                  value: e.target.value,
                })
              }
              sx={{
                mb: 1,
                background: '#086BFF1F',
                boxShadow: 'none',
                color: '#0000005C',
                border: 'none',
                ':hover': {
                  border: 'none',
                },
                '&.MuiOutlinedInput-root': {
                  fontWeight: 400,
                  fontFamily: 'Work Sans,sans-serif',
                  '.MuiOutlinedInput-notchedOutline': {
                    border: '1px solid rgba(145, 158, 171, 0.32)',
                    borderRadius: 0.75,
                    '& fieldset': {
                      border: 'transparent',
                    },
                  },
                },
              }}
              value={filter?.location || ''}
            >
              <MenuItem value="" disabled>
                <em>Select Location</em>
              </MenuItem>
              {countries?.map((item, index) => (
                <MenuItem value={item?.label} key={item?.label}>
                  {item?.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box> */}

        <RHFSelect
          native
          name="experience"
          formlabel="Experience"
          placeholder="Enter Job Title"
          inputProps={{ 'aria-label': 'Without label' }}
          hiddenLabel
          value={filter?.experience}
          variant="filled"
          sx={{
            '& select': {
              background: '#086BFF1F !important',
              color: '#0000005C',
              fontWeight: 500,
              fontFamily: 'Work Sans,sans-serif',
              borderRadius: 1,
            },
          }}
          onChange={(e) =>
            handleFilteration({
              name: 'experience',
              value: e.target.value,
            })
          }
        >
          <option disabled value="">
            Select Experience
          </option>
          <option value="any_experience">Any Experience</option>
          <option value="fresher">Fresher</option>
          <option value="intern">Intern</option>
          <option value="1to3years">1 to 3 Years</option>
          <option value="3to5years">3 to 5 Years</option>
          <option value="above5years">above 5 Years</option>
        </RHFSelect>

        {/* <RHFTextField
          name="years_of_exp"
          formlabel="Years Of Experience"
          placeholder=""
          value={filter?.experience}
          onChange={(e) =>
            handleFilteration({
              name: 'experience',
              value: e.target.value,
            })
          }
        /> */}

        <RHFSelect
          native
          name="type_of_employment"
          formlabel="Type of Employment"
          placeholder="Select type"
          value={filter?.type_of_employment}
          inputProps={{ 'aria-label': 'Without label' }}
          hiddenLabel
          variant="filled"
          defaultValue=""
          sx={{
            '& select': {
              background: '#086BFF1F !important',
              color: '#0000005C',
              fontWeight: 500,
              fontFamily: 'Work Sans,sans-serif',
              borderRadius: 1,
            },
          }}
          onChange={(e) =>
            handleFilteration({
              name: 'type_of_employment',
              value: e.target.value,
            })
          }
        >
          <option disabled value="">
            Select Type of Employement
          </option>
          <option value="full_time">Full Time</option>
          <option value="part_time">Part Time</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="temporary">Temporary</option>
        </RHFSelect>

        {/* <RHFTextField
          name="tot_emp"
          formlabel="Type of Employment"
          placeholder=""
          value={filter?.type_of_employment}
          onChange={(e) =>
            handleFilteration({
              name: 'type_of_employment',
              value: e.target.value,
            })
          }
        /> */}

        {/* <RHFSelect
          native
          name="nationality"
          formlabel="Nationality"
          placeholder="Select Nationality"
          inputProps={{ 'aria-label': 'Without label' }}
          hiddenLabel
          value={filter?.nationality}
          variant="filled"
          defaultValue=""
          sx={{
            '& select': {
              background: '#086BFF1F !important',
              color: '#0000005C',
              fontWeight: 500,
              fontFamily: 'Work Sans,sans-serif',
              borderRadius: 1,
            },
          }}
          onChange={(e) =>
            handleFilteration({
              name: 'nationality',
              value: e.target.value,
            })
          }
        >
          <option disabled value="">
            Select Nationality
          </option>
          <option value="americal">American</option>
          <option value="austarlian">Australian</option>
          <option value="bangladeshi">Bangladeshi</option>
          <option value="cambodian">Cambodian</option>
          <option value="indian">indian</option>
        </RHFSelect> */}

        {/* <RHFTextField
          name="nationality"
          formlabel="Nationality"
          placeholder=""
          value={filter?.nationality}
          onChange={(e) =>
            handleFilteration({
              name: 'nationality',
              value: e.target.value,
            })
          }
        /> */}

        {/* <RHFTextField
          name="education"
          formlabel="Education"
          placeholder=""
          value={filter?.education}
          onChange={(e) =>
            handleFilteration({
              name: 'education',
              value: e.target.value,
            })
          }
        /> */}

        <RHFSelect
          native
          name="education"
          formlabel="Education"
          placeholder="Select Education"
          inputProps={{ 'aria-label': 'Without label' }}
          hiddenLabel
          variant="filled"
          value={filter?.education}
          defaultValue=""
          sx={{
            '& select': {
              background: '#086BFF1F !important',
              color: '#0000005C',
              fontWeight: 500,
              fontFamily: 'Work Sans,sans-serif',
              borderRadius: 1,
            },
          }}
          onChange={(e) =>
            handleFilteration({
              name: 'education',
              value: e.target.value,
            })
          }
        >
          <option disabled value="">
            Select Education
          </option>
          <option value="under_graduation">Under Graduation</option>
          <option value="graduation">Graduation</option>
          <option value="post_graduation">Post Graduation</option>
          <option value="phd">phD</option>
          <option value="other_courses">other Courses</option>
        </RHFSelect>

        {/* <RHFTextField
          name="gender"
          formlabel="Gender"
          placeholder=""
          value={filter?.gender}
          onChange={(e) =>
            handleFilteration({
              name: 'gender',
              value: e.target.value,
            })
          }
        /> */}

        <RHFSelect
          native
          name="gender"
          inputProps={{ 'aria-label': 'Without label' }}
          hiddenLabel
          value={filter?.gender}
          formlabel="Gender"
          variant="filled"
          defaultValue=""
          sx={{
            '& select': {
              background: '#086BFF1F !important',
              color: '#0000005C',
              fontWeight: 500,
              fontFamily: 'Work Sans,sans-serif',
              borderRadius: 1,
            },
          }}
          onChange={(e) =>
            handleFilteration({
              name: 'gender',
              value: e.target.value,
            })
          }
        >
          <option disabled value="">
            Male/Female
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="not_required">Not Required</option>
        </RHFSelect>

        {/* <RHFTextField
          name="age_group"
          formlabel="Age Group"
          placeholder=""
          value={filter?.age}
          onChange={(e) =>
            handleFilteration({
              name: 'age',
              value: e.target.value,
            })
          }
        /> */}

        <RHFSelect
          native
          name="age"
          inputProps={{ 'aria-label': 'Without label' }}
          hiddenLabel
          formlabel="Age"
          value={filter?.age}
          variant="filled"
          defaultValue=""
          sx={{
            '& select': {
              background: '#086BFF1F !important',
              color: '#0000005C',
              fontWeight: 500,
              fontFamily: 'Work Sans,sans-serif',
              borderRadius: 1,
            },
          }}
          onChange={(e) =>
            handleFilteration({
              name: 'age',
              value: e.target.value,
            })
          }
        >
          <option disabled value="">
            Select Age
          </option>
          <option value="21to29">21 to 29</option>
          <option value="30to39">30 to 39</option>
          <option value="40to59">40 to 59</option>
          <option value="not_required">Not Required</option>
        </RHFSelect>

        {/* <RHFTextField
          name="licence"
          formlabel="Licence"
          placeholder=""
          value={filter?.licence}
          onChange={(e) =>
            handleFilteration({
              name: 'licence',
              value: e.target.value,
            })
          }
        /> */}

        <RHFSelect
          native
          name="licence"
          inputProps={{ 'aria-label': 'Without label' }}
          hiddenLabel
          formlabel="Licence"
          variant="filled"
          defaultValue=""
          value={filter?.licence}
          sx={{
            '& select': {
              background: '#086BFF1F !important',
              color: '#0000005C',
              fontWeight: 500,
              fontFamily: 'Work Sans,sans-serif',
              borderRadius: 1,
            },
          }}
          onChange={(e) =>
            handleFilteration({
              name: 'licence',
              value: e.target.value,
            })
          }
        >
          <option disabled value="">
            Select Licence
          </option>
          <option value="dl">Driving Licence</option>
          <option value="healthcare">Health Care Licence</option>
          <option value="other">Other</option>
        </RHFSelect>
      </FormProvider>
    </Card>
  );
};
