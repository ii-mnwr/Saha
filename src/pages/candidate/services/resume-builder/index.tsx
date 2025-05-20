"use client"

/* eslint-disable no-nested-ternary */
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material"
import Head from "next/head"
import { useRouter } from "next/router"
import type React from "react"
import { useState } from "react"
import GeneralUpgrade from "src/components/UpgradePlan/GeneralUpgrade"
import { useSettingsContext } from "src/components/settings"
import { useGetCurrentPlan } from "src/hooks/useSubscription"
import DashboardLayout from "src/layouts/dashboard/DashboardLayout"

ResumeBuilder.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: "Home",
        href: "#",
      },
      { name: "Candidates Services", href: "#" },
      { name: "Resume Builder", href: "#" },
    ]}
    title="Resume Builder"
  >
    {page}
  </DashboardLayout>
)

const itemData = [
  {
    img: "/assets/template1.png",
    title: "template1",
  },
  {
    img: "/assets/template2.png",
    title: "template2",
  },
  {
    img: "/assets/template3.png",
    title: "template3",
  },
  {
    img: "/assets/template4.png",
    title: "template4",
  },
  {
    img: "/assets/template5.png",
    title: "template5",
  },
  {
    img: "/assets/template6.png",
    title: "template6",
  },
  {
    img: "/assets/template7.png",
    title: "template7",
  },
]

export default function ResumeBuilder() {
  const route = useRouter()
  const matches = useMediaQuery("(min-width:600px)")
  const largeScreen = useMediaQuery("(min-width:1200px)")
  const [selectedResume, setSelectedResume] = useState(null)

  const { themeStretch } = useSettingsContext()

  const { getCurrentPlan } = useGetCurrentPlan()

  const { data: currentPlan, isLoading } = getCurrentPlan || {}

  if (isLoading) {
    return <Typography textAlign="center" />
  }

  return (
    <>
      <Head>
        <title>Create Your Profession Resume</title>
      </Head>
      <Container maxWidth={false} disableGutters>
        {currentPlan?.data?.Plan?.features?.unlimitedResumeBuilder ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card
                sx={{
                  background: "#f0f0f0",
                  padding: 4,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" }, borderRadius: 1 }}>
                  <Button
                    sx={{
                      width: 150,
                      padding: 1,
                      margin: 2,
                      bgcolor: "#0A2239",
                      "&:hover": {
                        bgcolor: "#0A2239",
                        opacity: 0.9,
                      },
                    }}
                    variant="contained"
                    onClick={() => {
                      route.push(`/candidate/services/resume-builder/${selectedResume}`)
                    }}
                    disabled={!selectedResume}
                  >
                    Start resume
                  </Button>
                </Box>
                <CardContent>
                  <Stack spacing={2}>
                    <ImageList
                      sx={{
                        width: "100%",
                        borderRadius: 1,
                        // Adjust the height to make templates smaller
                        overflow: "hidden",
                      }}
                      // Increase columns based on screen size
                      cols={largeScreen ? 4 : matches ? 3 : 2}
                      gap={8}
                    >
                      {itemData.map((item) => (
                        <ImageListItem
                          key={item.img}
                          sx={{
                            border: selectedResume === item?.title ? "3px solid #0A2239" : "none",
                            cursor: "pointer",
                            borderRadius: 1,
                            // Make each item smaller
                            height: { xs: 180, sm: 200, md: 220 },
                            overflow: "hidden",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              transform: "scale(1.02)",
                            },
                          }}
                          onClick={() => {
                            setSelectedResume(item?.title)
                          }}
                        >
                          <img
                            src={item.img || "/placeholder.svg"}
                            alt={item.title}
                            loading="lazy"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                              borderRadius: 4,
                              backgroundColor: "#fff",
                            }}
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <GeneralUpgrade title="Get unlimited resume builder" />
        )}
      </Container>
    </>
  )
}
