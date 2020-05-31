describe('login page', () => {
  it('login page should load', () => {
    cy.visit('/login')
    cy.contains('Email')
    cy.contains('Password')
    cy.contains('Login')
  })

  it('login page should warn with unknown user', () => {
    cy.visit('/login')
    cy.get('input#email').type('helo@davd.com')
    cy.get('input#password').type('12345678')
    cy.contains('Login').click()
    cy.contains('Invalid Email')
  })

  it('login page should warn with wrong password', () => {
    cy.visit('/login')
    cy.get('input#email').type('hello@david.com')
    cy.get('input#password').type('1234568')
    cy.contains('Login').click()
    cy.contains('Incorrect password.')
  })

  it('register link should navigate to register page', () => {
    cy.visit('/login')
    cy.contains('Register').click()
    cy.url().should('include', '/register')
  })

  it('login page should succesfully login with a known user good password', () => {
    cy.visit('/login')
    cy.get('input#email').type('hello@david.com')
    cy.get('input#password').type('12345678')
    cy.contains('Login').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })
})
