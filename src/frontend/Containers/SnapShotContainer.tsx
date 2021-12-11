import { useContext } from 'react';
import { GlobalStateContext } from '../Contexts/GlobalStateContext';
import { SnapShotContext } from '../Contexts/SnapShotContext';
import SnapShot from '../Components/Snapshot/SnapShot';
import styled from 'styled-components';

// NEED TO FIX TYPE ANY ON LINE 27

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 96vh;
    width:14vw;
    background: #293241;
    border: 2px solid #98C1D9;
    color: #98C1D9;
    text-align: center;
`;

const SnapShots = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 0;
    height:100%;
    overflow-y: auto;
`;

export const SnapShotContainer = (): JSX.Element => {

    const state = useContext(GlobalStateContext);
    const { setSnapShotIndex }: { setSnapShotIndex: React.Dispatch<React.SetStateAction<number>> } = useContext<any>(SnapShotContext);

    return (
        <Section>
            <h1>SnapShots</h1>
            <SnapShots>
                {state?.map((state, i: number) => {
                    return <SnapShot key={i} value={i} snapNum={i} setSnapShotIndex={setSnapShotIndex} />
                })}
            </SnapShots>
        </Section>
    )
}

