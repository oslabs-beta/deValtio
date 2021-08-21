import { SnapshotContainer } from './SnapshotContainer';
import VisualContainer from './VisualContainer';
import { NavBar } from '../Components/NavBar/navbar'
import styled from 'styled-components';
import { TabNumberProvider } from '../Contexts/TabNumberContext';
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
    <TabNumberProvider>
      <Main>
        <NavBar setTabNum={setTabNum} />
        <SnapshotContainer />
        <VisualContainer tabNum={tabNum} />
      </Main>
    </TabNumberProvider>
  );
}

export default MainContainer;
