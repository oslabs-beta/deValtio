import { IState } from "../../../Types/Types";
import styled from "styled-components";

const StateItem = styled.li`
    list-style-type: none;
    margin: 1.5em;
`;

const P = styled.p`
    margin: 0.3em;
    font-size: 1.2em;
`;

export const CurrentState = ({ state }: { state: IState }) => {
    return (
        <StateItem>
            <P>State: <strong style={{ fontWeight: 1100, padding: '0.5em' }}>{state.name}</strong></P>
            <P>Value: <strong style={{ fontWeight: 1000, padding: '0.5em' }}>{state.value}</strong></P>
        </StateItem>
    );
}