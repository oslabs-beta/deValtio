import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    drawer: {
        background: '#ED6476'
    }
})

export const SnapshotContainer = (): JSX.Element => {
    const classes = useStyles();
    return (
        <Drawer
            className={classes.drawer}
            variant='permanent'
            anchor='left'
        >
            Snapshots
        </Drawer>
    );
}
