import styled from 'styled-components'

import { ReactComponent as WorkoutSVG } from '../../assets/workout.svg'

export default styled(WorkoutSVG)`
  padding: 5px;
  width: auto;
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
  background-color: ${props => props.active === true ? '#fe8019' : 'white'};
`
