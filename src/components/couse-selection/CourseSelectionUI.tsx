"use client"
import { Grid, Button, Typography, Card, CardContent, Box, Breadcrumbs, Link } from "@mui/material"
import { useRouter } from "next/router"
import BiotechIcon from "@mui/icons-material/Biotech"
import Groups3Icon from "@mui/icons-material/Groups3"
import WidgetsIcon from "@mui/icons-material/Widgets"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"

function CourseSelectionUI() {
  const { push } = useRouter()

  return (
    <Box sx={{ bgcolor: "#f0f0f0", p: 3 }}>
      {/* Main heading with breadcrumbs */}
      <Box sx={{ mb: 4 }}>
      </Box>

      {/* Certificate download section */}
      <Card
        elevation={1}
        sx={{
          mb: 4,
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              bgcolor: "#f8f8f8",
              borderRadius: "50%",
              width: 60,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #FFBB00",
              color: "#0A2647",
            }}
          >
            <EmojiEventsIcon sx={{ fontSize: 32 }} />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Work Sans,sans-serif",
              fontSize: { xs: 20, md: 24 },
              fontWeight: 600,
              color: "#0A2647",
            }}
          >
            Download your certificate
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#0A2647",
            color: "white",
            px: 3,
            py: 1,
            borderRadius: 1,
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              bgcolor: "#144272",
            },
          }}
          onClick={() => push("/contact-us")}
        >
          Download now
        </Button>
      </Card>

      {/* Find courses section */}
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Work Sans,sans-serif",
          fontSize: 20,
          fontWeight: 600,
          color: "#0A2647",
          mb: 3,
        }}
      >
        Find courses to upskill and get certificates
      </Typography>

      <Grid container spacing={3}>
        {/* Management Card */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 1,
              boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                <Groups3Icon
                  sx={{
                    fontSize: 64,
                    color: "#0A2647",
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "Work Sans,sans-serif",
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#0A2647",
                    textTransform: "uppercase",
                  }}
                >
                  Management
                </Typography>
              </Box>
              <Box>
                {[
                  "Anger Management",
                  "HR management skills (Basics)",
                  "Effective Communication skills",
                  "Business Writing Skills",
                  "Train the trainee",
                  "Customer service skills",
                ].map((course, index) => (
                  <Typography
                    key={index}
                    sx={{
                      fontFamily: "Work Sans,sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#333",
                      mb: 1.5,
                    }}
                  >
                    {course}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Technology Card */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 1,
              boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                <BiotechIcon
                  sx={{
                    fontSize: 64,
                    color: "#0A2647",
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "Work Sans,sans-serif",
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#0A2647",
                    textTransform: "uppercase",
                  }}
                >
                  Technology
                </Typography>
              </Box>
              <Box>
                {["Data Analyst", "Cyber security analyst", "Data science", "Database administrator", "Python"].map(
                  (course, index) => (
                    <Typography
                      key={index}
                      sx={{
                        fontFamily: "Work Sans,sans-serif",
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#333",
                        mb: 1.5,
                      }}
                    >
                      {course}
                    </Typography>
                  ),
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Others Card */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 1,
              boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                <WidgetsIcon
                  sx={{
                    fontSize: 64,
                    color: "#0A2647",
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "Work Sans,sans-serif",
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#0A2647",
                    textTransform: "uppercase",
                  }}
                >
                  Others
                </Typography>
              </Box>
              <Box>
                {["CHRM", "CHRP", "Microsoft", "CISCO", "AWS Practice", "PMP", "HRCI", "SHRM"].map((course, index) => (
                  <Typography
                    key={index}
                    sx={{
                      fontFamily: "Work Sans,sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#333",
                      mb: 1.5,
                    }}
                  >
                    {course}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CourseSelectionUI
