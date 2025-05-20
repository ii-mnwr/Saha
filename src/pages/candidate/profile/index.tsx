"use client"

import type React from "react"
import { Box, Button, Container, Grid, Typography, Avatar, Card } from "@mui/material"
import moment from "moment"
import Head from "next/head"
import { useRouter } from "next/router"
import { useSnackbar } from "notistack"
import { useQuery } from "react-query"
import { useAuthContext } from "src/auth/useAuthContext"
import EducationListing from "src/components/EducationListing"
import ExperienceListing from "src/components/experience-listing"
import Iconify from "src/components/iconify"
import { useSettingsContext } from "src/components/settings"
import { HOST_URL } from "src/config-global"
import useCopyToClipboard from "src/hooks/useCopyToClipboard"
import usePostRequest from "src/hooks/usePost"
import DashboardLayout from "src/layouts/dashboard/DashboardLayout"
import axiosInstance from "src/utils/axios"
import { fDate } from "src/utils/formatTime"

Profile.getLayout = (page: React.ReactElement) => (
  <DashboardLayout
    links={[
      {
        name: "Home",
        href: "#",
      },
      { name: "My Profile", href: "#" },
    ]}
    title="My Profile"
  >
    {page}
  </DashboardLayout>
)

const fetchUserById = async (id: any) => {
  const response = await axiosInstance.post("/candidates/find-by-id", {
    id,
  })
  return response?.data
}

const fetchCandidateData = async () => {
  const response = await axiosInstance.post("candidates/dashboard")
  return response?.data
}

