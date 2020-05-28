describe('login page', () => {
  beforeEach(() => {
    cy.login()
  })

  it('works with login command', () => {
    cy.visit('/').contains('SUPPLIERS')
  })
})
