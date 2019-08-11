import React, { useState } from 'react'
import { Input, Menu, Icon, Select } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../reducers/currentUser'
import { setSearchResults } from '../reducers/searchResultsReducer'
import { emptyFeed } from '../reducers/feedReducer'
import useWindowSize from '../hooks/useWindowSize'
import useOrientation from '../hooks/useOrientation'
import useField from '../hooks/useField'
import SearchPopup from './search/SearchPopup'
import './Menubar.css'

const Menubar = (props) => {
  const windowSize = useWindowSize()
  const orientation = useOrientation()
  const [search, resetSearch] = useField('text')

  const barStyle = {
    width: orientation === 'portrait' ? (windowSize.width - 30) : (windowSize.width - 5*60 - 160)
  }

  const home = () => {
    window.scrollTo(0, 0)
    props.history.push('/')
  }

  const workouts = () => {
    window.scrollTo(0, 0)
    props.history.push('/workouts')
  }

  const users = () => {
    window.scrollTo(0, 0)
    props.history.push('/users')
  }

  const dash = () => {
    window.scrollTo(0, 0)
    props.history.push(`/profile/${props.userid}`)
  }

  const logout = () => {
    window.scrollTo(0, 0)
    props.history.push('/')
    props.emptyFeed()
    props.logoutUser()
  }

  const doSearch = (event) => {
    event.preventDefault()
    props.setSearchResults(search.value, 'all')
    props.history.push('/search')
    window.scrollTo(0, 0)
    resetSearch()
  }

  if (orientation === 'portrait') {
    return ( <div className='menubar-component menubar-component-device full-width'>
      <Menu className='full-width' secondary inverted color='red'>
        <Menu.Item onClick={home}>
          <Icon name='home' />
        </Menu.Item>
        <Menu.Item onClick={workouts}>
          <Icon name='hand rock' />
        </Menu.Item>
        <Menu.Item onClick={users}>
          <Icon name='user circle' />
        </Menu.Item>
        <Menu.Item onClick={dash}>
          <Icon name='id card' />
        </Menu.Item>
        <Menu.Item position='right' onClick={logout}>
          <Icon name='log out' />
        </Menu.Item>
      </Menu>
      <Menu className='full-width menurow2' inverted color='red'>
        <Menu.Item >
          <form onSubmit={doSearch}>
            <Input size='mini' style={barStyle} {...search} placeholder='Search' />
          </form>
        </Menu.Item>
      </Menu>
      <SearchPopup searchterm={search.value} setSearchItems={setSearchResults} resetSearch={resetSearch} />
    </div>)
  }

  return ( <div className='menubar-component menubar-component-device'>
    <Menu className='full-width' inverted secondary color='red'>
      <Menu.Item>
        <h4>Beast.MODE</h4>
      </Menu.Item>
      <Menu.Item id='home' onClick={home}>
        <Icon name='home' />
      </Menu.Item>
      <Menu.Item id='workouts' onClick={workouts}>
        <Icon name='hand rock' />
      </Menu.Item>
      <Menu.Item id='users' onClick={users}>
        <Icon name='user circle' />
      </Menu.Item>
      <Menu.Item >
        <form onSubmit={doSearch}>
          <Input id='globalsearch' className='menu-searchbar' size='mini' style={barStyle} {...search} placeholder='Search' />
        </form>
      </Menu.Item>
      <Menu.Item id='dash' onClick={dash}>
        <Icon name='id card' />
      </Menu.Item>
      <Menu.Item id='logout' onClick={logout}>
        <Icon name='log out' />
      </Menu.Item>
    </Menu>
    <SearchPopup searchterm={search.value} setSearchItems={setSearchResults} resetSearch={resetSearch} />
  </div>)
}

export default connect(null, { logoutUser, setSearchResults, emptyFeed })(withRouter(Menubar))