import { SetStateAction, Dispatch } from "react";
import { NavTab } from "./NavTab";
import styled from "styled-components";

const NavBarSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4vh;
  width: 99vw;
  background: #293241;
`;

// creates buttons whos values are set by the setter function setTabNum. 
// A different component is rendered in MainContainer according to what the value of tabNum is

const NavBar = ({ setTabNum, tabNum }: { setTabNum: Dispatch<SetStateAction<number>>, tabNum: number }): JSX.Element => {
  return (
    <NavBarSection>
      <NavTab value={1} tabNum={tabNum} text='State Diff' setTabNum={setTabNum} />
      <NavTab value={2} tabNum={tabNum} text='Proxy Network' setTabNum={setTabNum} />
      <NavTab value={3} tabNum={tabNum} text='Component Graph' setTabNum={setTabNum} />
      <NavTab value={4} tabNum={tabNum} text='Component Tree' setTabNum={setTabNum} />
    </NavBarSection >
  );
};

export default NavBar;