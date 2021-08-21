import StateDiff from '../components/StateDiff/StateDiff';
import ComponentTree from '../components/ComponentTree/ComponentTree';
import ComponentGraph from '../components/ComponentGraph/ComponentGraph';
import ProxyNetwork from '../Components/ProxyNetwork/ProxyNetwork';
import { useTabNumber } from '../Contexts/TabNumberContext';
import styled from 'styled-components';

const VisualSection = styled.section`
  height: 100vh;
  width: 85vw;
  background: green;
`;

function VisualContainer(): JSX.Element {
  console.log('tabnum', useTabNumber());
  return (
    <VisualSection>
      Visual Container
      {(useTabNumber() === 1) && <StateDiff />}
      {(useTabNumber() === 2) && <ComponentTree />}
      {(useTabNumber() === 3) && <ProxyNetwork />}
    </VisualSection>
  );
}

export default VisualContainer;