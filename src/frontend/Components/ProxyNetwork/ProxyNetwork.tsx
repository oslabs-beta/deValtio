//import { ITree } from "../../../Types/Types";

import React, { useState, useContext } from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import ProxyDependentOfNetwork from './ProxyDependentOfNetwork';
import ProxyDependentsNetwork from './ProxyDependentsNetwork';
import { snapshotHistoryContext, snapshotIndexContext } from '../../Contexts/SnapShotContext';
import { SnapshotHistoryContext, SnapshotIndexContext } from '../../../Types/Types';

import proxyData from '../../MockData/proxyData'

function ProxyNetwork(): JSX.Element {
  // const { snapshotHistory } = useContext<SnapshotHistoryContext>(
  //   snapshotHistoryContext
  // );
  // const { snapshotIndex } = useContext<SnapshotIndexContext>(
  //   snapshotIndexContext
  // );
  const [switchToggle, setSwitchToggle] = useState<boolean>(false);
  const [proxyName, setProxyName] = useState<string>('');

  //Array of proxy names in current snapshot
  const proxyNamesArray = Object.keys(proxyData);
  // const proxyNamesArray = Object.keys(snapshotHistory[snapshotIndex]);

  return (
    <div className="proxyNetwork" style={{ height: '95vh' }}>
      {/* Switch toggle between dependents and dependent of */}
      <div
        style={{
          display: 'flex',
          marginRight: '25px',
          alignItems: 'center',
          position: 'fixed',
        }}
      >
        <label>Select Proxy:</label>
        <select
          // Event.stopPropagation:
          // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_event_stoppropagation
          onClick={e => e.stopPropagation()}
          // Reset back to first proxy if proxy name does not exist in snapshot
          onChange={e => setProxyName(e.target?.value || proxyNamesArray[0])}
          value={proxyName}
          className="dropdown"
        >
          {proxyNamesArray.map((proxyName, idx) => (
            <option value={proxyName} key={idx}>
              {proxyName}
            </option>
          ))}
        </select>
        <h3
          className="dependents"
          style={{
            color: !switchToggle ? '#1cb5c9' : '#7c7c7c',
            borderBottom: !switchToggle
              ? '1px dotted #1cb5c9'
              : '1px dotted #7c7c7c',
          }}
        >
          Dependents
          <span className="toolTipTest">
            Displays all proxies affected by the inspected proxy
          </span>
        </h3>

        <label className="toggleSwitch">
          <input
            type="checkbox"
            onClick={() => setSwitchToggle(!switchToggle)}
          />
          <span className="toggleSlider round"></span>
        </label>
        <h3
          className="dependentOf"
          style={{
            color: switchToggle ? '#1cb5c9' : '#7c7c7c',
            borderBottom: switchToggle
              ? '1px dotted #1cb5c9'
              : '1px dotted #7c7c7c',
          }}
        >
          Dependent Of
          <span className="toolTipTest">
            Displays all proxies that affect the inspected proxy
          </span>
        </h3>
      </div>
      {/* Display proxy dependents OR proxy dependent of */}
      {switchToggle ? (
        <ParentSize>
          {({ width, height }) => (
            <ProxyDependentOfNetwork
              proxyName={proxyName || proxyNamesArray[0]}
              width={width}
              height={height}
            />
          )}
        </ParentSize>
      ) : (
        <ParentSize>
          {({ width, height }) => (
            <ProxyDependentsNetwork
              proxyName={proxyName || proxyNamesArray[0]}
              width={width}
              height={height}
            />
          )}
        </ParentSize>
      )}
    </div>
  );
}

export default ProxyNetwork;