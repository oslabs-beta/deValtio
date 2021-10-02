import { NavTab } from "./NavTab";
import styled from "styled-components";
import React from 'react';
import { SetStateAction, Dispatch } from "react";

const NavBarSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4vh;
  width: 99vw;
  background: #293241;
`;

const NavBar = ({ setTabNum, tabNum }: { setTabNum: Dispatch<SetStateAction<number>>, tabNum: number }): JSX.Element => {

  return (
    <NavBarSection>
      <NavTab value={1} tabNum={tabNum} text='StateDiff' setTabNum={setTabNum} />
      <NavTab value={2} tabNum={tabNum} text='State Tree' setTabNum={setTabNum} />
      <NavTab value={3} tabNum={tabNum} text='ProxyNetwork' setTabNum={setTabNum} />
      <NavTab value={4} tabNum={tabNum} text='Component Graph' setTabNum={setTabNum} />
    </NavBarSection >
  );
}

export default NavBar;