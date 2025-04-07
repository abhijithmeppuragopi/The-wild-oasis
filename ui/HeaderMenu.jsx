import styled from "styled-components"
import LoginButton from "../features/authentication/LoginButton"
import Logout from "../features/authentication/Logout"
import UserAvatar from "../features/authentication/UserAvatar"

const StyledHeaderMenu=styled.ul`
    display:flex;
    gap:2rem;
`

export default function HeaderMenu(){
    return <StyledHeaderMenu>
        <UserAvatar/>
        <li><LoginButton/></li>
        <li> <Logout/></li>
        
        
       
    </StyledHeaderMenu>
}