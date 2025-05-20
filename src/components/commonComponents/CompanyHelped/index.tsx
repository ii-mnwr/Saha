import { Box, Container, Divider, Typography } from "@mui/material"
import { companyLogo } from "src/utils/constData"

const CompanyHelped = () => (
  <Box
    sx={{
      backgroundColor: "#FFFFFF",
      paddingY: 6,
      width: "100%",
    }}
  >
  <Divider sx={{ marginBottom: 4, borderWidth: 1.1 }} />
    <Container maxWidth="lg">

      <Typography
        fontFamily="Work Sans, sans-serif"
        fontSize={{ xs: "1.25em", md: "1.5em", lg: "1.5em", xl: "1.5em" }}
        fontWeight={600}
        color="#162144"
        textAlign="center"
        marginBottom={6}
      >
        OUR ASSOSIATES
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: { xs: 4, md: 2, lg: 2, xl: 2 },
        }}
      >
        {companyLogo.map((itemLogo, index) => (
          <Box
            key={index}
            sx={{
              flex: { xs: "1 0 40%", sm: "1 0 20%", md: "0 1 auto", lg: "0 1 auto", xl: "0 1 auto" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <img
              src={itemLogo || "/placeholder.svg"}
              alt={`Company logo ${index + 1}`}
              style={{
                height: 100,
                width: 160,
                objectFit: "contain",
              }}
            />
          </Box>
        ))}
      </Box>
    </Container>
  <Divider sx={{ marginTop: 6, borderWidth: 1.1 }} />
  </Box>
)

export default CompanyHelped