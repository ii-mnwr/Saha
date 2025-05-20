/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  Box,
  Button,
  CardMedia,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  makeStyles,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from 'src/utils/axios';
import { useSnackbar } from 'src/components/snackbar';
import usePostRequest from 'src/hooks/usePost';
import { Backend_Base_URL } from 'src/config-global';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { RHFRadioGroup } from '../hook-form';
import SingleFilePreview from '../upload/preview/SingleFilePreview';
import Markdown from '../markdown/Markdown';
import { pxToRem } from 'src/theme/typography';
import { cardDimensions } from 'src/theme/cardDimensions';

const TermsAndCondition = ({ open, onClose, settingsData }: any) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
    {/* <DialogTitle>R</DialogTitle> */}
    <DialogContent>
      <Box sx={{ border: '2px solid #086BFF', p: 2, borderRadius: '10px', my: 2 }}>
        <Markdown>{settingsData?.data?.rule}</Markdown>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

const fetchSetting = async (data: any) => {
  const response = await axiosInstance.post('settings/find-by-key', data);
  return response?.data;
};

const fetchActiveRules = async () => {
  const response = await axiosInstance.post('quizzes/rules/active');
  return response?.data;
};

const CandidateQuiz = () => {
  const mediumScreen = useMediaQuery('(min-width:1200px) and (max-width:1300px)');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { enqueueSnackbar } = useSnackbar();
  const [quizStarted, setQuizStarted] = useState(false);
  const [data, setData] = useState<any>([]);
  const [candidateQuizData, setCandidateQuizData] = useState<any>({});
  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes
  const [answers, setAnswers] = useState<any>([]); // 300 seconds = 5 minutes
  const [open, setOpen] = useState(false);
  const [isDisableStartButton, setIsDisabledStartButton] = useState(false);

  const {
    data: settingsData,
    isLoading,
    error,
    refetch,
  } = useQuery(['quizDataById'], () =>
    fetchSetting({
      key: 'Quiz_Rules',
    })
  );

  const { data: activeRules } = useQuery(['activeRules'], () => fetchActiveRules());
  console.log('activeRules', activeRules);

  useEffect(() => {
    let timer: any;

    if (quizStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000); // Update every second
    } else if (timeLeft === 0) {
      handleQuizSubmit();
    }

    // Cleanup the interval on component unmount or when quiz is not started
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft]);

  const formatTime = (seconds: any) =>
    /* const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60; */
    // return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    seconds;
  const fetchQuiz = async () => {
    try {
      const response = await axiosInstance.post('quizzes/active');
      setData(response?.data); // Set the fetched data into state
    } catch (err) {
      console.log(err);
    }
  };

  const quizCandidateData = async () => {
    try {
      const response = await axiosInstance.post('candidates/quiz-detail');
      setCandidateQuizData(response?.data); // Set the fetched data into state
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchQuiz();
    if (quizStarted) {
      fetchQuiz();
    }
  }, [quizStarted]);

  useEffect(() => {
    quizCandidateData();
  }, []);

  const startQuiz = usePostRequest();

  const handleOnStartQuiz = () => {
    const url = '/candidates/start-quiz';

    startQuiz.mutate([url, { quiz_id: candidateQuizData?.data?.quiz?.id }], {
      onSuccess: (response: any) => {
        setQuizStarted(true);
        // Handle success
        enqueueSnackbar(response?.message || 'Start Quiz successfully', {
          variant: 'success',
        });
      },
      onError: (error: any) => {
        // Handle error
        enqueueSnackbar(error.message, { variant: 'error' });
        setQuizStarted(false);
      },
    });
  };

  const handleQuizSubmit = () => {
    const url = 'candidates/submit-quiz';
    const data = {
      quiz_id: candidateQuizData?.data?.quiz?.id,
      answers,
    };
    console.log('answers', answers);
    startQuiz.mutate([url, { ...data }], {
      onSuccess: (response: any) => {
        setQuizStarted(false);
        // Handle success
        enqueueSnackbar(response?.message || 'Start Quiz successfully', {
          variant: 'success',
        });
        quizCandidateData();
      },
      onError: (error: any) => {
        // Handle error
        enqueueSnackbar(error.message, { variant: 'error' });
        setQuizStarted(false);
      },
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      marginTop={2}
      sx={{
        display: 'flex',
        background: '#0a2239',
        borderRadius: 2,
        // boxShadow: 4,
        flexDirection: 'column',
        position: 'relative',
        height: isMobile ? cardDimensions.height.mobile : cardDimensions.height.desktop,
        minHeight: isMobile ? cardDimensions.height.mobile : undefined,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          p: isMobile ? cardDimensions.padding.mobile : cardDimensions.padding.desktop,
          height: '100%',
          alignItems: 'center',
        }}
      >
        {/* <Grid item xs={12} lg={7}>
          <Box
            sx={{
              display: 'inline-block',
              position: 'relative',
              width: 'fit-content',
              padding: '20px 60px', // Adjust padding to provide more space on the sides
              backgroundImage: `url('/assets/Ellipse.png')`, // Use your ellipse image as the background
              backgroundSize: 'contain', // Ensure the ellipse scales correctly
              backgroundRepeat: 'no-repeat', // Prevent image repetition
              textAlign: 'center',
              backgroundPosition: 'center', // Ensure the image is centered within the box
              minWidth: '300px', // You can adjust this based on your design
            }}
          >
            <Typography
              sx={{
                textTransform: 'uppercase',
                color: '#086BFF',
                fontWeight: 900,
                fontSize: 40,
                lineHeight: 1,
                textAlign: 'center',
              }}
            >
              quiz time
            </Typography>
          </Box>
        </Grid> */}
        <Grid item xs={12}>
          <Box
            // sx={{
            //   display: 'flex',
            //   flexDirection: 'column',
            //   alignItems: 'center',
            //   justifyContent: 'center',
            //   mb: 2,
            //   mt: 1,
            //   width: '500px',
            //   height: '200px',
            // }}
          >
            {/* <img src="/assets/clock2.png" alt="time" /> */}
            {/* <Typography
              variant="h3"
              sx={{
                color: '#03133C',
                ml: 2,
              }}
            >
              {formatTime(timeLeft)} seconds
            </Typography> */}
          </Box>
          {/* <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ borderTop: '2px solid black', width: '70%' }} />
          </Box> */}
          {/* {candidateQuizData?.data?.quiz?.isActive === true && ( */}
          {/* <Typography variant="h3" sx={{ color: '#03133C', px: 1, textAlign: 'center', mt: 2 }}>
            {candidateQuizData?.data?.lastQuizWinner?.winner?.name
              ? `Winner: ${candidateQuizData?.data?.lastQuizWinner?.winner?.name}`
              : `Winner : TBA`}
          </Typography> */}
        </Grid>

        <Grid
          item
          xs={12}
          // xl={7}
          sx={{ my: 2,
          display:"flex",
          // justifyContent="center"
          flexDirection:"column",
          alignItems:"center",
          justifyContent:"center",
          height: '100%',
          }}
        >
            <Typography
            sx={{
              color: '#fff',
              textTransform: 'uppercase',
              fontSize: isMobile ? '1.25rem' : '2.8rem',
              lineHeight: 1,
              fontWeight: 700,
              textAlign: 'center',
              width: '100%',
              px: 2,
            }}
            >
            Talentine Trivia
            </Typography>
      <Typography
          sx={{ 
            color: '#FFF08D',
            textTransform: 'capitalize',
            fontSize: isMobile ? '0.875rem' : '1rem',
            textAlign: 'center',
            width: '100%',
            px: 2,
            mt: 1,
            mb:3,
          }}>
            Test your knowledge and win with us!
          </Typography>
          <Box
            sx={{
              alignItems: !quizStarted ? 'center' : 'unset',
              display: !quizStarted ? 'flex' : 'unset',
              justifyContent: !quizStarted ? 'center' : 'unset',
              pb: 2,
              width: '400px',
            }}
          >
            {quizStarted && (
              <Grid container spacing={1} paddingTop={2}>
                {data?.data?.questions?.map((item: any, index: number) => (
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2,
                        width: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: '#FFFFFF',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 40,
                          height: 40,
                          borderLeftColor: '#086BFF',
                          borderLeftWidth: 5,
                          borderLeftStyle: 'solid',
                          borderTopColor: '#086BFF',
                          borderTopWidth: 4,
                          borderTopStyle: 'solid',
                          fontSize: 20,
                          borderRadius: 0.5,
                          boxShadow: 1,
                        }}
                      >
                        {index + 1}
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%',
                        }}
                      >
                        <Typography
                          bgcolor="#8DB3FF"
                          color="#000000"
                          fontFamily="Work Sans,sans-serif"
                          fontSize={18}
                          fontWeight={400}
                          textAlign="center"
                          borderRadius={1}
                          py={1}
                          width="100%"
                        >
                          {item?.question}
                        </Typography>

                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          onChange={(event) => {
                            if (answers.map((val: any) => val?.q_id)?.includes(item?.id)) {
                              const answerFindIndex = answers.findIndex(
                                (item1: any) => item1.q_id === item?.id
                              );
                              const data = [...answers];
                              data[answerFindIndex].ans_id = event.target.value;
                              setAnswers(data);
                            } else {
                              const data = [...answers];
                              data.push({
                                q_id: item?.id,
                                ans_id: event?.target.value,
                              });
                              setAnswers(data);
                            }
                          }}
                        >
                          <Grid container>
                            {item?.options?.map((option: any, index: number) => (
                              <Grid item xs={6}>
                                <FormControlLabel
                                  value={option?.id}
                                  control={<Radio />}
                                  label={
                                    option?.isValue === 'text' ? (
                                      option?.value
                                    ) : (
                                      <img
                                        alt={option?.value}
                                        src={`${Backend_Base_URL}${option?.value}`}
                                        style={{
                                          width: 80,
                                          height: 80,
                                        }}
                                      />
                                    )
                                  }
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </RadioGroup>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}
            {quizStarted && (
              <Button
                variant="contained"
                onClick={() => {
                  handleQuizSubmit();
                }}
                disabled={answers?.length < 5}
              >
                Submit
              </Button>
            )}
            {quizStarted === false &&
              candidateQuizData?.data?.user?.isAttempted === false &&
              candidateQuizData?.data?.quiz?.isActive === true && (
                <Box
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  mt={10}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Checkbox
                      checked={isDisableStartButton}
                      onChange={() => setIsDisabledStartButton((flag) => !flag)}
                    />
                    <Typography
                      fontSize={12}
                      fontWeight={500}
                      textTransform="capitalize"
                      color="#000000"
                      variant="h5"
                    >
                      I accept the{' '}
                      <span
                        role="presentation"
                        style={{ textDecoration: 'underline', cursor: 'pointer' }}
                        onClick={handleClickOpen}
                      >
                        terms and conditions
                      </span>
                    </Typography>
                  </Box>
                  <Typography
                    fontFamily="Work Sans,sans-serif"
                    // fontSize={11}
                    fontWeight={200}
                    variant="h6"
                    mt={2}
                    sx={{
                      p: 1,
                      borderRadius: '10px',
                      color: '#000000',
                      opacity: '60%',
                    }}
                  >
                    NOTE: Kindly read and accept the terms and conditions to enable the quiz. For
                    any further assistance, please feel free to reach out to us.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      backgroundColor: '#0a2239',
                      fontFamily: 'Work Sans, sans-serif',
                      fontWeight: 600,
                      paddingX: 4,
                      paddingY: 1.5,
                      // width: 200,
                      fontSize: 26,
                      mt: 8,
                    }}
                    disabled={!isDisableStartButton}
                    onClick={() => {
                      handleOnStartQuiz();
                    }}
                  >
                    Start Quiz
                  </Button>
                </Box>
              )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          {candidateQuizData?.data?.user?.isAttempted && (
            <Typography
              color="#086BFF"
              fontFamily="Work Sans,sans-serif"
              fontSize={24}
              fontWeight={600}
              sx={{
                filter: 'none',
                textAlign: 'center', // Reset blur for text inside the box

                p: 2,
                borderRadius: '10px',
                mt: 1,
              }}
            >
              You have attempted current quiz. New quiz will start soon.
            </Typography>
          )}
        </Grid>
        {/* {candidateQuizData?.data?.lastQuizWinner?.winner?.name && (
          <Grid item xs={12} sx={{ pb: 2 }}>
            <Typography
              color="#086BFF"
              fontFamily="Work Sans,sans-serif"
              fontSize={24}
              fontWeight={600}
              sx={{
                filter: 'none',
                textAlign: 'center', // Reset blur for text inside the box
                border: '2px solid #086BFF',
                p: 2,
                borderRadius: '10px',
                mt: 2,
              }}
            >
              🏆🏆🏆 Last Quiz Winner: {candidateQuizData?.data?.lastQuizWinner?.winner?.name}{' '}
              🏆🏆🏆
            </Typography>
          </Grid>
        )} */}
      </Grid>
      {open && settingsData?.data?.value && (
        <TermsAndCondition open={open} onClose={handleClose} settingsData={activeRules} />
      )}
    </Box>
  );
};

export default CandidateQuiz;
