import testUtils from './utils/testUtils';


describe("rendering Main component",()=>{
  
  test('render App component without errors', () => {
    const wrapper = testUtils.setup();
    const appComponent = testUtils.findByTestAttr(wrapper,'component-app');
    expect(appComponent.length).toBe(1);
  });
  test('render App component ChartMaker without errors', () => {
    const wrapper = testUtils.setup();
    const appComponent = testUtils.findByTestAttr(wrapper,'component-chart-maker');
    expect(appComponent.length).toBe(1);
  });
})
