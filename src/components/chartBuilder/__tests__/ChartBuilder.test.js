import React from 'react';
import { shallow, ShallowWrapper, mount } from 'enzyme';
import testUtils from '../../../utils/testUtils';
import ChartBuilder from '../ChartBuilder';

let wrapper;
let initialProps;


describe("rendering Chart Builder components", () => {
    initialProps = {
        data: [
            {
                name: "Product",
                values: [
                    "17\" LCD w/built-in HDTV Tuner",
                    "Mini DV Camcorder with 3.5\" Swivel LCD",
                    "Envoy Ambassador",
                    "Model CD13272 Tricolor Ink Cartridge",
                    "5MP Telephoto Digital Camera",
                    "256MB Memory Card"
                ]
            },
            {
                name: "Cost",
                values: [
                    584207.400000002,
                    1880407.440000024,
                    7531491.899999776,
                    3861.4400000000046,
                    8910.88,
                    351.76
                ]
            }
        ]
    }
    it("must render a chart empty alert before any data loaded", () => {
        wrapper = shallow(<ChartBuilder {...initialProps}/>);
        expect(testUtils.findByTestAttr(wrapper, 'chart-Empty-Alert').exists()).toBeTruthy();
    });
    it("must render a chart when data loaded", () => {
        
        wrapper = shallow(<ChartBuilder propsChardBuilderData={initialProps} data={initialProps.data}/>);
        expect(testUtils.findByTestAttr(wrapper, 'data-chart').exists()).toBeTruthy();
    });
    
})