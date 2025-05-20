import {
  Box,
  Card,
  CardHeader,
  Grid,
  Typography,
  styled,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import { fNumber } from 'src/utils/formatNumber';
import axiosInstance from 'src/utils/axios';
import { useQuery } from 'react-query';
import usePostRequest from 'src/hooks/usePost';
import Chart, { useChart } from '../chart';

const CHART_HEIGHT = 300;
const LEGEND_HEIGHT = 72;

const StyledChart = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  background: '#f0f0f0',
  boxShadow: '2px 2px 4px 0px #6D88C2',
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  '& .apexcharts-canvas svg': {
    height: CHART_HEIGHT,
  },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    alignContent: 'center',
  },
}));

const fetchCandidateData = async () => {
  const response = await axiosInstance.post('candidates/dashboard');
  return response?.data;
};

export const ProfileAnalytics = ({ isProfileAnalytics = false }: any) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const postApi = usePostRequest();
  
  const { data, isLoading, error, refetch } = useQuery(
    ['fetchCandidtaeDashboard', postApi.isSuccess],
    () => fetchCandidateData()
  );

  const series = data?.data?.analysis_data
    ? Object.keys(data?.data?.analysis_data)?.map((key) => ({
        label: key,
        value: data?.data?.analysis_data[key],
      }))
    : [];
  const chartSeries = series.map((i) => i.value);

  const colors = [
    theme.palette.primary.main,
    theme.palette.info.main,
    theme.palette.error.main,
    theme.palette.warning.main,
  ];

  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors,
    labels: series.map((i) => i.label),
    stroke: { colors: [theme.palette.background.paper] },
    legend: {
      floating: false,
      position: isSmallScreen ? 'bottom' : 'right',
      horizontalAlign: isSmallScreen ? 'center' : 'right',
      verticalAlign: isSmallScreen ? 'bottom' : 'top',
      offsetY: isSmallScreen ? 0 : 10,
      itemMargin: {
        horizontal: 8,
        vertical: 4,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: isSmallScreen ? '65%' : '75%',
          labels: {
            total: {
              show: true,
              color: theme.palette.text.primary,
              fontSize: isSmallScreen ? '12px' : '14px',
              formatter: (w: { globals: { seriesTotals: number[] } }) => {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return fNumber(sum);
              },
              label: 'Profile Match Analysis',
              offsetY: isSmallScreen ? -10 : -20,
              style: {
                textAnchor: 'middle',
                fontWeight: 'bold',
              },
            },
            value: {
              offsetY: isSmallScreen ? 5 : 10,
              formatter: (value: number | string) => fNumber(value),
              style: {
                fontSize: isSmallScreen ? '16px' : '18px',
                fontWeight: 'bold',
              },
            },
          },
        },
      },
    },
  });

  const item = {
    labels: data?.data?.view_count[new Date().getFullYear()]
      ? Object.keys(data?.data?.view_count[new Date().getFullYear()])
      : [],
    series: [
      {
        name: '',
        data: data?.data?.view_count[new Date().getFullYear()]
          ? Object.values(data?.data?.view_count[new Date().getFullYear()])
          : [],
      },
    ],
  };

  const barChartOptions = useChart({
    xaxis: {
      categories: [...item.labels],
    },
    tooltip: {
      x: {
        show: false,
      },
      marker: { show: false },
    },
  });

  return (
    <Box sx={{ padding: isSmallScreen ? 1 : 0 }}>
      <Grid container spacing={isSmallScreen ? 1 : 2}>
        <Grid item xs={12} md={isProfileAnalytics ? 12 : 5}>
          <Card
            sx={{
              borderRadius: 2,
              height: isSmallScreen ? '300px' : '400px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardHeader 
              title="Profile Synopsis" 
              sx={{ padding: isSmallScreen ? '8px 16px' : '16px 24px' }} 
            />
            <Box sx={{ flexGrow: 1, padding: isSmallScreen ? 1 : 2 }}>
              <Chart 
                type="line" 
                series={item.series} 
                options={barChartOptions} 
                height="100%"
              />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={isProfileAnalytics ? 12 : 7}>
          <Card
            sx={{
              height: isSmallScreen ? '350px' : '400px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardHeader 
              title="Profile Match Analysis" 
              sx={{ padding: isSmallScreen ? '8px 16px' : '16px 24px' }} 
            />
            <Box 
              sx={{ 
                flexGrow: 1, 
                position: 'relative',
                padding: isSmallScreen ? 1 : 2,
              }}
            >
              <Chart
                type="donut"
                series={chartSeries}
                options={chartOptions}
                height="100%"
                width="100%"
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};