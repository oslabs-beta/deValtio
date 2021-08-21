import Tabs from "@material-ui/core/Tabs";
import Tab from '@material-ui/core/Tab';
import { useStyles } from '../../Styling/styles';
import { useTabNumber, useTabChange } from "../../Contexts/TabNumberContext";
import styled from "styled-components";

const NavBarSection = styled.section`
  height: 10vh;
  width: 100vw;
  background: white;
`;

const NavTab = styled.a`
  background: green;
`;
export const NavBar = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <NavBarSection>
        <Tabs value={useTabNumber()} onChange={useTabChange()}>
          <Tab label='StateDiff' value={1} />
          <Tab label='State Tree' value={2} />
          <Tab label='ProxyNetwork' value={3} />
        </Tabs>
      </NavBarSection>
    </div>
  );
}