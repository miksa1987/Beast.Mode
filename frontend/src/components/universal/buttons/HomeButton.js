import styled from 'styled-components'

import { ReactComponent as HomeSVG } from '../../assets/home.svg'

export default styled(HomeSVG)`
padding: 5px;
width: auto;
height: 2.5rem;
padding-left: 10px;
padding-right: 10px;
background-color: ${props => props.active === true ? '#fe8019' : 'rgba(0, 0, 0, 0)'};
`
