import { noCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Box,
  Stack,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
// utils
import { NotificationIcon } from 'src/theme/overrides/CustomIcons';
import { socket } from 'src/socket';
import { useSnackbar } from 'src/components/snackbar';

import { useAuthContext } from 'src/auth/useAuthContext';
import usePostRequest from 'src/hooks/usePost';
import { useSettingsContext } from 'src/components/settings';
import { fToNow } from '../../../utils/formatTime';
// _mock_
import { _notifications } from '../../../_mock/arrays';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import MenuPopover from '../../../components/menu-popover';
import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const { enqueueSnackbar } = useSnackbar();

  const [notifications, setNotifications] = useState(_notifications);

  const { resetNotificationApi: resetApi, setResetNotificationApi: setResetApi } =
    useSettingsContext();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  const getNotificationList = usePostRequest();

  const getNotificationListAPI = () => {
    const url = '/notifications/list';

    getNotificationList.mutate(
      [
        url,
        {
          limit: 20,
          page: 1,
          sort: 'id:desc',
        },
      ],
      {
        onSuccess: (response: any) => {},
        onError: (error: any) => {},
      }
    );
  };

  const deleteNotification = usePostRequest();

  const deleteNotificationAPI = () => {
    const url = '/notifications/delete';

    deleteNotification.mutate(
      [
        url,
        {
          notification_ids: [],
        },
      ],
      {
        onSuccess: (response: any) => {
          // enqueueSnackbar(response?.message || '', {
          //   variant: 'success',
          // });
          setResetApi((data) => !data);
        },
        onError: (error: any) => {},
      }
    );
  };

  useEffect(() => {
    getNotificationListAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetApi]);

  // console.log('getNotificationList', getNotificationList?.data?.data);

  return (
    <>
      <IconButtonAnimate
        color={openPopover ? 'primary' : 'default'}
        onClick={handleOpenPopover}
        sx={{ width: 40, height: 40 }}
      >
        <NotificationIcon />
        {/* <Badge color="error" variant="dot">
        </Badge> */}
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 360, p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="subtitle1"
              textAlign={getNotificationList?.data?.data?.length > 0 ? 'start' : 'center'}
            >
              {getNotificationList?.data?.data?.length > 0 ? 'Notifications' : 'All caught up!'}
            </Typography>

            {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography> */}
          </Box>
          {/* 
          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )} */}
          {getNotificationList?.data?.data?.length > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={deleteNotificationAPI}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          {/* <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {notifications.slice(0, 2).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List> */}

          <List
            disablePadding
            // subheader={
            //   <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
            //     Before that
            //   </ListSubheader>
            // }
          >
            {getNotificationList?.data?.data?.map((notification: any) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

        {/* <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box> */}
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

type NotificationItemProps = {
  id: string;
  title: string;
  description: string;
  avatar: string | null;
  type: string;
  createdAt: Date;
  isUnRead: boolean;
};

function NotificationItem({ notification }: { notification: NotificationItemProps }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>

      <ListItemText
        disableTypography
        primary={title}
        secondary={
          <Stack direction="row" sx={{ mt: 0.5, typography: 'caption', color: 'text.disabled' }}>
            <Iconify icon="eva:clock-fill" width={16} sx={{ mr: 0.5 }} />
            <Typography variant="caption">{fToNow(notification.createdAt)}</Typography>
          </Stack>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification: any) {
  const title = (
    <Typography variant="subtitle2">
      {notification?.message}
      {/* <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.description)}
      </Typography> */}
    </Typography>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/notification/ic_package.svg" />,
      title,
    };
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/notification/ic_shipping.svg" />,
      title,
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/notification/ic_mail.svg" />,
      title,
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/notification/ic_chat.svg" />,
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
  };
}
