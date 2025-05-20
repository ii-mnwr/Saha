"use client"

import { Box, Button, Stack, Typography, Card } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAuthContext } from "src/auth/useAuthContext"
import { useSettingsContext } from "../settings"
import StarIcon from "@mui/icons-material/Star"
import LocationIcon from "@mui/icons-material/LocationOn"
import DownloadIcon from "@mui/icons-material/Download"
import { LoadingButton } from "@mui/lab"
import BookmarkIconBold from "@mui/icons-material/Bookmark"

// Array of company names to display in the listings
const company = ["Company", "Company", "Company"]

/**
 * CategoryCompo - Component to display category information and company listings
 * @param {Object} props - Component props
 * @param {string} props.category - The category name to display
 */
const CategoryCompo = (props: any) => {
  const { category } = props
  const router = useRouter()

  // List of all available categories with their associated images
  const categoryList = [
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
  ]

  // Get theme settings from context
  const { themeStretch } = useSettingsContext()
  // Get user information from auth context
  const { user } = useAuthContext()
  // State to store the current category data
  const [categoryData, setCategoryData] = useState<any>()

  // Effect to find and set the current category data when the category prop changes
  useEffect(() => {
    // Find the category data that matches the provided category name or default to 'Healthcare & Medical'
    const data = categoryList.find((data) => data.label === (category ?? "Healthcare & Medical"))
    setCategoryData(data)
  }, [category])

  // Style to ensure the component is isolated from background elements
  // const isolationStyle = {
  //   position: "relative",
  //   zIndex: 1,
  //   backgroundColor: "#FFFFFF",
  //   isolation: "isolate",
  // }

  return (
    <Box width="100%" display="flex" flexDirection="column">
      {/*
       * Header Banner - Split design with half color, half picture
       * Left side: Colored background with category title
       * Right side: Category image
       */}
      <Box
        sx={{
          display: "flex",
          borderRadius: 0,
          overflow: "hidden",
          mb: 4,
          paddingTop: { xs: 0, md: 10 },
          paddingRight: { xs: 0, md: 10 },
          paddingLeft: { xs: 0, md: 10 },
          height: 500,
        }}
      >
        {/* Left half - Colored background with title */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            p: 6,
            backgroundColor: categoryData?.bgColor,
          }}
        >
          <Typography
            color="#000000"
            fontFamily="Work Sans,sans-serif"
            fontSize={{ xs: 36, md: 48 }}
            fontWeight={700}
            lineHeight={1.2}
          >
            {/* Display 'Healthcare & Medicine' for healthcare categories, otherwise use the provided category name */}
            {category === "Healthcare & Medical" || category === "Healthcare"
              ? "Healthcare & Medicine"
              : (category ?? "Category Name")}
          </Typography>
        </Box>
        {/* Right half - Category image */}
        <Box
          component="img"
          src={`/assets/${categoryData?.img}`}
          sx={{
            width: { xs: "60%", md: "50%" },
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>


      {/* Main content card containing category image and company listings */}
      <Card sx={{ mx: { xs: 2, md: 10 }, padding: 3 }}>
        {/* Full-width category image */}

        {/* Top Companies Hiring section title */}
        <Typography
          color="#000"
          fontFamily="Work Sans,sans-serif"
          fontSize={{ xs: 22, md: 24 }}
          fontWeight={700}
          sx={{ my: 2 }}
        >
          Top Companies Hiring
        </Typography>

        {/* Stack of company cards */}
        <Stack spacing={3}>
          {/* Generate 3 company cards */}
          {[...Array(3)].map((_, index) => (
            <Card
              key={index}
              sx={{
                px: 3,
                width: { xs: "100%", md: "100%" },
                backgroundColor: "#Fefefe",
                border: "1px solid #6D88C24D",
              }}
            >
              <Stack spacing={1}>
                {/* Company header with logo, name, rating, and action buttons */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flexDirection={{ xs: "column", md: "row" }} // Stack vertically on mobile, horizontally on desktop
                  alignItems="baseline"
                  width="100%"
                  gap={{ xs: 1, xl: 3 }}
                >
                  {/* Left section with company logo and details */}
                  <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
                    {/* Company logo */}
                    <Box
                      component="img"
                      src={`/assets/company_logo_${index + 1}.png`}
                      alt="Company Image"
                      sx={{
                        py: 2,
                        borderRadius: 2,
                        width: 130,
                        height: 125,
                        objectFit: "contain",
                      }}
                    />

                    {/* Company details section */}
                    <Box
                      display="flex"
                      justifyContent="flex-start"
                      width={{ xs: "100%", xl: "45vw" }}
                      flexDirection="column"
                      gap={1}
                    >
                      {/* Company name */}
                      <Typography
                        color="#000"
                        fontFamily="Work Sans,sans-serif"
                        py={1}
                        fontSize={{ xs: 20, xl: 24 }}
                        fontWeight={600}
                      >
                        {company?.[index]}
                      </Typography>

                      {/* Company rating */}
                      {/* <Box display="flex">
                        <Typography color="#00BFA7" fontFamily="Work Sans,sans-serif" fontSize={20} fontWeight={400}>
                          4.2
                        </Typography>
                        <Box color="#00BFA7" sx={{ paddingLeft: 0.5 }}>
                          <StarIcon style={{ width: "15px", height: "15px" }} />
                        </Box>
                      </Box> */}

                      {/* Company metadata - Location, Size, Industry */}
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        flexDirection={{ xs: "column", md: "row" }}
                        width="100%"
                        gap={{ xs: 2, md: 2, xl: 5 }}
                      >
                        {/* Location information */}
                        <Box display="flex" justifyContent="flex-start" width="100%" flexDirection="column">
                          <Box display="flex" gap={1} alignItems="center">
                            <LocationIcon />
                            <Typography
                              color="#00000"
                              fontFamily="Work Sans,sans-serif"
                              fontSize={{ xs: 16, xl: 18 }}
                              fontWeight={500}
                            >
                              Location
                            </Typography>
                          </Box>
                          <Typography
                            color="#00000"
                            fontFamily="Work Sans,sans-serif"
                            fontSize={{ xs: 14, xl: 18 }}
                            fontWeight={300}
                            sx={{ paddingLeft: { xl: 3 } }}
                          >
                            India
                          </Typography>
                        </Box>

                        {/* Company size information */}
                        <Box display="flex" justifyContent="flex-start" width="100%" flexDirection="column">
                          <Typography
                            color="#00000"
                            fontFamily="Work Sans,sans-serif"
                            fontSize={{ xs: 16, xl: 18 }}
                            fontWeight={700}
                          >
                            Global Company Size
                          </Typography>
                          <Typography
                            color="#00000"
                            fontFamily="Work Sans,sans-serif"
                            fontSize={{ xs: 14, xl: 18 }}
                            fontWeight={500}
                          >
                            10000+ employees
                          </Typography>
                        </Box>

                        {/* Industry information */}
                        <Box display="flex" justifyContent="flex-start" width="100%" flexDirection="column">
                          <Typography
                            color="#00000"
                            fontFamily="Work Sans,sans-serif"
                            fontSize={{ xs: 16, xl: 18 }}
                            fontWeight={600}
                          >
                            Industry
                          </Typography>
                          <Typography
                            color="#00000"
                            fontFamily="Work Sans,sans-serif"
                            fontSize={{ xs: 14, xl: 18 }}
                            fontWeight={500}
                          >
                            {category}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Stack>
            </Card>
          ))}
        </Stack>

        {/* View more button - redirects to login page */}
        <Box display="flex" justifyContent="flex-end" alignItems="center" width="100%">
          <Button
            sx={{
              mt: 2,
              marginRight: 2,
              backgroundColor: "#0a2239",
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              padding: "8px 16px",
              borderRadius: 1,
              border: "1px solid #6D88C24D",
              "&:hover": {
                backgroundColor: "#F9F9F9",
                color: "#000",
                border: "1px solid #6D88C24D",
              },
            }}
            onClick={() => router.push("/login")}>View more</Button>
        </Box>
      </Card>
    </Box>
  )
}

export default CategoryCompo
