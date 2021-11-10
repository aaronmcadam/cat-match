import { AspectRatio, Box, Stack, Text, Image, Center } from '@cat-match/jiji';
import { CatIcon } from './cat-icon';
import * as React from 'react';
import { keyframes } from '@chakra-ui/react';

export enum GameCardStatus {
  DEFAULT = 'DEFAULT',
  FLIPPED = 'FLIPPED',
  REMOVED = 'REMOVED',
}

/* eslint-disable-next-line */
export interface GameCardProps {
  defaultStatus: GameCardStatus;
}

export function GameCard({ defaultStatus }: GameCardProps) {
  const [status, setStatus] = React.useState(defaultStatus);
  const photo = {
    src: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80',
  };

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
