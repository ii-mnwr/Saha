import { Avatar, Box, Chip, Divider, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
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
    /*  <Box ref={ref} sx={{ padding: 20, backgroundColor: '#f5f5f5' }}> */
    <Box
      ref={ref}
      sx={{
        border: '1px solid #000',
        width: '100%',
        maxWidth: '794px',
        maxHeight: '1123px',
        height: '100vh',
        overflow: 'scroll',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#eec69f',
          padding: 4,
        }}
      >
        <Box
          sx={{
            backgroundColor: '#FFF',
            paddingX: 2,
            paddingY: 3,
          }}
        >
          <Box
            sx={{
              border: '1px solid #000',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 2,
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 1,
                alignItems: 'baseline',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    border: '1px solid #6e87ea',
                    width: { xs: 150, md: 50 },
                    height: 1,
                  }}
                />
                <Box
                  sx={{
                    borderRadius: '50%',
                    border: '1px solid #6e87ea',
                    width: 10,
                    height: 10,
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontFamily: 'monospace, sans-serif',
                  fontWeight: 500,
                  color: '#000',
                  fontSize: 20,
                  lineHeight: 1,
                }}
              >
                {data?.first_name ? data?.first_name : 'George'}{' '}
                {data?.last_name ? data?.last_name : 'Well'}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    borderRadius: '50%',
                    border: '1px solid #6e87ea',
                    width: 10,
                    height: 10,
                  }}
                />
                <Box
                  sx={{
                    border: '1px solid #6e87ea',
                    width: { xs: 150, md: 50 },
                    height: 1,
                  }}
                />
              </Box>
            </Box>
            <Typography
              sx={{
                lineHeight: 1,
                textTransform: 'uppercase',
                fontSize: 14,
                color: '#6571a0',
                fontWeight: 500,
              }}
            >
              Position
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider variant="fullWidth" sx={{ borderColor: '#000' }} />
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '100%' }}>
        <Box
          sx={{
            backgroundColor: '#d0d5ea',
            padding: 1,
            borderRight: { xs: 'none', md: '1px solid #000' },
            borderBottom: { xs: '1px solid #000', md: 'none' },
            width: { xs: '100%', md: '50%', xl: '40%' },
          }}
        >
          <Typography
            sx={{
              textTransform: 'uppercase',
            }}
          >
            Contact
          </Typography>
          <Stack spacing={1}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
              }}
            >
              <AddIcCallOutlinedIcon color="primary" />
              <Typography> {data?.phone ? data?.phone : '+44 7123 243 7890'}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
              }}
            >
              <EmailOutlinedIcon color="primary" />
              <Typography> {data?.email ? data?.email : 'info@talentsreach.com'}</Typography>
            </Box>
          </Stack>
        </Box>
        <Box
          sx={{
            padding: 1,
            width: { xs: '100%', xl: '60%' },
          }}
        >
          <Typography
            sx={{
              textTransform: 'uppercase',
            }}
          >
            Profile summary
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
            }}
          >
            {data?.personal_summary
              ? data?.personal_summary
              : `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when anunknown printer took.`}
          </Typography>
        </Box>
      </Box>
      <Divider variant="fullWidth" sx={{ borderColor: '#000' }} />
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Typography
          sx={{
            // color: '#086BFF',
            fontWeight: 400,
            fontSize: 18,
            fontFamily: 'Work Sans,sans-serif',
          }}
        >
          Skills
        </Typography>
        <Box display="flex" flexDirection="row" gap={2} flexWrap="wrap">
          {data?.skills?.length > 0 ? (
            data?.skills?.map((skill: any) => <Chip label={skill} variant="soft" />)
          ) : (
            <Chip label="Html" variant="soft" />
          )}
        </Box>
      </Box>
      <Divider variant="fullWidth" sx={{ borderColor: '#000' }} />
      <Box
        sx={{
          padding: 2,
        }}
      >
        <Typography
          sx={{
            // color: '#086BFF',
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
                    justifyContent="space-between"
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
                        {item?.endDate
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
            // color: '#086BFF',
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
    /*  </Box> */
  );
});

export default Template2;
