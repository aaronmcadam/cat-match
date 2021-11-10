import { mode } from '@chakra-ui/theme-tools';
import { Dict } from '@chakra-ui/utils';

export const Input = {
  variants: {
    outline: (props: Dict) => ({
      field: {
        bg: 'transparent',
        borderColor: mode('gray.300', 'whiteAlpha.500')(props),
        _placeholder: {
          color: mode('gray.500', 'gray.300')(props),
        },
      },
    }),
  },
};
