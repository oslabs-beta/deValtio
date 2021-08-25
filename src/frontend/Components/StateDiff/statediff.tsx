//this is for state drawn out 
import {diff, formatters} from "jsondiffpatch";
import ReactHtmlParser from 'react-html-parser';
import {curSnapMock, prevSnapMock, snapshotTestArray} from './mockStateDiff'


function StateDiff(): JSX.Element {

  // let dummyone = [{
  //   firstname: "hello",
  //   lastname: "bye"
  // }]
  // let dummytwo = [{
  //   firstname: "bye",
  //   lastname: "hello"
  // }]

  //extract intial state from the app and display it as an object 
  //as we add to state show the updates to state - save it as a snapshot and display it in the snapshot section 
  //everytime state is update, it should display updated state and save it as a new snapshot 
  //this is for diffing difference between 2 snapshots
const delta: any = diff(curSnapMock, prevSnapMock);
console.log('this is the delta version', delta);
//this is to covert difference to html format
const html = formatters.html.format(delta, prevSnapMock);
console.log('this is the formatted version', html)


  return (
    <div className='Diff'>
      changes here will render what I need
      this turns the html back into react code to render
      {ReactHtmlParser(html)}
    </div>
  )
}

export default StateDiff;