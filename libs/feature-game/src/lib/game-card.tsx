import { Photo } from '@cat-match/data-access';
import { AspectRatio, Box, Center, Image } from '@cat-match/jiji';
import * as React from 'react';
import { CatIcon } from './cat-icon';

export enum GameCardStatus {
  DEFAULT = 'DEFAULT',
  FLIPPED = 'FLIPPED',
  REMOVED = 'REMOVED',
}

/* eslint-disable-next-line */
export interface GameCardProps {
  defaultStatus: GameCardStatus;
  photo: Photo;
}

export function GameCard({ defaultStatus, photo }: GameCardProps) {
  const [status, setStatus] = React.useState(defaultStatus);

  return (
    <Box
      data-testid="game-card"
      as="button"
      onClick={() => {
        setStatus(GameCardStatus.FLIPPED);
      }}
      role="group"
      w="full"
    >
      {status !== GameCardStatus.REMOVED ? (
        <AspectRatio boxShadow="base" rounded="lg" overflow="hidden" ratio={1}>
          <>
            {status === GameCardStatus.DEFAULT ? (
              <Center
                bg="gray.50"
                transition="ease-out"
                transitionProperty="all"
                transitionDuration="normal"
                _groupHover={{
                  transform: 'scale(1.1, 1.1)',
                  opacity: 0.75,
                }}
              >
                <CatIcon h={10} color="gray.500" />
              </Center>
            ) : null}
            {status === GameCardStatus.FLIPPED ? (
              <Image
                src={photo.src}
                alt="Cat"
                boxSize="full"
                objectFit="cover"
              />
            ) : null}
          </>
        </AspectRatio>
      ) : null}
    </Box>
  );
}
