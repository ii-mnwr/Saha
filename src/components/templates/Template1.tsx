import { Avatar, Box, Divider, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { LocationIcon, TimeIcon } from 'src/theme/overrides/CustomIcons';
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

const Template1 = React.forwardRef<any, any>((props, ref) => {
  const { data } = props;
  console.log('data', data);

  return (
    /*  <Box ref={ref} sx={{ padding: 20, backgroundColor: '#f5f5f5' }}> */
    <Box
      ref={ref}
      sx={{
        // border: '1px solid #6D88C24D',
        width: '100%',
        maxWidth: '794px',
        maxHeight: '1123px',
        height: '100vh',
        overflow: 'scroll',
      }}
    >
      <Box
        sx={{
          background: '#086BFF',
          height: 40,
        }}
      />
      <Box
        sx={{
          padding: 2,
          height: '100vh',
        }}
      >
        <Typography
          sx={{
            color: '#086BFF',
            fontWeight: 500,
            fontFamily: 'Work Sans,sans-serif',
            fontSize: 28,
            paddingBottom: 1,
          }}
        >
          {data?.first_name ? data?.first_name : 'George'}{' '}
          {data?.last_name ? data?.last_name : 'Well'}
        </Typography>
        <Divider
          sx={{
            borderColor: '#000',
          }}
        />
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          gap={2}
          height={{ xs: '100%', xl: '88%' }}
        >
          <Box
            sx={{
              background: '#D9D9D980',
              width: { xs: '100%', xl: '30%' },
              padding: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: '#086BFF',
                  fontWeight: 400,
                  fontSize: 18,
                  fontFamily: 'Work Sans,sans-serif',
                }}
              >
                Personal Information
              </Typography>
              <Box
                sx={{
                  py: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 300,
                      fontSize: 11,
                      fontFamily: 'Inter,sans-serif',
                      color: ' #101010',
                    }}
                  >
                    Name
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: 11,
                      fontFamily: 'Inter,sans-serif',
                      color: ' #101010',
                      wordBreak: 'break-word',
                    }}
                  >
                    {data?.first_name ? data?.first_name : 'George'}{' '}
                    {data?.last_name ? data?.last_name : 'Well'}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 300,
                      fontSize: 11,
                      fontFamily: 'Inter,sans-serif',
                      color: ' #101010',
                    }}
                  >
                    Email
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: 11,
                      fontFamily: 'Inter,sans-serif',
                      color: ' #101010',
                      wordBreak: 'break-word',
                    }}
                  >
                    {data?.email ? data?.email : 'info@talentsreach.com'}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 300,
                      fontSize: 11,
                      fontFamily: 'Inter,sans-serif',
                      color: ' #101010',
                    }}
                  >
                    Phone
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: 11,
                      fontFamily: 'Inter,sans-serif',
                      color: ' #101010',
                      wordBreak: 'break-word',
                    }}
                  >
                    {data?.phone ? data?.phone : '+44 7123 243 7890'}
                  </Typography>
                </Box>
              </Box>
              {/* <Typography
                  sx={{
                    color: '#086BFF',
                    fontWeight: 400,
                    fontSize: 18,
                    fontFamily: 'Work Sans,sans-serif',
                  }}
                >
                  Skills
                </Typography>
                <Box
                  sx={{
                    py: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: 11,
                        fontFamily: 'Inter,sans-serif',
                        color: ' #101010',
                      }}
                    >
                      UI/UX
                    </Typography>
                    <Rating
                      size="small"
                      defaultValue={5}
                      sx={{
                        color: '#086BFF',
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: 11,
                        fontFamily: 'Inter,sans-serif',
                        color: ' #101010',
                      }}
                    >
                      Graphic Design
                    </Typography>
                    <Rating
                      size="small"
                      defaultValue={5}
                      sx={{
                        color: '#086BFF',
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: 11,
                        fontFamily: 'Inter,sans-serif',
                        color: ' #101010',
                      }}
                    >
                      Logo Design
                    </Typography>
                    <Rating
                      size="small"
                      defaultValue={5}
                      sx={{
                        color: '#086BFF',
                      }}
                    />
                  </Box>
                </Box> */}
            </Box>
            <Box>
              <Typography
                sx={{
                  color: '#086BFF',
                  fontWeight: 400,
                  fontSize: 18,
                  fontFamily: 'Work Sans,sans-serif',
                }}
              >
                Skills
              </Typography>
              <Box
                component="ul"
                sx={{
                  pl: 1.5,
                  pt: 1,
                }}
              >
                {data?.skills?.length > 0 &&
                  data?.skills?.map((skill: any) => (
                    <Typography
                      component="li"
                      sx={{
                        fontWeight: 600,
                        fontSize: 11,
                        fontFamily: 'Inter,sans-serif',
                        color: ' #101010',
                        wordBreak: 'break-word',
                      }}
                    >
                      {skill}
                    </Typography>
                  ))}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              py: 1,
              height: '100%',
              width: { xs: '100%', xl: '70%' },
            }}
          >
            <Typography
              sx={{
                color: '#086BFF',
                fontWeight: 400,
                fontSize: 18,
                fontFamily: 'Work Sans,sans-serif',
              }}
            >
              Summary
            </Typography>
            <Typography
              sx={{
                color: '#101010',
                fontWeight: 300,
                fontSize: 10,
                fontFamily: 'Work Sans,sans-serif',
                wordBreak: 'break-word',
              }}
            >
              {data?.personal_summary
                ? data?.personal_summary
                : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when anunknown printer took.'}
            </Typography>
            <Divider
              sx={{
                borderColor: '#6D88C24D',
                py: 1,
              }}
            />
            <Typography
              sx={{
                color: '#086BFF',
                fontWeight: 400,
                fontSize: 18,
                fontFamily: 'Work Sans,sans-serif',
              }}
            >
              Work Experience
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                paddingX: 1,
                paddingY: 2,
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
                      flexDirection: { xs: 'column', md: 'row' },
                      gap: 1,
                      width: '100%',
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 50,
                        height: 50,
                        boxShadow: '0px 4px 4px 0px #00000040, 0px 4px 4px 0px #00000040 inset',
                      }}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 1,
                      }}
                    >
                      <Typography
                        color="#000000"
                        fontFamily="Inter,sans-serif"
                        fontWeight={600}
                        fontSize={14}
                        lineHeight={1}
                      >
                        {item?.position ? item?.position : 'Product Designer'}
                      </Typography>
                      <Typography
                        color="#000000"
                        fontFamily="Inter,sans-serif"
                        fontWeight={200}
                        fontSize={14}
                        lineHeight={1}
                      >
                        {item?.company ? item?.company : 'Coding Agency'}
                      </Typography>
                      <Markdown>
                        {item?.description
                          ? item?.description
                          : '<p><strong style="color: rgb(66, 66, 66);">Job responsibilities: </strong></p><ul><li><span style="color: rgb(66, 66, 66);">Lead a team</span></li></ul>'}
                      </Markdown>
                      <Box
                        width="100%"
                        display="flex"
                        flexDirection={{ xs: 'column', md: 'row' }}
                        alignItems={{ xs: 'flex-start', md: 'center' }}
                        gap={{ xs: 1, md: 4 }}
                      >
                        <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                          <LocationIcon fill="#979797B0" />
                          <Typography
                            color="#000000"
                            fontFamily="Work Sans,sans-serif"
                            fontWeight={500}
                            fontSize={9}
                          >
                            Hicks St Brooklyn, NY
                          </Typography>
                        </Box>
                        <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                          <TimeIcon fill="#979797B0" />
                          <Typography
                            color="#000000"
                            fontFamily="Inter,sans-serif"
                            fontWeight={300}
                            fontSize={9}
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
                            - {yearsCalculate?.years}.{yearsCalculate.months} years
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
            <Typography
              sx={{
                color: '#086BFF',
                fontWeight: 400,
                fontSize: 18,
                fontFamily: 'Work Sans,sans-serif',
              }}
            >
              Education
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                paddingX: 1,
                paddingY: 2,
              }}
            >
              {data?.education_details?.map((item: any) => (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2,
                    width: '100%',
                  }}
                >
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                      boxShadow: '0px 4px 4px 0px #00000040, 0px 4px 4px 0px #00000040 inset',
                    }}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      gap: 1,
                    }}
                  >
                    <Typography
                      color="#000000"
                      fontFamily="Inter,sans-serif"
                      fontWeight={600}
                      fontSize={14}
                      lineHeight={1}
                    >
                      {item?.degree ? item?.degree : 'Bachelor in Software Engineering'}
                    </Typography>
                    <Typography
                      color="#000000"
                      fontFamily="Inter,sans-serif"
                      fontWeight={200}
                      fontSize={14}
                      lineHeight={1}
                    >
                      {item?.institute ? item?.institute : 'Harvard University'}
                    </Typography>
                    <Box
                      width="100%"
                      display="flex"
                      flexDirection={{ xs: 'column', md: 'row' }}
                      alignItems={{ xs: 'flex-start', md: 'center' }}
                      gap={{ xs: 1, md: 4 }}
                    >
                      <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                        <LocationIcon fill="#979797B0" />
                        <Typography
                          color="#000000"
                          fontFamily="Work Sans,sans-serif"
                          fontWeight={500}
                          fontSize={9}
                        >
                          Brylin, USA
                        </Typography>
                      </Box>
                      <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                        <TimeIcon fill="#979797B0" />
                        <Typography
                          color="#000000"
                          fontFamily="Inter,sans-serif"
                          fontWeight={300}
                          fontSize={9}
                        >
                          {item?.yearOfPassing ? item?.yearOfPassing : '2024'}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
    /*  </Box> */
  );
});

export default Template1;
