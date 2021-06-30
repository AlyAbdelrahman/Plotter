import React from 'react';
import { shallow, ShallowWrapper, mount } from 'enzyme';
import testUtils from '../../../utils/testUtils';
import ChartMaker from '../ChartMaker'



let wrapper;

beforeEach(() => {
    wrapper = shallow(<ChartMaker />);
});
afterEach(() => {
    wrapper.unmount();
});

describe("rendering Chart Maker components", () => {
    
    it("must render a chart empty alert before any api call success", () => {
        expect(testUtils.findByTestAttr(wrapper, 'chart-Empty-Alert').exists()).toBeTruthy();
    });
    it("must render a data column", () => {
        expect(testUtils.findByTestAttr(wrapper, 'Data-column').exists()).toBeTruthy();
    });
    it('must render a chart when data available', () => {
        const initalProps = {
            chartsData : [
                {
                    "name": "Product",
                    "values": [
                        "17\" LCD w/built-in HDTV Tuner",
                        "Mini DV Camcorder with 3.5\" Swivel LCD",
                        "Envoy Ambassador",
                        "Model CD13272 Tricolor Ink Cartridge",
                        "5MP Telephoto Digital Camera",
                        "256MB Memory Card"
                    ]
                },
                {
                    "name": "Cost",
                    "values": [
                        584207.400000002,
                        1880407.440000024,
                        7531491.899999776,
                        3861.4400000000046,
                        8910.88,
                        351.76
                    ]
                }
            ],
            AxesData:[
                {
                    "name": "Product",
                    "function": "dimension"
                },
                {
                    "name": "Year",
                    "function": "dimension"
                },
            ]
        }
        wrapper = shallow(<ChartMaker {...initalProps}/>);
        expect(testUtils.findByTestAttr(wrapper, 'chart-builder').exists()).toBeTruthy();
    });
})
