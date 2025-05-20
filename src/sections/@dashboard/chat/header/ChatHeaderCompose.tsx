"use client"

// @mui
import { Typography, type StackProps, Stack, IconButton, useMediaQuery, type Theme } from "@mui/material"
// @types
import type { IChatParticipant } from "../../../../@types/chat"
// components
import Iconify from "../../../../components/iconify"
import { CustomAvatar } from "src/components/custom-avatar"

// ----------------------------------------------------------------------

interface Props extends StackProps {
  contacts: IChatParticipant[]
  recipients: IChatParticipant[]
  onAddRecipients: (data: IChatParticipant[]) => void
  activeChatId: any
  onMenuClick?: () => void
}

export default function ChatHeaderCompose({
  contacts,
  recipients,
  onAddRecipients,
  activeChatId,
  onMenuClick,
  sx,
  ...other
}: Props) {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"))

  return (
    <Stack
      spacing={1}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        py: 2,
        px: { xs: 1, sm: 2.5 }, // Adjusted padding for mobile
        backgroundColor: "#D9D9D9",
        borderBottom: "1px solid #DDDDDD",
        position: 'relative', // Added for absolute positioning
        ...sx,
      }}
      {...other}
    >
      {/* Hamburger menu for mobile */}
      {isMobile && (
        <IconButton
          onClick={onMenuClick}
          sx={{
            position: 'absolute',
            left: 8,
            zIndex: 1,
            width: 40,
            height: 40,
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#FFFFFF',
            }
          }}
        >
          <Iconify icon="eva:menu-2-fill" width={20} height={20} />
        </IconButton>
      )}

      <Stack 
        direction="row" 
        alignItems="center" 
        spacing={1}
        sx={{
          pl: isMobile ? '44px' : 0, // Offset for menu button
          width: '100%',
        }}
      >
        <CustomAvatar
          alt=""
          name={activeChatId?.user_name}
          src={`${process.env.NODE_ENV}/${activeChatId?.profile}`}
          sx={{ width: { xs: 36, sm: 40 }, height: { xs: 36, sm: 40 } }}
        />
        <Typography
          sx={{
            fontFamily: "Inter,sans-serif",
            fontWeight: 600,
            color: "#000000",
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          {activeChatId?.user_name}
        </Typography>
      </Stack>
    </Stack>
  )
}