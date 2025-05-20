import React from 'react';
import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  ImageList,
  ImageListItem,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Image from 'next/image';

const itemData = [
  {
    img: '/assets/img1_gallary.png',
    title: 'Image 1',
  },
  {
    img: '/assets/img2_gallray.png',
    title: 'Image 2',
  },
  {
    img: '/assets/img3_galary.png',
    title: 'Image 3',
  },
];

const AchievementCard = ({ number, label }: any) => (
  <Paper
    elevation={4}
    sx={{
      py: 2,
      px: 3,
      backgroundColor: 'rgba(176,208,255, 0.3)',
      // color: 'common.white',
      textAlign: 'center',
      borderRadius: '16px',
    }}
  >
    <Typography variant="h5" color="" component="p">
      {number}
    </Typography>
    <Typography variant="subtitle1" color="#086BFF" component="p">
      {label}
    </Typography>
  </Paper>
);

const CompanyDetails = () => {
  console.log('first');
  return (
    <Box sx={{ padding: 2 }}>
      <Image src="/assets/companyImage.png" alt="" width={700} height={350} />
      <Paper elevation={4} sx={{ padding: 2, mt: 1 }}>
        <Typography variant="h5" gutterBottom>
          About Our Company
        </Typography>
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat enim a erat sit vulputate
          elementum orci. Risus nec viverra ornare venenatis proin ac varius tristique ut. Vitae
          egestas tellus amet nulla cursus ante. Pellentesque placerat maecenas egestas ullamcorper
          sed nunc. Vitae egestas tellus amet nulla something loss Pellentesque placerat maecenas
          egestas ullamcorper sed nunc.
        </Typography>
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat enim a erat sit vulputate
          elementum orci. Risus nec viverra ornare venenatis proin ac varius tristique ut. Vitae
          egestas tellus amet nulla cursus in that. Pellentesque placerat maecenas egestas
          ullamcorper sed sarinto.
        </Typography>
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat enim a erat sit vulputate
          elementum orci. Risus nec viverra ornare venenatis proin ac varius.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Overview
        </Typography>
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat enim a erat sit vulputate
          elementum orci. Risus nec viverra ornare venenatis proin ac varius tristique ut. Vitae
          egestas tellus amet nulla cursus ante. Pellentesque placerat maecenas egestas ullamcorper
          sed nunc. Vitae egestas tellus amet nulla something loss Pellentesque placerat maecenas
          egestas ullamcorper sed nunc.
        </Typography>
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat enim a erat sit vulputate
          elementum orci. Risus nec viverra ornare venenatis proin ac varius tristique ut. Vitae
          egestas tellus amet nulla cursus in that. Pellentesque placerat maecenas egestas
          ullamcorper sed sarinto.
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <CheckCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="You have at least 3 years’ experience working as a Product Designer." />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <CheckCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="You have experience using Sketch and InVision or Framer." />
          </ListItem>
          {/* ... other list items ... */}
          <ListItem disablePadding>
            <ListItemIcon>
              <CheckCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="You are familiar with the wider business at Show & Tell sessions." />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <CheckCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Consectetur adipiscing elit, sed diam nonumy eirmod tempor." />
          </ListItem>
        </List>
        <Box sx={{ padding: 2, borderRadius: '16px' }}>
          <Typography variant="h4" gutterBottom textAlign="center">
            Our Achievement
          </Typography>
          <Grid container spacing={2} justifyContent="space-around">
            <Grid item>
              <AchievementCard number="1400+" label="Project" />
            </Grid>
            <Grid item>
              <AchievementCard number="90+" label="Awards" />
            </Grid>
            <Grid item>
              <AchievementCard number="2000+" label="Client" />
            </Grid>
          </Grid>
          <Typography variant="body1" mt={2} textAlign="center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat enim a erat sit
            vulputate elementum orci. Risus nec viverra ornare venenatis proin ac varius tristique
            ut. Vitae egestas tellus amet nulla cursus ante. Pellentesque placerat maecenas egestas
            ullamcorper sed nunc. Vitae egestas tellus amet nulla something loss Pellentesque
            placerat maecenas egestas ullamcorper sed nunc.
          </Typography>
        </Box>
        <Typography variant="h6" gutterBottom>
          Our Gallery
        </Typography>
        <ImageList sx={{ flexWrap: 'nowrap' }} cols={3} gap={8}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Paper>
    </Box>
  );
};

export default CompanyDetails;
