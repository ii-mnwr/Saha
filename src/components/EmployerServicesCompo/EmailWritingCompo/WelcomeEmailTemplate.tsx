import {
  Card,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { memo, useEffect, useState } from 'react';
import { useEmployeeServices } from 'src/hooks/useEmployeeServices';
import { LoadingButton } from '@mui/lab';
import { emailTemplates } from 'src/utils/constData';

import Editor from '../../editor';

const WelcomeEmailTemplate = ({ message }: any) => {
  const [tempMessage, setTempMessage] = useState<any>(null);

  useEffect(() => {
    setTempMessage(() => message);
  }, [message]);

  // useEffect(() => {
  //   if (!tempMessage && message) {
  //     setTempMessage(() => message);
  //   }
  // }, [message]);

  // console.log('tempMessage', tempMessage);
  // console.log('tempMessageMMMMMMMMMMMMMMMMMMMM', tempMessage?.message);

  const { sendEmailApplication, sendEmail } = useEmployeeServices();
  return (
    <Container maxWidth="xl" sx={{ marginTop: '20px' }}>
      <Card sx={{ p: 4, border: '1px solid #6D88C299', bgcolor: '#FEFEFE' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ boxShadow: 'none' }}>
              <Typography
                sx={{
                  fontFamily: 'Work Sans,sans-serif',
                  fontSize: 20,
                  fontWeight: 600,
                  color: '#000',
                }}
                gutterBottom
              >
                {tempMessage?.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Work Sans,sans-serif',
                  fontSize: 16,
                  fontWeight: 400,
                  color: '#000',
                }}
                gutterBottom
              >
                {tempMessage?.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Stack spacing={2} sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Email-To"
                  margin="normal"
                  variant="outlined"
                  onChange={(e) =>
                    setTempMessage((msg: any) => ({
                      ...msg,
                      email: e.target.value,
                    }))
                  }
                />
                <TextField
                  fullWidth
                  label="Subject"
                  margin="normal"
                  variant="outlined"
                  onChange={(e) =>
                    setTempMessage((msg: any) => ({
                      ...msg,
                      subject: e.target.value,
                    }))
                  }
                />
                <Editor
                  simple
                  value={tempMessage?.message}
                  id="compose-mail"
                  isTollbar={false}
                  placeholder="Type a message"
                  onChange={(value) => {
                    setTempMessage((msg: any) => ({
                      ...msg,
                      message: value,
                    }));
                  }}
                  // style={{ backgroundColor: '#B2CAF5' }}
                  sx={{ flexGrow: 1 }}
                  displayEditor={false}
                />
              </Stack>
              <LoadingButton
                variant="contained"
                color="primary"
                sx={{ my: 2, py: 1, px: 4, fontWeight: 600, fontSize: 18 }}
                loading={sendEmail?.isLoading}
                disabled={
                  tempMessage === null || Object?.values(tempMessage)?.some((value) => value === '')
                }
                onClick={() =>
                  sendEmailApplication({
                    email: tempMessage?.email,
                    subject: tempMessage?.subject,
                    body: tempMessage?.message,
                  })
                }
              >
                Submit
              </LoadingButton>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: '20px', boxShadow: 'none' }}>
              <Typography
                sx={{
                  fontFamily: 'Work Sans,sans-serif',
                  fontSize: 20,
                  fontWeight: 600,
                  color: '#000',
                }}
                gutterBottom
              >
                Topics
              </Typography>
              <List
                sx={{
                  background: '#6D88C214',
                  borderRadius: 1,
                }}
              >
                {emailTemplates?.map((item: any) => (
                  <ListItem
                    key={item?.id}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      setTempMessage(() => item);
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontFamily: 'Work Sans, sans-serif',
                            fontSize: 14,
                            fontWeight: tempMessage?.type === item.type ? 600 : 400,
                            color: tempMessage?.type === item.type ? '#03133C' : '#000000',
                          }}
                        >
                          {item?.title}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

const WelcomeEmailTemplateMemo = memo(
  WelcomeEmailTemplate,
  (prevProps, nextProps) => prevProps.message === nextProps.message
);

export default WelcomeEmailTemplateMemo;
