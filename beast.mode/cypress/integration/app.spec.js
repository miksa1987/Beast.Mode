describe('Beast.MODE', function() {
  it('Login page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Beast.MODE')
  })

  it('New user form appears', function() {
    cy.get('#newuser').click()
    cy.contains('Create new user')
  })

  it('Can create new user', function() {
    cy.get('#username').type('miksa')
    cy.get('#email').type('m@m.com')
    cy.get('#info').type('TEST')
    cy.get('#passwd').type('verysekret')
    cy.get('#passwd2').type('verysekret')
    cy.get('#submit').click()
    cy.contains('Beast.MODE')
  })

  it('Can log in', function() {
    cy.get('#username').type('miksa')
    cy.get('#passwd').type('verysekret')
    cy.get('#login').click()
  })
})