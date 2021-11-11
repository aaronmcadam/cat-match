import { Heading, SimpleGrid, Stack } from '@cat-match/jiji';
import { GameCard } from './game-card';
import { Card } from './machines/game-machine';

export interface GameGridProps {
  pairCount: number;
  cards: Card[];
  onCardClick?: (cardId: string) => void;
}

export function GameGrid({
  pairCount,
  cards,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onCardClick = () => {},
}: GameGridProps) {
  return (
    <Stack>
      <Heading
        data-testid="heading-pair-count"
        fontSize="xl"
        fontWeight="medium"
        textAlign="center"
      >
        {pairCount} pair
        {pairCount === 1 ? '' : 's'} matched!
      </Heading>
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
        {Object.values(cards).map((card) => {
          return <GameCard key={card.id} card={card} onClick={onCardClick} />;
        })}
      </SimpleGrid>
    </Stack>
  );
}
