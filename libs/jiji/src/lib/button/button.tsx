import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';
import { forwardRef } from '@chakra-ui/system';
import * as React from 'react';

type OmittedProps = 'leftIcon' | 'rightIcon';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BaseButtonProps extends Omit<ChakraButtonProps, OmittedProps> {}

export interface ButtonProps extends BaseButtonProps {
  /**
   * The visual style of the button. The default is `secondary`.
   */
  variant?: 'primary' | 'secondary' | 'link';

  /**
   * Add an icon before the button text.
   */
  leadingIcon?: ChakraButtonProps['leftIcon'];

  /**
   * Add an icon after the button text.
   */
  trailingIcon?: ChakraButtonProps['rightIcon'];
}

/**
 * A button communicates that users can trigger an action.
 *
 * Extends Chakra UI's `Button`.
 *
 * Places you’d use a button include:
 *
 * - Submitting a form
 * - Closing a modal
 * - Moving to the next step in a flow
 *
 * A button can have an icon and/or text.
 *
 * The default variant is secondary, which we set in the theme configuration.
 */
export const Button = forwardRef<ButtonProps, 'button'>(
  // Chakra will remove props that it knows about to avoid React's Unknown Prop
  // warning. If we don't remove our custom props, they'll get passed through
  // to Chakra's Button, and we'll see the React warning in the browser console.
  // @see https://reactjs.org/warnings/unknown-prop.html
  //
  // Picking off these custom props also helps us keep our absractions separate
  // from Chakra's.
  ({ leadingIcon, trailingIcon, ...props }, ref) => {
    const customProps = {
      ...props,
      leftIcon: leadingIcon,
      rightIcon: trailingIcon,
    };

    return <ChakraButton ref={ref} {...customProps} />;
  }
);
