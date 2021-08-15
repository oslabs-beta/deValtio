import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../Styling/styles';
import { NavBar } from '../Components/NavBar/navbar';

export const SnapshotContainer = (): JSX.Element => {
    const classes = useStyles();
    return (
        <div className={classes.MainContainer}>
            <NavBar />
            <Drawer
                className={classes.drawer}
                variant='permanent'
                anchor='left'
                classes={{ paper: classes.drawerPaper }}
            >
                <div>
                    <Typography className={classes.snapText} variant='h4' component='h2'>
                        SnapShots
                    </Typography>
                </div>
            </Drawer>
        </div>
    );
}
