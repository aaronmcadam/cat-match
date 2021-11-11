import { useMachine } from '@xstate/react';
import { Stack, Heading, Text, Logo, Box, SimpleGrid } from '@cat-match/jiji';
import { GameCard, GameCardStatus } from './game-card';
import * as React from 'react';

import { Photo, PhotoRepository } from '@cat-match/data-access';
import { gameMachine, gameModel } from './machines/game-machine';

/* eslint-disable-next-line */
export interface GameScreenProps {}

export function GameScreen(props: GameScreenProps) {
  const [fetchStatus, setFetchStatus] = React.useState<
    'idle' | 'loading' | 'done'
  >('idle');
  const [photos, setPhotos] = React.useState<Photo[]>([]);
  const cardIds = photos.map((photo) => photo.id);
  console.log('cardIds', cardIds);
  const [state, send] = useMachine(gameMachine, {
    devTools: true,
    context: {
      cards: cardIds,
    },
  });

  React.useEffect(() => {
    async function fetchPhotos() {
      setFetchStatus('loading');

      try {
        const photoRepo = new PhotoRepository();
        const photos = await photoRepo.all();

        // preload photos
        // If we see that some images haven't preloaded by the time the player
        // starts the game, we can track the state of them and only show the
        // grid when all of the photos are ready.
        photos.forEach((photo) => {
          const image = new Image();

          image.src = photo.src;
        });

        setPhotos(photos);
      } catch (error) {
        console.error(error);
      } finally {
        setFetchStatus('done');
      }
    }

    fetchPhotos();
  }, []);

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
          {fetchStatus === 'loading' ? (
            <Text textAlign="center" fontWeight="medium" fontSize="xl">
              Loading...
            </Text>
          ) : null}
          {fetchStatus === 'done' ? (
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
              {photos.map((photo, index) => {
                // The ids clash because there are two photos with the same id.
                // We can fix this by generating a uuid for the card itself and using to the photo id for comparison.
                return (
                  <GameCard
                    key={`${photo.id}-${index}`}
                    photo={photo}
                    defaultStatus={GameCardStatus.DEFAULT}
                    onClick={(cardId) => {
                      send(gameModel.events.SELECTED(cardId));
                    }}
                  />
                );
              })}
            </SimpleGrid>
          ) : null}
        </Stack>
      </Box>
    </Box>
  );
}
