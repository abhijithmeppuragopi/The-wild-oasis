import styled from "styled-components";
import MainNav from "./MainNav";
import Logo from "./Logo";

const StyledSidebar=styled.aside`
  padding:3.2rem 2.4rem;
  background-color:var(--color-grey-0);  
  border-right:1px solid var(--color-grey-100);
  grid-row:1/-1;
  display:flex;
  flex-direction:column;
  gap:3.2rem;
`;

function SideBar(){
    return <StyledSidebar>
        
       <Logo/>
       <MainNav/>
        
    </StyledSidebar>
}
export default SideBar;