import { CurrentState } from './CurrentStateContainer';
import VisualContainer from './VisualContainer';
import { NavBar } from '../Components/NavBar/navbar'
import styled from 'styled-components';
import { useState } from 'react';


const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  width: 100vw;
`;

function MainContainer(): JSX.Element {
  const [tabNum, setTabNum] = useState<number>(1);
  return (
    <Main>
      <NavBar setTabNum={setTabNum} tabNum={tabNum} />
      <CurrentState />
      <VisualContainer tabNum={tabNum} />
    </Main>
  );
}

export default MainContainer;
