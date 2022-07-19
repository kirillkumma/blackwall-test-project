import { FC, ReactNode } from 'react'
import styled from 'styled-components'

const Wrapper = styled('div')`
  max-width: 1200px;
  margin: 0 auto;
`

export const Container: FC<{ children?: ReactNode }> = (props) => {
  return <Wrapper>{props.children}</Wrapper>
}
