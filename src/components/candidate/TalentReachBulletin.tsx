import {
  Box,
  Card,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import { cardDimensions } from 'src/theme/cardDimensions';

const TalentReachBulletinCard = ({ isCandidateDash = false, executeScroll = () => {} }) => {
  const { push } = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const bulletinItems = [
    {
      text: "Check our recently updated jobs",
      action: () => push(isCandidateDash ? '/candidate/jobs/search-jobs/' : '/jobs/search-jobs')
    },
    {
      text: "Today's walk-in interviews update",
      action: () => push(isCandidateDash ? '/candidate/jobs/walk-in-interviews' : '/jobs/walk-in-interviews')
    },
    {
      text: "Latest course published: Data Analytics",
      action: () => push(isCandidateDash ? '/candidate/services/certification/' : '/services/certification')
    },
    {
      text: "Aptitude questions to prepare for job interviews",
      action: () => push(isCandidateDash ? '/candidate/resources/aptitude' : '/resources/aptitude')
    },
    {
      text: "Challenge of the week is active",
      action: () => isCandidateDash ? executeScroll() : push('/challenges')
    },
    {
      text: "Learn with our career articles",
      action: () => push('/resources/articles')
    },
    {
      text: "Where do you see yourself: Check with our assessments",
      action: () => push('/assessments')
    }
  ];

  return (
    <Card sx={{ 
      p: isMobile ? cardDimensions.padding.mobile : cardDimensions.padding.desktop,
      borderRadius: 2,
      height: isMobile ? cardDimensions.height.mobile : cardDimensions.height.desktop,
      minHeight: isMobile ? cardDimensions.height.mobile : undefined,
      mt: 2,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box width="100%" display="flex" justifyContent="center">
          <Typography 
            variant={isMobile ? 'subtitle1' : 'h6'} 
            fontWeight={600} 
            color="#FFBB00"
            sx={{ 
              mt: isMobile ? 0 : -1,
              fontSize: isMobile ? '1rem' : '1.25rem',
            }}
          >
            Talents Reach Bulletin
          </Typography>
        </Box>
      </Box>
    
      {/* Content area */}
      <Box sx={{
        flex: 1,
        overflow: 'hidden',
        position: 'relative',
        height: isMobile ? cardDimensions.contentHeight.mobile : cardDimensions.contentHeight.desktop,
        '&:hover .scroll-content': {
          animationPlayState: 'paused'
        }
      }}>
        <Box className="scroll-content" sx={{
          position: 'absolute',
          width: '100%',
          animation: 'scroll 60s linear infinite',
          '@keyframes scroll': {
            '0%': { transform: 'translateY(0%)' },
            '100%': { transform: 'translateY(-100%)' }
          }
        }}>
          <List dense>
            {[...bulletinItems, ...bulletinItems].map((item, index) => (
              <ListItem key={index} sx={{ py: 1 }}>
                <ListItemIcon sx={{ minWidth: 10, fontWeight: 600 }}>
                  <Typography>•</Typography>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography 
                      variant={isMobile ? 'body2' : 'body1'}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          color: 'primary.main'
                        }
                      }}
                      onClick={item.action}
                    >
                      {item.text}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Card>
  );
};

export default TalentReachBulletinCard;