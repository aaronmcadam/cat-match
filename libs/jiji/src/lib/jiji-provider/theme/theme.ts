import { extendTheme, withDefaultVariant } from '@chakra-ui/react';
import { breakpoints } from './breakpoints';
import { colors } from './colors';
import { Button } from './components/button';
import { Input } from './components/input';
import { Select } from './components/select';
import { FormLabel } from './components/form-label';
import { Badge } from './components/badge';
import { Text } from './components/text';
import { Divider } from './components/divider';

const overrides = {
  breakpoints,
  colors,
  components: {
    Badge,
    Button,
    Divider,
    Input,
    FormLabel,
    Select,
    Text,
  },
  config: {
    // TODO: Turn on system colour mode if there's time to adjust colours.
    // useSystemColorMode: true,
  },
  styles: {
    global: {
      body: {
        bg: 'pink.50',
      },
    },
  },
};

export const theme = extendTheme(
  overrides,
  withDefaultVariant({
    variant: 'secondary',
    components: ['Button'],
  })
);
