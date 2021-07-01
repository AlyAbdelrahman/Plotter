import React from 'react';
import { shallow, ShallowWrapper, mount } from 'enzyme';
import testUtils from '../../../utils/testUtils';
import DragDrop from '../DragDrop/DragDrop';
import { DRAGABLE } from '../../../utils/constants'


let wrapper;
let initialProps;

describe("rendering Drag and drop components", () => {
    initialProps = {
        itemsList: [
            {
                name: "Product",
                function: "dimension"
            },
            {
                name: "Year",
                function: "dimension"
            },
        ],
    }
    wrapper = shallow(<DragDrop {...initialProps} />);
    it("must render a Dragable item when it's a dragable item type passed", () => {
        initialProps = {
            itemsList: [
                {
                    name: "Product",
                    function: "dimension"
                },
                {
                    name: "Year",
                    function: "dimension"
                },
            ],
            actionType: DRAGABLE
        }
        wrapper = shallow(<DragDrop {...initialProps} />);
        expect(testUtils.findByTestAttr(wrapper, 'dragable-item').exists()).toBeTruthy();
    });
    it("must render a Dragable item when it's a droppable item type passed", () => {
        initialProps = {
            itemsList: [
                {
                    name: "Product",
                    function: "dimension"
                },
                {
                    name: "Year",
                    function: "dimension"
                },
            ],
            actionType: 'Droppable'
        }
        wrapper = shallow(<DragDrop {...initialProps} />);
        expect(testUtils.findByTestAttr(wrapper, 'droppable-item').exists()).toBeTruthy();
    });
})