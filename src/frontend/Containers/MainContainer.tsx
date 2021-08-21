import { SnapshotContainer } from './SnapshotContainer';
import VisualContainer from './VisualContainer';
import { NavBar } from '../Components/NavBar/NavBar'
import styled from 'styled-components';

const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  width: 100vw;
`;

function MainContainer(): JSX.Element {
  return (
    <Main>
      <NavBar />
      <SnapshotContainer />
      <VisualContainer />
    </Main>
  );
}

export default MainContainer;
