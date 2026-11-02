import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import usePostStore from "../store/usePostStore"
import { PageTitle, PrimaryButton } from "../styles/common"

const Container = styled.section`
    text-align: left;
`

const HeaderRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`

const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
`

const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    transition: border-color 0.2s, box-shadow 0.2s;

    &:hover {
        border-color: #c7d2fe;
        box-shadow: 0 4px 8px rgba(79, 70, 229, 0.08);
    }
`

const PostTitle = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: #1f2937;
    line-height: 1.5;
    word-break: break-word;
`

const ActionGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
`

const EditButton = styled.button`
    padding: 6px 14px;
    font-size: 14px;
    font-weight: 500;
    color: #4f46e5;
    background-color: #eef2ff;
    border: 1px solid #e0e7ff;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
        background-color: #4f46e5;
        color: #ffffff;
    }
`

const DeleteButton = styled.button`
    padding: 6px 14px;
    font-size: 14px;
    font-weight: 500;
    color: #dc2626;
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
        background-color: #dc2626;
        color: #ffffff;
    }
`

const ErrorMessage = styled.p`
    padding: 16px;
    color: #dc2626;
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    font-size: 15px;
    text-align: center;
`

function PostListPage() {
    const navigate = useNavigate()

    const posts = usePostStore((state) => state.posts)
    const fetchPosts = usePostStore((state) => state.fetchPosts)
    const removePost = usePostStore((state) => state.removePost)
    const error = usePostStore((state) => state.error)

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    const handleDelete = async (id) => {
        try {
            await removePost(id)
        } catch (e) {
            alert(`삭제 실패 : ${e.message}`)
        }
    }

    if (error) return <ErrorMessage>오류: {error}</ErrorMessage>

    return (
        <Container>
            <HeaderRow>
                <PageTitle>게시글 목록</PageTitle>
                <PrimaryButton onClick={() => navigate("/posts/new")}>
                    새 글 작성
                </PrimaryButton>
            </HeaderRow>
            <List>
                {posts.map((data) => (
                    <ListItem key={data.id}>
                        <PostTitle>{data?.title}</PostTitle>
                        <ActionGroup>
                            {/* 수정 버튼 클릭 시 해당 게시글의 상세 페이지 (EditPostPage) */}
                            <EditButton onClick={() => navigate(`/posts/${data.id}/edit`)}>
                                수정
                            </EditButton>
                            <DeleteButton onClick={() => handleDelete(data.id)}>
                                삭제
                            </DeleteButton>
                        </ActionGroup>
                    </ListItem>
                ))}
            </List>
        </Container>
    )
}

export default PostListPage
