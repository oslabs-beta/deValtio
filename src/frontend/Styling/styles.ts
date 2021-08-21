import styled from 'styled-components';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    drawer: {
        width: '15rem'
    },
    drawerPaper: {
        width: '15rem',
        background: '#98C1D9',
        border: '2px solid #293241'
    },
    MainContainer: {
        display: 'flex',
        background: '#98C1D9',
        width: '100%',
        height: '100%'
    },
    snapText: {
        color: '#293241',
        textAlign: 'center',
        padding: 8
    },
    navBar: {
        width: 'calc(100% - 15rem)'
    }
}));

export const Section = styled.section`
    height: 100vh;
    width: 15vw;
    background: red;
`;