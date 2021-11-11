import { useMachine } from '@xstate/react';
import {
  Stack,
  Heading,
  Text,
  Logo,
  Box,
  SimpleGrid,
  RefreshIconSolid,
  Button,
} from '@cat-match/jiji';
import { GameCard } from './game-card';
import * as React from 'react';

import { Photo, PhotoRepository } from '@cat-match/data-access';
import {
  GameCardStatus,
  gameMachine,
  gameModel,
} from './machines/game-machine';

/* eslint-disable-next-line */
export interface GameScreenProps {}

export function GameScreen(props: GameScreenProps) {
  const [state, send] = useMachine(gameMachine, {
    devTools: true,
    services: {
      fetchPhotos: async (context, event) => {
        const photoRepo = new PhotoRepository();
        const photos = await photoRepo.all();

        send(gameModel.events.RECEIVE_DATA(photos));
      },
    },
  });

  React.useEffect(() => {
    send(gameModel.events.FETCH_PHOTOS());
  }, [send]);

  const gameIsFinished = Object.values(state.context.cards).every(
    (card) => card.status === GameCardStatus.REMOVED
  );

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
          {state.matches('pending') ? (
            <Text textAlign="center" fontWeight="medium" fontSize="xl">
              Loading...
            </Text>
          ) : null}
          {state.matches('ready') ? (
            gameIsFinished ? (
              <Stack spacing={6} align="center">
                <Text
                  fontWeight="bold"
                  fontSize="5xl"
                  textAlign="center"
                  lineHeight={1.2}
                >
                  Well done{' '}
                  <span role="img" aria-label="Celebrate">
                    🎉
                  </span>
                  <br />
                  You completed the game!
                </Text>
                <Button
                  onClick={() => {
                    send(gameModel.events.PLAY_AGAIN());
                  }}
                  variant="primary"
                  leadingIcon={<RefreshIconSolid />}
                >
                  Play again
                </Button>
              </Stack>
            ) : (
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
                {Object.values(state.context.cards).map((card) => {
                  // The ids clash because there are two photos with the same id.
                  // We can fix this by generating a uuid for the card itself and using to the photo id for comparison.
                  return (
                    <GameCard
                      key={card.id}
                      card={card}
                      onClick={(cardId) => {
                        send(gameModel.events.SELECTED(cardId));
                      }}
                    />
                  );
                })}
              </SimpleGrid>
            )
          ) : null}
        </Stack>
      </Box>
    </Box>
  );
}
