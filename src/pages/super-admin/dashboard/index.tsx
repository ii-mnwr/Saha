import React, { useEffect, useState } from 'react';
import { Box, Card, Container, styled, Typography, useTheme } from '@mui/material';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import Head from 'next/head';
import { useSettingsContext } from 'src/components/settings';
import Chart, { useChart } from 'src/components/chart';
import { fNumber } from 'src/utils/formatNumber';
import axiosInstance from 'src/utils/axios';
import { useQuery } from 'react-query';

const fetchData = async (filter: any) => {
  const response = await axiosInstance.post('/admin/dashboard', filter);
  return response?.data;
};

ManageJob.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: 'Home',
        href: '#',
      },
      { name: 'Dashboard', href: '#' },
    ]}
    title="Dashboard"
  >
    {page}
  </DashboardLayout>
);

const CHART_HEIGHT = 300;

const StyledChart = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  background: '#FEFEFE',
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

export default function ManageJob() {
  const theme = useTheme();
  const { themeStretch } = useSettingsContext();
  const [series, setSearies] = useState([
    { label: 'Pending', value: 0 },
    { label: 'Approved', value: 0 },
    { label: 'Rejected', value: 0 },
  ]);
  // const series = [
  //   // { label: 'Total companies', value: 25 },
  //   { label: 'Pending', value: 30 },
  //   { label: 'Approved', value: 50 },
  //   { label: 'Rejected', value: 30 },
  // ];
  const chartSeries = series.map((i) => i?.value);

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
    legend: { floating: false, position: 'right' },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (value: number) => fNumber(value),
        title: {
          formatter: (seriesName: string) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            total: {
              formatter: (w: { globals: { seriesTotals: number[] } }) => {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return fNumber(sum);
              },
              label: 'Total companies',
            },
            value: {
              formatter: (value: number | string) => fNumber(value),
            },
          },
        },
      },
    },
  });

  const { data: getDashboardData } = useQuery(
    ['superadminDash'],
    () =>
      fetchData({
        search: '',
        sort: 'id:desc',
        limit: 1,
        page: 1,
      }),
    {
      // keepPreviousData: true, // optional, keeps previous data while new data is loading
    }
  );

  useEffect(() => {
    if (getDashboardData?.data)
      setSearies(() => [
        { label: 'Pending', value: getDashboardData?.data?.companies?.pending },
        { label: 'Approved', value: getDashboardData?.data?.companies?.approved },
        { label: 'Rejected', value: getDashboardData?.data?.companies?.rejected },
      ]);
  }, [getDashboardData]);

  const data = {
    labels: [
      '01/01/2003',
      '02/01/2003',
      '03/01/2003',
      '04/01/2003',
      '05/01/2003',
      '06/01/2003',
      '07/01/2003',
      '08/01/2003',
      '09/01/2003',
      '10/01/2003',
      '11/01/2003',
    ],
    series: [
      {
        type: 'line',
        fill: 'solid',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
      },
    ],
  };

  const barChartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '10%',
      },
    },
    fill: {
      type: data.series.map((i) => i.fill) as string[],
    },
    labels: [...data.labels],
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)} visits`;
          }
          return value;
        },
      },
    },
  });
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ p: 5 }}>
          <Typography variant="h5">Statastics:</Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box
              sx={{
                background: '#FEFEFE',
                boxShadow: '2px 2px 4px 0px #6D88C2',
                borderRadius: 2.7,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                height: 300,
                marginTop: 5,
              }}
            >
              <Chart
                type="line"
                series={data.series}
                options={barChartOptions}
                height={300}
                width={650}
              />
            </Box>
          </Box>
          <Typography variant="h5" sx={{ mt: 5 }}>
            Company Statistics:
          </Typography>
          <StyledChart>
            <Chart
              type="donut"
              series={chartSeries}
              options={chartOptions}
              height={280}
              width={400}
            />
          </StyledChart>
        </Card>
      </Container>
    </>
  );
}
