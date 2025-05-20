"use client"

/* eslint-disable @typescript-eslint/no-unused-expressions */
import type React from "react"
import Head from "next/head"
import DashboardLayout from "src/layouts/dashboard/DashboardLayout"
import { useSettingsContext } from "src/components/settings"
import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { useAppliedJob } from "src/hooks/useJobs"
import DataNotFound from "src/components/DataNotFound"
import SkeletonHorizontalItem from "src/components/skeleton/SkeletonHorizontalItem"
import { LocationIcon, SearchIcon, TimeIcon } from "src/theme/overrides/CustomIcons"
import Iconify from "src/components/iconify"
import { HOST_URL } from "src/config-global"
import useCopyToClipboard from "src/hooks/useCopyToClipboard"
import { useSnackbar } from "src/components/snackbar"
import { LoadingButton } from "@mui/lab"
import usePostRequest from "src/hooks/usePost"
import { fToNow } from "src/utils/formatTime"
import { useRouter } from "next/router"

ShortListResume.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: "Home",
        href: "#",
      },
      { name: "Jobs", href: "#" },
      { name: "Applied Jobs", href: "#" },
    ]}
    title="Applied Jobs"
  >
    {page}
  </DashboardLayout>
)

export default function ShortListResume() {
  const route = useRouter()
  const { copy } = useCopyToClipboard()
  const { enqueueSnackbar } = useSnackbar()
  const { themeStretch } = useSettingsContext()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  const { getAllAppliedJobs, setFilter, isLoading, filter, setRefresh } = useAppliedJob({
    limit: 10,
    page: 1,
    sort: "id:desc",
  })

  const handleClear = () => {
    setFilter({
      limit: 10,
      page: 1,
      sort: "id:desc",
      search: "",
      postedDate: "",
    })
  }

  const saveJob = usePostRequest()

  const handleSaveJob = (job_id: any, save: boolean) => {
    const url = save ? "/jobs/unsave" : "/jobs/save"

    saveJob.mutate(
      [
        url,
        {
          job_id,
        },
      ],
      {
        onSuccess: (response: any) => {
          // Handle success
          enqueueSnackbar(response?.message || "Saved successfully", {
            variant: "success",
          })
          setRefresh(false)
        },
        onError: (error: any) => {
          // Handle error
          enqueueSnackbar(error.message, { variant: "error" })
          setRefresh(false)
        },
      },
    )
  }

  return (
    <>
      <Head>
        <title>Applied Jobs</title>
      </Head>
      <Container maxWidth={false} disableGutters>
        <Card sx={{ p: 0, boxShadow: "none", bgcolor: "#f5f5f7" }}>
          {/* Search Section */}
          <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: "#f5f5f7" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 2, sm: 3 },
                mb: 3,
                width: "100%",
              }}
            >
              <TextField
                fullWidth={isMobile}
                size="small"
                placeholder="Search by key words"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: "white",
                    borderRadius: "4px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e0e0e0",
                    },
                  },
                }}
                sx={{ width: { xs: "100%", sm: "250px" } }}
                onChange={(e) => {
                  setFilter((data) => ({
                    ...data,
                    search: e.target.value,
                  }))
                }}
                value={filter?.search}
              />
              <TextField
                select
                fullWidth={isMobile}
                size="small"
                placeholder="Location"
                defaultValue=""
                SelectProps={{
                  native: true,
                  sx: { textAlign: "left" },
                }}
                InputProps={{
                  sx: {
                    bgcolor: "white",
                    borderRadius: "4px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e0e0e0",
                    },
                  },
                }}
                sx={{ width: { xs: "100%", sm: "250px" } }}
                onChange={(e) => {
                  setFilter({
                    ...filter,
                    location: e.target.value,
                  })
                }}
              >
                <option value="">Location</option>
                <option value="remote">Remote</option>
                <option value="onsite">Onsite</option>
                <option value="hybrid">Hybrid</option>
              </TextField>
              <LoadingButton
                variant="contained"
                sx={{
                  bgcolor: "#0A2239",
                  color: "white",
                  "&:hover": { bgcolor: "##2e3b55" },
                  px: 4,
                  borderRadius: "8px",
                  alignSelf: { xs: "stretch", sm: "auto" },
                }}
              >
                Search
              </LoadingButton>
            </Box>
          </Box>

          {/* Job Listings */}
          <Box sx={{ px: { xs: 2, sm: 3 }, pb: 3 }}>
            <Grid container spacing={2}>
              {getAllAppliedJobs?.data?.length === 0 && !isLoading && (
                <Grid item xs={12}>
                  <DataNotFound
                    title={filter?.search || filter?.postedDate ? "" : "No jobs have been applied"}
                    subTitle={
                      filter?.search || filter?.postedDate ? "" : 'Apply for the jobs from the "Search jobs" session'
                    }
                    path="/assets/applied_jobs.jpeg"
                  />
                </Grid>
              )}
              {isLoading
                ? [...Array(4)]?.map((_, index) => (
                    <Grid item xs={12} key={index}>
                      <SkeletonHorizontalItem />
                    </Grid>
                  ))
                : getAllAppliedJobs?.data?.map((item: any, i: number) => (
                    <Grid item xs={12} key={i}>
                      <Card
                        sx={{
                          p: 0,
                          overflow: "hidden",
                          cursor: "pointer",
                          "&:hover": { boxShadow: "0 4px 8px rgba(0,0,0,0.1)" },
                          transition: "all 0.3s ease",
                        }}
                        onClick={() => {
                          route.push(`/candidate/jobs/applied-job/job-details/${item?.id}`)
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            height: "100%",
                            flexDirection: { xs: "column", sm: "row" },
                          }}
                        >
                          {/* Company Logo */}
                          <Box
                            sx={{
                              width: { xs: "100%", sm: 100 },
                              height: { xs: 80, sm: 100 },
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              p: 2,
                              bgcolor: "#f5f5f7",
                            }}
                          >
                            <Avatar
                              variant="square"
                              src={`${HOST_URL}${item?.company?.profile_image_path}`}
                              alt={item?.company?.name}
                              sx={{ width: 70, height: 70 }}
                            />
                          </Box>

                          {/* Job Details */}
                          <Box
                            sx={{
                              flexGrow: 1,
                              p: 2,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                fontSize: { xs: "16px", sm: "18px" },
                                color: "#333",
                                mb: 0.5,
                              }}
                            >
                              {item?.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontSize: { xs: "14px", sm: "16px" }, color: "#666", mb: 1 }}
                            >
                              {item?.company?.name}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: { xs: 1, sm: 2 },
                                mb: { xs: 1, sm: 0 },
                              }}
                            >
                              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <LocationIcon sx={{ fontSize: 16, color: "#888" }} />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ fontSize: { xs: "12px", sm: "14px" } }}
                                >
                                  {item?.location || "Location"}
                                </Typography>
                              </Box>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <TimeIcon sx={{ fontSize: 16, color: "#888" }} />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ fontSize: { xs: "12px", sm: "14px" } }}
                                >
                                  {item?.job_type || "Full-time"}
                                </Typography>
                              </Box>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <Iconify icon="mdi:currency-usd" sx={{ fontSize: 16, color: "#888" }} />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ fontSize: { xs: "12px", sm: "14px" } }}
                                >
                                  {item?.salary_range || "Salary"}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>

                          {/* Status and Actions */}
                          <Box
                            sx={{
                              p: 2,
                              display: "flex",
                              flexDirection: { xs: "row", sm: "column" },
                              justifyContent: { xs: "space-between", sm: "space-between" },
                              alignItems: { xs: "center", sm: "flex-end" },
                              minWidth: { sm: 150 },
                              width: { xs: "100%", sm: "auto" },
                              borderTop: { xs: "1px solid #f0f0f0", sm: "none" },
                            }}
                          >
                            <Box sx={{ display: "flex", gap: 1, flexDirection: { xs: "column", sm: "row" } }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  px: 1.5,
                                  py: 0.5,
                                  borderRadius: "4px",
                                  bgcolor: "#e8f5e9",
                                  color: "#2e7d32",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                }}
                              >
                                {item?.status || "Open"}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ display: { xs: "block", sm: "none" } }}
                              >
                                {fToNow(item?.updatedAt)}
                              </Typography>
                            </Box>

                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ display: { xs: "none", sm: "block" } }}
                            >
                              {fToNow(item?.updatedAt)}
                            </Typography>

                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                                mt: { xs: 0, sm: 1 },
                                flexDirection: { xs: "row", sm: "row" },
                              }}
                            >
                              <LoadingButton
                                variant="contained"
                                size="small"
                                loading={saveJob.isLoading}
                                sx={{
                                  minWidth: "auto",
                                  px: { xs: 1, sm: 2 },
                                  fontSize: { xs: "11px", sm: "13px" },
                                  bgcolor: "#f8c146",
                                  color: "#fff",
                                  "&:hover": { bgcolor: "#e5a935" },
                                }}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setRefresh(true)
                                  item?.savedJob?.length
                                    ? handleSaveJob(item?.id, true)
                                    : handleSaveJob(item?.id, false)
                                }}
                              >
                                Save
                              </LoadingButton>
                              <LoadingButton
                                variant="contained"
                                size="small"
                                sx={{
                                  minWidth: "auto",
                                  px: { xs: 1, sm: 2 },
                                  fontSize: { xs: "11px", sm: "13px" },
                                  bgcolor: "#9e9e9e",
                                  color: "#fff",
                                  "&:hover": { bgcolor: "#757575" },
                                }}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  copy(`${window.location.origin}/candidate/jobs/applied-job/job-details/${item?.id}`)
                                  enqueueSnackbar("Copied")
                                }}
                              >
                                Link
                              </LoadingButton>
                            </Box>
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
            </Grid>

            {/* Pagination */}
            {getAllAppliedJobs?.data?.length > 0 && (
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  shape="rounded"
                  count={Math.ceil((getAllAppliedJobs?.pagination?.count || 0) / 10)}
                  size={isMobile ? "small" : "medium"}
                  onChange={(e: any, page: number) => {
                    setFilter((data) => ({
                      ...data,
                      page,
                    }))
                  }}
                />
              </Box>
            )}
          </Box>
        </Card>
      </Container>
    </>
  )
}
