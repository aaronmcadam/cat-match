describe('CatMatch', () => {
  beforeEach(() => cy.visit('/'));

  it('greets the player', () => {
    cy.findByRole('heading').should(
      'have.text',
      'Find the matching pairs and have fun!'
    );
  });

  it('lets the player match cards', () => {});
});
