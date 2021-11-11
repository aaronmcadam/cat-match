import { Stack, Text, Button, RefreshIconSolid } from '@cat-match/jiji';

export interface GameFinishedMessageProps {
  onReplayButtonClick?: () => void;
}

export function GameFinishedMessage({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onReplayButtonClick = () => {},
}: GameFinishedMessageProps) {
  return (
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
          onReplayButtonClick();
        }}
        variant="primary"
        leadingIcon={<RefreshIconSolid />}
      >
        Play again
      </Button>
    </Stack>
  );
}
