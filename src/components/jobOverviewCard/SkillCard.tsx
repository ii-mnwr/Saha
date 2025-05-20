import React from 'react';
import { Paper, Typography, Chip, Stack } from '@mui/material';

const SkillsCard = ({ data }: any) => {
  const skills = ['Prototyping', 'Agile', 'careers', 'New Layout', 'UI Research', 'UI Design'];
  console.log('data', data?.specification);
  return (
    <Paper
      sx={{
        padding: 2,
        borderRadius: '16px',
        boxShadow: '2px 2px 4px 0px #6D88C2',
        background: '#FEFEFE',
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ textTransform: 'capitalize' }}>
        QUALIFICATION
      </Typography>
      {data?.specification?.split(',')?.length > 0 && (
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {data?.specification?.split(',')?.map((skill: any, index: number) => (
            <Chip
              key={index}
              label={skill}
              variant="soft"
              sx={{
                background: '#85B6FF45',
                color: '#086BFF',
                borderRadius: 1,
              }}
            />
          ))}
        </Stack>
      )}
    </Paper>
  );
};

export default SkillsCard;
