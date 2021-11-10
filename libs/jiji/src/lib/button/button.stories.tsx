import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import { Box, ArrowRightIconSolid } from '../..';
import { Button } from './button';

export default {
  title: 'Button',
  // By default, Storybook will include controls for every prop it can find,
  // including all of the style props such as `_hover`. This behaviour adds a
  // lot of controls that we don't need. So, we only include controls for props
  // we want to override.
  // Storybook will generate a props table if `Meta` receives a `component`
  // prop, but it's not including all of the props we want it to. We can build
  // our own props table if we don't pass the `component` prop.
  parameters: {
    controls: {
      include: ['children', 'variant', 'size', 'isDisabled'],
    },
  },
  argTypes: {
    // The ArgsTable component is ignoring the argTypes of the story, so we can't
    // see the default button variant, for example.  We've raised an issue for
    // this problem here: https://github.com/storybookjs/storybook/issues/15543.
    // We can work around the problem by defining the controls and the table
    // values at the same time.
    variant: {
      table: {
        defaultValue: { summary: 'secondary' },
      },
      options: ['primary', 'secondary'],
      control: {
        type: 'select',
      },
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
    },
  },
  args: {
    children: 'Button text',
    size: 'md',
    isDisabled: false,
  },
} as ComponentMeta<typeof Button>;

// We can't pass React elements as props because Storybook can't serialise them
// in the URL. This feature is important to be able to route to a story with a
// particular state, for example in tests.
const Template: ComponentStory<typeof Button> = ({
  hasLeadingIcon,
  hasTrailingIcon,
  ...props
}) => {
  if (hasLeadingIcon) {
    props.leadingIcon = <ArrowRightIconSolid />;
  }

  if (hasTrailingIcon) {
    props.trailingIcon = <ArrowRightIconSolid />;
  }

  return (
    <Box p={4}>
      <Button {...props} />
    </Box>
  );
};

export const Default = Template.bind({});

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
};

export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  size: 'xs',
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'md',
};

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
};

export const LeadingIcon = Template.bind({});

LeadingIcon.args = {
  hasLeadingIcon: true,
};

export const TrailingIcon = Template.bind({});
TrailingIcon.args = {
  hasTrailingIcon: true,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  loadingText: 'Uploading...',
};

// TODO: Add a note about limiting the use of disabled buttons.
// @see https://axesslab.com/disabled-buttons-suck/
// @see https://stories.justinewin.com/disabled-buttons-dont-have-to-suck-10da0bb6d37e
// @see https://design-system.service.gov.uk/components/button/#disabled-buttons
// @see https://uxdesign.cc/is-it-ok-to-grey-out-disabled-buttons-8afa74a0fae
export const Disabled = Template.bind({});
Disabled.args = {
  isDisabled: true,
};
