import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { getPost } from "../api/postApi"
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

function EditPostPage() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [post, setPost] = useState(null)

    const editPost = usePostStore((s) => s.editPost)

    useEffect(() => {
        getPost(id).then((data) => {
            console.log(data)
            setPost(data)
        })
    }, [id])

    const handleClick = async () => {
        try {
            await editPost(id, post)
            navigate('/posts')
        } catch (e) {
            alert(`수정 실패 : ${e.message}`)
        }
    }

    return (
        <Card>
            <PageTitle as="h3" $mb="24px">게시글 수정</PageTitle>

            <FormGroup>
                <Field>
                    작성자 닉네임
                    <Input
                        type="text"
                        placeholder="닉네임 입력"
                        value={post?.userId ?? ''}
                        onChange={(e) => setPost((s) => ({ ...s, userId: e.target.value }))}
                    />
                </Field>

                <Field>
                    제목
                    <Input
                        type="text"
                        placeholder="제목 입력"
                        value={post?.title ?? ''}
                        onChange={(e) => setPost((s) => ({ ...s, title: e.target.value }))}
                    />
                </Field>

                <Field>
                    내용
                    <TextArea
                        placeholder="내용 입력"
                        value={post?.body ?? ''}
                        onChange={(e) => setPost((s) => ({ ...s, body: e.target.value }))}
                    />
                </Field>
            </FormGroup>

            <ButtonGroup>
                <SecondaryButton type="button" onClick={() => navigate('/posts')}>
                    취소
                </SecondaryButton>
                <PrimaryButton type="button" onClick={handleClick}>
                    수정
                </PrimaryButton>
            </ButtonGroup>
        </Card>
    )
}

export default EditPostPage
