import { SnapshotContainer } from './SnapshotContainer';
import { useStyles } from '../Styling/styles';
import { TabNumberProvider } from '../Contexts/TabNumberContext';


// children needs to be of type JSX.Element because there are only 1 children being returned

export const MainContainer = ({ children }: { children: JSX.Element }) => {
  const classes = useStyles();
  return (
    <TabNumberProvider>
      <div>
        <SnapshotContainer />
        <div>
          {children}
        </div>
      </div>
    </TabNumberProvider>
  );
}

// function MainContainer(): JSX.Element {
//     const classes = useStyles();
//     return (
//       <div className={classes.MainContainer}>
//         <SnapshotContainer />
//         <VisualContainer />
//       </div>
//     );
//   }

//   export default MainContainer;
