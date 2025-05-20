import * as React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
} from '@mui/material';
import { useQuery } from 'react-query';
import axiosInstance from 'src/utils/axios';
import Markdown from '../markdown/Markdown';

const fetchSetting = async (data: any) => {
  const response = await axiosInstance.post('settings/find-by-key', data);
  return response?.data;
};

export default function InterviewPreparationCard() {
  const interviewPreparationTips = [
    'Go through the job description thoroughly.',
    'Note the designation, department, qualifications, required skill-set, experience, job location, shift timings, bond/contract, and salary details.',
    "Research the Company: Visit the company's website and understand its profile, turnover, and year of establishment.",
    "Identify if it's a domestic or international company, its products or services, prominent clients, management team, and recent news (e.g., funding or acquisition).",
    // ... add all other list items similarly
  ];

  const {
    data: settingsData,
    isLoading,
    error,
    refetch,
  } = useQuery(['quizDataById'], () =>
    fetchSetting({
      key: 'Article',
    })
  );

  return (
    <Container maxWidth="xl">
      <Card
        sx={{
          minWidth: 275,
          boxShadow: 3,
          borderRadius: 2,
          p: 2,
          // maxHeight: 700,
          // overflowY: 'auto',
        }}
      >
        <Markdown>{settingsData?.data?.value}</Markdown>
        {/* <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            How to Prepare for a Job Interview
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Tips to prepare for a Job Interview
          </Typography>
          <List dense={true}>
            {interviewPreparationTips.map((tip, index) => (
              <ListItem key={index} disableGutters>
                <ListItemText primary={tip} />
              </ListItem>
            ))}
          </List>
        </CardContent> */}
      </Card>
    </Container>
  );
}
