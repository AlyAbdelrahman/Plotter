import React, { useRef, useState, useEffect } from 'react'
import DataColumn from '../dataColumn/DataColumn';
import plotDataService from '../../services/mainDataColumn-service';
import { groupBy } from 'lodash'
import ChartBuilder from '../../components/chartBuilder/ChartBuilder';
import PropTypes from 'prop-types';
import { DIMENTION, MEASURES, FUNCTION } from '../../utils/constants'

/**
 * ChartMaker is a container component for all the chart making components
 */
const ChartMaker = (props) => {
    const { axesData: propsAxesData, chartsData: propsChartsData, columnData: propsColumnData } = props;
    const chartsAxesContainerRef = useRef(null);
    const [columnData, setcolumnData] = useState(propsColumnData || []);
    const [axesData, setAxesData] = useState(propsAxesData || []);
    const [orginalColumnData, setOrginalColumnData] = useState([]);
    const [chartsData, setChartsData] = useState(propsChartsData || []);
    const [error, setError] = useState('');
    const [[retryFunction], setRetryFunction] = useState([() => { }]);
    let COUNTER_TIMER = 5000;
    const ERROR_FETCHING_COLUMN_DATA = 'coulmn data faild to retrive';
    const ERROR_FETCHING_CHART_DATA = 'chart data faild to retrive';

    const handleChartErrors = (errorText, errorHandlingFunction) =>{
        setRetryFunction([errorHandlingFunction]);
            setError(errorText);
            setTimeout(() => {
                setError('');
                setRetryFunction([() => { }]);
            }, COUNTER_TIMER);
    }
    const fetchChartColumnData = () => {
        return plotDataService.getCoulmnData().then(data => {
            setOrginalColumnData(data)
            setcolumnData(groupBy(data, FUNCTION));
        }).catch((err) => handleChartErrors(ERROR_FETCHING_COLUMN_DATA,fetchChartColumnData))
    };
    const fetchChartData = (chartAxesObj) =>{
        return plotDataService.getChartData(chartAxesObj).then(chartData => setChartsData(chartData)).catch(err=>handleChartErrors(ERROR_FETCHING_CHART_DATA,()=>fetchChartData(chartAxesObj)))
    }
    useEffect(() => {
        fetchChartColumnData();
    }, [])
    useEffect(() => {
        const isChartAxesDataFilled = axesData.some((AxisData) => AxisData.function !== axesData[0].function);
        if (isChartAxesDataFilled) {
            let xAxis;
            let yAxis;
            let chartAxesObj;
            axesData.map((Axis) => {
                if (Axis.function === DIMENTION) {
                    return xAxis = Axis.name
                } else {
                    return yAxis = Axis.name
                }
            })
            chartAxesObj = {
                [MEASURES]: [yAxis],
                [DIMENTION]: xAxis
            }
            fetchChartData(chartAxesObj)
        }
    }, [axesData])
    return (
        <div className="chartMakerContainer">
            <DataColumn
                ref={chartsAxesContainerRef}
                orginalColumnDataList={orginalColumnData}
                setAxesData={setAxesData}
                columnData={columnData}
                axesData={axesData}
                setcolumnData={setcolumnData}
                data-test='Data-column'
            />
            <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto' }} >
                <div className="chartAxes" ref={chartsAxesContainerRef} />
                {chartsData.length && axesData.length > 1 ? <ChartBuilder data={chartsData} data-test='chart-builder' /> : ''}
            </div>
            {error && <div className="snackBarContainer">
                {error}
                {' '}
                <button onClick={retryFunction}>Retry</button>
            </div>}
        </div>
    )
}
ChartMaker.defaultProps = {
    propsAxesData: false,
    propsChartsData: false,
    propsColumnData: false
}
ChartMaker.prototype = {
    propsAxesData: PropTypes.bool,
    propsChartsData: PropTypes.bool,
    propsColumnData: PropTypes.bool
}
export default ChartMaker;