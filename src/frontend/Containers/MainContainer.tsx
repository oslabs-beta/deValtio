import { SnapshotContainer } from './SnapshotContainer';
import VisualContainer from './VisualContainer';
import styled from 'styled-components';

const Main = styled.main`
height: 100vh;
width: 100vw;
background: #98C1D9;
`;

function MainContainer(): JSX.Element {
  return (
    <Main>
      <SnapshotContainer />
      <VisualContainer />
    </Main>
  );
}

export default MainContainer;
