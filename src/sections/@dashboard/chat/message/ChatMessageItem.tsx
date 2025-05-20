"use client"

import { formatDistanceToNowStrict } from "date-fns"
// @mui
import { Typography, Stack, useMediaQuery, type Theme } from "@mui/material"
// @types
import { useAuthContext } from "src/auth/useAuthContext"
// components
import Image from "../../../../components/image"
import { CustomAvatar } from "../../../../components/custom-avatar"

// ----------------------------------------------------------------------

const CURRENT_USER_ID = "8864c717-587d-472a-929a-8e5f298024da-0"

type Props = {
  message: any
  conversation: any
  onOpenLightbox: (value: string) => void
}

export default function ChatMessageItem({ message, conversation, onOpenLightbox }: Props) {
  const { user } = useAuthContext()
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))

  const sender = conversation?.find((participant: any) => participant?.id === message?.sender_id)

  const senderDetails =
    (message?.sender_id || user?.employee_id) === (user?.employee_id || user?.candidate_id || user?.id)
      ? {
          type: "me",
          name: user?.user_name || "You",
        }
      : {
          type: "other",
          avatar: sender?.avatar,
          name: sender?.name || "User",
        }

  const currentUser = senderDetails.type === "me"

  const isImage = message.contentType === "image"

  // Get first letter of name for avatar fallback
  const getFirstLetter = (name: string) => (name && name.length > 0 ? name.charAt(0).toUpperCase() : "U")

  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent={currentUser ? "flex-end" : "flex-start"}
      sx={{ mb: 1.5, px: { xs: 0.5, sm: 1 } }} // Responsive padding
    >
      {/* Show avatar for receiver on the left */}
      {!currentUser && (
        <CustomAvatar
          alt={senderDetails.name}
          src={senderDetails.avatar}
          sx={{
            width: { xs: 20, sm: 24 }, // Responsive size
            height: { xs: 20, sm: 24 }, // Responsive size
            alignSelf: "flex-end",
            mb: 0.5,
            bgcolor: "#D9D9D9",
            color: "#333333",
            fontSize: { xs: "0.65rem", sm: "0.75rem" }, // Responsive font size
          }}
        >
          {getFirstLetter(senderDetails.name)}
        </CustomAvatar>
      )}

      <Stack spacing={0.5} sx={{ maxWidth: { xs: "85%", sm: "75%" } }}>
        {" "}
        {/* Wider on mobile */}
        <Stack
          sx={{
            p: { xs: 1, sm: 1.25 }, // Responsive padding
            minWidth: 48,
            maxWidth: "100%",
            borderRadius: 2,
            overflow: "hidden",
            typography: "body2",
            fontSize: { xs: "0.8rem", sm: "0.875rem" }, // Responsive font size
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            bgcolor: currentUser ? "#718EBF" : "#D9D9D9",
            color: currentUser ? "#FFFFFF" : "#333333",
            ...(isImage && {
              p: 0,
            }),
          }}
        >
          {isImage ? (
            <Image
              alt="attachment"
              src={message.body || "/placeholder.svg"}
              onClick={() => onOpenLightbox(message.body)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  opacity: 0.9,
                },
              }}
            />
          ) : (
            <pre
              style={{
                margin: 0,
                maxWidth: "100%",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                fontFamily: "inherit",
                fontSize: isMobile ? "0.8rem" : "0.875rem", // Responsive font size
              }}
            >
              {message.content}
            </pre>
          )}
        </Stack>
        <Typography
          variant="caption"
          sx={{
            color: "text.disabled",
            fontSize: { xs: "0.6rem", sm: "0.65rem" }, // Responsive font size
            textAlign: currentUser ? "right" : "left",
          }}
        >
          {formatDistanceToNowStrict(new Date(message?.createdAt), {
            addSuffix: false,
          })}
        </Typography>
      </Stack>

      {/* Show avatar for sender on the right */}
      {currentUser && (
        <CustomAvatar
          alt={senderDetails.name}
          src={user?.photoURL}
          sx={{
            width: { xs: 20, sm: 24 }, // Responsive size
            height: { xs: 20, sm: 24 }, // Responsive size
            alignSelf: "flex-end",
            mb: 0.5,
            bgcolor: "#718EBF",
            color: "#FFFFFF",
            fontSize: { xs: "0.65rem", sm: "0.75rem" }, // Responsive font size
          }}
        >
          {getFirstLetter(senderDetails.name)}
        </CustomAvatar>
      )}
    </Stack>
  )
}
