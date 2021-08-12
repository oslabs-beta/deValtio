import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { SnapshotContainer } from './SnapshotContainer';
import { VisualContainer } from './VisualContainer';

export const MainContainer = (): JSX.Element => {
    return (
        <Container>
            <Grid container>
                <SnapshotContainer />
                <VisualContainer />
            </Grid>
        </Container>
    );
}