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

const Menubar = (props) => {
  const windowSize = useWindowSize()
  const orientation = useOrientation()
  const [search, resetSearch] = useField('text')
  const [searchType, setSearchType] = useState('')

  const menuStyle = {
    width: '100%',
    height: '55px',
    minWidth: '100%',
    maxWidth: '100%',
    padding: '0px 0px 0px 0px',
    position: 'fixed',
    top: '0px',
    left: '0px',
    backgroundColor: '#dd0000',
    zIndex: 1000
  }

  const itemStyle = {
    width: '100%',
    height: '55px',
    margin: '0px 0px 0px 0px',
    minWidth: '100%',
    maxWidth: '100%',
    padding: '0px 0px 0px 0px'
  }

  const barStyle = {
    width: orientation === 'portrait' ? (windowSize.width - 30) : (windowSize.width - 6*60 - 40)
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
    props.history.push('/dash')
  }

  const settings = () => {
    window.scrollTo(0, 0)
    props.history.push('/settings')
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
    return ( <div style={menuStyle}>
      <Menu style={itemStyle} secondary inverted color='red'>
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
        <Menu.Item onClick={settings}>
          <Icon name='settings' />
        </Menu.Item>
        <Menu.Item onClick={logout}>
          <Icon name='log out' />
        </Menu.Item>
      </Menu>
      <Menu style={itemStyle} inverted color='red'>
        <Menu.Item >
          <form onSubmit={doSearch}>
            <Input size='mini' style={barStyle} {...search} placeholder='Search' />
          </form>
        </Menu.Item>
      </Menu>
      <SearchPopup searchterm={search.value} setSearchItems={setSearchResults} resetSearch={resetSearch} />
    </div>)
  }

  return ( <div style={menuStyle}>
    <Menu style={itemStyle} inverted secondary color='red'>
      <Menu.Item onClick={home}>
        <Icon name='home' />
      </Menu.Item>
      <Menu.Item onClick={workouts}>
        <Icon name='hand rock' />
      </Menu.Item>
      <Menu.Item onClick={users}>
        <Icon name='user circle' />
      </Menu.Item>
      <Menu.Item >
        <form onSubmit={doSearch}>
          <Input size='mini' style={barStyle} {...search} placeholder='Search' />
        </form>
      </Menu.Item>
      <Menu.Item onClick={dash}>
        <Icon name='id card' />
      </Menu.Item>
      <Menu.Item onClick={settings}>
        <Icon name='settings' />
      </Menu.Item>
      <Menu.Item onClick={logout}>
        <Icon name='log out' />
      </Menu.Item>
    </Menu>
    <SearchPopup searchterm={search.value} setSearchItems={setSearchResults} resetSearch={resetSearch} />
  </div>)
}

export default connect(null, { logoutUser, setSearchResults, emptyFeed })(withRouter(Menubar))