import { Box, Heading } from '@cat-match/jiji';

export function Hero() {
  return (
    <Box textAlign="center">
      <Heading
        as="h1"
        fontSize="6xl"
        fontWeight="extrabold"
        lineHeight={1}
        letterSpacing="tight"
        maxW="44rem"
        mx="auto"
      >
        <Box
          as="mark"
          bgGradient="linear(to-r, #14AFFC, #7F23F7, #FC19AD)"
          bgClip="text"
        >
          Find the matching pairs
        </Box>{' '}
        and have fun!
      </Heading>
    </Box>
  );
}
