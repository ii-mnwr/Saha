import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
  Box,
  CardHeader,
  Stack,
} from '@mui/material';

const EducationListing = ({ data }: any) => (
  <Card
    // sx={{
    //   // boxShadow: '2px 2px 4px 0px #6D88C2',
    //   background: '#Fff',
    // }}
  >
    {/* <CardHeader
      title="Education :"
      sx={{
        color: '#000',
        fontFamily: 'Work Sans,sans-serif',
        fontSize: 20,
        fontWeight: 700,
      }}
    /> */}

    <CardContent>
      <Stack spacing={1}>
        {data?.map((item: any, index: number) => (
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                color: '#000',
                fontSize: 18,
                fontFamily: 'Work Sans,sans-serif',
              }}
            >
              {item?.degree}
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                color: '#000',
                fontSize: 16,
                fontFamily: 'Work Sans,sans-serif',
                my: 1,
              }}
            >
              {item?.institute} - {item?.yearOfPassing}
            </Typography>

            {/* <Box
              component="li"
              sx={{
                paddingLeft: 2,
                fontWeight: 500,
                color: '#000',
                fontSize: 16,
                fontFamily: 'Work Sans,sans-serif',
              }}
            >
              Graphic Designing artworks through making plans and utilising the helpful
              analysis of companions, educators, and bosses to improve those plans.
              Careful discipline brings about promising results, and the capacity to
              acknowledge and gain from analysis from peers and even the purchaser
              everywhere is pivotal for accomplishment in this field.
            </Box> */}
          </Box>
        ))}
      </Stack>
    </CardContent>
  </Card>
);

export default EducationListing;
