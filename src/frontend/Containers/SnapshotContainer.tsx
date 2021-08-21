import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../Styling/styles';
import styled from 'styled-components';

const Section = styled.section`
    height: 100vh;
    width: 15vh;
    background: red;
`;

export const SnapshotContainer = (): JSX.Element => {
    return (
        <Section>
            SnapShots
        </Section>
    )
}

// export const SnapshotContainer = (): JSX.Element => {
//     const classes = useStyles();
//     return (
//         <Drawer
//             className={classes.drawer}
//             variant='permanent'
//             anchor='left'
//             classes={{ paper: classes.drawerPaper }}
//         >
//             <div>
//                 <Typography className={classes.snapText} variant='h4' component='h2'>
//                     SnapShots
//                 </Typography>
//             </div>
//         </Drawer>
//     );
// }
