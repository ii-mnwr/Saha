"use client"
import { Box, Typography, Paper } from "@mui/material"
import { useRouter } from "next/router"

// Cube icon SVG component
const CubeIcon = () => (
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 512 512"
      fill="none"
  >
      <g
          transform="translate(0,512) scale(0.1,-0.1)"
          fill="black"
          stroke="none"
      >
          <path d="M2504 4980 c-18 -7 -1800 -1155 -1861 -1199 -13 -9 -32 -34 -43 -57 -20 -40 -20 -58 -20 -1155 0 -700 4 -1127 10 -1149 5 -20 24 -50 42 -67 39 -36 1829 -1193 1876 -1212 73 -30 57 -39 1040 597 510 330 937 611 950 625 12 13 27 39 32 58 6 21 10 453 10 1148 0 1092 0 1116 -20 1155 -11 23 -34 51 -52 63 -18 12 -444 287 -947 612 -838 542 -918 591 -955 590 -23 0 -50 -4 -62 -9z m834 -821 c419 -270 762 -495 762 -499 0 -11 -1523 -994 -1540 -994 -21 0 -1541 985 -1538 996 5 15 1532 998 1544 994 6 -2 354 -226 772 -497z m902 -1696 l0 -918 -751 -485 c-413 -267 -757 -489 -765 -493 -12 -7 -14 122 -14 911 l0 918 762 492 c419 271 763 492 765 492 1 0 3 -413 3 -917z" />
      </g>
  </svg>
)

type DropdownItemType = {
  title: string
  path: string
}

type NavDropdownProps = {
  title: string
  items: DropdownItemType[]
  onClose: () => void
}

const NavDropdown = ({ items, onClose }: NavDropdownProps) => {
  const router = useRouter()

  const handleItemClick = (path: string) => {
    router.push(path)
    onClose()
  }

  return (
    <Box onMouseLeave={onClose}>
      <Paper
        elevation={1}
        sx={{
          position: "absolute",
          top: "calc(100% + 8px)",
          left: 0,
          width: "200px",
          borderRadius: "6px",
          overflow: "hidden",
          zIndex: 1000,
        }}
      >
        <Box sx={{ py: 1 }}>
          {items.map((item) => (
            <Box
              key={item.title}
              onClick={() => handleItemClick(item.path)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 1.5,
                cursor: "pointer",
                transition: "background-color 0.2s",
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <Box sx={{ color: "text.secondary", display: "flex" }}>
                <CubeIcon />
              </Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                {item.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  )
}

export default NavDropdown