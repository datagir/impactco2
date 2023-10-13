import Ademe from "components/base/Ademe";
import Logo from "components/base/Logo";
import Marianne from "components/base/Marianne";
import Section2 from "components/base/Section2";
import NavSearchBar from "components/misc/search/NavSearchBar";
import styled from "styled-components";

const Header = styled.header`
  box-shadow: 0px 2px 6px #f3f6ff;
  position: relative; // or box-shadow will not appear
`;

export default function HeaderSweet() {
  return (
    <Section2>
      <Section2.WideContent>
        <Header aria-label="En-tête">
          <Section2.InnerMargin>
            <LogoBar>
              <Logos>
                <Marianne />
                <Ademe />
                <Logo />
              </Logos>
              <Actions>
                <ActionSearch>
                  <NavSearchBar></NavSearchBar>
                </ActionSearch>
              </Actions>
            </LogoBar>
            <NavBar></NavBar>
          </Section2.InnerMargin>
        </Header>
      </Section2.WideContent>
    </Section2>
  );
}

const LogoBar = styled.div`
  display: flex;
  justify-content: space-between;
`;
const NavBar = styled.div``;

const Logos = styled.div`
  display: flex;
`;
const Actions = styled.div``;

const ActionSearch = styled.div`
  position: relative;
  top: 25%;
  width: 282px;
`;
