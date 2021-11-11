import { Photo } from '@cat-match/data-access';
import { createModel } from 'xstate/lib/model';

export enum CardVisibilityStatus {
  UNSELECTED = 'UNSELECTED',
  SELECTED = 'SELECTED',
  HIDDEN = 'HIDDEN',
}

export enum CardMatchStatus {
  UNMATCHED = 'UNMATCHED',
  MATCHED = 'MATCHED',
  DIFFERENT = 'DIFFERENT',
}

// Cards are equal by their photo's ID
export interface Card {
  id: string;
  visibilityStatus: CardVisibilityStatus;
  matchStatus: CardMatchStatus;
  photo: Photo;
}

interface GameContext {
  // Inspired by Redux normalised state.
  // @see https://redux.js.org/usage/structuring-reducers/normalizing-state-shape#designing-a-normalized-state
  // cards: {
  //   [key: string]: {
  //     id: string;
  //   };
  // }
  cards: {
    [key: string]: Card;
  };
  stack: string[];
  selections: string[];
}

export const gameModel = createModel(
  {
    stack: [],
    cards: {},
    selections: [],
  } as GameContext,
  {
    events: {
      FETCH_PHOTOS: () => ({}),
      RECEIVE_DATA: (photos: Photo[]) => ({ photos }),
      SELECTED: (cardId: string) => ({ cardId }),
      READY_TO_MATCH: () => ({}),
      MATCH: () => ({}),
      NO_MATCH: () => ({}),
      PLAY_AGAIN: () => ({}),
      WAITING_FOR_OTHER_SELECTION: () => ({}),
      CONTINUE: () => ({}),
    },
  }
);

function preloadImages(
  context: GameContext,
  event: {
    photos: Photo[];
    type: 'RECEIVE_DATA';
  }
) {
  // If we see that some images haven't preloaded by the time the player
  // starts the game, we can wrap this in a promise to make the system wait for
  // them all to load.
  event.photos.forEach((photo) => {
    const image = new Image();

    image.src = photo.src;
  });
}

const addCards = gameModel.assign(
  {
    cards: (context, event) => {
      const cards = event.photos.reduce((acc, photo, index) => {
        const id = `${photo.id}-${index}`;

        acc[id] = {
          id,
          visibilityStatus: CardVisibilityStatus.UNSELECTED,
          matchStatus: CardMatchStatus.UNMATCHED,
          photo,
        };

        return acc;
      }, {} as { [key: string]: Card });

      return cards;
    },
  },
  'RECEIVE_DATA'
);

const updateContext = gameModel.assign(
  {
    cards: (context, event) => {
      return {
        ...context.cards,
        [context.selections[0]]: {
          ...context.cards[context.selections[0]],
          visibilityStatus: CardVisibilityStatus.HIDDEN,
        },
        [context.selections[1]]: {
          ...context.cards[context.selections[1]],
          visibilityStatus: CardVisibilityStatus.HIDDEN,
        },
      };
    },
    stack: (context, event) => {
      return [...context.stack, ...context.selections];
    },
    selections: (context, event) => {
      return [];
    },
  },
  'CONTINUE'
);

const showMatched = gameModel.assign(
  {
    cards: (context, event) => {
      return {
        ...context.cards,
        [context.selections[0]]: {
          ...context.cards[context.selections[0]],
          matchStatus: CardMatchStatus.MATCHED,
        },
        [context.selections[1]]: {
          ...context.cards[context.selections[1]],
          matchStatus: CardMatchStatus.MATCHED,
        },
      };
    },
  },
  'MATCH'
);

const showDifferences = gameModel.assign(
  {
    cards: (context, event) => {
      return {
        ...context.cards,
        [context.selections[0]]: {
          ...context.cards[context.selections[0]],
          matchStatus: CardMatchStatus.DIFFERENT,
        },
        [context.selections[1]]: {
          ...context.cards[context.selections[1]],
          matchStatus: CardMatchStatus.DIFFERENT,
        },
      };
    },
  },
  'NO_MATCH'
);

