import moment from 'moment';
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  IconButton,
} from '@mui/material';
import { Phone } from '@mui/icons-material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
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

const Template7 = React.forwardRef<any, any>((props, ref) => {
  const { data } = props;

  return (
    /*  <Box ref={ref} sx={{ padding: 20, backgroundColor: '#f5f5f5' }}> */
    <Box
      ref={ref}
      sx={{
        border: '1px solid #6D88C24D',
        width: '100%',
        maxWidth: '794px',
        maxHeight: '1123px',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            padding: 4,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box display="flex" flexDirection="column" width={300}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',

                alignItems: 'flex-start',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  lineHeight: 1,
                  color: '#154360',
                }}
              >
                RICHARD
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Typography
                variant="h2"
                sx={{
                  color: '#154360',
                  lineHeight: 1,
                }}
              >
                SANCHEZ
              </Typography>
            </Box>
          </Box>
        </Box>
        <Grid container>
          <Grid item xs={5.5} padding={2}>
            <Stack spacing={1}>
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#000',
                    fontWeight: 300,
                    textAlign: 'center',
                    fontSize: 18,
                  }}
                  gutterBottom
                >
                  About Me
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: '#000',
                    textAlign: 'center',
                    fontSize: 12,
                  }}
                >
                  {data?.personal_summary
                    ? data?.personal_summary
                    : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.'}
                </Typography>

                <List sx={{ width: '100%' }}>
                  <ListItem sx={{ paddingBottom: 1, px: 0 }}>
                    <IconButton
                      sx={{
                        backgroundColor: '#154360',
                      }}
                    >
                      <Phone
                        sx={{
                          fill: '#fff',
                        }}
                        fontSize="small"
                      />
                    </IconButton>
                    <ListItemText
                      primary={data?.phone ? data?.phone : '+123-456-7890'}
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: 600,
                        ml: 1,
                      }}
                    />
                  </ListItem>
                  <ListItem sx={{ padding: 0, alignItems: 'flex-start' }}>
                    <IconButton
                      sx={{
                        backgroundColor: '#154360',
                      }}
                    >
                      <EmailOutlinedIcon
                        sx={{
                          fill: '#fff',
                        }}
                        fontSize="small"
                      />
                    </IconButton>
                    <ListItemText
                      primary={data?.email ? data?.email : 'hello@reallygreatsite.com'}
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: 600,
                        ml: 1,
                      }}
                      sx={{
                        wordBreak: 'break-word',
                      }}
                    />
                  </ListItem>
                </List>
              </Box>
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#FFF',
                    fontWeight: 400,
                    background: '#154360',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    py: 0.5,
                  }}
                >
                  Skills
                </Typography>
                <Box component="ul" paddingLeft={2} marginY={2}>
                  {data?.skills?.length > 0 ? (
                    data?.skills?.map((skill: any) => (
                      <Typography variant="body1" fontWeight={600} component="li">
                        {skill}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body1" fontWeight={600} component="li">
                      HTML
                    </Typography>
                  )}
                </Box>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={6.5} padding={2}>
            <Stack spacing={1}>
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#FFF',
                    fontWeight: 400,
                    background: '#154360',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    py: 0.5,
                  }}
                >
                  Experience
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    marginY: 2,
                  }}
                >
                  {data?.experience_details?.map((item: any) => {
                    const yearsCalculate = calculateExperience(
                      item?.startDate ? item?.startDate : '2023-06-01',
                      item?.endDate ? item?.endDate : '2024-06-01'
                    );
                    return (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%',
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: '#000',
                          }}
                        >
                          {item?.company ? item?.company : 'Coding Agency'}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: '#000',
                          }}
                        >
                          {item?.startDate
                            ? moment(item?.startDate, 'YYYY-MM-DD').format('MMM YYYY')
                            : 'Jun 2017'}
                          {'-'}{' '}
                          {item?.present
                            ? 'Present'
                            : item?.endDate
                              ? moment(item?.endDate, 'YYYY-MM-DD').format('MMM YYYY')
                              : 'April 2020'}{' '}
                        </Typography>
                        <Box paddingTop={1}>
                          <Markdown>
                            {item?.description
                              ? item?.description
                              : '<p><strong style="color: rgb(66, 66, 66);">Job responsibilities: </strong></p><ul><li><span style="color: rgb(66, 66, 66);">Lead a team</span></li></ul>'}
                          </Markdown>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#FFF',
                    fontWeight: 400,
                    background: '#154360',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    py: 0.5,
                  }}
                >
                  Education
                </Typography>
                <Stack spacing={2} marginTop={2}>
                  {data?.education_details?.map((item: any) => (
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold', wordBreak: 'break-word' }}
                      >
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
                      <Typography variant="body2">
                        Completed {item?.yearOfPassing ? item?.yearOfPassing : '2024'}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
    /*  </Box> */
  );
});

export default Template7;
