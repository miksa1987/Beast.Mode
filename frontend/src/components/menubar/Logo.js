import React from 'react'
import styled from 'styled-components'

const Image = styled.img`
  width: 100%;
  height: auto;
`

const Logo = () => (
  <div>
    <Image src='/img/logo.png' alt='beast.MODE' />
  </div>
)

export default Logo