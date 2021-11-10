import { mode } from '@chakra-ui/theme-tools';
import { Dict } from '@chakra-ui/utils';

export const FormLabel = {
  baseStyle: (props: Dict) => ({
    fontSize: 'sm',
    color: mode('gray.700', 'gray.200')(props),
    mr: 0,
  }),
};
