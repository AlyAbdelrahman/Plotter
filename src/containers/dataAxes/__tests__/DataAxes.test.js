import React from 'react';
import { shallow, ShallowWrapper, mount } from 'enzyme';
import testUtils from '../../../utils/testUtils';
import DataAxes from '../DataAxes';

let wrapper;
let initialProps;


describe("rendering Data Axes component", () => {
    initialProps = {
        header: 'Cost',
        axesData: {
            name: "Product",
            function: "dimension"
        },
        handleDeleteMeasure : () =>{}
    }
    wrapper = shallow(<DataAxes {...initialProps} />);
    it("must render a Axis title when data dropped in it", () => {
        expect(testUtils.findByTestAttr(wrapper, 'Axis-data-text').exists()).toBeTruthy();
    });
    it("must render a Axis title same as dropped data", () => {
        expect(wrapper.text()).toContain('Cost')
    });
    it("must render Axis Tag when data dropped in it", () => {
        expect(testUtils.findByTestAttr(wrapper, 'Axis-data-name').exists()).toBeTruthy();
    });
    it("must render Axis clear Tag button when data dropped in it", () => {
        expect(testUtils.findByTestAttr(wrapper, 'clear-Axis-data-button').exists()).toBeTruthy();
    });
})