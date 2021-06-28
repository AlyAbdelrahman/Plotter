import React, { createContext, useRef, useState, useEffect } from 'react'
import DataColumn from '../dataColumn/DataColumn';
import plotDataService from '../../services/mainDataColumn-service';
import { groupBy } from 'lodash'

export const ChartContext = createContext();
const ChartMaker = () => {
    const chartsAxesContainerRef = useRef(null);
    const [columnData, setcolumnData] = useState([]);
    const [AxesData, setAxesData] = useState([]);
    const [orginalColumnData, setOrginalColumnData] = useState([]);


    useEffect(() => {
        plotDataService.getCoulmnData().then(data => {
            setOrginalColumnData(data)
            setcolumnData(groupBy(data, 'function'));
        })
    }, [])
    useEffect(() => {
        const isChartAxesDataFilled = AxesData.some((AxisData)=>AxisData.function !== AxesData[0].function);
        if(isChartAxesDataFilled){
            console.log('>>filled')
        }else{
            console.log('>>not yttt')
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
            />
            <div className="chartAxes" ref={chartsAxesContainerRef} />
        </div>
    )
}

export default ChartMaker;