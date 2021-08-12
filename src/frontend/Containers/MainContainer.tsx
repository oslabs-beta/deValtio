import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { SideBarContainer } from './SideBarContainer';
import { StateTreeContainer } from './StateTreeContainer';

export const MainContainer = (): JSX.Element => {
    return (
        <Container>
            <Grid container>
                <SideBarContainer />
                <StateTreeContainer />
            </Grid>
        </Container>
    );
}