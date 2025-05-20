import { Avatar, Box, Divider, Grid, Icon, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
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

const Template2 = React.forwardRef<any, any>((props, ref) => {
  const { data } = props;

  return (
    <Box
      ref={ref}
      sx={{
        border: '1px solid #6D88C24D',
        width: '100%',
        maxWidth: '794px',
        maxHeight: '1123px',
        height: '100vh',
        overflow: 'scroll',
      }}
    >
      <Box
        sx={{
          height: 200,
          backgroundColor: '#1b2b4a', // Dark blue background
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: 200,
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Left part of the logo with M */}
          <Typography
            variant="h1"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '5rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {data?.first_name ? String(data?.first_name).charAt(0).toUpperCase() : 'G'}
          </Typography>

          {/* Right part of the logo with K */}
          <Typography
            variant="h1"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '5rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {data?.last_name ? String(data?.last_name).charAt(0).toUpperCase() : 'W'}
          </Typography>

          {/* Diagonal Line */}
          <Box
            sx={{
              width: '3px',
              height: '70px',
              backgroundColor: '#9fffe0', // Light mint color for the diagonal
              position: 'absolute',
              top: '67px',
              left: '75px',
              transform: 'rotate(15deg)',
              zIndex: 1,
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
            paddingRight: 4,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: '#d1f2eb',
              width: 100,
              lineHeight: 1.2,
              fontFamily: 'Rockwell,sans-serif',
            }}
          >
            {data?.first_name ? data?.first_name : 'George'}{' '}
            {data?.last_name ? data?.last_name : 'Well'}
          </Typography>
          {/* <Typography
              sx={{
                borderTop: '1px solid #FFF',
                color: '#fff',
                letterSpacing: 6,
                fontFamily: 'math,sans-serif',
                textTransform: 'uppercase',
                fontWeight: 300,
              }}
            >
              professional title
            </Typography> */}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#eaeded',
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            padding: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              alignItems: 'center',
            }}
          >
            <LocalPhoneIcon
              fontSize="small"
              sx={{
                backgroundColor: '#1b2b4a',
                fill: '#d1f2eb',
                padding: 0.4,
              }}
            />
            <Typography> {data?.phone ? data?.phone : '+44 7123 243 7890'}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              alignItems: 'center',
            }}
          >
            <MailRoundedIcon
              fontSize="small"
              sx={{
                backgroundColor: '#1b2b4a',
                fill: '#d1f2eb',
                padding: 0.4,
              }}
            />
            <Typography> {data?.email ? data?.email : 'info@talentsreach.com'}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              alignItems: 'flex-start',
            }}
          >
            <PersonRoundedIcon
              fontSize="small"
              sx={{
                backgroundColor: '#1b2b4a',
                fill: '#d1f2eb',
                padding: 0.4,
              }}
            />
            <Typography
              sx={{
                wordBreak: 'break-word',
              }}
            >
              {data?.linkedin_url ? data?.linkedin_url : 'www.linkedin/user'}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: '60%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ backgroundColor: '#d1f2eb', height: 10 }} />
          <Typography
            sx={{
              borderTop: '1px solid #FFF',
              color: '#000',
              letterSpacing: 6,
              fontFamily: 'math,sans-serif',
              textTransform: 'uppercase',
              fontWeight: 300,
              padding: 2,
            }}
          >
            about me
          </Typography>
          <Typography
            sx={{
              color: '#101010',
              fontWeight: 300,
              fontSize: 12,
              fontFamily: 'Work Sans,sans-serif',
              wordBreak: 'break-word',
              paddingX: 2,
            }}
          >
            {data?.personal_summary
              ? data?.personal_summary
              : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when anunknown printer took.'}
          </Typography>
        </Box>
      </Box>
      <Grid container>
        <Grid item xs={12} md={5.3}>
          <Box
            sx={{
              marginY: 1,
              padding: 1,
            }}
          >
            <Typography
              sx={{
                borderTop: '1px solid #FFF',
                color: '#000',
                textTransform: 'uppercase',
                fontWeight: 300,

                fontSize: 16,
                fontFamily: 'math,sans-serif',
              }}
            >
              <span
                style={{
                  fontFamily: 'math,sans-serif',
                  fontWeight: 700,
                  color: '#1b2b4a',
                  fontSize: 20,
                }}
              >
                S
              </span>
              kills
            </Typography>
            <Box component="ul" paddingX={2}>
              {data?.skills?.length > 0 ? (
                data?.skills?.map((skill: any) => (
                  <Typography component="li" variant="body2" textTransform="none">
                    {skill}
                  </Typography>
                ))
              ) : (
                <Typography component="li" variant="body2" textTransform="none">
                  HTML
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6.7}>
          <Box
            sx={{
              padding: 1,
              borderLeft: '1px solid #d0d3d4',
              borderTop: '1px solid #d0d3d4',
              margin: 1,
              height: '100%',
            }}
          >
            <Typography
              sx={{
                borderTop: '1px solid #FFF',
                color: '#000',
                textTransform: 'uppercase',
                fontWeight: 300,

                fontSize: 16,
                fontFamily: 'math,sans-serif',
              }}
            >
              <span
                style={{
                  fontFamily: 'math,sans-serif',
                  fontWeight: 700,
                  color: '#1b2b4a',
                  fontSize: 20,
                }}
              >
                E
              </span>
              xperience
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              {data?.education_details?.map((item: any) => (
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
                    fontWeight={500}
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
                  <Markdown>
                    {item?.description
                      ? item?.description
                      : '<p><strong style="color: rgb(66, 66, 66);">Job responsibilities: </strong></p><ul><li><span style="color: rgb(66, 66, 66);">Lead a team</span></li></ul>'}
                  </Markdown>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              marginY: 1,
              padding: 1,
            }}
          >
            <Typography
              sx={{
                borderTop: '1px solid #FFF',
                color: '#000',
                textTransform: 'uppercase',
                fontWeight: 300,

                fontSize: 16,
                fontFamily: 'math,sans-serif',
              }}
            >
              <span
                style={{
                  fontFamily: 'math,sans-serif',
                  fontWeight: 700,
                  color: '#1b2b4a',
                  fontSize: 20,
                }}
              >
                E
              </span>
              ducation
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              {data?.education_details?.map((item: any) => (
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
                    fontWeight={500}
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
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          gap: 1,
        }}
      ></Box>
    </Box>
  );
});

export default Template2;
