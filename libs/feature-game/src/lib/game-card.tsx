import { AspectRatio, Box, Center, Image } from '@cat-match/jiji';
import * as React from 'react';
import { CatIcon } from './cat-icon';
import { Card, CardStatus } from './machines/game-machine';

/* eslint-disable-next-line */
export interface GameCardProps {
  card: Card;
  onClick?: (cardId: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function GameCard({ card, onClick = () => {} }: GameCardProps) {
  if (card.status === CardStatus.REMOVED) {
    return <Box data-testid="placeholder" w="full" h="full" />;
  }

  return (
    <Box
      data-testid="game-card"
      as="button"
      onClick={() => {
        onClick(card.id);
      }}
      role="group"
      w="full"
    >
      <AspectRatio boxShadow="base" rounded="lg" overflow="hidden" ratio={1}>
        <>
          {card.status === CardStatus.DEFAULT ? (
            <Center
              data-testid="card-default"
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
          {card.status === CardStatus.SELECTED ? (
            <Image
              data-testid="card-selected"
              src={card.photo.src}
              alt="Cat"
              boxSize="full"
              objectFit="cover"
            />
          ) : null}
        </>
      </AspectRatio>
    </Box>
  );
}
