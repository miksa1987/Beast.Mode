import styled from 'styled-components'

import { ReactComponent as LogoutSVG } from '../../assets/logout.svg'

export default styled(LogoutSVG)`
  padding: 5px;
  width: auto;
  height: 2.5rem;
  padding-left: 10px;
  padding-right: 10px;
  background-color: ${props => props.active === true ? '#fe8019' : 'rgba(0, 0, 0, 0)'};
  cursor: pointer;
`
