import { Stack, Heading, Text, Logo, Box, SimpleGrid } from '@cat-match/jiji';
import { GameCard, GameCardStatus } from './game-card';

/* eslint-disable-next-line */
export interface GameScreenProps {}

export function GameScreen(props: GameScreenProps) {
  return (
    <Box
      bgImage="/assets/bg-left.png"
      bgRepeat="no-repeat"
      bgPosition="left bottom"
    >
      <Box
        bgImage="/assets/bg-right.png"
        bgRepeat="no-repeat"
        bgPosition="right top"
        h="100vh"
      >
        <Stack spacing={8} py={16} maxW="7xl" mx="auto">
          <Logo />
          {/* Hero */}
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
          {/* Game Grid */}
          <SimpleGrid
            as="ul"
            role="list"
            aria-labelledby="gallery-heading"
            columns={{
              base: 3,
              sm: 6,
            }}
            spacingX={{ base: 4, sm: 6, xl: 8 }}
            spacingY={8}
            pt={8}
            pb={16}
            px={8}
          >
            <GameCard defaultStatus={GameCardStatus.DEFAULT} />
            <GameCard defaultStatus={GameCardStatus.REMOVED} />
            <GameCard defaultStatus={GameCardStatus.DEFAULT} />
            <GameCard defaultStatus={GameCardStatus.DEFAULT} />
            <GameCard defaultStatus={GameCardStatus.DEFAULT} />
            <GameCard defaultStatus={GameCardStatus.DEFAULT} />
          </SimpleGrid>
        </Stack>
      </Box>
    </Box>
  );
}
