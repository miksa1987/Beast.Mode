describe('Workout functionality', function() {
  it('Reset database and create user, log in', function() {
    cy.request('GET', 'http://localhost:3001/resetonlyifyouarecompletelysureaboutthis')
    cy.request('POST', 'http://localhost:3001/users/new', { username: 'miksa', password: 'sekret' })
    cy.visit('http://localhost:3000')
    cy.get('#username').type('miksa')
    cy.get('#passwd').type('sekret')
    cy.get('#login').click()
  })

  it('Create new post and it shows on workouts', function() {
    cy.get('#post-textarea').type('5 test\n 5 test')
    cy.get('#workoutbutton').click()
    cy.get('#postbutton').click()
    cy.get('#workouts').click()
    cy.contains('WORKOUT BY MIKSA ')
    cy.contains('5 test')
  })
})