"use client"

/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import { Box, Container, Grid, Stack, Typography, TextField, IconButton } from "@mui/material"
import "react-phone-input-2/lib/style.css"
import type React from "react"
import { useState } from "react"
import EmailIcon from "@mui/icons-material/Email"
import PlaceIcon from "@mui/icons-material/Place"
import XIcon from "@mui/icons-material/X"
import FacebookIcon from "@mui/icons-material/Facebook"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import useScreenSizes from "src/hooks/useScreenSizes"
import Footer from "src/layouts/dashboard/footer"
import usePostRequest from "src/hooks/usePost"
import { useSnackbar } from "src/components/snackbar"
import { LoadingButton } from "@mui/lab"
import Head from "next/head"
import { useAuthContext } from "src/auth/useAuthContext"
import Layout from "src/layouts/layout"

const ContactUs = () => {
  const { enqueueSnackbar } = useSnackbar()

  const { isMobile, isTablet, isLaptop, isLaptopL, isMobileM, isMobileL } = useScreenSizes()

  const [name, setName] = useState("")

  const [value, setValue] = useState("")

  const [email, setEmail] = useState("")

  const [inquiry, setInquiry] = useState("")

  const contactUs = usePostRequest()

  const onSubmit = () => {
    const url = "/support/contact"

    contactUs.mutate(
      [
        url,
        {
          fullName: name,
          phoneNumber: value,
          email,
          inquiry,
        },
      ],
      {
        onSuccess: (response: any) => {
          // Handle success
          enqueueSnackbar(response?.message || "Sent successfully!!", {
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
  const { user } = useAuthContext()

  return (
    <div>
      <Head>
        <title>Contact us</title>
      </Head>

      <Container maxWidth="xl" sx={{ py: 8, mt: { xs: 4, md: 8, lg: 8, xl: 8 } }}>
        <Grid container spacing={20}>
          {/* Left Column - Contact Information */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                bgcolor: "#0A2239",
                color: "white",
                p: 4,
                borderRadius: 1,
                width: {xs: "100%", md: "100%", lg: "100%", xl: "100%"},
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#FFBB00",
                  mb: 1,
                  fontWeight: 600,
                }}
              >
                Connect
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                Get in Touch
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                }}
              >
                Fill out the form or drop us an email—we're here to help!
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <EmailIcon sx={{ mr: 2 }} />
                <Typography variant="body1">info@talentsreach.com</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 4 }}>
                <PlaceIcon sx={{ mr: 2, mt: 0.5 }} />
                <Typography variant="body1">Business Bay, Dubai, UAE</Typography>
              </Box>

              <Box sx={{ mt: "auto" }}>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Follow us:
                </Typography>

                <Stack direction="row" spacing={2}>
                  <IconButton
                    sx={{
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.3)",
                      p: 1,
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    <XIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    sx={{
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.3)",
                      p: 1,
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    <LinkedInIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    sx={{
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.3)",
                      p: 1,
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    <FacebookIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Box>
            </Box>
          </Grid>

          {/* Right Column - Contact Form */}
          <Grid item xs={12} md={7}>
            <Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                  Name
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                  Email
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                  Contact Number
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Your phone number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                  Message
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  placeholder="Share your thoughts..."
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                    },
                  }}
                />
              </Box>

              <LoadingButton
                variant="contained"
                loading={contactUs.isLoading}
                onClick={onSubmit}
                sx={{
                  bgcolor: "#0A2239",
                  color: "white",
                  py: 1.5,
                  px: 4,
                  borderRadius: 0.5,
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: "#0A2239",
                    opacity: 0.9,
                  },
                }}
              >
                Send
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </div>
  )
}

ContactUs.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>

export default ContactUs
