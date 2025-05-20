"use client"

/* eslint-disable @typescript-eslint/no-shadow */
import type React from "react"
import { useState } from "react"
import Head from "next/head"
import DashboardLayout from "src/layouts/dashboard/DashboardLayout"
import { useSettingsContext } from "src/components/settings"
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Pagination,
  IconButton,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import DeleteIcon from "@mui/icons-material/Delete"
import axiosInstance from "src/utils/axios"
import { useQuery } from "react-query"
import { useSnackbar } from "src/components/snackbar"
import usePostRequest from "src/hooks/usePost"
import DataNotFound from "src/components/DataNotFound"
import SkeletonProductItem from "src/components/skeleton/SkeletonProductItem"
import { useRouter } from "next/router"
import JobCard from "src/components/job-card/JobCard" // Import the new JobCard component

SearchJob.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: "Home",
        href: "#",
      },
      { name: "Jobs", href: "#" },
      { name: "Saved Jobs", href: "#" },
    ]}
    title="Saved Jobs"
  >
    {page}
  </DashboardLayout>
)

const fetchSavedJobsList = async (filter: any) => {
  const response = await axiosInstance.post("/jobs/saved-jobs-list", filter)
  return response?.data
}

export default function SearchJob() {
  const route = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { themeStretch } = useSettingsContext()
  const [refreshApi, setRefreshApi] = useState(false)

  const [filter, setFilter] = useState({
    page: 1,
    limit: 9, // Changed to 9 for 3x3 grid
    keywords: "",
    postedDate: "",
    savedDate: "",
    search: {
      title: "",
      qualification: "",
      category: "",
    },
    sort: "id:desc",
  })

  const {
    data: savedJobsList,
    isLoading,
    error,
    refetch,
  } = useQuery(["savedJobsList", refreshApi, filter], () => fetchSavedJobsList({ ...filter }))

  const unsaveJob = usePostRequest()

  // Handle unsave job functionality
  const handleUnsaveJob = (job: any) => {
    const url = "/jobs/unsave"

    unsaveJob.mutate(
      [
        url,
        {
          job_id: job?.id,
        },
      ],
      {
        onSuccess: (response: any) => {
          // Handle success
          setRefreshApi((bool) => !bool)
          enqueueSnackbar(response?.message || "Unsaved successfully", {
            variant: "success",
          })
        },
        onError: (error: any) => {
          // Handle error
          enqueueSnackbar(error.message, { variant: "error" })
        },
      },
    )
  }

  // Handle copy link functionality
  const handleCopyLink = (job: any) => {
    const jobUrl = `${window.location.origin}/candidate/jobs/saved-job/job-details/${job?.id}`
    navigator.clipboard.writeText(jobUrl)
    enqueueSnackbar("Job link copied to clipboard", { variant: "success" })
  }

  // Handle apply functionality
  const handleApply = (job: any) => {
    route.push(`/candidate/jobs/saved-job/apply/${job?.id}`)
  }

  const handleClear = () =>
    setFilter({
      page: 1,
      limit: 9,
      sort: "id:desc",
      keywords: "",
      postedDate: "",
      savedDate: "",
      search: {
        category: "",
        qualification: "",
        title: "",
      },
    })

  return (
    <>
      <Head>
        <title>Saved Jobs</title>
      </Head>
      <Container maxWidth={false} disableGutters>
      <Box sx={{ p: { xs: 2, sm: 3 }, mt: { xs: -8, sm: 0 }, bgcolor: "#F0F0F0", borderRadius: 2, }}>
          {/* Search Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              mb: 3,
              flexWrap: { xs: "wrap", md: "nowrap" },
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Search by keywords"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) =>
                setFilter((data) => ({
                  ...data,
                  keywords: e.target.value,
                }))
              }
              value={filter?.keywords}
              sx={{ flexGrow: 1 }}
            />

            <TextField
              size="small"
              placeholder="Job Posted Date"
              type="date"
              onChange={(e) => {
                setFilter({
                  ...filter,
                  postedDate: e.target.value,
                })
              }}
              value={filter?.postedDate}
              sx={{ width: { xs: "100%", md: "220px" } }}
            />

            <TextField
              size="small"
              placeholder="Job Saved Date"
              type="date"
              onChange={(e) => {
                setFilter({
                  ...filter,
                  savedDate: e.target.value,
                })
              }}
              value={filter?.savedDate}
              sx={{ width: { xs: "100%", md: "220px" } }}
            />

            <Button
              variant="contained"
              onClick={handleClear}
              startIcon={<DeleteIcon />}
              sx={{
                bgcolor: "#000000",
                "&:hover": { bgcolor: "#333333" },
                height: 40,
                borderRadius: "8px",
                px: 3,
              }}
            >
              Clear
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Job Cards Grid */}
          {savedJobsList?.data?.length === 0 && !isLoading ? (
            <Box sx={{ py: 5 }}>
              <DataNotFound
                title={
                  filter?.postedDate !== "" || filter?.savedDate !== "" || filter?.keywords !== ""
                    ? "No matching jobs found"
                    : "No jobs have been saved"
                }
                subTitle={
                  filter?.postedDate !== "" || filter?.savedDate !== "" || filter?.keywords !== ""
                    ? "Try adjusting your search criteria"
                    : "Jobs can be saved from the jobs section"
                }
                path="/assets/saved_jobs.jpeg"
              />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {isLoading
                ? [...Array(9)].map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
                      <SkeletonProductItem />
                    </Grid>
                  ))
                : savedJobsList?.data?.map((item: any) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={item.id}
                      onClick={() => {
                        route.push(`/candidate/jobs/saved-job/job-details/${item?.id}`)
                      }}
                    >
                      <JobCard 
                        item={item} 
                        onSaveJob={handleUnsaveJob}
                        onCopyLink={handleCopyLink}
                        onApply={handleApply}
                        setRefresh={() => setRefreshApi((bool) => !bool)}
                      />
                    </Grid>
                  ))}
            </Grid>
          )}

          {/* Pagination */}
          {savedJobsList?.pagination && savedJobsList.pagination.count > 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                shape="circular"
                count={Math.ceil((savedJobsList?.pagination?.count || 0) / filter.limit)}
                page={filter.page || 1}
                onChange={(_, page) => {
                  setFilter((prev) => ({
                    ...prev,
                    page,
                  }))
                }}
              />
            </Box>
          )}
        </Box>
      </Container>
    </>
  )
}