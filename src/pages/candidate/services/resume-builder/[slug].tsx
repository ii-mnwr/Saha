import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import { color } from 'framer-motion';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRef, useState } from 'react';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { useSettingsContext } from 'src/components/settings';
import HorizontalLinearStepper from 'src/components/stepper';
import Template1 from 'src/components/templates/Template1';
import Template2 from 'src/components/templates/Template2';
import Template3 from 'src/components/templates/Template3';
import Template4 from 'src/components/templates/Template4';
import Template5 from 'src/components/templates/Template5';
import Template6 from 'src/components/templates/Template6';
import Template7 from 'src/components/templates/Template7';
import Main from 'src/layouts/dashboard/Main';

const BuildResume = ({ selectedResume }: any) => {
  const { themeStretch } = useSettingsContext();
  const [data, setData] = useState({});
  const componentRef = useRef<HTMLDivElement>();

  const handlePrint = useReactToPrint({
    content: () => componentRef?.current || null,
  });
  return (
    <Main sx={{ width: '100%', py: 2 }}>
      <Container maxWidth={themeStretch ? false : '2xl'}>
        <Card
          sx={{
            // boxShadow: '2px 2px 4px 0px #6D88C2',
            background: '#FEFEFE',
            padding: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} xl={6}>
              <HorizontalLinearStepper setData={setData} />
            </Grid>
            <Grid item xs={12} xl={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  pb: 1,
                }}
              >
                {/* <Typography
                  sx={{
                    color: '#0A2239',
                    fontWeight: 500,
                    fontFamily: 'Work Sans,sans-serif',
                    fontSize: 20,
                  }}
                >
                  CV Templates
                </Typography> */}
                <ReactToPrint
                  trigger={() => (
                    <Button variant="text" sx={{ color: '#0A2239'}}>
                      Download as PDF
                    </Button>
                  )}
                  content={() => componentRef.current}
                />
              </Box>
              {selectedResume === 'template1' ? (
                <Template1 ref={componentRef} data={data} />
              ) : selectedResume === 'template2' ? (
                <Template2 ref={componentRef} data={data} />
              ) : selectedResume === 'template3' ? (
                <Template3 ref={componentRef} data={data} />
              ) : selectedResume === 'template4' ? (
                <Template4 ref={componentRef} data={data} />
              ) : selectedResume === 'template5' ? (
                <Template5 ref={componentRef} data={data} />
              ) : selectedResume === 'template6' ? (
                <Template6 ref={componentRef} data={data} />
              ) : (
                <Template7 ref={componentRef} data={data} />
              )}
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  return { props: { selectedResume: params?.slug } };
};

export default BuildResume;
