import { Box, Grid, Paper, Typography } from "@mui/material"
import { cardArr } from "src/utils/constData"

export const Achivements = () => (
  <Box
    sx={{
      paddingTop: 8,
      paddingBottom: 8,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      paddingX: { xs: 2, md: 8, lg: 12, xl: 12 },
      display: "flex",
      gap: 4,
      backgroundColor: "#0a1a2f", // Dark navy blue background
    }}
  >
    <Typography
      fontFamily="Work Sans, sans-serif"
      fontSize={{ xs: "2em", sm: "2.5em", md: "2.5em", lg: "2.5em", xl: "2.5em" }}
      fontWeight={700}
      color="#f5c33b" // Gold/yellow color
      textAlign="center"
      lineHeight={1.2}
      sx={{ maxWidth: "1000px" }}
    >
      At TalentsReach, you find infinite talents and boundless opportunities
    </Typography>

    <Typography
      fontFamily="Work Sans, sans-serif"
      fontSize={{ xs: "0.9em", sm: "1em", md: "1em", lg: "1em", xl: "1em" }}
      fontWeight={400}
      color="#fff"
      textAlign="center"
      sx={{ maxWidth: "900px", mb: 4 }}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce commodo nibh a sollicitudin laoreet. Etiam ut
      commodo arcu. Donec ornare fermentum ex nec ullamcorper. Vivamus neque magna, ornare quis dolor in, aliquam
      facilisis magna. Donec at velit a turpis ornare.
    </Typography>

    <Box sx={{ width: "100%", maxWidth: "1200px" }}>
      <Grid container spacing={3} justifyContent="center">
        {cardArr?.map((cardItem, index) => (
          <Grid item key={index} xs={12} sm={3} md={3} lg={3} xl={3}>
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                backgroundColor: "transparent",
                alignItems: "center",
                // paddingX: 2,
                paddingY: 1,
                flexDirection: "column",
                border: "1px solid #f5c33b", // Gold/yellow border
                borderRadius: "20px",
                height: "180px",
              }}
            >
              <Box sx={{ color: "white", fontSize: "2rem", mb: 1 }}>
                {/* Replace with the appropriate icon based on index */}
                {index === 0 && "💼"}
                {index === 1 && "📄"}
                {index === 2 && "👤"}
                {index === 3 && "🏢"}
              </Box>
              <Typography
                fontFamily="Work Sans, sans-serif"
                fontSize={{ xs: "2rem", md: "2rem", lg: "2rem", xl: "2rem" }}
                fontWeight={700}
                color="#f5c33b" // Gold/yellow color
                mb={1}
              >
                {cardItem?.val}
              </Typography>
              <Typography
                textAlign="center"
                fontFamily="Work Sans, sans-serif"
                fontSize={{ xs: "0.9rem", md: "1rem", lg: "1rem", xl: "1rem" }}
                fontWeight={400}
                color="#fff"
              >
                {cardItem?.text}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Box>
)
