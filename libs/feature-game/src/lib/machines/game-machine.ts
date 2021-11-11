import { Photo } from '@cat-match/data-access';
import { createModel } from 'xstate/lib/model';

export enum GameCardStatus {
  DEFAULT = 'DEFAULT',
  SELECTED = 'SELECTED',
  REMOVED = 'REMOVED',
}

// Cards are equal by their photo's ID
export interface Card {
  id: string;
  status: GameCardStatus;
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
      MATCH: (cardIds: string[]) => ({ cardIds }),
      NO_MATCH: () => ({}),
      PLAY_AGAIN: () => ({}),
      WAITING_FOR_OTHER_SELECTION: () => ({}),
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
          status: GameCardStatus.DEFAULT,
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
        [event.cardIds[0]]: {
          ...context.cards[event.cardIds[0]],
          status: GameCardStatus.REMOVED,
        },
        [event.cardIds[1]]: {
          ...context.cards[event.cardIds[1]],
          status: GameCardStatus.REMOVED,
        },
      };
    },
    stack: (context, event) => {
      return [...context.stack, ...event.cardIds];
    },
    selections: (context, event) => {
      return [];
    },
  },
  'MATCH'
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
          status: GameCardStatus.SELECTED,
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
          status: GameCardStatus.DEFAULT,
        },
        [context.selections[1]]: {
          ...context.cards[context.selections[1]],
          status: GameCardStatus.DEFAULT,
        },
      };
    },
  },
  'NO_MATCH'
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

// We should delay updating the state for a little while so that
// the player can see what the card photo is before it's hidden again.
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
              target: 'checkMatch',
            },
            PLAY_AGAIN: {
              actions: resetStack,
              target: '#game.fetchingPhotos',
            },
          },
        },
        checkMatch: {
          initial: 'checking',
          states: {
            checking: {
              invoke: {
                // We could use a condition to wait until the second selection is made.
                src: (context) => (send) => {
                  if (context.selections.length === 1) {
                    return send(gameModel.events.WAITING_FOR_OTHER_SELECTION());
                  }

                  const [selection1, selection2] = context.selections;

                  if (
                    context.cards[selection1].photo.id ===
                    context.cards[selection2].photo.id
                  ) {
                    send(gameModel.events.MATCH(context.selections));
                  } else {
                    send(gameModel.events.NO_MATCH());
                  }
                },
              },
              on: {
                WAITING_FOR_OTHER_SELECTION: {
                  target: '#ready.idle',
                },
                NO_MATCH: {
                  target: '#ready.idle',
                  actions: clearSelections,
                },
                MATCH: {
                  target: '#ready.idle',
                  actions: updateContext,
                },
              },
            },
          },
        },
        finished: {
          type: 'final',
        },
      },
    },
  },
});
