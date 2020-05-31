describe('delete order behavior', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
  })

  it('deletes order', () => {})
  cy.get('Delete this order').click()
  it('fails to delete order', () => {})
  cy.get('Delete this order').click()
  cy.contains('Click 3 more times to delete.')
  cy.get('Delete this order').click()
  cy.contains('Click 2 more times to delete.')
  cy.get('Delete this order').click()
  cy.contains('Click 1 more times to delete.')
  cy.get('Delete this order').click()
  cy.on('window:confirm', () => true)
  cy.contains('Last order still has items.')

  it('', () => {})

  it('', () => {})

  it('', () => {})

  it('', () => {})
})
