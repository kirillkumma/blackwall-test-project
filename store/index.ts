import axios from 'axios'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {
  useSelector as _useSelector,
  useDispatch as _useDispatch,
  TypedUseSelectorHook,
} from 'react-redux'

import { QuestionRepository } from 'repositories'
import { API_URL } from 'config'

import * as questionsStore from './questions'

axios.defaults.baseURL = API_URL

const question = new QuestionRepository(axios)

export const store = createStore(
  combineReducers({
    questions: questionsStore.reducer,
  }),
  applyMiddleware(
    thunk.withExtraArgument({
      question,
    })
  )
)

type RootState = ReturnType<typeof store.getState>

type Dispatch = typeof store.dispatch

export const useSelector: TypedUseSelectorHook<RootState> = _useSelector

export const useDispatch: () => Dispatch = _useDispatch

export { questionsStore }
