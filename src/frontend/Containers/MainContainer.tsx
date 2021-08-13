import Container from '@material-ui/core/Container';
import { SnapshotContainer } from './SnapshotContainer';
import { VisualContainer } from './VisualContainer';
import { useStyles } from '../styles'

export const MainContainer = (): JSX.Element => {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
            <SnapshotContainer />
            <VisualContainer />
        </Container>
    );
}