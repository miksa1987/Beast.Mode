describe('Post functionality', function() {
  it('Reset database and create user, log in', function() {
    cy.request('GET', 'http://localhost:3001/resetonlyifyouarecompletelysureaboutthis')
    cy.request('POST', 'http://localhost:3001/users/new', { username: 'miksa', password: 'sekret' })
    cy.visit('http://localhost:3000')
    cy.get('#username').type('miksa')
    cy.get('#passwd').type('sekret')
    cy.get('#login').click()
  })

  it('Create new post and it shows on feed', function() {
    cy.get('#post-textarea').type('test')
    cy.get('#postbutton').click()
    cy.contains('test')
    cy.contains('No comments yet!')
  })

  it('Make a comment on new post', function() {
    cy.get('#comment-input').type('testcomment{enter}')
    cy.contains('testcomment')
  })

  it('Like the post', function() {
    cy.get('#likebutton').click()
    cy.contains('1')
  })

  it('Create new done workout', function() {
    cy.get('#post-textarea').type('5x5 test')
    cy.get('#workoutbutton').click()
    cy.get('#didworkoutbutton').click()
    cy.get('#postbutton').click()
    cy.contains('5x5 test')
  })

  it('Comment done workout', function() {
    cy.get('#comment-input:first').type('5x5{enter}')
    cy.contains('5x5')
  })

  it('Like done workout', function() {
    cy.get('#likebutton:first').click()
    cy.get('#likebutton:first').contains('1')
  })
})