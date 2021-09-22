import { useContext } from "react";
import { GlobalStateContext } from "../../Contexts/GlobalStateContext";
import { SnapShotContext } from "../../Contexts/SnapShotContext";
import { diff, formatters } from "jsondiffpatch";
import ReactHtmlParser from 'react-html-parser';
//import {curSnapMock, prevSnapMock, snapshotTestArray} from './mockStateDiff'
import styled from "styled-components";

// NEED TO FIX TYPE ANY ON LINE 20

function StateDiff(): JSX.Element {

  const DiffState = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  align-items: flex-start; 
  `
  const state = useContext(GlobalStateContext);
  const { snapShotIndex }: { snapShotIndex: number } = useContext<any>(SnapShotContext);

  let dummyone = {
    counter: 0,
    isLoggedIn: false,
    name: 'Cameron'
  }
  let dummytwo = {
    counter: 1,
    isLoggedIn: true,
    name: 'Tom'
  }

  //extract intial state from the app and display it as an object 
  //as we add to state show the updates to state - save it as a snapshot and display it in the snapshot section 
  //everytime state is update, it should display updated state and save it as a new snapshot 
  //this is for diffing difference between 2 snapshots
  const delta: any = diff(dummyone, dummytwo);
  //console.log('this is the delta version', delta);
  //this is to covert difference to html format
  const html = formatters.html.format(delta, dummyone);
  //console.log('this is the formatted version', html)

  //console.log('from stateDiff at index', state![snapShotIndex]);
  return (
    <DiffState>
      {ReactHtmlParser(html)}
    </DiffState>
  )
}

export default StateDiff;