describe('cat-match', () => {
  beforeEach(() => cy.visit('/'));

  it('displays welcome message', () => {
    cy.findByText('Welcome to cat-match!').should('be.visible');
  });
});
