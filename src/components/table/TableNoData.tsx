/* eslint-disable no-nested-ternary */
// @mui
import { TableRow, TableCell, Typography } from '@mui/material';
//
import { PageNotFoundIllustration, UpgradeStorageIllustration } from 'src/assets/illustrations';
import { m } from 'framer-motion';
import EmptyContent from '../empty-content';
import { MotionContainer, varBounce } from '../animate';

// ----------------------------------------------------------------------

type Props = {
  isNotFound: boolean;
  title?: string;
  isSubscription?: boolean;
  path?: string;
};

export default function TableNoData({ isNotFound, title, isSubscription = false, path }: Props) {
  return (
    <TableRow>
      {isNotFound ? (
        <TableCell colSpan={12}>
          <MotionContainer>
            <m.div variants={varBounce().in}>
              <Typography variant="h4" textAlign="center" paragraph>
                {title || 'Data not found!'}
              </Typography>
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
              ) : isSubscription ? (
                <UpgradeStorageIllustration
                  sx={{
                    height: 260,
                    my: 3,
                  }}
                />
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
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
