describe('User functionality', function() {
  it('Reset database and create users, log in', function() {
    cy.request('GET', 'http://localhost:3001/resetonlyifyouarecompletelysureaboutthis')
    cy.request('POST', 'http://localhost:3001/users/new', { username: 'miksa', password: 'sekret' })
    cy.request('POST', 'http://localhost:3001/users/new', { username: 'miksa1', password: 'sekret' })
    cy.visit('http://localhost:3000')
    cy.get('#username').type('miksa')
    cy.get('#passwd').type('sekret')
    cy.get('#login').click()
  })

  it('Can see both users in users view', function() {
    cy.get('#users').click()
    cy.contains('miksa')
    cy.contains('miksa1')
  })

  it('can add other user as friend and see him on own profile friend list', function() {
    cy.contains('miksa1').click({ force: true })
    cy.get('#addfriend-button').click()
    cy.contains('Remove friend')
    cy.get('#dash').click()
    cy.get('#dash-menu-friends').click()
    cy.contains('miksa1')
  })

  it('User appears on new friends friend list', function() {
    cy.contains('miksa1').click()
    cy.contains('miksa1')
    cy.get('#dash-menu-friends').click()
    cy.contains('miksa')
  })

  it('Make a post and log out', function() {
    cy.get('#home').click()
    cy.get('#post-textarea').type('test', { force: true })
    cy.get('#postbutton').click({ force: true })
    cy.contains('test')
    cy.get('#logout').click()
  })

  it('Log in as another user and friends post appears on feed', function() {
    cy.get('#username').type('miksa1')
    cy.get('#passwd').type('sekret')
    cy.get('#login').click()
    cy.contains('Create new')
    cy.contains('test')
  })
})