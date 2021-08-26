import StateDiff from '../components/StateDiff/StateDiff';
import ComponentTree from '../components/ComponentTree/ComponentTree';
import ComponentGraph from '../components/ComponentGraph/ComponentGraph';
import ProxyNetwork from '../components/ProxyNetwork/ProxyNetwork';
import styled from 'styled-components';

import { ParentSize } from '@visx/responsive';

const VisualSection = styled.section`
  height: 96vh;
  width: 85vw;
  background: #293241;
  color: #98C1D9;
  border-top: 2px solid #98C1D9;
  text-align:center;
  overflow-y: scroll;
`;

function VisualContainer({ tabNum }: { tabNum: number }): JSX.Element {
  return (
    <VisualSection>
      {(tabNum === 1) && <StateDiff />}
      {(tabNum === 2) && <ComponentTree />}
      {(tabNum === 3) && <ProxyNetwork />}
      {(tabNum === 4) && <ParentSize>
        {({ width, height }) => (
          <ComponentGraph width={width} height={height} />
        )}
      </ParentSize>}
    </VisualSection>
  );
}

export default VisualContainer;