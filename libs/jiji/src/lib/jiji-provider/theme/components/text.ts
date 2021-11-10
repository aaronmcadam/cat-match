import { mode } from '@chakra-ui/theme-tools';
import { Dict } from '@chakra-ui/utils';

export const Text = {
  variants: {
    supporting: (props: Dict) => ({
      color: mode('gray.400', 'gray.300')(props),
    }),
  },
};
