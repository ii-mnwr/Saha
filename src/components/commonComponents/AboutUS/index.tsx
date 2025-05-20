"use client"

import { Box, Button, Grid, Paper, Typography, styled } from "@mui/material"
import Head from "next/head"
import { useRouter } from "next/router"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import InstagramIcon from "@mui/icons-material/Instagram"

const ServiceCard = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: 16,
  marginBottom: 24,
}))

const OfferCard = styled(Paper)(({ theme }) => ({
  background: "#f5f5f7",
  borderRadius: 8,
  padding: 24,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  boxShadow: "none",
}))

const VisionMissionCard = styled(Paper)(({ theme }) => ({
  background: "#F0F0F0",
  borderRadius: 10,
  overflow: "hidden",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
}))

const StatsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 16,
  flexWrap: "wrap",
  marginTop: 40,
}))

const StatItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "#f5c33b",
  border: "1px solid #f5c33b",
  borderRadius: 8,
  padding: "24px 16px",
  width: 200,
}))

const HexagonIcon = () => (
  <Box
    sx={{
      width: 40,
      height: 40,
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& svg": {
        width: "100%",
        height: "100%",
        fill: "#0a2239",
      },
    }}
  >
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5Z" />
    </svg>
  </Box>
)

const AboutUs = ({ isHomePage = false }: any) => {
  const { push } = useRouter()

  return (
    <>
      {!isHomePage && (
        <Head>
          <title>About us</title>
        </Head>
      )}

      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          padding: { xs: "120px 100px", md: "120px 100px", lg: "120px 100px", xl: "120px 100px" },
          backgroundColor: "#f0f0f0",
          minHeight: "500px",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Box sx={{ maxWidth: 600 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#f5c33b",
                  fontWeight: 500,
                  fontSize: "18px",
                  mb: 1,
                  display: "block",
                }}
              >
                About Us
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  color: "#0a2239",
                  fontWeight: 700,
                  fontSize: { xs: "28px", md: "36px", lg: "36px", xl: "36px" },
                  lineHeight: 1.2,
                  mb: 2,
                }}
              >
                Unlock Your Workforce's Full Potential Today
              </Typography>
              <Typography
                sx={{
                  color: "#444",
                  mb: 4,
                  fontSize: "18px",
                  lineHeight: 1.6,
                }}
              >
                TalentsReach is a talent cloud work force hub for fulfilling end to end recruitment needs and
                development of personnel talents through providing training across various industries.
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  sx={{
                    bgcolor: "#fff",
                    color: "#0a2239",
                    border: "2px solid #ddd",
                    "&:hover": { bgcolor: "#f0f0f0" },
                    borderRadius: "4px",
                    textTransform: "none",
                    fontWeight: 500,
                    boxShadow: "none",
                  }}
                  onClick={() => push("/contact-us")}
                >
                  Request Demo
                </Button>
                <Button
                  variant="text"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    color: "#0a2239",
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
                  }}
                  onClick={() => push("/signup")}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Box sx={{ height: "100%" }}>
              {/* Services Section */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <ServiceCard>
                  <HexagonIcon />
                  <Box>
                    <Typography fontWeight={700} sx={{ mb: 0.5 }}>
                      Comprehensive Solutions
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Streamline your recruitment process with our all-in-one talent management platform tailored for
                      your needs.
                    </Typography>
                  </Box>
                </ServiceCard>

                <ServiceCard>
                  <HexagonIcon />
                  <Box>
                    <Typography fontWeight={700} sx={{ mb: 0.5 }}>
                      Expert Training
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Enhance skills and boost performance through industry-specific training programs designed for your
                      team.
                    </Typography>
                  </Box>
                </ServiceCard>

                <ServiceCard>
                  <HexagonIcon />
                  <Box>
                    <Typography fontWeight={700} sx={{ mb: 0.5 }}>
                      Talent Development
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Nurture and retain top talent with personalized development plans that align with your business
                      goals.
                    </Typography>
                  </Box>
                </ServiceCard>

                <ServiceCard>
                  <HexagonIcon />
                  <Box>
                    <Typography fontWeight={700} sx={{ mb: 0.5 }}>
                      Data-Driven Insights
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Leverage analytics to make informed decisions and optimize your workforce for maximum efficiency.
                    </Typography>
                  </Box>
                </ServiceCard>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* What We Offer Section */}
      <Box sx={{ py: 8, px: { xs: 2, md: 8}, bgcolor: "#fff" }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="caption"
            sx={{
              color: "#ffbb00",
              fontWeight: 600,
              fontSize: "18px",
              mb: 1,
              display: "block",
            }}
          >
            What we offer
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: "#0a2239",
              fontWeight: 700,
              fontSize: { xs: "24px", md: "30px", lg: "30px", xl: "30px" },
              mb: 2,
            }}
          >
            WE OFFER THE BEST
          </Typography>
          <Typography sx={{ maxWidth: 600, mx: "auto", color: "#666" }}>
            Every single one of our jobs has some kind of flexibility option.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <OfferCard>
              <Box sx={{ mb: 3 }}>
                <img src="/assets/ourServiceIcons/people.svg" alt="People Management" width={60} height={60} />
              </Box>
              <Typography variant="h4" fontWeight={600} sx={{ mb: 4, mt: 2}}>
                People Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Search from a wide range of candidate data base
              </Typography>
            </OfferCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <OfferCard>
              <Box sx={{ mb: 3 }}>
                <img src="/assets/ourServiceIcons/job_search.svg" alt="Easy Hire" width={60} height={60} />
              </Box>
              <Typography variant="h4" fontWeight={600} sx={{ mb: 4, mt: 2 }}>
                Easy Hire and Job Search
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hiring made easier with automated platform. Our experts assists job seekers in their search.
              </Typography>
            </OfferCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <OfferCard>
              <Box sx={{ mb: 3 }}>
                <img src="/assets/ourServiceIcons/training.svg" alt="Training" width={60} height={60} />
              </Box>
              <Typography variant="h4" fontWeight={600} sx={{ mb: 4, mt: 2 }}>
                Personnel Development and Training
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Building skills and overall development of personnel through various sessions
              </Typography>
            </OfferCard>
          </Grid>
        </Grid>
      </Box>

      {/* Vision and Mission Section */}
      <Box sx={{ py: 8, px: { xs: 2, md: 4 }, bgcolor: "#0a2239" }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              color: "#ffbb00",
              fontWeight: 700,
              fontSize: { xs: "24px", md: "30px", lg: "30px", xl: "30px" },
              mb: 3,
            }}
          >
            OUR VISION AND MISSION
          </Typography>
          <Typography sx={{ maxWidth: 800, mx: "auto", color: "#fff", mb: 4 }}>
            We are driven by a simple yet powerful goal: to redefine recruitment through clarity of vision,
            purpose-driven mission, and strong core values. At TalentsReach, we believe that connecting the right talent
            with the right opportunity can transform businesses—and lives.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <VisionMissionCard>
              <Box
                sx={{
                  width: "100%",
                  height: 350,
                  backgroundImage: "url(/assets/vision-image.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <Box sx={{ p: 2 }}>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 0, color: "#0a2239" }}>
                  OUR VISION
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Our vision is to connect the world and build a talented workforce at the ease of job seekers and
                  recruiters.
                </Typography>
              </Box>
            </VisionMissionCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <VisionMissionCard>
              <Box
                sx={{
                  height: 350,
                  backgroundImage: "url(/assets/mission-image.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <Box sx={{ p: 2 }}>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 0, color: "#0a2239" }}>
                  OUR MISSION
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Our mission is to enhance the recruitment industry by proper personnel search panel.
                </Typography>
              </Box>
            </VisionMissionCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <VisionMissionCard>
              <Box
                sx={{
                  height: 350,
                  backgroundImage: "url(/assets/values-image.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <Box sx={{ p: 2 }}>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 0, color: "#0a2239" }}>
                  OUR VALUES
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We value <span style={{ color: "#ffbb00", fontWeight: 700 }}>productivity</span>, act with{" "}
                  <span style={{ color: "#ffbb00", fontWeight: 700 }}>integrity</span>, and lead with{" "}
                  <span style={{ color: "#ffbb00", fontWeight: 700 }}>care</span>, ensuring efficient, ethical, and compassionate
                  solutions in every interaction.
                </Typography>
              </Box>
            </VisionMissionCard>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default AboutUs
