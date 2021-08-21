import StateDiff from '../components/StateDiff/StateDiff';
import ComponentTree from '../components/ComponentTree/ComponentTree';
import ComponentGraph from '../components/ComponentGraph/ComponentGraph';
import ProxyNetwork from '../Components/ProxyNetwork/ProxyNetwork';
import styled from 'styled-components';

const VisualSection = styled.section`
  height: 100vh;
  width: 85vw;
  background: green;
`;

function VisualContainer({ tabNum }: { tabNum: number }): JSX.Element {
  return (
    <VisualSection>
      {(tabNum === 1) && <StateDiff />}
      {(tabNum === 2) && <ComponentTree />}
      {(tabNum === 3) && <ProxyNetwork />}
    </VisualSection>
  );
}

export default VisualContainer;