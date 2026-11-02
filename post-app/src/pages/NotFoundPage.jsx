import styled from "styled-components"
import {
    CenteredCard,
    Description,
    PageTitle,
    PrimaryLink,
} from "../styles/common"

const ErrorCode = styled.strong`
    font-size: 48px;
    font-weight: 800;
    color: #4f46e5;
    line-height: 1;
    margin-bottom: 12px;
`

function NotFoundPage() {
    return (
        <CenteredCard>
            <ErrorCode>404</ErrorCode>
            <PageTitle $mb="8px">페이지를 찾을 수 없습니다</PageTitle>
            <Description>요청하신 페이지가 존재하지 않거나 이동되었습니다.</Description>
            <PrimaryLink to="/">홈으로 돌아가기</PrimaryLink>
        </CenteredCard>
    )
}

export default NotFoundPage
