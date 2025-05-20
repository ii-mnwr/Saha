import moment from 'moment';
import React from 'react';
import { Box, Typography, Grid, List, ListItem, ListItemText, Divider, Stack } from '@mui/material';
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

const Template6 = React.forwardRef<any, any>((props, ref) => {
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
            backgroundColor: '#626567',
            display: 'flex',
            justifyContent: 'flex-end',
            paddingX: 4,
            paddingY: 5,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: '#fff',
            }}
          >
            SAMIRA HADID
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={5.5} padding={2}>
            <Stack spacing={2}>
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#a93226',
                    fontWeight: 700,
                  }}
                >
                  My Contact
                </Typography>
                <Divider
                  sx={{
                    borderColor: '#000',
                    my: 1,
                    borderWidth: 1,
                    width: 100,
                  }}
                />
                <List sx={{ width: '100%' }}>
                  <ListItem sx={{ paddingBottom: 1, px: 0 }}>
                    <Phone sx={{ mr: 1 }} fontSize="small" />
                    <ListItemText
                      primary={data?.phone ? data?.phone : '+123-456-7890'}
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    />
                  </ListItem>
                  <ListItem sx={{ padding: 0, alignItems: 'flex-start' }}>
                    <EmailOutlinedIcon sx={{ mr: 1 }} fontSize="small" />
                    <ListItemText
                      primary={data?.email ? data?.email : 'hello@reallygreatsite.com'}
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: 600,
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
                    color: '#a93226',
                    fontWeight: 700,
                  }}
                >
                  Skills
                </Typography>
                <Divider
                  sx={{
                    borderColor: '#000',
                    my: 1,
                    borderWidth: 1,
                    width: 100,
                  }}
                />
                <Stack spacing={2} component="ul" marginTop={2} paddingLeft={1}>
                  {data?.skills?.length ? (
                    data?.skills?.map((item: any) => (
                      <Typography variant="body1" component="li" fontWeight={700}>
                        {item}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body1" component="li" fontWeight={700}>
                      HTML
                    </Typography>
                  )}
                </Stack>
              </Box>
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#a93226',
                    fontWeight: 700,
                  }}
                >
                  Education Background
                </Typography>
                <Divider
                  sx={{
                    borderColor: '#000',
                    my: 1,
                    borderWidth: 1,
                    width: 100,
                  }}
                />
                <Stack spacing={2} component="ul" marginTop={2} paddingLeft={1}>
                  {data?.education_details?.map((item: any) => (
                    <Box component="li">
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold', wordBreak: 'break-word' }}
                        gutterBottom
                      >
                        {item?.institute ? item?.institute : 'Wardiere University'}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          wordBreak: 'break-word',
                        }}
                        gutterBottom
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
          <Grid item xs={6.5} padding={2}>
            <Stack spacing={2}>
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#a93226',
                    fontWeight: 700,
                  }}
                >
                  About Me
                </Typography>
                <Divider
                  sx={{
                    borderColor: '#000',
                    my: 1,
                    borderWidth: 1,
                    width: 100,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: '#000',
                  }}
                >
                  {data?.personal_summary
                    ? data?.personal_summary
                    : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.'}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#a93226',
                    fontWeight: 700,
                  }}
                >
                  Professional Experience
                </Typography>
                <Divider
                  sx={{
                    borderColor: '#000',
                    my: 1,
                    borderWidth: 1,
                    width: 100,
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
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
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
    /*  </Box> */
  );
});

export default Template6;
