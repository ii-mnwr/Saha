import React from 'react';
import { Paper, Typography, List, ListItem, Avatar, Grid, Box } from '@mui/material';
import Markdown from '../markdown/Markdown';

const JobDescriptionCard = ({ item }: any) => (
  <Paper
    elevation={3}
    sx={{
      padding: 2,
      borderRadius: 2,
      boxShadow: '2px 2px 4px 0px #6D88C2',
      background: '#FEFEFE',
      height: '100%',
    }}
  >
    <Markdown>{item?.description}</Markdown>
    {/* <Typography variant="h5" component="h3" gutterBottom>
        Job Description
      </Typography>
      <Typography variant="body2" paragraph>
        {item?.description}
      </Typography> */}
    {/* {item?.responsibilities && (
        <>
          <Typography variant="h6" gutterBottom>
            Key Responsibilities
          </Typography>
          <Box>{item?.responsibilities}</Box>
        </>
      )} */}

    {/* <Typography variant="h6" gutterBottom>
        Skill & Experience
      </Typography>
      <Box>{item?.experience}</Box> */}
    {/* <List>
        {skillsAndExperience.map((item, index) => (
          <ListItem key={index} disableGutters>
            <Typography variant="body2">• {item}</Typography>
          </ListItem>
        ))}
      </List> */}
    {/* <Typography variant="h6" component="h3" gutterBottom>
        Our Gallery
      </Typography>
      <Grid container spacing={1}>
        {galleryImages.map((img, index) => (
          <Grid item xs={4} key={index}>
            <Avatar
              alt={`Gallery image ${index + 1}`}
              src={img}
              sx={{ width: '100%', height: 'auto', borderRadius: 1 }}
            />
          </Grid>
        ))}
      </Grid> */}
  </Paper>
);

export default JobDescriptionCard;
