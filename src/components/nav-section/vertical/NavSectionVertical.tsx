// @mui
import { List, Stack } from '@mui/material';
// locales
import { useLocales } from '../../../locales';
//
import { NavSectionProps } from '../types';
import { StyledSubheader } from './styles';
import NavList from './NavList';

// ----------------------------------------------------------------------

export default function NavSectionVertical({ data, sx, ...other }: NavSectionProps) {
  const { translate } = useLocales();

  return (
    <Stack sx={sx} {...other}>
      {data.map((group) => {
        const key = group.subheader || group.items[0].title;

        return (
          <List key={key} disablePadding sx={{ p: 2, bgcolor: '#fff' }}>
            {group.subheader && (
              <StyledSubheader disableSticky>{`${translate(group.subheader)}`}</StyledSubheader>
            )}

            {group.items.map((list) => (
              <NavList
                key={list.title + list.path}
                data={list}
                depth={1}
                hasChild={!!list.children}
                title={list.title}
              />
            ))}
          </List>
        );
      })}
    </Stack>
  );
}
