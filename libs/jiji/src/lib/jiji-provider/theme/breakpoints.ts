import { createBreakpoints } from '@chakra-ui/theme-tools';

// We use Tailwind CSS responsive breakpoints to make it easier to reproduce
// Tailwind UI styles.
// @see https://tailwindcss.com/docs/responsive-design
// @see https://tailwindui.com/
export const breakpoints = createBreakpoints({
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
});
