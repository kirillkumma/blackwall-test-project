import { FC, ChangeEventHandler } from 'react'
import styled from 'styled-components'

const Search = styled('div')`
  padding: 0.5rem 1rem;
  border: 1px solid #eee;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Input = styled('input')`
  border: none;
  width: 100%;
  outline: none;
  flex: 1;
  font-size: 1rem;
`

export type SearchInputProps = {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const SearchInput: FC<SearchInputProps> = (props) => {
  return (
    <Search>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
        />
      </svg>
      <Input
        value={props.value}
        onChange={props.onChange}
        type="text"
        placeholder="Поиск"
      />
    </Search>
  )
}
