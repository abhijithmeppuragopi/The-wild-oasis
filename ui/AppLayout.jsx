import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import styled from "styled-components";

const Main=styled.main`
    background-color:var(--color-grey-50);
    padding:4rem 4.8rem 6.4rem;
    overflow:scroll;
`;
const StyledAppLAyout=styled.div`
    display:grid;
    grid-template-columns:26rem 1fr;
    grid-template-rows:auto 1fr;
    height:100vh;

`;
const Container=styled.div`
    margin:0 auto;
    display:flex;
    flex-direction:column;
    gap:4rem;
`
function AppLayout(){
    return <StyledAppLAyout>
        <Header/>
        <SideBar/>
        <Main>
            <Container>
          <Outlet/>
          </Container>
        </Main>

    </StyledAppLAyout>
}
export default AppLayout;