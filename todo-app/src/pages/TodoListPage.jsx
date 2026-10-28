import { styled } from 'styled-components'

import { PageTitle } from '../styles/common'
import { useState } from 'react'
import TodoList from '../components/TodoList'
import TodoForm from '../components/TodoForm'

const Filters = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`

const FilterButton = styled.button`
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid #d5dae3;
  cursor: pointer;
  background: ${({ $active }) => ($active ? '#4f6ef7' : '#fff')};
  color: ${({ $active }) => ($active ? '#fff' : '#444')};
`

const FILTERS = [
  { key: 'all', label: '전체' },
  { key: 'active', label: '진행 중' },
  { key: 'done', label: '완료' },
]

function TodoListPage() {
    const [filter, setFilter] = useState('all')


    const todos = [
        {
            id: 1,
            title: '리액트 복습',
            category: '공부'
        },
        {
            id: 2,
            title: '점심 메뉴 고르기',
            category: '개인'
        }
    ]

    return (
        <>
            <PageTitle>할 일 목록</PageTitle>
            <TodoForm />

            <Filters>
                {
                    FILTERS.map(({key, label}) => {
                        return (
                            <FilterButton
                                key={key}
                                onClick={()=>{setFilter(key)}}
                                $active={filter === key}
                            >
                                {label}
                            </FilterButton>
                        )
                    })
                }
            </Filters>

            <TodoList todos={todos} />
        </>
    )
}

export default TodoListPage