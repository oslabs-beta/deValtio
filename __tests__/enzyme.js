import React from 'react';
import styled from 'styled-components';
import 'jest-styled-components';
import toJson from 'enzyme-to-json';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ComponentTree from '../src/frontend/Components/ComponentTree/componenttree'
import ProxyNetwork from '../src/frontend/Components/ProxyNetwork/ProxyNetwork'
import NavBar from '../src/frontend/Components/NavBar/navbar'
// import MainContainer from '../src/frontend/Containers/MainContainer';
// import ComponentGraph from '../src/frontend/Components/ComponentGraph/componentgraph';
import SnapShot from '../src/frontend/Components/Snapshot/SnapShot';

configure({ adapter: new Adapter() });

 describe('Front end tests', () => {

    it('Snapshot', () => {
        const isnpshtctx = {
            snapShotIndex: 5,
            setSnapShotIndex: 5
        };
        const wrapper = shallow(<SnapShot snapshotIndex={1} />);
        expect(wrapper.find('*')).toHaveLength(3);
    });
    

    it('ProxyNetwork', () => {
        const wrapper = shallow(<ProxyNetwork />);
        expect(wrapper.find('*')).toHaveLength(1);
        
    });

    it('ComponentTree', () => {
        const wrapper = shallow(<ComponentTree />);
        expect(wrapper.type()).toEqual('div');

    });

    it('NavBar', () => {
        const wrapper = shallow(<NavBar />);
        expect(wrapper.find('*')).toHaveLength(5);
    });

    
    



 })