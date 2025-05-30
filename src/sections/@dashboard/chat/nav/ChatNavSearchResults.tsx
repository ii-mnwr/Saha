// @mui
import { Avatar, Typography, ListItemButton } from '@mui/material';
// @types
import { CustomAvatar } from 'src/components/custom-avatar';
import { IChatContact } from '../../../../@types/chat';
//
import SearchNotFound from '../../../../components/search-not-found';

// ----------------------------------------------------------------------

type Props = {
  searchContacts: string;
  searchResults: IChatContact[];
  onSelectContact: (contact: IChatContact) => void;
};

export default function ChatNavSearchResults({
  searchContacts,
  searchResults,
  onSelectContact,
}: Props) {
  const isNotFound = !searchResults?.length && !!searchContacts;
  return (
    <>
      {/*    <Typography
        paragraph
        variant="h6"
        sx={{
          px: 2.5,
        }}
      >
        Contacts
      </Typography>
 */}
      {isNotFound ? (
        <SearchNotFound
          query={searchContacts}
          sx={{
            p: 3,
            mx: 'auto',
            width: `calc(100% - 40px)`,
            bgcolor: 'background.neutral',
          }}
        />
      ) : (
        <>
          {searchResults?.map((result: any) => (
            <ListItemButton
              key={result?.User?.id}
              onClick={() => {
                onSelectContact(result);
              }}
              sx={{
                px: 2.5,
                py: 1.5,
                typography: 'subtitle2',
              }}
            >
              <CustomAvatar
                alt=""
                name={result?.User?.user_name}
                src={`${process.env.HOST_API_KEY}/${result?.User?.profile_image_path}`}
                sx={{ mr: 2 }}
              />
              {result?.User?.user_name}
            </ListItemButton>
          ))}
        </>
      )}
    </>
  );
}
