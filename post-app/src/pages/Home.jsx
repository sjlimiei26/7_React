import styled from "styled-components"
import {
    ButtonGroup,
    CenteredCard,
    Description,
    PrimaryLink,
    SecondaryLink,
} from "../styles/common"

const HeroTitle = styled.h1`
    font-size: 28px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 12px;
`

function Home() {
    return (
        <CenteredCard>
            <HeroTitle>게시글 관리 앱</HeroTitle>
            <Description>
                자유롭게 게시글을 조회하고, 새 글을 작성하거나 수정해 보세요.
            </Description>
            <ButtonGroup $align="center" $mt="0">
                <PrimaryLink to="/posts">게시글 목록 보기</PrimaryLink>
                <SecondaryLink to="/posts/new">새 글 작성하기</SecondaryLink>
            </ButtonGroup>
        </CenteredCard>
    )
}

export default Home
