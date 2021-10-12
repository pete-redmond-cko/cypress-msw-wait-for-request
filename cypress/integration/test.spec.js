describe('Posts', () => {
    it('should load a list of posts', () => {
      cy.visit('http://localhost:3000/');
      cy.contains('Getting started with react').should('exist');
      cy.contains('Using MSW with cypress').should('exist');
    })
  })