import { mode } from '@chakra-ui/theme-tools';
import { Dict } from '@chakra-ui/utils';

export const Select = {
  variants: {
    outline: (props: Dict) => ({
      field: {
        bg: mode('white', 'gray.800')(props),
        borderColor: mode('gray.300', 'whiteAlpha.400')(props),
        height: '38px',
      },
    }),
  },
};
