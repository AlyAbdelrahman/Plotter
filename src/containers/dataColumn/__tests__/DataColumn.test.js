import React from 'react';
import { shallow } from 'enzyme';
import testUtils from '../../../utils/testUtils';
import DataColumn from '../DataColumn';

let wrapper;

describe("rendering Data Column component", () => {
    const initialProps = {
        columnData: {
            dimension: [{
                name: "Product",
                function: "dimension"
            },
            {
                name: "Year",
                function: "dimension"
            },
            {
                name: "Country",
                function: "dimension"
            }],
        },
        AxesData: [],
        axesContainerRef: React.createRef()
    }
    wrapper = shallow(<DataColumn {...initialProps} />);
    it("must render a dragable column data", () => {
        expect(testUtils.findByTestAttr(wrapper, 'DataColumnContainer-box').exists()).toBeTruthy();
    })
    it("must render a list name", () => {
        expect(testUtils.findByTestAttr(wrapper, 'list-name').exists()).toBeTruthy();
        expect(testUtils.findByTestAttr(wrapper, 'list-name').text()).toContain('dimension');
    });
})