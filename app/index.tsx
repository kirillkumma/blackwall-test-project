import { Suspense } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { Routes } from './routes'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
`

const Main = styled('main')`
  padding: 1rem;
`

export const App = () => {
  return (
    <>
      <GlobalStyles />
      <Suspense>
        <Main>
          <Routes />
        </Main>
      </Suspense>
    </>
  )
}
