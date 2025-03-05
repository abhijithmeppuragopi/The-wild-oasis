import styled, { css } from "styled-components";

const Row=styled.div`
${prop=> prop.type==='horizontal' && css`
    display:flex;
    align-items:center;
    justify-content:space-around;
    gap: 2;
`}
${prop=> prop.type==='Vertical' && css`
    display:flex;
    flex-direction:column;
    align-items:center;
    gap: 2;
`}
    
`;
Row.defaultProps={
    type:'Vertical'
}

export default Row;