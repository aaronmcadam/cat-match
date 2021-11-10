import { mode } from '@chakra-ui/theme-tools';
import { Dict } from '@chakra-ui/utils';

export const Modal = {
  baseStyle: (props: Dict) => ({
    dialogContainer: {
      alignItems: { base: 'flex-end', sm: 'center' },
    },
    dialog: {
      borderRadius: 'lg',
      bg: mode('white', 'gray.800')(props),
      mx: { base: 4, sm: 0 },
      mt: 0,
      mb: { base: 20, sm: 0 },
    },
    header: {
      fontSize: 'lg',
      fontWeight: 'medium',
      p: 0,
    },
    body: {
      p: 0,
      fontSize: 'sm',
      color: mode('gray.500', 'gray.400')(props),
    },
    footer: {
      display: { base: 'block', sm: 'flex' },
      // We want the primary action button to come first on mobile and last on
      // desktop. We do this by flipping the row direction for the desktop breakpoint.
      flexDirection: { sm: 'row-reverse' },
      // Because we're flipping the row direction, we need to justify the
      // content to the start of the flex area so that the action button comes
      // first.
      justifyContent: { sm: 'flex-start' },
      bg: mode('gray.50', 'gray.700')(props),
      borderBottomLeftRadius: 'lg',
      borderBottomRightRadius: 'lg',
      px: { base: 4, sm: 6 },
      py: 3,
    },
  }),
};
