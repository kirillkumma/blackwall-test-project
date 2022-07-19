import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { useSelector, useDispatch, questionsStore } from 'store'
import { Tag, Container, Spinner } from 'components'

const SpinnerWrapper = styled('div')`
  display: flex;
  justify-content: center;
`

const Error = styled('p')`
  color: red;
  text-align: center;
`

const Tags = styled('div')`
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
`

const Body = styled('div')`
  img {
    width: 100%;
    height: auto;
  }

  pre {
    padding: 0.5rem 1rem;
    background: black;
    color: white;
    font-family: monospace;
  }
`

const QuestionPage: FC = () => {
  const { question, loading, error } = useSelector((state) => state.questions)
  const dispatch = useDispatch()
  const params = useParams<{ id: string }>()

  useEffect(() => {
    dispatch(questionsStore.fetchOne(parseInt(params.id!)))
  }, [])

  if (loading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  if (question) {
    return (
      <Container>
        <h1 dangerouslySetInnerHTML={{ __html: question.title }} />
        <p dangerouslySetInnerHTML={{ __html: question.owner.display_name }} />
        <Tags>
          {question.tags.map((t) => (
            <Tag key={t}>#{t}</Tag>
          ))}
        </Tags>
        <Body dangerouslySetInnerHTML={{ __html: question.body }} />
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <Error>{error}</Error>
      </Container>
    )
  }

  return null
}

export default QuestionPage
