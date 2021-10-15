/*global chrome*/
import { useState, useEffect } from 'react';
import { SnapShotContainer } from './SnapShotContainer';
import VisualContainer from './VisualContainer';
import NavBar from '../Components/NavBar/navbar';
import { NotValtio } from '../Components/NotValtio';
import styled from 'styled-components';
import { GlobalStateContext } from '../Contexts/GlobalStateContext';
import { SnapShotContext } from '../Contexts/SnapShotContext';
import { fakeState } from '../../fakeState';
import { RawDataFormat, RawData, RawDataContainer, TreeNode } from '../../Types/Types';


const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  width: 100vw;
`;

function MainContainer() {

  const [tabNum, setTabNum] = useState<number>(1);
  const [snapShotIndex, setSnapShotIndex] = useState<number>(0);
  const [rawData, setRawData] = useState<TreeNode[] | []>([]);
  const [usesValtio, setUsesValtio] = useState<boolean>(false);

  let comms;

  useEffect(() => {
    // get tab id of current tab
    const tabId = chrome.devtools.inspectedWindow.tabId;
    // creates a port on current tab
    const port = chrome.tabs.connect(tabId);
    comms = port;
    comms.onMessage.addListener(msg => {
      console.dir(`message received: ${JSON.stringify(msg, null, 2)}`);
      setRawData(prevState => [...prevState, msg.messageBody]);
      setUsesValtio(true);
    });
  }, []);

  return (
    <>
      {usesValtio ?
        <Main>
          <NavBar setTabNum={setTabNum} tabNum={tabNum} />
          <GlobalStateContext.Provider value={rawData}>
            <SnapShotContext.Provider value={{ snapShotIndex, setSnapShotIndex }}>
              <SnapShotContainer />
              <VisualContainer tabNum={tabNum} />
            </SnapShotContext.Provider>
          </GlobalStateContext.Provider>
        </Main>
        :
        <NotValtio />
      }
    </>
  );
}

export default MainContainer;