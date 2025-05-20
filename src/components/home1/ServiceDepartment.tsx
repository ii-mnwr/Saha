"use client"

import { Box, Typography, keyframes, styled } from "@mui/material"
import { useState } from "react"
import { useRouter } from "next/router"

export const ServiceDepartment = () => {
  const { push } = useRouter()
  const [category, setCategory] = useState([
    {
      label: "Technology & Artificial Intelligence",
      img: "technology-ai.jpg",
      bgColor: "#C6DBF0", // Light blue
    },
    {
      label: "Aerospace and Defense",
      img: "aerospace-defence.jpg",
      bgColor: "#D6E2E9", // Light blue
    },
    {
      label: "Construction",
      img: "construction.jpg",
      bgColor: "#F9E5D8", // Light red/pink
    },
    {
      label: "Consulting",
      img: "consulting.jpg",
      bgColor: "#E3D5CA", // Light teal
    },
    {
      label: "Energy",
      img: "energy.jpg",
      bgColor: "#f2eadc", // Light orange
    },
    {
      label: "Finance",
      img: "finance.jpg",
      bgColor: "#e0e6dc", // Light green
    },
    {
      label: "Healthcare & Medical",
      img: "medical.jpg",
      bgColor: "#E9EDC9", // Light purple
    },
    {
      label: "Manufacturing",
      img: "manufacturing.jpg",
      bgColor: "#BDF9FB", // Light cyan
    },
    {
      label: "Real Estate",
      img: "real_estate.jpg",
      bgColor: "#f2dcdc", // Light salmon
    },
    {
      label: "Retail",
      img: "retail.jpg",
      bgColor: "#dcdcf2", // Light lavender
    },
  ])

  const totalWidth = 1500 * category.length

  const MarqueeBox = styled(Box)`
    display: flex;
    width: ${totalWidth}px;
    overflow: hidden;
    gap: 24px;
  `

  const marqueeLTRAnimation = keyframes`
    from { transform: translateX(-50%); }
    to { transform: translateX(0%); }
  `

  const MarqueeRTL = styled(MarqueeBox)`
    animation: ${marqueeLTRAnimation} 70s linear infinite;
  `

  const IndustryCard = styled(Box)`
    position: relative;
    width: 600px;
    height: 250px;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }
  `

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        paddingY: 4 , 
        paddingX: { xs: 2, md: 8, lg: 12, },
        background: "#fff",
      }}
    >
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: { xs: "2em", md: "2em", lg: "2em", xl: "2em" },
          fontFamily: "Work Sans, sans-serif",
          color: "#0a2239",
          marginBottom: 4,
          textTransform: "uppercase",
        }}
      >
        YOUR INDUSTRY,
        <br />
        OUR PLATFORM
      </Typography>

      <Box width="100%">
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <MarqueeRTL>
            {[...category, ...category].map((item, index) => (
              <IndustryCard
                key={index}
                onClick={() => {
                  push(`/category/${item?.label}`)
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    height: "100%",
                  }}
                >
                  {/* Left side with text */}
                  <Box
                    sx={{
                      width: "40%",
                      backgroundColor: item.bgColor,
                      padding: 4,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.6rem",
                        lineHeight: 1.2,
                        color: "#0a1a2f",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>

                  {/* Right side with image */}
                  <Box
                    sx={{
                      width: "60%",
                      backgroundImage: `url(/assets/${item?.img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </Box>
              </IndustryCard>
            ))}
          </MarqueeRTL>
        </Box>
      </Box>
    </Box>
  )
}
