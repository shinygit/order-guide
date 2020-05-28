describe('register page', () => {
  it('register page should load', () => {
    cy.visit('/register')
    cy.contains('Email')
    cy.contains('Password')
    cy.contains('Confirm Password')
    cy.contains('Register')
  })

  it('errors if email in use', () => {
    cy.visit('/register')
    cy.get('input#email').type('hello@david.com')
    cy.get('input#password').type('12345678')
    cy.get('input#password2').type('12345678')
    cy.contains('Register').click()
    cy.contains('An account with that email already exists.')
  })

  it('errors on short password', () => {
    cy.visit('/register')
    cy.get('input#email').type('hello@david.com')
    cy.get('input#password').type('1234567')
    cy.get('input#password2').type('1234567')
    cy.contains('Register').click()
    cy.contains('Password must be at least 8 characters long')
  })

  it('errors on different passwords', () => {
    cy.visit('/register')
    cy.get('input#email').type('hello@david.com')
    cy.get('input#password').type('12345678')
    cy.get('input#password2').type('12345679')
    cy.contains('Register').click()
    cy.contains('Passwords must match.')
  })

  it('errors on bad email', () => {
    cy.visit('/register')
    cy.get('input#email').type('helo')
    cy.get('input#password').type('12345678')
    cy.get('input#password2').type('12345678')
    cy.contains('Register').click()
    cy.contains('There was a problem with your email.')
  })

  it('creates account successfully', () => {
    cy.visit('/register')
    cy.get('input#email').type('hello2@david.com')
    cy.get('input#password').type('12345678')
    cy.get('input#password2').type('12345678')
    cy.contains('Register').click()
    cy.contains('Please log in.')
    cy.get('input#email').type('hello2@david.com')
    cy.get('input#password').type('12345678')
    cy.contains('Login').click()
    cy.contains('new order date')
    cy.contains('SUPPLIERS')
    cy.contains('LOCATIONS')
  })
})
