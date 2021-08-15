import { SnapshotContainer } from './SnapshotContainer';
import { useStyles } from '../Styling/styles';

// children needs to be of type JSX.Element because there are only 1 children being returned

export const MainContainer = ({ children }: { children: JSX.Element }) => {
  const classes = useStyles();
  console.log('mainContainer', children);
  return (
    <div>
      <SnapshotContainer />
      <div>
        {children}
      </div>
    </div>
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
