import React, { SetStateAction, Dispatch, useContext } from "react";
import { SnapShotContext } from "../../Contexts/SnapShotContext";
import styled from "styled-components";

const SnapShotButton = styled.button<{ snapShotIndex: number }>`
    background: ${props => props.value === props.snapShotIndex ? '#E0FBFC' : '#98C1D9'};
    color: ${props => props.value === props.snapShotIndex ? '#98C1D9' : '#E0FBFC'};
    width: 50%;
    min-width: 50%;
    height: auto;
    min-height: 3em;
    border: 1px solid #98C1D9;
    border-radius: 2px;
    margin: 7px 4px;
    cursor: pointer;
    overflow-wrap: break-word;
    &:hover {
        color: #293241; 
    };
`;

// const P = styled.p`
//     margin: 0.3em;
//     font-size: 1.2em;
// `;

const SnapShot = ({ snapNum, setSnapShotIndex, value }: { snapNum: number, setSnapShotIndex: Dispatch<SetStateAction<number>>, value: number }) => {

    const { snapShotIndex }: { snapShotIndex: number } = useContext<any>(SnapShotContext);

    return (
        <SnapShotButton
            value={value}
            snapShotIndex={snapShotIndex}
            onClick={() => setSnapShotIndex(snapNum)}>SnapShot {snapNum + 1}
        </SnapShotButton>
    );
}
export default SnapShot;