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

function MainContainer() {

  const [tabNum, setTabNum] = useState<number>(1);
  const [snapShotIndex, setSnapShotIndex] = useState<number>(0);
  const [message, setMessage] = useState<string>('');



  useEffect(() => {
    console.log('from useEffect')
    // chrome.runtime.onConnect.addListener(port => {
    //   console.log('connected ', port);
    //   port.postMessage({
    //     message: 'from frontend'
    //   });

    //   port.onMessage.addListener((message) => {
    //     if (message) {
    //       setMessage(message.message);
    //       console.log('message from backend', message)
    //     }
    //   })
    //});

    // const port = chrome.runtime.connect({
    //   name: 'deValtio'
    // });

  });

  chrome.runtime.onConnect.addListener(port => {
    console.log('connected ', port);
    port.postMessage({
      message: 'from frontend'
    });

    port.onMessage.addListener((message) => {
      if (message) {
        setMessage(message.message);
        console.log('message from backend', message)
      }
    })
  });

  return (
    <Main>
      <NavBar setTabNum={setTabNum} tabNum={tabNum} />
      <p> {message}</p>
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