const saveSelection = gameModel.assign(
  {
    selections: (context, event) => {
      return [...context.selections, event.cardId];
    },
    cards: (context, event) => {
      return {
        ...context.cards,
        [event.cardId]: {
          ...context.cards[event.cardId],
          visibilityStatus: CardVisibilityStatus.SELECTED,
        },
      };
    },
  },
  'SELECTED'
);

const clearSelections = gameModel.assign(
  {
    selections: (context, event) => {
      return [];
    },
    cards: (context, event) => {
      return {
        ...context.cards,
        [context.selections[0]]: {
          ...context.cards[context.selections[0]],
          visibilityStatus: CardVisibilityStatus.UNSELECTED,
          matchStatus: CardMatchStatus.UNMATCHED,
        },
        [context.selections[1]]: {
          ...context.cards[context.selections[1]],
          visibilityStatus: CardVisibilityStatus.UNSELECTED,
          matchStatus: CardMatchStatus.UNMATCHED,
        },
      };
    },
  },
  'CONTINUE'
);

const resetStack = gameModel.assign(
  {
    stack: (context, event) => {
      return [];
    },
  },
  'PLAY_AGAIN'
);

// We can use this with a XState condition later.
function twoCardsSelected(context: GameContext) {
  return context.selections.length === 2;
}

export const gameMachine = gameModel.createMachine({
  id: 'game',
  context: gameModel.initialContext,
  initial: 'idle',
  states: {
    idle: {
      on: {
        FETCH_PHOTOS: 'fetchingPhotos',
      },
    },
    fetchingPhotos: {
      on: {
        RECEIVE_DATA: {
          target: 'ready',
          actions: [preloadImages, addCards],
        },
      },
      invoke: {
        src: 'fetchPhotos',
      },
    },
    ready: {
      id: 'ready',
      initial: 'idle',
      states: {
        idle: {
          on: {
            SELECTED: {
              actions: saveSelection,
              target: 'showingSelection',
            },
            PLAY_AGAIN: {
              actions: resetStack,
              target: '#game.fetchingPhotos',
            },
          },
        },
        showingSelection: {
          invoke: {
            src: (context) => (send) => {
              if (context.selections.length !== 2) {
                send(gameModel.events.WAITING_FOR_OTHER_SELECTION());
              }

              send(gameModel.events.READY_TO_MATCH());
            },
          },
          on: {
            WAITING_FOR_OTHER_SELECTION: 'idle',
            READY_TO_MATCH: {
              target: 'readyToMatch',
            },
          },
        },
        readyToMatch: {
          after: {
            250: {
              cond: twoCardsSelected,
              target: 'matching',
            },
          },
        },
        matching: {
          initial: 'checking',
          states: {
            checking: {
              invoke: {
                src: (context) => (send) => {
                  const [selection1, selection2] = context.selections;

                  if (
                    context.cards[selection1].photo.id ===
                    context.cards[selection2].photo.id
                  ) {
                    send(gameModel.events.MATCH());
                  } else {
                    send(gameModel.events.NO_MATCH());
                  }
                },
              },
              on: {
                NO_MATCH: {
                  target: 'different',
                  actions: showDifferences,
                },
                MATCH: {
                  target: 'matched',
                  actions: showMatched,
                },
              },
            },
            different: {
              after: {
                1000: 'updateDifferent',
              },
            },
            updateDifferent: {
              invoke: {
                src: (context) => (send) => {
                  send(gameModel.events.CONTINUE());
                },
              },
              on: {
                CONTINUE: {
                  target: '#ready.idle',
                  actions: clearSelections,
                },
              },
            },
            matched: {
              after: {
                1000: 'updateMatch',
              },
            },
            updateMatch: {
              invoke: {
                src: (context) => (send) => {
                  send(gameModel.events.CONTINUE());
                },
              },
              on: {
                CONTINUE: {
                  target: '#ready.idle',
                  actions: updateContext,
                },
              },
            },
          },
        },
      },
    },
  },
});
