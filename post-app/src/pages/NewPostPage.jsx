import { useState } from "react"
import { useNavigate } from "react-router-dom"

import usePostStore from "../store/usePostStore"
import {
    ButtonGroup,
    Card,
    Field,
    FormGroup,
    Input,
    PageTitle,
    PrimaryButton,
    SecondaryButton,
    TextArea,
} from "../styles/common"

function NewPostPage() {
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [userId, setUserId] = useState('')

    const addPost = usePostStore((state) => state.addPost)

    const handleClick = async () => {
        try {
            await addPost({ title, body, userId })
            navigate("/posts")
        } catch (e) {
            alert(`추가 실패 : ${e.message}`)
        }
    }

    return (
        <Card>
            <PageTitle as="h3" $mb="24px">게시글 추가</PageTitle>

            <FormGroup>
                <Field>
                    작성자 닉네임
                    <Input
                        type="text"
                        placeholder="닉네임 입력"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </Field>

                <Field>
                    제목
                    <Input
                        type="text"
                        placeholder="제목 입력"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Field>

                <Field>
                    내용
                    <TextArea
                        placeholder="내용 입력"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </Field>
            </FormGroup>

            <ButtonGroup>
                <SecondaryButton type="button" onClick={() => navigate("/posts")}>
                    취소
                </SecondaryButton>
                <PrimaryButton type="button" onClick={handleClick}>
                    추가
                </PrimaryButton>
            </ButtonGroup>
        </Card>
    )
}

export default NewPostPage
