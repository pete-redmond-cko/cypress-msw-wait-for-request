describe('My First Test', () => {
    it('Does not do much!', () => {
      cy.visit('http://localhost:3000/');
      cy.contains('save to reload').should('exist');
    })
  })