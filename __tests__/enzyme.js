import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ComponentTree from '../src/frontend/Components/ComponentTree/componenttree'
import ProxyNetwork from '../src/frontend/Components/ProxyNetwork/ProxyNetwork'

configure({ adapter: new Adapter() });

 describe('Front end tests', () => {

    it('ComponentGraph', () => {
        const wrapper = shallow(<ProxyNetwork />);
        expect(wrapper.find('*')).toHaveLength(1);
        
    })

    it('Component Tree Test', () => {
        const wrapper = shallow(<ComponentTree />);

        expect(wrapper.type()).toEqual('div');

    });






 })