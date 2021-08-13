import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    drawer: {
        minwidth: '12%',
        background: '#4287f5'
    },
    drawerPaper: {
        minWidth: '12%',
        background: '#4287f5'
    },
    root: {
        display: 'flex',
        background: '#8287f5'
    },
    visualContainer: {
        minWidth: '88%',
        background: '#2287f5'
    }
}));