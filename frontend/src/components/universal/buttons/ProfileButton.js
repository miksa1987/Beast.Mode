import styled from 'styled-components'

import { ReactComponent as ProfileSVG } from '../../assets/profile.svg'

export default styled(ProfileSVG)`
  padding: 5px;
  width: auto;
  height: 2.5rem;
  padding-left: 10px;
  padding-right: 10px;
  background-color: ${props => props.active === true ? '#fe8019' : 'rgba(0, 0, 0, 0)'};
  cursor: pointer;
`
