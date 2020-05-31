describe('main page behavior', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
  })

  it('loads current order for logged in user', () => {
    cy.contains('new order date')
    cy.contains('The Grocery Store')
    cy.contains('Bread Box')
    cy.contains('Wheat Bread')
    cy.contains('Special Note: Check the price on chocolate milk.')
    cy.contains('Cereal')
      .parent()
      .within((tr) => {
        cy.get('button').parent().contains('1')
      })
  })

  it('', () => {})
})

describe('main page behavior', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('redirects to login if not logged in', () => {
    cy.url().should('include', '/login')
  })
})
