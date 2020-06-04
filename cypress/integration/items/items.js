describe('item behavior', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
  })

  it('creates item', () => {
    cy.contains('New Item')
      .click()
      .get('[name="itemName"]')
      .type('Eggs')
      .get('[name="buildTo"]')
      .type('12')
      .get('[name="location"]')
      .type('Fridge')
      .get('[name="supplier"]')
      .select('The Grocery Store')
    cy.contains('Add Item').click()
    cy.contains('Eggs')
      .parent()
      .should('contain', '12')
      .and('contain', 'Fridge')
      .and('contain', 'The Grocery Store')
  })

  it('changes item count', () => {
    cy.get('[data-cy=decreaseOrderAmount]')
      .first()
      .click()
      .parent()
      .contains('0')
    cy.get('[data-cy=increaseOrderAmount]')
      .first()
      .click()
      .parent()
      .contains('1')
    cy.get('[data-cy=increaseOrderAmount]')
      .first()
      .click()
      .parent()
      .contains('2')
    cy.get('[data-cy=decreaseOrderAmount]')
      .first()
      .click()
      .parent()
      .contains('1')
  })
  it('edits item', () => {
    cy.wait(500)
    cy.contains('Sugar')
      .parent()
      .within((tr) =>
        cy
          .get('td')
          .first()
          .within((td) => cy.get('button').click())
      )
    cy.contains('Edit')
      .click()

      .get('[name="itemName"]')
      .clear()
      .type('Sugar2')
      .get('[name="supplier"]')
      .select('Baker')
      .get('[name="buildTo"]')
      .clear()
      .type('3')
      .get('[name="location"]')
      .clear()
      .type('Bread Box')
      .get('[name="productNumber"]')
      .clear()
      .type('123abc')
      .get('[name="unitSize"]')
      .clear()
      .type('1lb')
      .get('[name="unitPriceInPennies"]')
      .clear()
      .type('12.34')
      .get('[name="quantityOnHand"]')
      .type('33')
      .get('[name="quantityReceived"]')
      .type('22')
      .get('[name="itemNote"]')
      .clear()
      .type('asdf')
      .get('[name="specialNote"]')
      .type('jkl;')
      .get('[name="receivingNote"]')
      .type('lmno')
    cy.contains('Save').click()
    cy.contains('Sugar2')
    cy.contains('Baker')
    cy.contains(/^3$/)
    cy.contains(/^123abc$/)
    cy.contains(/^1lb$/)
    cy.contains('$12.34')
    cy.contains(/^33$/)
    cy.contains(/^22$/)
    cy.contains(/^asdf$/)
    cy.contains(/^jkl;$/)
    cy.contains(/^lmno$/)
  })

  it('toggling market price works', () => {
    cy.wait(500)
    cy.contains('Wheat Bread')
      .parent()
      .within((tr) =>
        cy
          .get('td')
          .first()
          .within((td) => cy.get('button').click())
      )
    cy.contains('Edit').click()
    cy.get('[data-cy=toggleMarketPriceButton]').contains('No')
    cy.get('[data-cy=toggleMarketPriceButton]').click()
    cy.get('[data-cy=toggleMarketPriceButton]').contains('Yes')

    cy.contains('Save').click()
    cy.wait(500)
    cy.contains('Wheat Bread')
      .parent()
      .within((tr) => {
        cy.contains('Baker')
      })

    cy.contains('Wheat Bread')
      .parent()
      .within((tr) => {
        cy.get('[name="supplierName"]').select('Neighbor')
      })

    cy.contains('Wheat Bread')
      .parent()
      .within((tr) => {
        cy.contains('Neighbor')
      })
  })

  it('deletes item', () => {
    cy.wait(500)
    cy.contains('Wheat Bread')
      .parent()
      .within((tr) =>
        cy
          .get('td')
          .first()
          .within((td) => cy.get('button').click())
      )
    cy.contains('Edit').click()
    cy.contains(/^Del$/).click()
    cy.on('window:confirm', () => true)
    cy.contains('Wheat Bread').should('not.exist')
  })
})