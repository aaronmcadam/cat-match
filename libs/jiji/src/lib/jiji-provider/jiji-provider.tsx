import { ChakraProvider, ChakraProviderProps } from '@chakra-ui/provider';
import { LightMode } from '@chakra-ui/react';
import { theme } from './theme/theme';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JijiProviderProps extends ChakraProviderProps {}

export function JijiProvider({
  children,
  ...providerProps
}: JijiProviderProps) {
  // Wrap the children in LightMode to force light mode until the next release of Chakra.
  // @see https://github.com/chakra-ui/chakra-ui/issues/4987
  return (
    <ChakraProvider theme={theme} {...providerProps}>
      <LightMode>{children}</LightMode>
    </ChakraProvider>
  );
}
