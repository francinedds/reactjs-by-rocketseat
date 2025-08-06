import styled from "styled-components"

export const FormContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: ${props => props.theme['gray-100']};
    font-weight: 400;
    flex-wrap: wrap; // quebra de linha em small devices
`
// tudo o que será aplicado entre os dois inputs, colocaremos na base
export const BaseInput = styled.input`
    background-color: transparent;
    height: 2.5rem;
    border: 0;
    border-bottom: 2px solid ${props => props.theme['gray-500']};
    font-weight: 500;
    padding: 0 0.5rem;
    color: ${props => props.theme['gray-100']};

    &:focus{
        box-shadow: none;
        border-color: ${props => props.theme['green-500']};
    }

    &::placeholder{
        color: ${props => props.theme['gray-500']};
    }
`

export const TaskInput = styled(BaseInput)`
    field-sizing: content;

    &::-webkit-calendar-picker-indicator{
        display: none !important;
    }
`

export const MinutesAmountInput = styled(BaseInput)`
   width: 4rem;
`