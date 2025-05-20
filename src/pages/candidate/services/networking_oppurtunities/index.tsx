"use client"

import type React from "react"

import Head from "next/head"
import { useSettingsContext } from "src/components/settings"
import DashboardLayout from "src/layouts/dashboard/DashboardLayout"
import { Container, Typography, Box } from "@mui/material"
import { useGetCurrentPlan } from "src/hooks/useSubscription"

NetworkingOpportunities.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: "Home",
        href: "/",
      },
      { name: "Candidate Services", href: "/candidate-services" },
      { name: "Get Prepared", href: "/get-prepared" },
    ]}
    title="Networking Opportunities"
  >
    {page}
  </DashboardLayout>
)

export default function NetworkingOpportunities() {
  const { themeStretch } = useSettingsContext()
  const { getCurrentPlan } = useGetCurrentPlan()
  const { data: currentPlan, isLoading } = getCurrentPlan || {}

  if (isLoading) {
    return <Typography textAlign="center" />
  }

  return (
    <>
      <Head>
        <title>Networking Opportunities | Talents Reach</title>
      </Head>
      <Container maxWidth={false} disableGutters={themeStretch} sx={{ bgcolor: "#f0f0f0", borderRadius: 2 }}> 
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "70vh",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "#e0e0e0",
              fontSize: { xs: "3rem", sm: "5rem", md: "7rem" },
              fontWeight: 300,
              textAlign: "center",
              fontFamily: "Work Sans, sans-serif",
            }}
          >
            Coming soon...
          </Typography>
        </Box>
      </Container>
    </>
  )
}
