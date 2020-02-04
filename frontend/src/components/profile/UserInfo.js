import React from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'
import SettingsButton from '../universal/buttons/SettingsButton'
import Image from '../universal/Image'

const Layout = styled.div`
  display: grid;
  grid-template: 100% / 10rem 1fr 5rem;
  background-color: white;
  border: 1px solid #dddddd;
  padding: 7px;


  @media screen and (max-width: 600px) {
    grid-template: 100% / 5rem 1fr 4rem;
  }
`

const Buttons = styled.div`
  display: grid;
  grid-template: 4rem 4rem 1fr / 100%;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  white-space: pre-line;
  margin: 7px;
`

const UserInfo = (props) => {
  return (
    <Layout>
      <Image height='auto' width='100%' rounded src={props.picture && props.picture !== '' ? 
        props.picture : 'https://react.semantic-ui.com/images/wireframe/image.png'} 
        className='profileview-image' />
      <Info>
        <h2>{props.username}</h2>
        <p>{props.info}</p>
      </Info>
      <Buttons>
        {props.isOwnProfile === false && (props.isFriend ?
          <Button id='removefriend-button' color='red' onClick={() => props.removeFriend(props.currentProfile.id)} >
          Remove friend</Button>
          : <Button id='addfriend-button' color='green' onClick={() => props.addFriend(props.currentProfile.id)} >
          Add friend</Button>)}
        
        {props.isOwnProfile && <Button compact height='3rem' onClick={() => props.pushToHistory('/settings')}>
          <SettingsButton />
        </Button>}
        <div />
      </Buttons>
    </Layout>
  )
}

export default UserInfo