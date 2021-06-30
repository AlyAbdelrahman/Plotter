import React, { useRef, useState, useEffect } from 'react'
import DataColumn from '../dataColumn/DataColumn';
import plotDataService from '../../services/mainDataColumn-service';
import { groupBy } from 'lodash'
import ChartBuilder from '../../components/chartBuilder/ChartBuilder';

const ChartMaker = (props) => {
    const { AxesData: propsAxesData, chartsData: propsChartsData } = props;
    const chartsAxesContainerRef = useRef(null);
    const [columnData, setcolumnData] = useState([]);
    const [AxesData, setAxesData] = useState(propsAxesData || []);
    const [orginalColumnData, setOrginalColumnData] = useState([]);
    const [chartsData, setChartsData] = useState(propsChartsData || []);


    useEffect(() => {
        plotDataService.getCoulmnData().then(data => {
            setOrginalColumnData(data)
            setcolumnData(groupBy(data, 'function'));
        })
    }, [])
    useEffect(() => {
        const isChartAxesDataFilled = AxesData.some((AxisData) => AxisData.function !== AxesData[0].function);
        if (isChartAxesDataFilled) {
            let xAxis;
            let yAxis;
            let chartAxesObj;
            AxesData.map((Axis) => {
                if (Axis.function === "dimension") {
                    return xAxis = Axis.name
                } else {
                    return yAxis = Axis.name
                }
            })
            chartAxesObj = {
                "measures": [yAxis],
                "dimension": xAxis
            }
            plotDataService.getChartData(chartAxesObj).then(chartData => setChartsData(chartData))
        }
    }, [AxesData])
    return (
        <div className="chartMakerContainer">
            <DataColumn
                axesContainerRef={chartsAxesContainerRef}
                orginalColumnDataList={orginalColumnData}
                setAxesData={setAxesData}
                columnData={columnData}
                AxesData={AxesData}
                setcolumnData={setcolumnData}
                data-test='Data-column'
            />
            <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto' }} >
                <div className="chartAxes" ref={chartsAxesContainerRef} />
                {chartsData.length && AxesData.length > 1 ? <ChartBuilder data={chartsData} data-test='chart-builder'/> : <p data-test='chart-Empty-Alert'>please insert Axes data</p>}
            </div>
        </div>
    )
}

export default ChartMaker;