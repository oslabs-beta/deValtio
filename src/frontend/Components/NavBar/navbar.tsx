import { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from '@material-ui/core/Tab';
import { useStyles } from '../../Styling/styles'
import { NavBarPanel } from "./NavBarPanel";
import StateDiff from '../StateDiff/statediff';
import ComponentTree from '../ComponentTree/componenttree';
import ProxyNetwork from '../ProxyNetwork/proxynetwork'

export const NavBar = (): JSX.Element => {
  const classes = useStyles();

  const [tabNum, setTabNum] = useState<number>(0);
  const handleTabChange = (e: React.ChangeEvent, val: number): void => {
    setTabNum(tabNum);
    console.log(tabNum);
    return;
  }
  return (
    <div>
      <AppBar className={classes.navBar} position='static'>
        <Tabs value={tabNum} onChange={handleTabChange}>
          <Tab label='StateDiff' />
          <Tab label='State Tree' />
          <Tab label='ProxyNetwork' />
        </Tabs>
      </AppBar>
      <NavBarPanel value={0}>
        <div>panel</div>
      </NavBarPanel>
      <NavBarPanel value={1}>
        <div>panel2</div>
      </NavBarPanel>
      <NavBarPanel value={2}>
        <div>panel3</div>
      </NavBarPanel>
    </div>
  );
}