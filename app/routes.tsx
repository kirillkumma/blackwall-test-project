import { lazy } from 'react'
import { Routes as _Routes, Route } from 'react-router-dom'

import { URLs } from './urls'

const HomePage = lazy(() => import('pages/home'))
const QuestionPage = lazy(() => import('pages/question'))

export const Routes = () => {
  return (
    <_Routes>
      <Route path={URLs.HOME} element={<HomePage />} />
      <Route path={`${URLs.QUESTIONS}/:id`} element={<QuestionPage />} />
    </_Routes>
  )
}
