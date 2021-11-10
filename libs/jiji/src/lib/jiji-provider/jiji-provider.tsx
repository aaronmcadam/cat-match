import { ChakraProvider, ChakraProviderProps } from '@chakra-ui/provider';
import { theme } from './theme/theme';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JijiProviderProps extends ChakraProviderProps {}

export function JijiProvider(props: JijiProviderProps) {
  return <ChakraProvider theme={theme} {...props} />;
}
