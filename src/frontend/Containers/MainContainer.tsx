/*global chrome*/
import { useState, useEffect } from 'react';
import { SnapShotContainer } from './SnapShotContainer';
import VisualContainer from './VisualContainer';
import { NavBar } from '../Components/NavBar/navbar'
import styled from 'styled-components';
import { GlobalStateContext } from '../Contexts/GlobalStateContext';
import { SnapShotContext } from '../Contexts/SnapShotContext';
import { fakeState } from '../../fakeState';


const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  width: 100vw;
`;

function MainContainer(): JSX.Element {

  const [tabNum, setTabNum] = useState<number>(1);
  const [snapShotIndex, setSnapShotIndex] = useState<number>(0);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message) {
        //set state with data here
        console.log(message)
      }
    })
  }, [])

  return (
    <Main>
      <NavBar setTabNum={setTabNum} tabNum={tabNum} />

      <GlobalStateContext.Provider value={fakeState}>
        <SnapShotContext.Provider value={{ snapShotIndex, setSnapShotIndex }}>
          <SnapShotContainer />
          <VisualContainer tabNum={tabNum} />
        </SnapShotContext.Provider>
      </GlobalStateContext.Provider>
    </Main>
  );
}

export default MainContainer;
