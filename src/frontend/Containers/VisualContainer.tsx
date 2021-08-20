import React, { useState } from 'react';

import NavBar from '../components/NavBar/NavBar';
import StateDiff from '../components/StateDiff/StateDiff';
import ComponentTree from '../components/ComponentTree/ComponentTree';
import ComponentGraph from '../components/ComponentGraph/ComponentGraph';
import ProxyNetwork from '../Components/ProxyNetwork/ProxyNetwork';

interface navType {
  [tabName: string]: JSX.Element;
}

function VisualContainer(): JSX.Element {
  const [tab, setTab] = useState<string>('State Diff');

  const navLists: navType = {
    'State Diff': <StateDiff />,
    'Component Tree': <ComponentTree />,
    'Component Graph': <ComponentGraph />,
    'Proxy Network': <ProxyNetwork />,
  };

  const tabsList: string[] = Object.keys(navLists);

  return (
    <div className="visualContainer">
      <NavBar setTab={setTab} tabsList={tabsList} tab={tab} />
      {navLists[tab]}
    </div>
  );
}

export default VisualContainer;