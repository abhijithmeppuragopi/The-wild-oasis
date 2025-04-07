import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import LoginButton from "../features/authentication/LoginButton";
import HeaderMenu from "./HeaderMenu";

const StyledHeader=styled.header`
    background-color:var(--color-grey-0);
    padding:1.2rem 4.8rem;
    border-bottom:1px solid var(color-grey-100);
    display:flex;
    justify-content:end;
`;


function Header(){
    return <StyledHeader>
     <HeaderMenu/>
    
    </StyledHeader>
}
export default Header;