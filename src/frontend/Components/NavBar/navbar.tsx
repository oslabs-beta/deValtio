import styled from "styled-components";
import { SetStateAction, Dispatch } from "react";

const NavBarSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4vh;
  width: 99vw;
  background: #293241;
`;

const NavTab = styled.button`
  background: #98C1D9;
  cursor: pointer;
  border: 1px solid #98C1D9;
  border-radius: 2px;
  height: 90%;
  width: 10em;
  margin: 1em;
  color: white;
  &:hover {
    background: white;
    color: #98C1D9; 
  };
  &:focus {
    background: white;
    color: #98C1D9;
    border: 4px solid #98C1D9;
  }
`;

export const NavBar = ({ setTabNum, tabNum }: { setTabNum: Dispatch<SetStateAction<number>>, tabNum: number }): JSX.Element => {

  const changeTab = (e: React.MouseEvent<HTMLElement>): void => {
    const value = (e.target as HTMLButtonElement).value;
    setTabNum(parseInt(value));
    return;
  }

  return (
    <NavBarSection>
      <NavTab onClick={changeTab} value={1}>StateDiff</NavTab>
      <NavTab onClick={changeTab} value={2}>State Tree</NavTab>
      <NavTab onClick={changeTab} value={3}>Proxy Network</NavTab>
      <NavTab onClick={changeTab} value={4}>Component Graph</NavTab>
    </NavBarSection >
  );
}