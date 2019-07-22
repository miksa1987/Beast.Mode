import React, { useState } from 'react'
import { Input, Menu, Icon, Select } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../reducers/currentUser'
import { setSearchItems } from '../reducers/searchResultsReducer'
import useWindowSize from '../hooks/useWindowSize'
import useField from '../hooks/useField'
import SearchPopup from './search/SearchPopup'

const Menubar = (props) => {
  const windowSize = useWindowSize()
  const [search, resetSearch] = useField('text')
  const [searchType, setSearchType] = useState('')

  const searchOptions = [
    { key: 'all', text: 'All', value: 'all' },
    { key: 'user', text: 'Users', value: 'user' },
    { key: 'post', text: 'Posts', value: 'post' },
    { key: 'workout', text: 'Workouts', value: 'workout' },
    { key: 'doneworkout', text: 'Done workouts', value: 'doneworkout' }
  ]
  const menuStyle = {
    width: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    position: 'fixed',
    top: '0px',
    left: '0px',
    backgroundColor: '#dd0000'
  }
  const selectStyle = {
    width: '25%'
  }

  const barStyle = {
    width: (windowSize.width - 6*55 - 40)
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
    props.logoutUser()
  }

  const doSearch = (event) => {
    event.preventDefault()
    console.log(searchType)
    props.setSearchItems(search.value, 'all')
    props.history.push('/search')

    resetSearch()
  }

  return ( <div style={menuStyle}>
    <Menu inverted color='red'>
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
          <Input size='mini' style={barStyle} {...search} />
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
    <SearchPopup searchterm={search.value} setSearchItems={setSearchItems} resetSearch={resetSearch} />
  </div>)
}

export default connect(null, { logoutUser, setSearchItems })(withRouter(Menubar))