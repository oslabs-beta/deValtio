import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ComponentTree from '../src/frontend/Components/ComponentTree/componenttree'



configure({ adapter: new Adapter() });

 describe('React tests', () => {

    it('Test', () => {
        
    })

    it('Component Tree Test', () => {
        const wrapper = shallow(<ComponentTree />);

        expect(wrapper.type()).toEqual('div');

    });






 })