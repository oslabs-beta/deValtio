import styled from "styled-components";
import { SetStateAction, Dispatch } from "react";

const NavBarSection = styled.section`
  height: 4vh;
  width: 99vw;
  background: #293241;
`;

const NavTab = styled.button`
  background: #98C1D9;
`;
export const NavBar = ({ setTabNum }: { setTabNum: Dispatch<SetStateAction<number>> }): JSX.Element => {
  return (
    <NavBarSection>
      <NavTab onClick={(event: React.MouseEvent<HTMLElement>) => setTabNum(1)}>StateDiff</NavTab>
      <NavTab onClick={(event: React.MouseEvent<HTMLElement>) => setTabNum(2)}>State Tree</NavTab>
      <NavTab onClick={(event: React.MouseEvent<HTMLElement>) => setTabNum(3)}>ProxyNetwork</NavTab>
    </NavBarSection >
  );
}