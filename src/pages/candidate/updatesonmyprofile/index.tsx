"use client"

import type React from "react"
import { useState } from "react"
import Head from "next/head"
import DashboardLayout from "src/layouts/dashboard/DashboardLayout"
import { useSettingsContext } from "src/components/settings"
import { Card, Container, Grid, Box, useTheme, Typography, Breadcrumbs, Link } from "@mui/material"
import Chart, { useChart } from "src/components/chart"
import { useAuthContext } from "src/auth/useAuthContext"
import { HOST_URL } from "src/config-global"
import FormProvider from "src/components/hook-form/FormProvider"
import { RHFTextField } from "src/components/hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as Yup from "yup"
import usePostRequest from "src/hooks/usePost"
import { useSnackbar } from "src/components/snackbar"
import { useQuery } from "react-query"
import { fNumber } from "src/utils/formatNumber"
import axiosInstance from "src/utils/axios"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"

const fetchCandidateData = async () => {
  const response = await axiosInstance.post("candidates/dashboard")
  return response?.data
}

UpdatesOnMyProfile.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: "Home",
        href: "#",
      },
      { name: "Profile Analytics", href: "#" },
    ]}
    title="Profile Analytics"
  >
    {page}
  </DashboardLayout>
)

const donutSeries = [55, 30, 10, 8, 5]

export default function UpdatesOnMyProfile() {
  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar()
  const postApi = usePostRequest()
  const { themeStretch } = useSettingsContext()
  const [resumeFile, setResumeFile] = useState<any>({})

  const { user, initialize } = useAuthContext()

  const colors = [
    theme.palette.primary.main,
    theme.palette.info.main,
    theme.palette.error.main,
    theme.palette.warning.main,
  ]

  const schema = Yup.object().shape({
    resume: Yup.string().required("Resume is Required"),
  })

  const defaultValues = {
    resume: null,
  }

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  })

  const { reset, setValue, handleSubmit, watch } = methods

  const handleFileChange = (event: any) => {
    const file = event.target.files[0]
    setValue("resume", file.name)
    setResumeFile(file)
  }

  const onSubmit = async (data: any) => {
    console.log("data", data)
    const formData = new FormData()
    formData.append("resume", resumeFile)

    const url = "/candidates/update"

    postApi.mutate([url, formData], {
      onSuccess: (response: any) => {
        enqueueSnackbar(response?.message || "Updated successfully", {
          variant: "success",
        })
        reset()
        initialize()
      },
      onError: (error: any) => {
        enqueueSnackbar(error.message, { variant: "error" })
      },
    })
  }

  const { data, isLoading, error, refetch } = useQuery(["fetchCandidtaeDashboard", postApi.isSuccess], () =>
    fetchCandidateData(),
  )

  const item = {
    labels: data?.data?.view_count[new Date().getFullYear()]
      ? Object.keys(data?.data?.view_count[new Date().getFullYear()])
      : ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"],
    series: [
      {
        name: "date of viewing",
        data: data?.data?.view_count[new Date().getFullYear()]
          ? Object.values(data?.data?.view_count[new Date().getFullYear()])
          : [400, 300, 320, 400, 150, 350],
      },
      {
        name: "view count",
        data: data?.data?.view_count[new Date().getFullYear()]
          ? Object.values(data?.data?.view_count[new Date().getFullYear()]).map((val) => val * 0.5)
          : [200, 120, 220, 350, 200, 220],
      },
    ],
  }

  const barChartOptions = useChart({
    chart: {
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "20%",
        borderRadius: 4,
      },
    },
    xaxis: {
      categories: [...item.labels],
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    tooltip: {
      x: {
        show: false,
      },
      marker: { show: false },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    colors: ["#0A2647", "#FFD700"],
  })

  const series = data?.data?.analysis_data
    ? Object.keys(data?.data?.analysis_data)?.map((key) => ({
        label: key,
        value: data?.data?.analysis_data[key],
      }))
    : [
        { label: "something", value: 40 },
        { label: "something", value: 30 },
        { label: "something", value: 20 },
        { label: "something", value: 10 },
      ]
  const chartSeries = series.map((i) => i.value)

  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: false,
      },
    },
    colors: ["#0A2647", "#FF8000", "#144272", "#FFD700"],
    labels: series.map((i) => i.label),
    legend: { floating: false, position: "right", offsetY: 50 },
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
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              formatter: (w: { globals: { seriesTotals: number[] } }) => {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0)
                return fNumber(sum)
              },
              label: "Profile Match",
              fontSize: "18px",
            },
            value: {
              formatter: (value: number | string) => fNumber(value),
            },
          },
        },
      },
    },
  })

  return (
    <>
      <Head>
        <title> Profile Analytics </title>
      </Head>
      <Container maxWidth={false} disableGutters sx={{ px: 4, py: 4,  bgcolor: "#F0f0f0", borderRadius: 2 }}>
        <Grid container spacing={3}>
          {/* Left Column - Charts */}
          <Grid item xs={12} md={6}>
            {/* Profile Synopsis */}
            <Card
              sx={{
                mb: 3,
                borderRadius: 2,
                // boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                overflow: "hidden",
              }}
            >
              <Box sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Work Sans,sans-serif",
                    fontWeight: 600,
                    color: "#0A2647",
                    mb: 2,
                  }}
                >
                  Profile Synopsis
                </Typography>
                <Chart type="bar" series={item.series} options={barChartOptions} height={300} />
              </Box>
            </Card>

            {/* Profile Match analysis */}
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                overflow: "hidden",
              }}
            >
              <Box sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Work Sans,sans-serif",
                    fontWeight: 600,
                    color: "#0A2647",
                    mb: 2,
                  }}
                >
                  Profile Match analysis
                </Typography>
                <Chart type="donut" series={chartSeries} options={chartOptions} height={300} />
              </Box>
            </Card>
          </Grid>

          {/* Right Column - CV Preview */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: "100%",
                minHeight: 630,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#e0e0e0",
                position: "relative",
              }}
            >
              {/* CV Placeholder */}
              {!user?.candidate?.resume && (
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "8rem",
                    fontWeight: 700,
                    opacity: 0.5,
                  }}
                >
                  CV
                </Typography>
              )}

              {/* Actual CV Viewer */}
              {user?.candidate?.resume && (
                <Box sx={{ height: "100%", width: "100%" }}>
                  <object
                    data={`${HOST_URL}${user?.candidate?.resume}`}
                    width="100%"
                    height="100%"
                    style={{
                      minHeight: 630,
                    }}
                  >
                    <p>
                      Alternative text - include a link{" "}
                      <a href={`${HOST_URL}${user?.candidate?.resume}`}>to the PDF!</a>
                    </p>
                  </object>
                </Box>
              )}
            </Card>
          </Grid>
        </Grid>

        {/* Hidden form for resume upload - keeping functionality intact */}
        <Box sx={{ display: "none" }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField
              formlabel="Update Your Resume:"
              hiddenLabel
              name="resume"
              placeholder="File in .pdf or .doc"
              required
            />
          </FormProvider>
        </Box>
      </Container>
    </>
  )
}
