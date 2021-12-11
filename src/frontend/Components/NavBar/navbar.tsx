import { NavTab } from "./NavTab";
import styled from "styled-components";
import { SetStateAction, Dispatch } from "react";

const NavBarSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4vh;
  width: 100%;
  background: green;
  border-bottom: 2px solid #98C1D9;
`;

const NavBar = ({ setTabNum, tabNum }: { setTabNum: Dispatch<SetStateAction<number>>, tabNum: number }): JSX.Element => {

  return (
    <NavBarSection>
      <NavTab value={1} tabNum={tabNum} text='State Diff' setTabNum={setTabNum} />
      <NavTab value={2} tabNum={tabNum} text='Proxy Network' setTabNum={setTabNum} />
      <NavTab value={3} tabNum={tabNum} text='Component Graph' setTabNum={setTabNum} />
      <NavTab value={4} tabNum={tabNum} text='Component Tree' setTabNum={setTabNum} />
    </NavBarSection >
  );
}

export default NavBar;