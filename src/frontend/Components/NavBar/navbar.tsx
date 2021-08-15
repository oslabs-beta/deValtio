import { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from '@material-ui/core/Tab';
import { useStyles } from '../../Styling/styles';

export const NavBar = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <AppBar className={classes.navBar} position='static'>
        <Tabs value={tabNum} onChange={handleTabChange}>
          <Tab label='StateDiff' value={1} />
          <Tab label='State Tree' value={2} />
          <Tab label='ProxyNetwork' value={3} />
        </Tabs>
      </AppBar>
    </div>
  );
}