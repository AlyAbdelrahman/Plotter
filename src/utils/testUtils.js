import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import App from '../App';


/**
* Return ShallowWrapper containing node(s) with given date-test value
* @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
* @param {string} val - Value of data-test attribute for search
* @returns {ShallowWrapper}
*/
const findByTestAttr = (wrapper,val) =>{
  return  wrapper.find(`[data-test='${val}']`)
}
const setup = (props={},state=null) =>{
  const wrapper = shallow(<App {...props}/>);
  if (state) wrapper.setState(state)
  return wrapper;
}

const testUtils = {
    findByTestAttr,
    setup
}
export default testUtils;