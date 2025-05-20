"use client"

import type React from "react"
import { useState } from "react"
import Head from "next/head"
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Drawer,
  Pagination,
  useMediaQuery,
  type Theme,
} from "@mui/material"
import { Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material"
import DashboardLayout from "src/layouts/dashboard"
import FilterSidebar from "src/components/candidate/FilterSidebar"
import { useQuery } from "react-query"
import axiosInstance from "src/utils/axios"
import { SkeletonProductItem } from "src/components/skeleton"
import { useRouter } from "next/router"
import DataNotFound from "src/components/DataNotFound"
import { areAllValuesEmpty } from "src/auth/utils"
import JobCard from "src/components/job-card/JobCard"

const RecommendedJobs = () => {
  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"))

  const [filter, setFilter] = useState({
    company_name: "",
    category: "",
    sort: "id:desc",
    education: "",
    postedAt: "",
    job_type: "",
    application_mode: "",
    remuneration: "",
    application_type: "",
    title: "",
    location: "",
    keywords: "",
    page: 1,
    limit: 10,
    experience: "",
    gender: "",
    age: "",
    medical_license: "",
  })

  const jobAlerts = async () => {
    const response = await axiosInstance.post("/jobs/candidate-alerts", {
      ...filter,
    })
    return response?.data
  }

  const [isLoading, setLoading] = useState(true)

  const { data: getCandidateAlerts } = useQuery(["resumeAlerts", [filter], refresh], () => jobAlerts(), {
    keepPreviousData: true,
    onSuccess: () => setLoading(false),
    onError: () => setLoading(false),
  })

  const handleClear = () => {
    setFilter({
      ...filter,
      category: "",
      company_name: "",
      title: "",
      location: "",
      keywords: "",
      application_mode: "",
      application_type: "",
      education: "",
      job_type: "",
      limit: 10,
      page: 1,
      postedAt: "",
      remuneration: "",
      sort: "id:desc",
      experience: "",
      gender: "",
      age: "",
      medical_license: "",
    })
  }

  return (
    <>
      <Head>
        <title>Recommended Jobs</title>
      </Head>
      <Container maxWidth={false} sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        <Box
          sx={{
            p: { xs: 1.5, sm: 2, md: 3 },
            mt: { xs: -4, sm: -2, md: 0 },
            bgcolor: "#F0F0F0",
            borderRadius: 2,
          }}
        >
          {/* Main content */}
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {/* Left side - Job listings */}
            <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
              <Box sx={{ mb: { xs: 2, md: 3 } }}></Box>
              {/* Search inputs */}
              <Grid container spacing={{ xs: 1, md: 2 }} sx={{ mb: { xs: 2, md: 3 }, mx: { xs: 0, md: 1 } }}>
                <Grid item xs={12} sm={6} md={4.5}>
                  <TextField
                    fullWidth
                    placeholder="Search by keywords"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => {
                      setFilter((data) => ({
                        ...data,
                        keywords: e.target.value,
                      }))
                    }}
                    value={filter?.keywords}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4.5}>
                  <TextField
                    fullWidth
                    placeholder="Years of experience"
                    size="small"
                    onChange={(e) => {
                      setFilter((data) => ({
                        ...data,
                        experience: e.target.value,
                      }))
                    }}
                    value={filter?.experience}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: "#0A2239",
                      color: "white",
                      height: "100%",
                      "&:hover": {
                        bgcolor: "#0A2239CC",
                      },
                    }}
                    onClick={() => setRefresh(!refresh)}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
              {/* Job cards grid */}
              {isLoading ? (
                <Grid container spacing={{ xs: 2, md: 3 }}>
                  {[...Array(isMobile ? 4 : 9)].map((_, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={4} key={`skeleton ${index}`}>
                      <SkeletonProductItem />
                    </Grid>
                  ))}
                </Grid>
              ) : getCandidateAlerts?.data?.length === 0 ? (
                <Box sx={{ py: { xs: 4, md: 6 } }}>
                  <DataNotFound
                    title={
                      areAllValuesEmpty({
                        ...filter,
                        page: "",
                        limit: "",
                        sort: "",
                      })
                        ? "Will be recommended shortly"
                        : ""
                    }
                    path="/assets/recommended_jobs.jpeg"
                  />
                </Box>
              ) : (
                <Grid container spacing={{ xs: 2, md: 3 }}>
                  {getCandidateAlerts?.data?.map((job: any) => (
                    <Grid item xs={12} sm={6} md={6} lg={6} key={job.id}>
                      <JobCard item={job} />
                    </Grid>
                  ))}
                </Grid>
              )}
              {/* Pagination */}
              {getCandidateAlerts?.pagination?.count > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: { xs: 3, md: 4 },
                    pb: { xs: 7, md: 2 }, // Add padding at bottom for mobile to account for fixed filter button
                  }}
                >
                  <Pagination
                    count={Math.ceil((getCandidateAlerts?.pagination?.count || 0) / filter.limit)}
                    page={filter.page}
                    onChange={(e: any, page: number) => {
                      setFilter((data) => ({
                        ...data,
                        page,
                      }))
                    }}
                    color="primary"
                    size={isMobile ? "small" : "medium"}
                  />
                </Box>
              )}
            </Grid>
            {/* Right sidebar - Filters */}
            <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
              <Box
                sx={{
                  width: "100%",
                  display: { xs: "none", md: "block" },
                  position: "sticky",
                  top: 16,
                }}
              >
                <FilterSidebar filter={filter} setFilter={setFilter} onClear={handleClear} />
              </Box>
            </Grid>
          </Grid>
          {/* Filter button and drawer/modal for small screens */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <Button
              variant="contained"
              onClick={() => setDrawerOpen(true)}
              sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
                bgcolor: "#0A2239",
                color: "white",
                borderRadius: "50%",
                width: 56,
                height: 56,
                minWidth: "auto",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                zIndex: 1300,
                "&:hover": {
                  bgcolor: "#0A2239CC",
                },
              }}
            >
              <FilterIcon />
            </Button>
            <Drawer
              anchor="bottom"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              PaperProps={{
                sx: {
                  maxHeight: "80vh",
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                },
              }}
            >
              <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}>
                <IconButton onClick={() => setDrawerOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <FilterSidebar
                filter={filter}
                setFilter={setFilter}
                isMobile
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onClear={handleClear}
              />
            </Drawer>
          </Box>
        </Box>
      </Container>
    </>
  )
}

// Simple filter icon component
const FilterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4h16v2.5l-6 6v7l-4-2v-5l-6-6V4z" fill="currentColor" />
  </svg>
)

RecommendedJobs.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: "Home",
        href: "#",
      },
      { name: "Jobs", href: "#" },
      { name: "Recommended Jobs", href: "#" },
    ]}
    title="Recommended Jobs"
  >
    {page}
  </DashboardLayout>
)

export default RecommendedJobs
