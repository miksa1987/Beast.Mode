const delay = function(ms){
  return new Promise(res => setTimeout(res, ms))
}

describe('Beast.MODE general functionality', function() {
  it('Reset database', function() {
    cy.request('GET', 'http://localhost:3001/resetonlyifyouarecompletelysureaboutthis')
  })

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
  })

  it('Can log in', function() {
    cy.contains('Beast.MODE')
    cy.get('#username').type('miksa')
    cy.get('#passwd').type('verysekret')
    cy.get('#login').click()
    cy.contains('Create new')
  })

  it('Can create new workout', function() {
    cy.get('#post-textarea').type('5x5 pull ups')
    cy.get('#workoutbutton').click()
    cy.get('#postbutton').click()
    cy.get('#workouts').click()
    cy.contains('5x5 pull ups')
    cy.contains('WORKOUT BY MIKSA')
  })

  it('Can see self in users page', function() {
    cy.get('#users').click()
    cy.contains('miksa')
  })

  it('Can see own profile', function() {
    cy.get('#dash').click()
    cy.contains('miksa')
    cy.contains('TEST')
  })

  it('Can see own workout in workouts and profile', function() {
    cy.get('#dash-menu-workouts').click()
    cy.contains('5x5 pull ups')
  })

  it('Can see own activity and posted workout', function() {
    cy.get('#dash-menu-activity').click()
    cy.contains(`miksa's activity`)
    cy.contains('miksa created a workout')
  })

  it('Can view own workout from activity', function() {
    cy.contains('miksa created a workout').click()
    cy.contains('Start')
  })

  it('Can do the actual workout and view is ok', function() {
    cy.contains('Start').click()
    cy.contains('Workout time')
    cy.contains('Exercise 1')
    cy.contains('Set 1')
    cy.contains('How many reps did you do?')
    cy.get('#workout-increasebutton').click()
    cy.contains('6 reps')
    cy.get('#workout-decreasebutton').click()
    cy.contains('5 reps')
    cy.get('#workout-exercisedonebutton').click()
    cy.get('#workout-exercisedonebutton').click()
    cy.contains('Set 3')
    cy.get('#workout-exercisedonebutton').click()
    cy.get('#workout-exercisedonebutton').click()
    cy.get('#workout-exercisedonebutton').click()
    cy.contains('Workout done!')
  })

  it('Can save the done workout and it shows on feed', function() {
    cy.get('#workoutdone-savebutton').click()
    cy.contains('miksa')
    cy.get('#dash-menu-doneworkouts').click()
    cy.contains('did a workout')
    cy.contains('5x5 pull ups')
    cy.get('#home').click()
    cy.contains('did a workout')
  })

  it('Can make a new post', function() {
    cy.get('#post-textarea').type('TEST')
    cy.get('#postbutton').click()
    cy.contains('miksa')
    cy.contains('TEST')
  })

  it('New post shows in profile', function() {
    cy.get('#dash').click()
    cy.contains('TEST')
  })
})