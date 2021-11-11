import { createModel } from 'xstate/lib/model';

interface GameContext {
  // Inspired by Redux normalised state.
  // @see https://redux.js.org/usage/structuring-reducers/normalizing-state-shape#designing-a-normalized-state
  // cards: {
  //   [key: string]: {
  //     id: string;
  //   };
  // }
  cards: string[];
  stack: string[];
  selections: string[];
}

export const gameModel = createModel(
  {
    cards: [],
    stack: [],
    selections: [],
  } as GameContext,
  {
    events: {
      SELECTED: (cardId: string) => ({ cardId }),
      MATCH: (cardId: string) => ({ cardId }),
      NO_MATCH: () => ({}),
    },
  }
);

const updateStack = gameModel.assign(
  {
    cards: (context, event) => {
      return context.cards.filter((id) => id !== event.cardId);
    },
    stack: (context, event) => {
      return [...context.stack, event.cardId];
    },
  },
  'MATCH'
);

const saveSelection = gameModel.assign(
  {
    selections: (context, event) => {
      console.log('saving selection...');
      // Only allow two selections.
      if (context.selections.length === 2) {
        return context.selections;
      }

      return [...context.selections, event.cardId];
    },
  },
  'SELECTED'
);

const clearSelections = gameModel.assign(
  {
    selections: (context, event) => {
      // Only clear selections if there are two.
      if (context.selections.length === 2) {
        return [];
      }

      return context.selections;
    },
  },
  'NO_MATCH'
);

export const gameMachine = gameModel.createMachine({
  id: 'game',
  context: gameModel.initialContext,
  initial: 'idle',
  states: {
    idle: {
      on: {
        SELECTED: {
          target: 'checkForMatch',
          actions: saveSelection,
        },
      },
    },
    checkForMatch: {
      initial: 'checkingMatch',
      states: {
        checkingMatch: {
          invoke: {
            // We might need a cond to wait until the second selection is made.
            src: (context) => async (send) => {
              if (context.selections.length !== 2) {
                send('NO_MATCH');
              }

              if (context.selections[0] === context.selections[1]) {
                send(gameModel.events.MATCH(context.selections[0]));
              }
            },
            onError: {
              target: '#game.idle',
            },
          },
          on: {
            NO_MATCH: {
              target: '#game.idle',
              actions: clearSelections,
            },
            MATCH: {
              target: '#game.idle',
              actions: updateStack,
            },
          },
        },
      },
    },
    // on: {
    //   MATCH: 'markAsMatched',
    //   NO_MATCH: 'resetSelections',
    // },
    // markAsMatched: {
    //   after: {
    //     1000: 'addToStack',
    //   },
    // },
    // addToStack: {
    //   entry: [updateStack],
    // },
    // resetSelections: {},
  },
});
