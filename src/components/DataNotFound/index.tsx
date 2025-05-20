import { m } from 'framer-motion';
// @mui
import { Typography } from '@mui/material';
// layouts
import { PageNotFoundIllustration } from 'src/assets/illustrations';
import { MotionContainer, varBounce } from '../animate';

export default function DataNotFound({ title, subTitle, path }: any) {
  return (
    <MotionContainer>
      <m.div variants={varBounce().in}>
        <Typography
          variant="h4"
          textAlign="center"
          paragraph
          sx={{
            mb: subTitle ? 1 : 2,
          }}
        >
          {title || 'Data not found!'}
        </Typography>
        {subTitle && (
          <Typography variant="body1" textAlign="center" paragraph>
            {subTitle}
          </Typography>
        )}
      </m.div>

      <m.div variants={varBounce().in}>
        {path ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <img src={path} alt="" height="100%" width="50%" />
          </div>
        ) : (
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: 3,
            }}
          />
        )}
      </m.div>
    </MotionContainer>
  );
}
