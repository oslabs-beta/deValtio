import styled from 'styled-components';

const Section = styled.section`
    height: 96vh;
    width:14vw;
    background: #293241;
    border: 2px solid #98C1D9;
    color: #98C1D9;
    text-align:center;
    
`;

export const SnapshotContainer = (): JSX.Element => {
    return (
        <Section>
            SnapShots
        </Section>
    )
}

