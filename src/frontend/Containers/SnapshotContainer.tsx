import Grid from '@material-ui/core/Grid';
import { HamburgerMenu } from '../Components/SideBar/HamburgerMenu';
import { CurrentState } from '../Components/SideBar/CurrentState';
import { NextPrevButton } from '../Components/SideBar/NextPrevButton'

export const SideBarContainer = (): JSX.Element => {
    return (
        <Grid container item>
            <HamburgerMenu />
            <CurrentState />
            <NextPrevButton />
        </Grid>
    );
}
