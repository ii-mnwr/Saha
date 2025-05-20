import moment from 'moment';
import React from 'react';
import { LocationIcon, TimeIcon } from 'src/theme/overrides/CustomIcons';
import {
  Box,
  Typography,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  Stepper,
  StepLabel,
  Step,
  StepContent,
} from '@mui/material';
import { Phone, Email } from '@mui/icons-material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Markdown from '../markdown/Markdown';

function calculateExperience(joiningDate: any, endDate: any) {
  const start = moment(joiningDate);
  const end = moment(endDate);

  // Calculate the difference in years and months
  const years = end.diff(start, 'years');
  start.add(years, 'years');

  const months = end.diff(start, 'months');

  return { years, months };
}

const Template5 = React.forwardRef<any, any>((props, ref) => {
  const { data } = props;
  const steps = [
    {
      label: 'Borcelle Studio',
      date: '2030 - PRESENT',
      role: 'Marketing Manager & Specialist',
    },
    {
      label: 'Fauget Studio',
      date: '2025 - 2029',
      role: 'Marketing Manager & Specialist',
    },
    {
      label: 'Studio Shodwe',
      date: '2024 - 2025',
      role: 'Marketing Manager & Specialist',
      responsibilities: [
        'Develop and maintain strong relationships with partners, agencies, and vendors to support marketing initiatives.',
        'Monitor and maintain brand consistency across all marketing channels and materials.',
      ],
    },
  ];

  return (
    /*  <Box ref={ref} sx={{ padding: 20, backgroundColor: '#f5f5f5' }}> */
    <Box
      ref={ref}
      sx={{
        border: '1px solid transparent',
        width: '100%',
        maxWidth: '794px',
        maxHeight: '1123px',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          height: '100%',
          bgcolor: '#f4f4f4',
          overflowY: 'scroll',
        }}
      >
        {/* Left Sidebar */}
        <Box
          sx={{
            width: { xs: '100%', md: '40%' },
            bgcolor: '#154360',
            p: 3,
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Contact Information */}
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
              CONTACT
            </Typography>
            <Divider sx={{ borderWidth: 1, my: 0.5, bgcolor: 'white' }} />
            <List sx={{ width: '100%', color: 'white' }}>
              <ListItem sx={{ paddingBottom: 1, px: 0 }}>
                <Phone sx={{ mr: 1 }} fontSize="small" />
                <ListItemText
                  primary={data?.phone ? data?.phone : '+123-456-7890'}
                  primaryTypographyProps={{
                    fontSize: 13,
                  }}
                />
              </ListItem>
              <ListItem sx={{ padding: 0, alignItems: 'flex-start' }}>
                <Email sx={{ mr: 1 }} fontSize="small" />
                <ListItemText
                  primary={data?.email ? data?.email : 'hello@reallygreatsite.com'}
                  primaryTypographyProps={{
                    fontSize: 13,
                  }}
                  sx={{
                    wordBreak: 'break-word',
                  }}
                />
              </ListItem>
            </List>
          </Box>

          {/* Education */}
          <Box sx={{ mt: 4, width: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
              EDUCATION
            </Typography>
            <Divider sx={{ borderWidth: 1, mt: 0.5, mb: 1.5, bgcolor: 'white' }} />
            <Stack spacing={2}>
              {data?.education_details?.map((item: any) => (
                <Box>
                  <Typography variant="body2">
                    {' '}
                    {item?.yearOfPassing ? item?.yearOfPassing : '2024'}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', wordBreak: 'break-word' }}>
                    {item?.institute ? item?.institute : 'Wardiere University'}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      wordBreak: 'break-word',
                    }}
                  >
                    {item?.degree ? item?.degree : 'Master of Business Management'}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
          <Box sx={{ mt: 4, width: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
              SKILLS
            </Typography>
            <Divider sx={{ borderWidth: 1, mt: 0.5, mb: 1.5, bgcolor: 'white' }} />
            <Box component="ul" pl={2}>
              {data?.skills?.length > 0 ? (
                data?.skills?.map((skill: any) => (
                  <Typography variant="body1" component="li">
                    {skill}
                  </Typography>
                ))
              ) : (
                <Typography variant="body1" component="li">
                  HTML
                </Typography>
              )}
            </Box>
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ width: { xs: '100%', md: '60%' }, p: 3 }}>
          {/* Profile Section */}

          <Typography variant="h4" sx={{ fontSize: 20, mb: 0.5 }}>
            RICHARD{' '}
            <span
              style={{
                fontWeight: 500,
              }}
            >
              SANCHEZ
            </span>
          </Typography>
          <Divider sx={{ bgcolor: '#154360', borderWidth: 2, width: 80, mb: 3 }} />

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
              PROFILE
            </Typography>
            <Divider sx={{ bgcolor: '#000', mt: 0.5, mb: 1.5 }} />
            <Typography variant="body2" sx={{ mt: 2 }}>
              {data?.personal_summary
                ? data?.personal_summary
                : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.'}
            </Typography>
          </Box>

          {/* Work Experience Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
              WORK EXPERIENCE
            </Typography>
            <Divider sx={{ bgcolor: '#000', mt: 0.5, mb: 1.5 }} />

            <Box sx={{ margin: 'auto', mt: 2 }}>
              <Stepper
                orientation="vertical"
                connector={null}
                sx={{
                  '.MuiStepConnector-root': {
                    marginLeft: 0, // Remove default padding/margin between steps
                  },
                  '.MuiStep-root': {
                    padding: 0, // Remove padding around each step
                  },
                }}
              >
                {data?.experience_details?.map((item: any, index: number) => {
                  const yearsCalculate = calculateExperience(
                    item?.startDate ? item?.startDate : '2023-06-01',
                    item?.endDate ? item?.endDate : '2024-06-01'
                  );
                  return (
                    <Step key={index} active>
                      <StepLabel
                        sx={{
                          paddingY: 0,
                        }}
                        icon={
                          <FiberManualRecordIcon
                            sx={{ color: '#000', width: 12, height: 12 }}
                            fontSize="small"
                          />
                        }
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: 14 }}>
                            {item?.company ? item?.company : 'Borcelle Studio'}
                          </Typography>
                          <Typography variant="caption">
                            {item?.startDate
                              ? moment(item?.startDate, 'YYYY-MM-DD').format('YYYY')
                              : '2017'}
                            {'-'}{' '}
                            {item?.present
                              ? 'Present'
                              : item?.endDate
                                ? moment(item?.endDate, 'YYYY-MM-DD').format('YYYY')
                                : '2020'}
                          </Typography>
                        </Box>
                      </StepLabel>
                      <StepContent
                        sx={{
                          ml: 0.7,
                          borderLeft: '1.4px solid #000',
                          pb: index + 1 === data?.experience_details?.length ? 1 : 2,
                        }}
                      >
                        <Typography variant="body2">
                          {item?.position ? item?.position : 'Product Designer'}
                        </Typography>
                        <Box paddingTop={1}>
                          <Markdown>
                            {item?.description
                              ? item?.description
                              : '<p><strong style="color: rgb(66, 66, 66);">Job responsibilities: </strong></p><ul><li><span style="color: rgb(66, 66, 66);">Lead a team</span></li></ul>'}
                          </Markdown>
                        </Box>
                      </StepContent>
                    </Step>
                  );
                })}
              </Stepper>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
    /*  </Box> */
  );
});

export default Template5;
