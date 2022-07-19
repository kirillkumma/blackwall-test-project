import { ThunkDispatch, ThunkAction } from 'redux-thunk'

import { Question } from 'entities'

const FETCH_REQUEST = 'questions/fetch-request'
const FETCH_SUCCESS = 'questions/fetch-success'
const FETCH_FAILURE = 'questions/fetch-failure'

const FETCH_ONE_REQUEST = 'questions/fetch-one-request'
const FETCH_ONE_SUCCESS = 'questions/fetch-one-success'
const FETCH_ONE_FAILURE = 'questions/fetch-one-failure'

type FetchRequestAction = {
  type: typeof FETCH_REQUEST
}

type FetchSuccessAction = {
  type: typeof FETCH_SUCCESS
  payload: Question[]
}

type FetchFailureAction = {
  type: typeof FETCH_FAILURE
  error: string
}

type FetchOneRequestAction = {
  type: typeof FETCH_ONE_REQUEST
}

type FetchOneSuccessAction = {
  type: typeof FETCH_ONE_SUCCESS
  payload: Question
}

type FetchOneFailureAction = {
  type: typeof FETCH_ONE_FAILURE
  error: string
}

type Actions =
  | FetchRequestAction
  | FetchSuccessAction
  | FetchFailureAction
  | FetchOneRequestAction
  | FetchOneSuccessAction
  | FetchOneFailureAction

export type State = {
  items: Question[]
  question?: Question
  loading: boolean
  error?: string
}

const initialState: State = {
  items: [],
  question: undefined,
  loading: false,
  error: undefined,
}

export function reducer(state = initialState, action: Actions) {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, loading: true, error: undefined }
    case FETCH_SUCCESS:
      return { items: action.payload, loading: false }
    case FETCH_FAILURE:
      return { ...state, loading: false, error: action.error }
    case FETCH_ONE_REQUEST:
      return { ...state, loading: true, error: undefined }
    case FETCH_ONE_SUCCESS:
      return { ...state, question: action.payload, loading: false }
    case FETCH_ONE_FAILURE:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}

export function fetchRequest(): FetchRequestAction {
  return { type: FETCH_REQUEST }
}

export function fetchSuccess(payload: Question[]): FetchSuccessAction {
  return { type: FETCH_SUCCESS, payload }
}

export function fetchFailure(error: string): FetchFailureAction {
  return { type: FETCH_FAILURE, error }
}

export function fetchOneRequest(): FetchOneRequestAction {
  return { type: FETCH_ONE_REQUEST }
}

export function fetchOneSuccess(payload: Question): FetchOneSuccessAction {
  return { type: FETCH_ONE_SUCCESS, payload }
}

export function fetchOneFailure(error: string): FetchOneFailureAction {
  return { type: FETCH_ONE_FAILURE, error }
}

export interface QuestionRepository {
  search(params: {
    sort: string
    q: string
    order: string
  }): Promise<Question[]>

  get(id: number): Promise<Question>
}

interface Repositories {
  question: QuestionRepository
}

export const fetch = (params: { sort: string; q: string; order: string }) => {
  return async (
    dispatch: ThunkDispatch<State, Repositories, Actions>,
    _: () => State,
    repos: Repositories
  ) => {
    try {
      dispatch(fetchRequest())
      const items = await repos.question.search(params)
      dispatch(fetchSuccess(items))
    } catch (err) {
      if (err instanceof Error) {
        dispatch(fetchFailure(err.message))
      }
    }
  }
}

export const fetchOne = (id: number) => {
  return async (
    dispatch: ThunkDispatch<State, Repositories, Actions>,
    _: () => State,
    repos: Repositories
  ) => {
    try {
      dispatch(fetchOneRequest())
      const question = await repos.question.get(id)
      dispatch(fetchOneSuccess(question))
    } catch (err) {
      if (err instanceof Error) {
        dispatch(fetchOneFailure(err.message))
      }
    }
  }
}
