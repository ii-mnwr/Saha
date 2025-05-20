import React from 'react';
import { Box, Typography, Button, IconButton, Chip, } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { format } from 'date-fns';
import { HOST_URL } from 'src/config-global';

/**
 * Unified JobCard component that works across different data structures
 * 
 * @param {Object} props
 * @param {Object} props.item - Job data object
 * @param {Function} props.onSaveJob - Function to handle save/unsave job
 * @param {Function} props.onCopyLink - Function to handle copying job link
 * @param {Function} props.onApply - Function to handle job application
 * @param {Function} props.setRefresh - Optional function to trigger page refresh
 */
interface JobCardProps {
  item: {
    id?: number;
    job_title?: string;
    title?: string;
    company?: { name?: string; profile_image_path?: string };
    company_name: string;
    job_type?: string;
    experience?: string;
    skills?: string;
    salary_from?: string;
    salary_to?: string;
    salary_max?: string;
    location?: string;
    created_at?: string;
    postedAt?: string;
    savedJob?: any[];
    application?: any[];
  };
  onSaveJob?: (item: any) => void;
  onCopyLink?: (item: any) => void;
  onApply?: (item: any) => void;
  setRefresh?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ 
  item,
  onSaveJob,
  onCopyLink,
  onApply,
  setRefresh
}) => {
  // Normalize data from different sources
  const jobData = {
    id: item?.id,
    title: item?.job_title || item?.title || 'Position/Role Hiring',
    companyName: item?.company?.name || item?.company_name || 'Company',
    companyImage: item?.company?.profile_image_path 
    ? `${HOST_URL}${item.company.profile_image_path.startsWith('/') 
        ? item.company.profile_image_path.substring(1) 
        : item.company.profile_image_path}`
    : null,
    jobType: item?.job_type || '',
    experience: item?.experience || '',
    skills: item?.skills ? item.skills.split(',').map(skill => skill.trim()) : [],
    salaryFrom: item?.salary_from || '',
    salaryTo: item?.salary_to || '',
    salaryMax: item?.salary_max || '',
    location: item?.location || 'N/A',
    createdAt: item?.created_at || item?.postedAt || null,
    isSaved: item?.savedJob?.length > 0,
    hasApplied: item?.application?.length > 0,
  };

  // Generate alternating background colors
  const cardBgColor = jobData.id % 2 === 0 ? '#8E9EAB' : '#FFF4A9';
  
  // Format date if available
  const formattedDate = jobData.createdAt 
    ? format(new Date(jobData.createdAt), 'dd, MMMM, yyyy') 
    : 'Date not available';

  // Handle save job action with stopPropagation to prevent card click
  const handleSaveJob = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onSaveJob) {
      onSaveJob(item);
    }
  };

  // Handle copy link action with stopPropagation
  const handleCopyLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onCopyLink) {
      onCopyLink(item);
    }
  };

  // Handle apply action with stopPropagation
  const handleApply = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onApply) {
      onApply(item);
    }
  };

  // Format salary display based on available data
  const getSalaryDisplay = () => {
    if (jobData.salaryFrom && jobData.salaryTo) {
      return `AED ${jobData.salaryFrom} - ${jobData.salaryTo}`;
    } else if (jobData.salaryMax) {
      return `AED ${jobData.salaryMax}`;
    }
    return 'AED N/A';
  };

  const formatJobTitle = (title: string) => {
    if (title.length <= 18) {
      return [title];
    }

    // Find the first space after 17 characters but before 20 characters
    let splitIndex = -1;
    for (let i = 17; i <= Math.min(20, title.length); i++) {
      if (title[i] === ' ') {
        splitIndex = i;
        break;
      }
    }

    // If no space found in that range, split at 19 characters and add hyphen
    if (splitIndex === -1) {
      splitIndex = 18;
      return [
        title.substring(0, splitIndex) + '-',
        title.substring(splitIndex).trim()
      ];
    }

    return [
      title.substring(0, splitIndex),
      title.substring(splitIndex).trim()
    ];
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        bgcolor: 'white',
        p: 1,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          cursor: 'pointer',
        },
      }}
    >
      {/* Colored inner box */}
      <Box
        sx={{
          backgroundColor: cardBgColor,
          p: 2,
          mb: 2,
          borderRadius: 4,
          position: 'relative',
          height: '80%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Date and Bookmark */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography
            variant="body2"
            sx={{
              bgcolor: 'white',
              px: 1.5,
              py: 1,
              borderRadius: 5,
              fontFamily: 'Work Sans, sans-serif',
              fontWeight: 550,
              fontSize: '0.75rem',
            }}
          >
            {formattedDate}
          </Typography>
          <IconButton
            size="small"
            sx={{ color: '#A5A3A3', bgcolor: 'white', p: 1 }}
            onClick={handleSaveJob}
          >
            {jobData.isSaved ? (
              <BookmarkIcon color="primary" />
            ) : (
              <BookmarkBorderIcon />
            )}
          </IconButton>
        </Box>

        {/* Company Name and Job Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: '#000000',
                mb: 0.5,
                fontFamily: 'Work Sans, sans-serif',
                fontSize: '0.875rem',
              }}
            >
              {jobData.companyName}
            </Typography>
            <Box>
              {formatJobTitle(jobData.title).map((line, index) => (
                <Typography
                  key={index}
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontFamily: 'Work Sans, sans-serif',
                    fontSize: index === 0 ? '1.125rem' : '1rem', // Slightly smaller font for second line
                    lineHeight: 1.2,
                    display: 'block', // Ensure each line is on its own line
                  }}
                >
                  {line}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Skills and Details */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
          {/* Display job type */}
          {jobData.jobType && (
            <Chip
              label={jobData.jobType}
              sx={{
                border: '1px solid #666666',
                borderRadius: 5,
                fontFamily: 'Work Sans, sans-serif',
                fontSize: '0.7rem',
                bgcolor: 'transparent',
              }}
            />
          )}

          {/* Display experience */}
          {jobData.experience && (
            <Chip
              label={jobData.experience}
              sx={{
                border: '1px solid #666666',
                borderRadius: 5,
                fontFamily: 'Work Sans, sans-serif',
                fontSize: '0.7rem',
                bgcolor: 'transparent',
              }}
            />
          )}

          {/* Display skills */}
          {jobData.skills.slice(0, 3).map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              sx={{
                border: '1px solid #666666',
                borderRadius: 5,
                fontFamily: 'Work Sans, sans-serif',
                fontSize: '0.7rem',
                bgcolor: 'transparent',
              }}
            />
          ))}
        </Box>

        {/* Star Icon */}
        <Box
          sx={{
            position: 'absolute',
            right: 10,
            top: 80,
            width: 60,
            height: 60,
            borderRadius: '50%',
            bgcolor: '#fece00',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid white',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          {jobData.companyImage ? (
            <Box
              component="img"
              src={jobData.companyImage}
              alt="Company logo"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          ) : (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 5V35M5 20H35M10 10L30 30M30 10L10 30" stroke="black" strokeWidth="1"/>
            </svg>
          )}
        </Box>
      </Box>

      {/* Bottom section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 'auto',
        }}
      >
        {/* Salary and Location */}
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              fontFamily: 'Work Sans, sans-serif',
              ml: 1,
              fontSize: '0.9rem',
            }}
          >
            {getSalaryDisplay()}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: '#A5A3A3',
              fontFamily: 'Work Sans, sans-serif',
              ml: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'block',
              maxWidth: '100px',
              fontSize: '0.75rem',
            }}
          >
            {jobData.location}
          </Typography>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: 'black',
              color: 'white',
              borderRadius: 5,
              minWidth: 'auto',
              textTransform: 'none',
              px: 2,
              py: 0.5,
              fontSize: '0.75rem',
              fontFamily: 'Work Sans, sans-serif',
              '&:hover': { bgcolor: '#333333' },
            }}
            onClick={handleCopyLink}
          >
            Link
          </Button>
            <Button
            variant="contained"
            sx={{
              bgcolor: jobData.hasApplied ? '#A5A3A3' : 'black',
              color: 'white',
              borderRadius: 5,
              minWidth: 'auto',
              textTransform: 'none',
              px: 2,
              py: 0.5,
              fontSize: '0.75rem',
              fontFamily: 'Work Sans, sans-serif',
              '&:hover': { bgcolor: jobData.hasApplied ? '#A5A3A3' : '#333333' },
            }}
            onClick={jobData.hasApplied ? undefined : handleApply}
            disabled={jobData.hasApplied}
            >
            {jobData.hasApplied ? 'Applied' : 'Apply'}
            </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default JobCard;