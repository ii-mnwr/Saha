"use client"

import { useState } from "react"
import { Box, Card, Container, Typography, Pagination, Button, Avatar, Chip, Grid } from "@mui/material"
import { useJobs } from "src/hooks/useJobs"
import { useAuthContext } from "src/auth/useAuthContext"
import { useSnackbar } from "src/components/snackbar"
import usePostRequest from "src/hooks/usePost"
import { useRouter } from "next/router"
import { fToNow } from "src/utils/formatTime"
import DashboardLayout from "src/layouts/dashboard/DashboardLayout"

export default function JobAlerts() {
  const router = useRouter()
  const { user } = useAuthContext()
  const { enqueueSnackbar } = useSnackbar()
  const [id, setId] = useState(-1)
  const [page, setPage] = useState(1)

  const { getSubscribedJobs, subscribedLoading, setRefresh, setFilter2 } = useJobs({
    limit: 10,
    page,
    sort: "id:desc",
  })

  const applyJob = usePostRequest()
  const viewJob = usePostRequest()
  const saveJob = usePostRequest()

  const handleApplyNow = (job: any) => {
    const url = "/jobs/apply"

    applyJob.mutate(
      [
        url,
        {
          job_id: job?.id,
          company_id: job?.company_id,
        },
      ],
      {
        onSuccess: (response: any) => {
          enqueueSnackbar(response?.message || "Application submitted successfully", {
            variant: "success",
          })
          setId(-1)
        },
        onError: (error: any) => {
          enqueueSnackbar(error.message, { variant: "error" })
          setId(-1)
        },
      },
    )
  }

  const handleViewJob = (job: any) => {
    const url = "/jobs/view"

    viewJob.mutate(
      [
        url,
        {
          job_id: job?.id,
        },
      ],
      {
        onSuccess: () => {
          setId(-1)
        },
        onError: () => {
          setId(-1)
        },
      },
    )
  }

  const handleSaveJob = (job: any) => {
    const url = job?.savedJob?.length > 0 ? "/jobs/unsave" : "/jobs/save"

    saveJob.mutate(
      [
        url,
        {
          job_id: job?.id,
        },
      ],
      {
        onSuccess: (response: any) => {
          enqueueSnackbar(response?.message || "Saved successfully", {
            variant: "success",
          })
          setRefresh(false)
          setId(-1)
        },
        onError: (error: any) => {
          enqueueSnackbar(error.message, { variant: "error" })
          setRefresh(false)
          setId(-1)
        },
      },
    )
  }

  return (
    <DashboardLayout
      links={[
        { name: "Home", href: "#" },
        { name: "Jobs", href: "#" },
        { name: "Job Alerts", href: "#" },
      ]}
      title="Job Alerts"
    >
      <Container
        maxWidth={false}
        sx={{
          py: { xs: 2, sm: 3 },
          px: { xs: 1, sm: 2, md: 3 },
          bgcolor: "#f5f5f5",
          minHeight: "100vh",
          borderRadius: 2,
        }}
      >
        {getSubscribedJobs?.data?.data?.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: { xs: 4, md: 6 },
            }}
          >
            <Avatar
              sx={{ width: { xs: 80, sm: 120 }, height: { xs: 80, sm: 120 }, mb: 3, bgcolor: "grey.200" }}
              src="/placeholder.svg?height=120&width=120"
            />
            <Typography variant="h6" sx={{ mb: 1, textAlign: "center" }}>
              No subscriptions available
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3, textAlign: "center" }}>
              No subscriptions available to show alerts
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {getSubscribedJobs?.data?.data?.map((job: any) => (
              <Card key={job.id} sx={{ overflow: "hidden" }}>
                <Box sx={{ p: { xs: 2, sm: 3 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      justifyContent: "space-between",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "flex-start", sm: "flex-start" },
                      }}
                    >
                      <Avatar
                        sx={{ width: 48, height: 48, bgcolor: "grey.200" }}
                        src="/placeholder.svg?height=48&width=48"
                      />
                      <Box sx={{ width: "100%" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {job?.title}
                          </Typography>
                          {job?.JobView?.length === 0 && (
                            <Chip
                              label="New"
                              size="small"
                              sx={{
                                bgcolor: "#e3f2fd",
                                color: "#1976d2",
                                fontWeight: 500,
                                fontSize: "0.75rem",
                              }}
                            />
                          )}
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {job?.company?.name}
                        </Typography>
                        <Grid container spacing={1} sx={{ mt: 0.5 }}>
                          <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="body2" color="text.secondary" component="span">
                              Category:{" "}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }} component="span">
                              {job?.category}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="body2" color="text.secondary" component="span">
                              Salary:{" "}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }} component="span">
                              ${job?.salary_min} - ${job?.salary_max}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="body2" color="text.secondary" component="span">
                              Job Type:{" "}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }} component="span">
                              {job?.job_type}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="body2" color="text.secondary" component="span">
                              Location:{" "}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }} component="span">
                              {job?.location || "N/A"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: { xs: "flex-start", md: "flex-end" },
                        justifyContent: "space-between",
                        mt: { xs: 1, md: 0 },
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {fToNow(job?.updatedAt)}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          mt: { xs: 2, md: 1 },
                          flexWrap: "wrap",
                        }}
                      >
                        <Button
                          variant="outlined"
                          disabled={saveJob.isLoading && job?.id === id}
                          onClick={() => {
                            setId(job?.id)
                            setRefresh(true)
                            handleSaveJob(job)
                          }}
                          sx={{
                            borderRadius: 10,
                            color: "black",
                            borderColor: "black",
                            "&:hover": {
                              bgcolor: "black",
                              color: "white",
                              borderColor: "black",
                            },
                            fontSize: { xs: "0.75rem", sm: "0.875rem" },
                            px: { xs: 2, sm: 3 },
                          }}
                        >
                          {job?.savedJob?.length ? "Unsave" : "Save"}
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            handleViewJob(job)
                            router.push(`/candidate/jobs/applied-job/job-details/${job?.id}`)
                          }}
                          sx={{
                            borderRadius: 10,
                            color: "black",
                            borderColor: "black",
                            "&:hover": {
                              bgcolor: "black",
                              color: "white",
                              borderColor: "black",
                            },
                            fontSize: { xs: "0.75rem", sm: "0.875rem" },
                            px: { xs: 2, sm: 3 },
                          }}
                        >
                          View
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: "#f5b729",
                            color: "white",
                            border: "1px solid #000000",
                            "&:hover": { bgcolor: "#e6a818" },
                            borderRadius: 10,
                            fontSize: { xs: "0.75rem", sm: "0.875rem" },
                            px: { xs: 2, sm: 3 },
                          }}
                          disabled={job?.application?.length > 0 || (applyJob?.isLoading && job?.id === id)}
                          onClick={() => {
                            setId(job?.id)
                            handleApplyNow(job)
                          }}
                        >
                          {job?.application?.length > 0 ? "Applied" : "Apply"}
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        )}

        {getSubscribedJobs?.data?.pagination?.count > 10 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={Math.ceil((getSubscribedJobs?.data?.pagination?.count || 0) / 10)}
              page={page}
              onChange={(_, newPage) => {
                setFilter2((filter: any) => ({
                  ...filter,
                  page: newPage,
                }))
                setPage(newPage)
              }}
              color="primary"
              shape="rounded"
            />
          </Box>
        )}
      </Container>
    </DashboardLayout>
  )
}
