import {diff, formatters} from "jsondiffpatch";
import ReactHtmlParser from 'react-html-parser';
//import {curSnapMock, prevSnapMock, snapshotTestArray} from './mockStateDiff'
import styled from "styled-components";


function StateDiff(): JSX.Element {

  const DiffState = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  align-items: flex-start; 
  `


  let dummyone = {
    firstname: "hello",
    lastname: "bye"
  }
  let dummytwo = {
    firstname: "bye",
    lastname: "hello"
  }

  //extract intial state from the app and display it as an object 
  //as we add to state show the updates to state - save it as a snapshot and display it in the snapshot section 
  //everytime state is update, it should display updated state and save it as a new snapshot 
  //this is for diffing difference between 2 snapshots
const delta: any = diff(dummyone, dummytwo);
console.log('this is the delta version', delta);
//this is to covert difference to html format
const html = formatters.html.format(delta, dummyone);
console.log('this is the formatted version', html)


  return (
    <DiffState>
      {ReactHtmlParser(html)}
    </DiffState>
  )
}

export default StateDiff;