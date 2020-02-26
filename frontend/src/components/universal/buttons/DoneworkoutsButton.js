import styled from 'styled-components'

import { ReactComponent as DoneworkoutsSVG } from '../../assets/doneworkouts.svg'

export default styled(DoneworkoutsSVG)`
  padding: 5px;
  width: auto;
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
  background-color: ${props => props.active === true ? '#fe8019' : 'white'};
`
