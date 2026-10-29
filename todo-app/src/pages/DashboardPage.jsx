import styled from "styled-components"
import { Link } from "react-router-dom"

import { Card, PageTitle } from "../styles/common"
import { useTodoStore } from "../store/useTodoStore"
import { CATEGORIES } from "../constants"
import TodoList from "../components/TodoList"

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
`

const StatNumber = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #4f6ef7;
`

const SectionTitle = styled.h2`
  font-size: 18px;
  margin: 24px 0 12px;
`

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`

const CategoryCard = styled(Link)`
  display: block;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-2px);
  }
`

function DashboardPage() {

    const todos = useTodoStore((state)=>state.todos)

    const total = todos.length
    const doneTotal = todos.filter((todo)=>todo.done).length
    const remaining = total - doneTotal

    const recent = todos.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)).slice(0,3)

    return (
        <>
            <PageTitle>대시보드</PageTitle>

            <Stats>
                <Card>
                    <div>전체</div>
                    <StatNumber>{total}</StatNumber>
                </Card>
                <Card>
                    <div>완료</div>
                    <StatNumber>{doneTotal}</StatNumber>
                </Card>
                <Card>
                    <div>남은 일</div>
                    <StatNumber>{remaining}</StatNumber>
                </Card>
            </Stats>

            <SectionTitle>카테고리별</SectionTitle>
            <CategoryGrid>
              {
                Object.entries(CATEGORIES).map(([key, { label }])=>{
                  const count = todos.filter((todo)=>todo.category === key).length

                  return (
                    <CategoryCard key={key} to={`/category/${key}`}>
                      <div style={{ fontSize: 28 }}>🗃️</div>
                      <div>{label}</div>
                      <div style={{ color: '#8b93a1' }}>{count}개</div>
                    </CategoryCard>
                  )
                })
              }
            </CategoryGrid>

            <SectionTitle>최근 할 일</SectionTitle>
            <TodoList todos={recent} />
        </>
    )
}

export default DashboardPage