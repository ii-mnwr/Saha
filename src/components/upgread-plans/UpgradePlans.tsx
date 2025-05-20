import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const PricingPlan = () => {
  const plans = [
    {
      title: 'Basic',
      price: '0',
      features: [
        'Unlimited Job Applied',
        'Unlimited CV Sent to Company',
        '2 Time CV Builder',
        'Enhance Security',
      ],
      buttonText: 'Get Started',
      buttonVariant: 'outlined',
    },
    {
      title: 'Premium',
      price: '39',
      features: [
        'Full Access',
        'Unlimited Job Applied',
        'Unlimited CV Sent to Company',
        '5 Time CV Builder',
        'Preparation for Job',
        'Free Appointment',
      ],
      buttonText: 'Get Started',
      buttonVariant: 'contained',
    },
    {
      title: 'Diamond',
      price: '59',
      features: [
        'Full Access',
        'Unlimited Job Applied',
        'Unlimited CV Sent to Company',
        'Unlimited Time CV Builder',
        'Job Assistant',
        'Certification',
      ],
      buttonText: 'Get Started',
      buttonVariant: 'contained',
    },
  ];

  return (
    <Container
    // sx={{
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   p: 4,
    //   backgroundColor: '#e3f2fd',
    // }}
    >
      {/* <img src="/assets/upgradePlan.png" alt="" /> */}
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{ width: '100%', mb: 4, position: 'absolute', top: '20%', left: '0%', color: 'white' }}
      >
        Upgrade your plan
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', p: 3 }}>
        {plans.map((plan) => (
          <Card sx={{ minWidth: 275, mx: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {plan.title}
              </Typography>
              <Typography variant="h4" component="div" color="primary">
                ${plan.price}/mo
              </Typography>
              <List dense>
                {plan.features.map((feature) => (
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
              <Button variant={plan.buttonVariant} color="primary">
                {plan.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default PricingPlan;
