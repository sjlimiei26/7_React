import { Link } from "react-router-dom"
import styled from "styled-components"
import { Badge, Button } from "../styles/common"

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #eef0f4;

  &:last-child {
    border-bottom: none;
  }
`

const Title = styled(Link)`
  flex: 1;
  text-decoration: ${({ $done }) => ($done ? 'line-through' : 'none')};
  color: ${({ $done }) => ($done ? '#a0a7b4' : 'inherit')};

  &:hover {
    color: #4f6ef7;
  }
`

function TodoItem({ todo }) {
    return (
        <Item>
            <input type="checkbox" />
            <Title>
                제목(할일내용)
            </Title>
            <Badge>뱃지</Badge>
            <Button $variant="danger">삭제</Button>
        </Item>
    )
}

export default TodoItem