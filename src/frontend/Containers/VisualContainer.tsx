import { useTabNumber } from '../Contexts/TabNumberContext';
import ComponentGraph from '../Components/ComponentGraph/ComponentGraph';
import StateDiff from '../Components/StateDiff/statediff';
import ComponentTree from '../Components/ComponentTree/componenttree';
import ProxyNetwork from '../Components/ProxyNetwork/proxynetwork';
function VisualContainer(): JSX.Element {
  console.log('useTabNumber', useTabNumber())
  return (
    <div>
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      Visual Container
      {(useTabNumber() === 1) && <StateDiff />}
      {(useTabNumber() === 2) && <ComponentTree />}
      {(useTabNumber() === 3) && <ProxyNetwork />}
    </div>
  );
}

export default VisualContainer;