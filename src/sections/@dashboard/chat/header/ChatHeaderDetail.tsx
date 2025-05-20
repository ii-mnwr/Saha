"use client"

// @mui
import { Stack, Box, Link, Typography, IconButton, useMediaQuery, type Theme } from "@mui/material"
// utils
import { fToNow } from "../../../../utils/formatTime"
// @types
import type { IChatParticipant } from "../../../../@types/chat"
// components
import Iconify from "../../../../components/iconify"
import BadgeStatus from "../../../../components/badge-status"
import { CustomAvatar, CustomAvatarGroup } from "../../../../components/custom-avatar"

// ----------------------------------------------------------------------

type Props = {
  participants: IChatParticipant[]
  onMenuClick?: () => void
}

export default function ChatHeaderDetail({ participants, onMenuClick }: Props) {
  const isGroup = participants.length > 1
  const participantInfo = participants.length ? participants[0] : null
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"))

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        p: (theme) => theme.spacing(2, 1, 2, 2), // Adjusted padding
        backgroundColor: "#F2F2F2",
        borderBottom: "1px solid #DDDDDD",
        position: 'relative', // Added for absolute positioning
      }}
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
        flexGrow={1} 
        direction="row" 
        alignItems="center"
        sx={{
          marginLeft: isMobile ? '48px' : 0, // Offset for menu button
        }}
      >
        {isGroup ? (
          <>
            <CustomAvatarGroup max={3}>
              {participants.map((participant) => (
                <CustomAvatar key={participant.id} alt={participant.name} src={participant.avatar} />
              ))}
            </CustomAvatarGroup>

            <Link
              variant="body2"
              sx={{
                mt: 0.5,
                alignItems: "center",
                display: "inline-flex",
                color: "text.secondary",
              }}
            >
              {participants.length} persons
              <Iconify icon="eva:arrow-ios-forward-fill" width={16} />
            </Link>
          </>
        ) : (
          <>
            <CustomAvatar
              src={participantInfo?.avatar}
              alt={participantInfo?.name}
              BadgeProps={{
                badgeContent: <BadgeStatus status={participantInfo?.status} />,
              }}
              sx={{ width: { xs: 36, sm: 40 }, height: { xs: 36, sm: 40 } }}
            />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                {participantInfo?.name}
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary", fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                {participantInfo?.status === "offline" ? (
                  participantInfo?.lastActivity && fToNow(participantInfo?.lastActivity)
                ) : (
                  <Box component="span" sx={{ textTransform: "capitalize" }}>
                    {participantInfo?.status}
                  </Box>
                )}
              </Typography>
            </Box>
          </>
        )}
      </Stack>

      <IconButton sx={{ color: "#666666" }}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    </Stack>
  )
}