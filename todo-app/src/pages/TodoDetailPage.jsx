import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'

import { PageTitle, Card, Badge, Button, EmptyText } from '../styles/common'
import { useTodoStore } from '../store/useTodoStore'
import { CATEGORIES } from '../constants'

const Field = styled.div`
  margin-bottom: 16px;
`

const Label = styled.div`
  font-size: 13px;
  color: #8b93a1;
  margin-bottom: 4px;
`

const Input = styled.input`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #d5dae3;
  border-radius: 8px;
`

const Select = styled.select`
  padding: 8px 10px;
  border: 1px solid #d5dae3;
  border-radius: 8px;
  background: #fff;
`

const Buttons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 20px;
`

function TodoDetailPage() {
  // URL의 :id 부분을 추출
  const { id } = useParams()

  const todo = useTodoStore((state)=>state.todos.find((todo)=>todo.id === id))

  // 존재하지 않는 id인 경우 표시
  if (!todo) {
    return (
      <>
        <PageTitle>할 일을 찾을 수 없어요</PageTitle>
        <Card>
          <EmptyText>삭제되었거나 잘못된 주소입니다.</EmptyText>
          <Link to="/todos">← 목록으로</Link>
        </Card>
      </>
    )
  }

  return (
    <>
      <PageTitle>할 일 상세</PageTitle>
      <Card>
        <Field>
          <Label>제목</Label>
          <div style={{ fontSize: 20, fontWeight: 600 }}>{todo.title}</div>
        </Field>

        <Field>
          <Label>메모</Label>
          <div>{todo.memo}</div>
        </Field>

        <Field>
          <Label>카테고리</Label>
          {/* 카테고리 페이지로 이동 */}
          <Link to={`/category/${todo.category}`}>
            <Badge>{ CATEGORIES[todo.category]?.label ?? todo.category}</Badge>
          </Link>
        </Field>

        <Field>
          <Label>상태</Label>
          <div>{todo.done ? "완료" : "진행중"}</div>
        </Field>

        <Field>
          <Label>생성일</Label>
          <div>{todo.createdAt}</div>
        </Field>

        <Buttons>
          <Button>
            {todo.done ? "진행중으로 변경" : "완료 처리"}
          </Button>
          <Button $variant="ghost">수정</Button>
          <Button $variant="danger">삭제</Button>
          <Button $variant="ghost">⬅️ 뒤로</Button>
        </Buttons>
      </Card>
    </>
  )
}

export default TodoDetailPage