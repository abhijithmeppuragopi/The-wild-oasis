import styled from "styled-components";

const StyledFormRow=styled.div`
    display:flex;
    flex-direction:column;
    gap:0.8rem;
    padding:1.2rem 1.8rem;
   
`
const Label=styled.label`
    font-weight:600;
`
const Error=styled.span`
    font-size:1.4rem;
    color:var(--color-red-700);
`

export default function FormRowVertical({children,label,error}){
    return <StyledFormRow>
        {label && <Label htmlFor={children.props.id}>{label}</Label>}
        {children}
        {error && <Error>{error}</Error>}

    </StyledFormRow>


}