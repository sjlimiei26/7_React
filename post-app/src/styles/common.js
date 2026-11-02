import { Link } from "react-router-dom"
import styled from "styled-components"

export const Card = styled.section`
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 32px 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
    text-align: left;
`

export const CenteredCard = styled(Card)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 64px 24px;
    text-align: center;
`

export const PageTitle = styled.h2`
    font-size: 22px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 ${({ $mb }) => $mb || "0"};
`

export const Description = styled.p`
    font-size: 16px;
    color: #6b7280;
    line-height: 1.6;
    margin: 0 0 32px;
`

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const Field = styled.label`
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
`

export const Input = styled.input`
    padding: 12px 14px;
    font-size: 15px;
    color: #111827;
    background: #f9fafb;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.2s, background-color 0.2s, box-shadow 0.2s;

    &:focus {
        background: #ffffff;
        border-color: #4f46e5;
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
    }
`

export const TextArea = styled.textarea`
    padding: 12px 14px;
    font-size: 15px;
    font-family: inherit;
    color: #111827;
    background: #f9fafb;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    min-height: 140px;
    resize: vertical;
    outline: none;
    transition: border-color 0.2s, background-color 0.2s, box-shadow 0.2s;

    &:focus {
        background: #ffffff;
        border-color: #4f46e5;
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
    }
`

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: ${({ $align }) => $align || "flex-end"};
    gap: 10px;
    margin-top: ${({ $mt }) => $mt || "24px"};
`

export const PrimaryButton = styled.button`
    padding: 10px 20px;
    font-size: 15px;
    font-weight: 600;
    color: #ffffff;
    background-color: #4f46e5;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #4338ca;
    }
`

export const SecondaryButton = styled.button`
    padding: 10px 20px;
    font-size: 15px;
    font-weight: 600;
    color: #374151;
    background-color: #f3f4f6;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #e5e7eb;
    }
`

export const PrimaryLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    font-size: 15px;
    font-weight: 600;
    color: #ffffff;
    background-color: #4f46e5;
    border-radius: 8px;
    text-decoration: none;
    transition: background-color 0.2s;

    &:hover {
        background-color: #4338ca;
    }
`

export const SecondaryLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    font-size: 15px;
    font-weight: 600;
    color: #374151;
    background-color: #f3f4f6;
    border-radius: 8px;
    text-decoration: none;
    transition: background-color 0.2s;

    &:hover {
        background-color: #e5e7eb;
    }
`

