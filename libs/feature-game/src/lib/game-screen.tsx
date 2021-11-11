import { PhotoRepository } from '@cat-match/data-access';
import { Box, Logo, Stack, Text } from '@cat-match/jiji';
import { useMachine } from '@xstate/react';
import * as React from 'react';
import { GameFinishedMessage } from './game-finished-message';
import { GameGrid } from './game-grid';
import { Hero } from './hero';
import { CardStatus, gameMachine, gameModel } from './machines/game-machine';

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
    (card) => card.status === CardStatus.REMOVED
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
          <Hero />
          {state.matches('pending') ? (
            <Text textAlign="center" fontWeight="medium" fontSize="xl">
              Loading...
            </Text>
          ) : null}
          {state.matches('ready') ? (
            gameIsFinished ? (
              <GameFinishedMessage
                onReplayButtonClick={() => {
                  send(gameModel.events.PLAY_AGAIN());
                }}
              />
            ) : (
              <GameGrid
                pairCount={state.context.stack.length / 2}
                cards={Object.values(state.context.cards)}
                onCardClick={(cardId) => {
                  send(gameModel.events.SELECTED(cardId));
                }}
              />
            )
          ) : null}
        </Stack>
      </Box>
    </Box>
  );
}
