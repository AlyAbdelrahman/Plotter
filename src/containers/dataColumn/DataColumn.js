import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import plotDataService from '../../services/mainDataColumn-service';
import DragDrop from '../../components/dragDrop/DragDrop/DragDrop';
import DataAxes from '../dataAxes/DataAxes';
import { groupBy } from 'lodash'

const DataColumn = ({axesContainerRef}) => {
    const [columnData, setcolumnData] = useState([]);
    const [AxesData, setAxesData] = useState([]);
    useEffect(() => {
        plotDataService.getCoulmnData().then(data => setcolumnData(groupBy(data, 'function')))
    }, [])

    const handleOnDragEnd = (result) =>{
        if (!result.destination) return;
        console.log('>>here')
        const { source, destination } = result;
        const selectedItem = columnData[source.droppableId][source.index];
        const copiedAxesData = [...AxesData];
        // console.log('>>copiedAxesData',copiedAxesData)
        const newAxesData = [...copiedAxesData,selectedItem];
        const filterAxesData = [...new Set(newAxesData)];
        console.log('>>filterAxesData',filterAxesData)
        // console.log(selectedItem)
        // if (source.droppableId !== destination.droppableId) {
            setAxesData(filterAxesData)
            // console.log('>>source',source)
            // console.log('>>destination',destination)
        // }
    }
    const getMatchedAxesData = (listName) => {
        console.log('>>object',AxesData);
        console.log('>>axesData',listName)
        return AxesData.find((axesData)=>axesData.function === listName)
    }
    return (
        <div className="DataColumnContainer">
            {Object.entries(columnData).map((dataList) => {
                const listName = dataList[0];
                return (
                    <div key={listName} className="DataColumnContainer-box">
                        <DragDropContext onDragEnd={data => handleOnDragEnd(data)} >
                            <div className="DragHeaderContainer">
                                <h6 className="DragHeaderContainer__Text">
                                    {listName}
                                </h6>
                            </div>
                            <DragDrop actionType='Droppable' droppableId={listName}>
                                <DragDrop actionType='Dragable' itemsList={dataList[1]} customClass="" />
                            </DragDrop>

                        
                        {ReactDOM.createPortal(<DataAxes header={listName} AxesData={getMatchedAxesData(listName)}/>, axesContainerRef.current)}
                        </DragDropContext>
                    </div>
                )
            })}
        </div>
    )
}
export default DataColumn;