import { useStyles } from '../styles'

export const VisualContainer = (): JSX.Element => {
    const classes = useStyles();
    return (
        <div className={classes.visualContainer}>
            State Tree
        </div>
    );
}