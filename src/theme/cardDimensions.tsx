// Add this to your theme or constants file
export const cardDimensions = {
  height: {
    desktop: '300px',
    mobile: '300px',
  },
  padding: {
    desktop: 2,
    mobile: 1.5,
  },
  contentHeight: {
    desktop: 'calc(300px - 64px)', // account for header and padding
    mobile: 'calc(300px - 56px)', // slightly smaller on mobile
  },
};
