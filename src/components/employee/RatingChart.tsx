import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import Chart, { useChart } from '../chart';
import { useRouter } from 'next/router';

const series = [
  {
    name: 'Sales',
    data: [650, 750, 450, 500, 200, 450, 700],
  },
];

const RatingChart = () => {
  const route = useRouter();
  const chartOptions = useChart({
    chart: {
      stacked: true,
      type: 'area',
      width: '100%',
      toolbar: {
        show: false,
      },
    },
    markers: {
      size: 0,
    },
    stroke: {
      curve: 'smooth',
      width: 4,
    },
    xaxis: {
      type: 'datetime',
      categories: ['04/01', '04/05', '04/10', '04/15', '04/20', '04/25', '04/30'],
      tickPlacement: 'on',
      labels: {
        format: 'dd/MM',
        style: {
          color: '#1C1C1EB8',
          fontWeight: 400,
          fontFamily: 'Outfit,sans-serif',
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      min: 200,
      max: 1000,
      tickAmount: 4,
      labels: {
        style: {
          color: '#1C1C1EB8',
          fontWeight: 400,
          fontFamily: 'Outfit,sans-serif',
          fontSize: '12px',
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    tooltip: {
      x: {
        show: false,
      },
      marker: { show: false },
    },
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '16px',
        paddingBottom: '25px',
      }}
    >
      <Card
        sx={{
          boxShadow: '2px 2px 4px 0px #6D88C2',
          background: '#FEFEFE',
          width: '70%',
        }}
      >
        <CardContent>
          <Chart type="area" series={series} options={chartOptions} height={200} />
        </CardContent>
      </Card>

      <Card
        sx={{
          padding: '10px 10px',
          width: '28%',
          height: 'fit-content',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2, fontSize: '25px !important' }}>
            Post a New Job
          </Typography>

          <Button
            sx={{ padding: '7px 30px', width: 'fit-content' }}
            variant="contained"
            onClick={() => route.push('/post-job')}
          >
            Post Job
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RatingChart;
