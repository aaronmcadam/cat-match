describe('CatMatch', () => {
  beforeEach(() => cy.visit('/'));

  it('displays app name', () => {
    cy.findByRole('heading').should('have.text', 'CatMatch');
  });
});
