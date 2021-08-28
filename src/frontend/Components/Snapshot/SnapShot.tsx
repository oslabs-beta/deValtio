import { SetStateAction, Dispatch } from "react";
import { ISnapShotList } from "../../../Types/Types";
import styled from "styled-components";

const SnapShotButton = styled.button`
`;

const P = styled.p`
    margin: 0.3em;
    font-size: 1.2em;
`;

export const SnapShot = ({ snapNum, setSnapShotIndex }: { snapNum: number, setSnapShotIndex: Dispatch<SetStateAction<number>> }) => {
    return (
        <SnapShotButton onClick={() => setSnapShotIndex(snapNum)}>SnapShot {snapNum + 1}</SnapShotButton>
    );
}