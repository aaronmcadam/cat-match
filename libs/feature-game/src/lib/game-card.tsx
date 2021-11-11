import {
  AspectRatio,
  Box,
  Center,
  Image,
  Circle,
  CheckIconSolid,
  XIconSolid,
} from '@cat-match/jiji';
import * as React from 'react';
import { CatIcon } from './cat-icon';
import {
  Card,
  CardMatchStatus,
  CardVisibilityStatus,
} from './machines/game-machine';

export interface GameCardProps {
  card: Card;
  onClick?: (cardId: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function GameCard({ card, onClick = () => {} }: GameCardProps) {
  if (card.visibilityStatus === CardVisibilityStatus.HIDDEN) {
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
      pos="relative"
    >
      {card.matchStatus === CardMatchStatus.DIFFERENT ? (
        <Circle
          bg="red.100"
          pos="absolute"
          zIndex="overlay"
          top={2}
          left={2}
          p={1}
        >
          <XIconSolid boxSize={4} color="red.800" />
        </Circle>
      ) : null}
      {card.matchStatus === CardMatchStatus.MATCHED ? (
        <Circle
          bg="green.100"
          pos="absolute"
          zIndex="overlay"
          top={2}
          left={2}
          p={1}
        >
          <CheckIconSolid boxSize={4} color="green.800" />
        </Circle>
      ) : null}
      <AspectRatio boxShadow="base" rounded="lg" overflow="hidden" ratio={1}>
        <>
          {card.visibilityStatus === CardVisibilityStatus.UNSELECTED ? (
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
          {card.visibilityStatus === CardVisibilityStatus.SELECTED ? (
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
