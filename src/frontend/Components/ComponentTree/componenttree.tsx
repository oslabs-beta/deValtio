import { useState, useContext } from 'react';
import { GlobalStateContext } from "../../Contexts/GlobalStateContext";
import { SnapShotContext } from "../../Contexts/SnapShotContext";
import ReactJson from 'react-json-view';

// import { componentTreeHistoryContext, snapshotIndexContext } from '../App';
import { SnapshotIndexContext } from '../../../Types/Types';

import data from '../../MockData/data'

const theme = {
  scheme: 'custom',
  base00: '#293241',
  base01: '#3D5A80',
  base02: '#3D5A80',
  base03: '#3D5A80',
  base04: '#3D5A80',
  base05: '#E0FBFC',
  base06: '#E0FBFC',
  base07: '#E0FBFC',
  base08: '#98C1D9',
  base09: '#98C1D9',
  base0A: '#3D5A80',
  base0B: '#98C1D9',
  base0C: '#98C1D9',
  base0D: '#98C1D9',
  base0E: '#F02D44',
  base0F: '#98C1D9',
};

function ComponentTree(): JSX.Element {
  // const { componentTreeHistory } = useContext<any>(componentTreeHistoryContext);
  // const { snapshotIndex } = useContext<SnapshotIndexContext>(
  //   snapshotIndexContext
  // );
  const [expandToggle, setExpandToggle] = useState<boolean>(true);

  const state = useContext(GlobalStateContext);
  const { snapShotIndex }: { snapShotIndex: number } = useContext<any>(SnapShotContext);
  console.log('from comp TREE', state[snapShotIndex]);

  //MOCK DATA IMPLEMENTATION


  return (
    <div className="componentTree">
      <div>
        {/* {componentTreeHistory[snapshotIndex] && ( */}
        {data && (
          <ReactJson
            // src={componentTreeHistory[snapshotIndex]}
            src={data}
            style={{
              fontSize: '12px',
              paddingTop: '15px',
              paddingLeft: '10px',
              fontFamily: 'Helvetica',
            }}
            collapsed={expandToggle ? 3 : false}
            theme={theme}
            indentWidth={2}
            enableClipboard={false}
          />
        )}
      </div>
      <div className="componentTreeDiff">
        <label className="toggleSwitch">
          <input
            type="checkbox"
            onClick={() => {
              setExpandToggle(!expandToggle);
            }}
          />
          <span className="toggleSlider round"></span>
        </label>
        <h3
          style={{
            marginLeft: '7px',
            color: !expandToggle ? '#1cb5c9' : '#e6e6e6',
          }}
        >
          Expand
        </h3>
      </div>
    </div>
  );
}

export default ComponentTree;
