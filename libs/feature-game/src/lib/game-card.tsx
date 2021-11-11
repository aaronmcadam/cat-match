import { AspectRatio, Box, Center, Image } from '@cat-match/jiji';
import * as React from 'react';
import { CatIcon } from './cat-icon';
import { Card, GameCardStatus } from './machines/game-machine';

/* eslint-disable-next-line */
export interface GameCardProps {
  card: Card;
  onClick: (cardId: string) => void;
}

export function GameCard({ card, onClick }: GameCardProps) {
  if (card.status === GameCardStatus.REMOVED) {
    return <Box />;
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
          {card.status === GameCardStatus.DEFAULT ? (
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
              <Box>{card.id}</Box>
            </Center>
          ) : null}
          {card.status === GameCardStatus.SELECTED ? (
            <Image
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
