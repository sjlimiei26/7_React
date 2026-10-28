import styled from "styled-components"
import { Button, Card } from "../styles/common"
import { CATEGORIES } from '../constants'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const Row = styled.div`
  display: flex;
  gap: 10px;
`
const Input = styled.input`
  flex: 1;
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
function TodoForm() {
    return(
        <Card style={{ marginBottom: 20 }}>
            <Form>
                <Row>
                    <Input placeholder="할 일을 입력하세요" />
                    <Select>
                        {
                            Object.entries(CATEGORIES).map(([key, { label }]) => {
                                return (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                )
                            })
                        }
                    </Select>
                </Row>
                <Input placeholder="메모 작성 (선택)" />
                <Button type="submit">추가</Button>
            </Form>
        </Card>
    )
}

export default TodoForm