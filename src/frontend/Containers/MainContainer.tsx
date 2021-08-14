import React from 'react';

import { SnapshotContainer } from './SnapshotContainer';
import VisualContainer from './VisualContainer';
import Container from '@material-ui/core/Container';
import { useStyles } from '../Styling/styles';

// children needs to be of type JSX.Element[] because multiple children are being returned

// export const MainContainer = ({ children }: { children: JSX.Element }) => {
//     const classes = useStyles();
//     return (
//         <div className={classes.MainContainer}>
//             <SnapshotContainer />
//             <div>
//                 {children}
//             </div>
//             <VisualContainer />
//         </div>
//     );
// }

function MainContainer(): JSX.Element {
    const classes = useStyles();
    return (
      <div className={classes.MainContainer}>
        <SnapshotContainer />
        <VisualContainer />
      </div>
    );
  }
  
  export default MainContainer;
