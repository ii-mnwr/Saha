import { Card, CardProps } from '@mui/material';
import React from 'react';

const CustomCard = ({ children, sx, ...other }: CardProps) => {
  console.log('');
  return (
    <Card sx={{ ...sx }} {...other}>
      {children}
    </Card>
  );
};

export default CustomCard;
