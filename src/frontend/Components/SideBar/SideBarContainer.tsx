import { HamburgerMenu } from './HamburgerMenu';
import { CurrentState } from './CurrentState';
import { NextPrevButton } from './NextPrevButton'

export const SideBarContainer = (): JSX.Element => {
    return (
        <div>
            <HamburgerMenu />
            <CurrentState />
            <NextPrevButton />
        </div>
    );
}
