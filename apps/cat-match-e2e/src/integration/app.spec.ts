const limit = 12;
const url = `https://api.thecatapi.com/v1/images/search?limit=${limit}&order=RANDOM`;
const staticResponse = [
  {
    id: 'cat-1',
    url: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
  },
  {
    id: 'cat-2',
    url: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1020&q=80',
  },
];

describe('CatMatch', () => {
  it('greets the player', () => {
    cy.visit('/');

    cy.findByRole('heading').should(
      'have.text',
      'Find the matching pairs and have fun!'
    );
  });

  it('adds matching pairs to the stack', () => {
    // Stub the API response.
    cy.intercept('GET', url, {
      statusCode: 200,
      body: staticResponse,
    }).as('cats');
    // Make randomness deterministic.
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.Math, 'random').returns(0.5);
      },
    });
    cy.wait('@cats');

    cy.findAllByTestId('game-card').as('cards');
    // Make a selection
    cy.get('@cards').eq(0).click();
    // Make another selection
    cy.get('@cards').eq(2).click();

    // There should be 1 pair.
    cy.findByTestId('heading-pair-count').should(
      'have.text',
      '1 pair matched!'
    );
    // There should be two cards left
    cy.findAllByTestId('card-default').should('have.length', 2);
  });

  it('resets unmatching pairs to let the player try again', () => {
    // Stub the API response.
    cy.intercept('GET', url, {
      statusCode: 200,
      body: staticResponse,
    }).as('cats');
    // Make randomness deterministic.
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.Math, 'random').returns(0.5);
      },
    });
    cy.wait('@cats');

    cy.findAllByTestId('game-card').as('cards');
    // Make a selection
    cy.get('@cards').eq(0).click();
    // Make another selection
    cy.get('@cards').eq(1).click();

    // There should be no pairs.
    cy.findByTestId('heading-pair-count').should(
      'have.text',
      '0 pairs matched!'
    );
    // All four cards should be default.
    cy.findAllByTestId('card-default').should('have.length', 4);
  });

  it('tells the player when the game finishes and lets them play again', () => {
    // Stub the API response.
    cy.intercept('GET', url, {
      statusCode: 200,
      body: staticResponse,
    }).as('cats');
    // Make randomness deterministic.
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.Math, 'random').returns(0.5);
      },
    });
    cy.wait('@cats');

    cy.findAllByTestId('game-card').as('cards');

    // Match the first pair
    cy.get('@cards').eq(0).click();
    cy.get('@cards').eq(2).click();

    // Wait for the pair to be matched.
    // We should wait for the first pair elements to be removed instead of waiting manually.
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);

    // Match the second pair
    cy.get('@cards').eq(0).click();
    cy.get('@cards').eq(1).click();

    // There should be a message.
    cy.findByText(/completed the game/).should('exist');
    // The player should be able to play again.
    cy.findByRole('button').click();
    // A new game should have four cards.
    cy.findAllByTestId('game-card').should('have.length', 4);
  });
});
