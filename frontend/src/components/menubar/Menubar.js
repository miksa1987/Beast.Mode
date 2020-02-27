import React from 'react'
import styled from 'styled-components'
import { Input } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../reducers/currentUser'
import { setSearchResults } from '../../reducers/searchResultsReducer'
import { emptyFeed } from '../../reducers/feedReducer'
import useField from '../../hooks/useField'
import Logo from './Logo'
import SearchPopup from '../search/SearchPopup'


import HomeButton from '../universal/buttons/HomeButton'
import WorkoutButton from '../universal/buttons/WorkoutButton'
import PeopleButton from '../universal/buttons/PeopleButton'
import ProfileButton from '../universal/buttons/ProfileButton'
import LogoutButton from '../universal/buttons/LogoutButton'

const MenuContainer = styled.div`
  background-color: #fe8019;
  position: fixed;
  top: 0px; 
  left: 0px;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const MenuBar = styled.div`
  display: grid;
  grid-template: 4rem / 12rem 4rem 4rem 4rem 1fr 4rem 4rem; 
  align-items: center;
  padding-left: 10px;

  @media screen and (max-width: 600px) {
    grid-template: 4rem / 4rem 4rem 4rem 1fr 4rem 4rem;
  }
`

const SearchBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;

  @media screen and (min-width: 600px) {
    display: none;
  }
`

const MenuItemOnlyDesktop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 600px) {
    display: none;
  }
`

const Placeholder = styled.div`
  @media screen and (min-width: 600px) {
    display: none;
  }
`

const Form = styled.form`
  width: 100%;
`

const Menubar = (props) => {
  const [search, resetSearch] = useField('text')

  const gotoPage = (page) => {
    window.scrollTo(0, 0)
    props.history.push(page)
  }

  const home = () => gotoPage('/')
  const workouts = () => gotoPage('/workouts')
  const users = () => gotoPage('/users')
  const dash = () => gotoPage(`/profile/${props.userid}`)

  const logout = () => {
    props.emptyFeed()
    props.logoutUser()
    gotoPage('/')
  }

  const doSearch = (event) => {
    event.preventDefault()
    props.setSearchResults(search.value, 'all')
    gotoPage('/search')
    resetSearch()
  }

  return ( 
    <MenuContainer>
      <MenuBar>
        <MenuItemOnlyDesktop>
          <Logo />
        </MenuItemOnlyDesktop>
    
        <HomeButton id='home' onClick={home} />
        <WorkoutButton id='workouts' onClick={workouts} />
        <PeopleButton id='users' onClick={users} />    
    
        <MenuItemOnlyDesktop>
          <Form onSubmit={doSearch}>
            <span>
              <input width='100%' id='globalsearch' {...search} placeholder='Search' />
            </span>
          </Form>
        </MenuItemOnlyDesktop>
        <Placeholder />
    
        <ProfileButton id='dash' onClick={dash} />
        <LogoutButton id='logout' onClick={logout}active />
    
      </MenuBar>

      <SearchBar>
        <Form onSubmit={doSearch}>
          <span><input width='100%' id='globalsearch' {...search} placeholder='Search' /></span>
        </Form>
      </SearchBar>
      <SearchPopup searchterm={search.value} setSearchResults={props.setSearchResults} resetSearch={resetSearch} />
    </MenuContainer>
  )
}

export default connect(null, { logoutUser, setSearchResults, emptyFeed })(withRouter(Menubar))