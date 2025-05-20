"use client"
// @mui
import {
  Stack,
  Typography,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  Box,
  useMediaQuery,
  type Theme,
} from "@mui/material"
// @types
import type { IChatConversation } from "../../../../@types/chat"
// components
import { CustomAvatar, CustomAvatarGroup } from "../../../../components/custom-avatar"
import Iconify from "../../../../components/iconify"

// ----------------------------------------------------------------------

const CURRENT_USER_ID = "8864c717-587d-472a-929a-8e5f298024da-0"

type Props = {
  conversation: IChatConversation
  openNav: boolean
  isSelected: boolean
  onSelect: VoidFunction
  roomData: any
}

export default function ChatNavItem({ conversation, openNav, isSelected, onSelect, roomData }: Props) {
  const details = getDetails(conversation, CURRENT_USER_ID)
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"))

  const lastActivity = conversation?.messages?.[conversation.messages.length - 1]?.createdAt || conversation?.updatedAt

  const isGroup = details.otherParticipants?.length > 1

  const isUnread = conversation.unreadCount > 0

  const hasOnlineInGroup = isGroup && details.otherParticipants.map((item) => item.status).includes("online")

  // Format time to show only hours and minutes (10:35 AM)
  const formatTime = (date: Date | string | undefined) => {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true })
  }

  return (
    <ListItemButton
      disableGutters
      onClick={onSelect}
      sx={{
        py: 0.75, // Reduced padding to make items more compact
        px: 2,
        borderRadius: 0,
        mb: 0.5,
        ...(isSelected && {
          bgcolor: "rgba(0, 0, 0, 0.04)",
        }),
      }}
    >
      <ListItemAvatar>
        {isGroup ? (
          <CustomAvatarGroup compact sx={{ width: 40, height: 40 }}>
            {details.otherParticipants.slice(0, 2).map((participant) => (
              <CustomAvatar key={participant.id} alt={participant.name} src={participant.avatar} />
            ))}
          </CustomAvatarGroup>
        ) : (
          <CustomAvatar
            key={conversation?.id}
            alt={conversation?.User?.user_name || conversation?.user_name}
            src={details.otherParticipants?.[0]?.avatar}
            name={conversation?.user_name || conversation?.User?.user_name}
            sx={{ width: 40, height: 40, bgcolor: "#CCCCCC" }}
          />
        )}
      </ListItemAvatar>

      {/* Always show text content on mobile */}
      <ListItemText
        primary={
          <Typography
            variant="subtitle2"
            sx={{
              color: "#4A90E2",
              fontWeight: 500,
              fontSize: "0.9rem", // Smaller font size
            }}
          >
            {conversation?.user_name || conversation?.User?.user_name}
          </Typography>
        }
        secondary={details.displayText}
        secondaryTypographyProps={{
          noWrap: true,
          variant: isUnread ? "subtitle2" : "body2",
          color: isUnread ? "text.primary" : "text.secondary",
          fontSize: "0.7rem", // Smaller font size
        }}
        sx={{ mr: 1 }}
      />

      <Stack alignItems="flex-end" sx={{ ml: "auto", height: 36 }}>
        {" "}
        {/* Reduced height */}
        <Typography
          noWrap
          variant="body2"
          component="span"
          sx={{
            mb: 0.5, // Reduced margin
            fontSize: "0.7rem", // Smaller font size
            color: "text.disabled",
          }}
        >
          {formatTime(lastActivity)}
        </Typography>
        {isUnread ? (
          <Box
            sx={{
              width: 18, // Smaller size
              height: 18, // Smaller size
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              bgcolor: "#4A90E2",
              color: "white",
              fontSize: "0.7rem", // Smaller font size
            }}
          >
            {conversation.unreadCount}
          </Box>
        ) : (
          <Iconify
            icon="eva:checkmark-fill"
            sx={{
              color: "#4A90E2",
              width: 18, // Smaller size
              height: 18, // Smaller size
            }}
          />
        )}
      </Stack>
    </ListItemButton>
  )
}

// ----------------------------------------------------------------------

const getDetails = (conversation: IChatConversation, currentUserId: string) => {
  const otherParticipants = conversation?.participants?.filter((participant) => participant?.id !== currentUserId) || []

  const displayNames = otherParticipants?.map((participant) => participant?.name)?.join(", ") || ""

  let displayText = ""

  const lastMessage = conversation?.messages?.[conversation?.messages?.length - 1]
  if (lastMessage) {
    const sender = lastMessage.senderId === currentUserId ? "You: " : ""

    const message = lastMessage.contentType === "image" ? "Sent a photo" : lastMessage.body

    displayText = `${sender}${message}`
  }
  return { otherParticipants, displayNames, displayText }
}
