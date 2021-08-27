import { NavTab } from "./NavTab";
import styled from "styled-components";
import { SetStateAction, Dispatch } from "react";
import { useEffect } from "react";

const NavBarSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4vh;
  width: 99vw;
  background: #293241;
`;

// const NavTab = styled.button`

//   background: #98C1D9;
//   cursor: pointer;
//   border: 1px solid #98C1D9;
//   border-radius: 2px;
//   height: 90%;
//   width: 10em;
//   margin: 1em;
//   color: white;
//   &:hover {
//     background: white;
//     color: #98C1D9; 
//   };
//   &:focus {
//     background: white;
//     color: #98C1D9;
//     text-decoration: underline;
//   }
// `;

export const NavBar = ({ setTabNum, tabNum }: { setTabNum: Dispatch<SetStateAction<number>>, tabNum: number }): JSX.Element => {

  // const changeTab = (e: React.MouseEvent<HTMLElement>): void => {
  //   console.log('e.target', e);
  //   console.log('tabNum', tabNum)
  //   const value = (e.target as HTMLButtonElement).value;
  //   const style = (e.target as HTMLButtonElement).style;
  //   setTabNum(parseInt(value));
  //   tabNum === parseInt(value) ? style.backgroundColor = 'green' : 'white';
  //   return;
  // }

  return (
    <NavBarSection>
      <NavTab value={1} tabNum={tabNum} text='StateDiff' setTabNum={setTabNum} />
      <NavTab value={2} tabNum={tabNum} text='State Tree' setTabNum={setTabNum} />
      <NavTab value={3} tabNum={tabNum} text='ProxyNetwork' setTabNum={setTabNum} />
      <NavTab value={4} tabNum={tabNum} text='Component Graph' setTabNum={setTabNum} />
    </NavBarSection >
  );
}