import { MainContainer } from '../Containers/MainContainer';
import VisualContainer from '../Containers/VisualContainer'

const App = (): JSX.Element => {
    return (
        <MainContainer>
            <VisualContainer />
        </MainContainer>
    );
}

export default App;