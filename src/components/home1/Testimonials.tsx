"use client"

import { useState } from "react"
import { Avatar, Box, IconButton, Rating, Typography } from "@mui/material"
import { userInfo } from "src/utils/constData"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % userInfo.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + userInfo.length) % userInfo.length)
  }

  const currentTestimonial = userInfo[currentIndex]

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingY: 5,
        paddingX: { xs: 2, md: 8, lg: 8, xl: 8 },
        background: "#FFF",
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.5em", md: "2.2em", lg: "2.2em", xl: "2.2em" },
          fontFamily: "Work Sans, sans-serif",
          color: "#162144",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 5,
        }}
      >
        Testimonial Forsta
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 4,
        }}
      >
        <Rating
          value={currentTestimonial?.rating || 5}
          readOnly
          size="large"
          precision={0.5}
          sx={{
            "& .MuiRating-iconFilled": {
              color: "#F8B84E",
            },
            fontSize: "32px",
          }}
        />
      </Box>

      <Box
        sx={{
          maxWidth: "900px",
          textAlign: "center",
          marginBottom: 6,
        }}
      >
        <Typography
          fontWeight={600}
          fontSize={{ xs: "18px", md: "22px", lg: "22px", xl: "22px" }}
          color="#000"
          fontFamily="Work Sans	, sans-serif"
          lineHeight={1.6}
          sx={{
            position: "relative",
            padding: "0 10px",
          }}
        >
          "
          {currentTestimonial?.description}
          "
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 5,
          flexWrap: { xs: "wrap", md: "nowrap" },
          gap: { xs: 2, md: 0 },
        }}
      >
        <Avatar
          src={currentTestimonial?.image || ""}
          alt={currentTestimonial?.name || "User"} 
          sx={{
            width: 80,
            height: 80,
            marginRight: 2,
            bgcolor: "#E5E5E5",
          }}
        />
        <Box sx={{ marginRight: 3 }}>
          <Typography fontWeight={600} fontSize={18} color="#000" fontFamily="Work Sans, sans-serif">
            {currentTestimonial?.name}
          </Typography>
          <Typography fontWeight={400} fontSize={14} color="#666" fontFamily="Work Sans, sans-serif">
            {currentTestimonial?.position}
          </Typography>
        </Box>
        <Box
          sx={{
            borderLeft: "2px solid #DDD",
            height: "60px",
            marginRight: 3,
          }}
        />
        <Box>
          {/* Company logo or icon */}
            <img 
            src="https://cdn.prod.website-files.com/64fb76b7b2949a3b510a9e23/651319d3c869b843470fd456_Full_Logo_Black.svg" 
            alt="Webflow Logo" 
            style={{ maxWidth: "100px", height: "auto" }} 
            />
        </Box>
      </Box>

      {/* Pagination dots */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 4,
        }}
      >
        {userInfo.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: index === currentIndex ? "#162144" : "#DDD",
              margin: "0 4px",
              cursor: "pointer",
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Box>

      {/* Navigation buttons */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <IconButton
          onClick={handlePrev}
          sx={{
            border: "1px solid #162144",
            borderRadius: "50%",
            padding: 1.5,
            "&:hover": {
              backgroundColor: "#F5F5F5",
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            border: "1px solid #162144",
            borderRadius: "50%",
            padding: 1.5,
            "&:hover": {
              backgroundColor: "#F5F5F5",
            },
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Testimonials