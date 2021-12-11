import styled from "styled-components";
import { SetStateAction, Dispatch } from "react";

const NavTabStyled = styled.button<{ tabNum: number }>`
  background: ${props => props.value === props.tabNum ? '#E0FBFC' : '#98C1D9'};
  cursor: pointer;
  border: 1px solid #98C1D9;
  border-radius: 2px;
  height: 80%;
  width: 10em;
  margin: 1em;
  color: ${props => props.value === props.tabNum ? '#98C1D9' : '#E0FBFC'};
  &:hover {
    color: #293241; 
  };
`;

interface INavTab {
    value: number;
    tabNum: number;
    setTabNum: Dispatch<SetStateAction<number>>
    text: string;
}

export const NavTab = ({ value, tabNum, text, setTabNum }: INavTab) => {

    const changeTab = (e: React.MouseEvent<HTMLElement>): void => {
        setTabNum(value);
        return;
    };

    return (
        <NavTabStyled value={value} tabNum={tabNum} onClick={changeTab}>{text}</NavTabStyled>
    );
}