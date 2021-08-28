import { useState } from 'react';
import styled from 'styled-components';
import { ISnapShotList } from '../../Types/Types';
import { SnapShot } from '../Components/Snapshot/SnapShot';

const fakeState: ISnapShotList = [
    [
        {
            name: 'count',
            value: 5
        },
        {
            name: 'isLoggedIn',
            value: false.toString()
        },
        {
            name: 'name',
            value: 'Cameron'
        },
    ],
    [
        {
            name: 'count',
            value: 6
        },
        {
            name: 'isLoggedIn',
            value: true.toString()
        },
        {
            name: 'name',
            value: 'Cameron'
        },
    ]
]


const Section = styled.section`
    height: 96vh;
    width:14vw;
    background: #293241;
    border: 2px solid #98C1D9;
    color: #98C1D9;
    text-align:center;
`;

const SnapShots = styled.section`
    padding: 0;

`;

export const SnapShotContainer = (): JSX.Element => {
    const [state, setState] = useState<ISnapShotList>(fakeState);
    const [snapShotIndex, setSnapShotIndex] = useState<number>(0);

    return (
        <Section>
            <h1>SnapShots</h1>
            <SnapShots>
                {state.map((state, i: number) => {
                    return <SnapShot key={i} snapNum={i} setSnapShotIndex={setSnapShotIndex} />
                })}
            </SnapShots>
        </Section>
    )
}