export default function Profile() {
  const { user } = useAuthContext()
  const { data: userData } = useQuery(
    ["productData", user],
    () => user?.candidate_id && fetchUserById(user?.candidate_id),
  )
  const { enqueueSnackbar } = useSnackbar()
  const { copy } = useCopyToClipboard()
  const { themeStretch } = useSettingsContext()
  const { push } = useRouter()
  const postApi = usePostRequest()

  const { data, isLoading, error, refetch } = useQuery(["fetchCandidtaeDashboard", postApi.isSuccess], () =>
    fetchCandidateData(),
  )

  const onCopy = (text: string) => {
    if (text) {
      enqueueSnackbar("Copied!")
      copy(text)
    }
  }

  return (
    <>
      <Head>
        <title>My Profile</title>
      </Head>
      <Container maxWidth={false} disableGutters={themeStretch} sx={{ py: 4, px: 4, bgcolor: "#f0f0f0", borderRadius: 2 }}>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            {/* Profile Card */}
            <Card
              sx={{
                bgcolor: "#fff",
                mb: 3,
                p: 3,
                position: "relative",
                borderRadius: 1,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  bgcolor: "#0a2239",
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "#d0d0d0",
                  },
                  boxShadow: "none",
                  textTransform: "none",
                }}
                onClick={() => push("/candidate/edit-profile")}
              >
                Edit Profile
              </Button>

              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Avatar
                  src={`${HOST_URL}${userData?.data?.profile_image_path}`}
                  sx={{
                    width: 120,
                    height: 120,
                    mr: 3,
                    bgcolor: "#ccc",
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    color: "black",
                  }}
                >
                  {userData?.data?.first_name} {userData?.data?.last_name}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 4 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body1">
                    {userData?.data?.address?.city || userData?.data?.address?.country || "Not specified"}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    date joined
                  </Typography>
                  <Typography variant="body1">{fDate(userData?.data?.date_applied)}</Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Views
                  </Typography>
                  <Typography variant="body1">{userData?.data?.views || 0}</Typography>
                </Box>
              </Box>
            </Card>

            {/* Education Card */}
            <Card
              sx={{
                bgcolor: "#fff",
                mb: 3,
                p: 3,
                borderRadius: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#333",
                  mb: 2,
                }}
              >
                Education
              </Typography>
              <Box>
                <EducationListing data={userData?.data?.education_details} />
              </Box>
            </Card>

            {/* Experience Card */}
            <Card
              sx={{
                bgcolor: "#fff",
                mb: 3,
                p: 3,
                borderRadius: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#333",
                  mb: 2,
                }}
              >
                Experience
              </Typography>
              <Box sx={{ bgcolor: "#fff" }}>
                <ExperienceListing data={userData?.data?.experience_details} />
              </Box>
            </Card>

            {/* Technical Skills Card */}
            <Card
              sx={{
                bgcolor: "#fff",
                mb: 3,
                p: 3,
                borderRadius: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#333",
                  mb: 2,
                }}
              >
                Technical Skills
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {userData?.data?.skills?.split(",")?.map((item: string, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      bgcolor: "#d0d0d0",
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                    }}
                  >
                    {item.trim()}
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={4}>
            {/* Follow/Followers Card */}
            <Card
              sx={{
                bgcolor: "#fff",
                mb: 3,
                p: 3,
                borderRadius: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#333",
                  mb: 2,
                }}
              >
                follow/followers
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
                <Box
                  sx={{
                    bgcolor: "#FFF4A9",
                    p: 2,
                    borderRadius: 1,
                    width: 100,
                    height: 100,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6">{userData?.data?.follower || 0}</Typography>
                  <Typography variant="body2">Followers</Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: "#FFF4A9",
                    p: 2,
                    borderRadius: 1,
                    width: 100,
                    height: 100,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6">{userData?.data?.following || 0}</Typography>
                  <Typography variant="body2">Following</Typography>
                </Box>
              </Box>
            </Card>

            {/* Social Links Card */}
            <Card
              sx={{
                bgcolor: "#fff",
                mb: 3,
                p: 3,
                borderRadius: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#333",
                  mb: 2,
                }}
              >
                Social Links
              </Typography>
              <Box>
                {Object.keys(userData?.data?.social_links || {})?.map(
                  (item, index) =>
                    userData?.data?.social_links[item] && (
                      <Typography
                        key={index}
                        component="a"
                        href={userData?.data?.social_links[item]}
                        sx={{
                          display: "block",
                          mb: 1,
                          color: "#333",
                          textDecoration: "none",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {userData?.data?.social_links[item]}
                      </Typography>
                    ),
                )}
              </Box>
            </Card>

            {/* About Me Card */}
            <Card
              sx={{
                bgcolor: "#fff",
                mb: 3,
                p: 3,
                borderRadius: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#333",
                  mb: 2,
                }}
              >
                About me
              </Typography>
              <Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" component="span" sx={{ fontWeight: 600, mr: 1 }}>
                    Email:
                  </Typography>
                  <Typography variant="body2" component="span">
                    {userData?.data?.email}
                  </Typography>
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" component="span" sx={{ fontWeight: 600, mr: 1 }}>
                    Mobile:
                  </Typography>
                  <Typography variant="body2" component="span">
                    {userData?.data?.phone_number}
                  </Typography>
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" component="span" sx={{ fontWeight: 600, mr: 1 }}>
                    Date of birth:
                  </Typography>
                  <Typography variant="body2" component="span">
                    {moment(userData?.data?.date_of_birth).format("DD-MM-YYYY")}
                  </Typography>
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" component="span" sx={{ fontWeight: 600, mr: 1 }}>
                    Gender:
                  </Typography>
                  <Typography variant="body2" component="span" sx={{ textTransform: "capitalize" }}>
                    {userData?.data?.gender}
                  </Typography>
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" component="span" sx={{ fontWeight: 600, mr: 1 }}>
                    Experience:
                  </Typography>
                  <Typography variant="body2" component="span">
                    {userData?.data?.total_experience} Years
                  </Typography>
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" component="span" sx={{ fontWeight: 600, mr: 1 }}>
                    Marital status:
                  </Typography>
                  <Typography variant="body2" component="span" sx={{ textTransform: "capitalize" }}>
                    {userData?.data?.marital_status}
                  </Typography>
                </Box>
              </Box>
            </Card>

            {/* Overview Card */}
            <Card
              sx={{
                bgcolor: "#fff",
                mb: 3,
                p: 3,
                borderRadius: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#333",
                  mb: 2,
                }}
              >
                Overview
              </Typography>
              <Typography variant="body2">{userData?.data?.bio}</Typography>
            </Card>

            {/* Profile Link Card */}
            <Card
              sx={{
                bgcolor: "#fff",
                p: 3,
                borderRadius: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#333",
                  mb: 2,
                }}
              >
                link to profile
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  bgcolor: "#f0f0f0",
                  p: 1,
                  borderRadius: 1,
                  cursor: "pointer",
                }}
                onClick={() => onCopy("www.talentsreach.com")}
              >
                <Typography variant="body2">www.talentsreach.com...</Typography>
                <Iconify icon="eva:copy-fill" width={20} sx={{ color : "#ffbb00"}} />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
