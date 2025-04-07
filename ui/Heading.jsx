import styled, { css } from "styled-components";

const Heading=styled.h1`
${(prop)=>
    prop.as==='h1' && css`
font-size:35px;
`}
${(prop)=>
    prop.as==='h2' && css`
font-size:25px;
`}
${(prop)=>
    prop.as==='h3' && css`
font-size:20px;
`}
${(prop)=>
    prop.as==='h4' && css`
font-size:30px;
text-align:center;
`}

`;

export default Heading;