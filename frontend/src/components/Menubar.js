import React from 'react'
import styled from 'styled-components'
import { Icon , Input } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../reducers/currentUser'
import { setSearchResults } from '../reducers/searchResultsReducer'
import { emptyFeed } from '../reducers/feedReducer'
import useField from '../hooks/useField'
import SearchPopup from './search/SearchPopup'
import './Menubar.css'

const MenuContainer = styled.div`
  background-color: #aa3333;
  position: fixed;
  top: 0px; 
  left: 0px;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const MenuBar = styled.div`
  display: grid;
  grid-template: 4rem / 10rem 4rem 4rem 4rem 1fr 4rem 4rem; 

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

const MenuItem = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #aa3333;
  cursor: pointer;
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
          <h4>Beast.MODE</h4>
        </MenuItemOnlyDesktop>
        <MenuItem id='home' onClick={home}>
          <Icon name='home' color='yellow' />
        </MenuItem>
        <MenuItem id='workouts' onClick={workouts}>
          <Icon name='hand rock' color='yellow' />
        </MenuItem>
        <MenuItem id='users' onClick={users}>
          <Icon name='user circle' color='yellow' />
        </MenuItem>
        <MenuItemOnlyDesktop>
          <Form onSubmit={doSearch}>
            <Input id='globalsearch' {...search} placeholder='Search' fluid size='mini' />
          </Form>
        </MenuItemOnlyDesktop>
        <Placeholder />
        <MenuItem id='dash' onClick={dash}>
          <Icon name='id card' color='yellow' />
        </MenuItem>
        <MenuItem id='logout' onClick={logout}>
          <Icon name='log out' color='yellow' />
        </MenuItem>
      </MenuBar>

      <SearchBar>
        <Form onSubmit={doSearch}>
          <Input id='globalsearch' {...search} placeholder='Search' fluid size='mini' />
        </Form>
      </SearchBar>
      <SearchPopup searchterm={search.value} setSearchResults={props.setSearchResults} resetSearch={resetSearch} />
    </MenuContainer>
  )
}

export default connect(null, { logoutUser, setSearchResults, emptyFeed })(withRouter(Menubar))