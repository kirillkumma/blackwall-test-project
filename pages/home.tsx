import { ChangeEventHandler, FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSearchParams, NavLink } from 'react-router-dom'

import { questionsStore, useDispatch, useSelector } from 'store'
import { Container, SearchInput, Tag, Spinner } from 'components'

const Search = styled('div')`
  max-width: 320px;
  margin: 0 auto 1.5rem auto;
`

const Table = styled('table')`
  text-align: left;
  border-collapse: collapse;
`

const TableRow = styled('tr')`
  border-bottom: 1px solid #eee;
`

const HeadCell = styled('th')`
  padding: 1rem 0;
`

const TagCell = styled('td')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.5rem;
  padding: 1rem 0;
`

const Filters = styled('div')`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const Select = styled('select')`
  font-size: 1rem;
`

const OrderButton = styled('button')`
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 0.25rem;

  &[data-active='true'] {
    background: #eee;
  }
`

const SpinnerWrapper = styled('div')`
  display: flex;
  justify-content: center;
`

const Error = styled('p')`
  color: red;
  text-align: center;
`

const HomePage: FC = () => {
  const { items, loading, error } = useSelector((state) => state.questions)
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams({
    search: '',
    order: 'desc',
    sort: 'relevance',
  })
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(
    undefined
  )

  const onSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchParams({
      search: e.target.value,
      sort: searchParams.get('sort')!,
      order: searchParams.get('order')!,
    })
  }

  const onSortChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSearchParams({
      search: searchParams.get('search')!,
      sort: e.target.value,
      order: searchParams.get('order')!,
    })
  }

  const onOrderChange = (order: string) => () => {
    setSearchParams({
      search: searchParams.get('search')!,
      sort: searchParams.get('sort')!,
      order,
    })
  }

  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    const newTimeoutId = setTimeout(() => {
      dispatch(
        questionsStore.fetch({
          sort: searchParams.get('sort')!,
          q: searchParams.get('search')!,
          order: searchParams.get('order')!,
        })
      )
    }, 500)

    setTimeoutId(newTimeoutId)

    return () => clearTimeout(timeoutId)
  }, [searchParams])

  return (
    <>
      <Search>
        <SearchInput
          value={searchParams.get('search')!}
          onChange={onSearchChange}
        />
      </Search>
      {error && <Error>{error}</Error>}
      {loading && items.length == 0 && (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      )}
      {items.length > 0 && (
        <Container>
          <Filters>
            <Select onChange={onSortChange} value={searchParams.get('sort')!}>
              <option value="activity">Активность</option>
              <option value="votes">Количество голосов</option>
              <option value="creation">Дата создания</option>
              <option value="relevance">Релевантность</option>
            </Select>
            <OrderButton
              type="button"
              onClick={onOrderChange('desc')}
              data-active={searchParams.get('order') === 'desc'}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ transform: 'rotate(-90deg)' }}
              >
                <path
                  fill="currentColor"
                  d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
                />
              </svg>
            </OrderButton>
            <OrderButton
              type="button"
              onClick={onOrderChange('asc')}
              data-active={searchParams.get('order') === 'asc'}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ transform: 'rotate(90deg)' }}
              >
                <path
                  fill="currentColor"
                  d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
                />
              </svg>
            </OrderButton>
          </Filters>
          <Table>
            <thead>
              <TableRow>
                <HeadCell>Автор вопроса</HeadCell>
                <HeadCell>Тема</HeadCell>
                <HeadCell>Количество ответов</HeadCell>
                <HeadCell>Теги</HeadCell>
              </TableRow>
            </thead>
            <tbody>
              {items.map((q) => (
                <TableRow key={q.question_id}>
                  <td
                    dangerouslySetInnerHTML={{ __html: q.owner.display_name }}
                  />
                  <td>
                    <NavLink
                      to={`/questions/${q.question_id}`}
                      dangerouslySetInnerHTML={{ __html: q.title }}
                    />
                  </td>
                  <td>{q.answer_count}</td>
                  <TagCell>
                    {q.tags.map((t) => (
                      <Tag key={t}>#{t}</Tag>
                    ))}
                  </TagCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </>
  )
}

export default HomePage
