import StateDiff from '../components/StateDiff/StateDiff';
import ComponentTree from '../components/ComponentTree/ComponentTree';
import ComponentGraph from '../components/ComponentGraph/ComponentGraph';
import ProxyNetwork from '../components/ProxyNetwork/ProxyNetwork';
import styled from 'styled-components';

import { ParentSize } from '@visx/responsive';

const VisualSection = styled.section`
  height: 96vh;
  width: 85%;
  background: #293241;
  color: #98C1D9;
  text-align:center;
  overflow-y: auto;
`;

function VisualContainer({ tabNum }: { tabNum: number }): JSX.Element {
  return (
    <VisualSection>
      {(tabNum === 1) && <StateDiff />}
      {(tabNum === 2) && <ProxyNetwork />}
      {(tabNum === 3) && <ParentSize>
        {({ width, height }) => (
          <ComponentGraph width={width} height={height} />
        )}
      </ParentSize>}
      {(tabNum === 4) && <ComponentTree />}
    </VisualSection>
  );
}

export default VisualContainer;