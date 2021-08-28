import styled from 'styled-components';
import { IApplicationState, IState } from '../../Types/Types';
import { CurrentState } from '../Components/Snapshot/CurrentState';

const fakeState: IApplicationState = {
    state: [
        {
            name: 'Count',
            value: 5
        },
        {
            name: 'loggedIn',
            value: false.toString()
        },
        {
            name: 'Name',
            value: 'Cameron'
        },
    ]
}


const Section = styled.section`
    height: 96vh;
    width:14vw;
    background: #293241;
    border: 2px solid #98C1D9;
    color: #98C1D9;
    text-align:center;
`;

const StateList = styled.ul`
    padding: 0;

`;

export const CurrentStateContainer = (): JSX.Element => {
    return (
        <Section>
            <h1 style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', paddingBottom: '2px' }}>Current State</h1>
            <StateList>
                {fakeState.state.map(state => {
                    return <CurrentState key={state.name} state={state} />
                })}
            </StateList>
        </Section>
    )
}

